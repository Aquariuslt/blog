---
title: 'Github Actions: New YAML Syntax'
created: 2019-08-18
updated: 2019-08-18
category: Blog
tags:
  - NPM
  - CI
  - Github
  - TravisCI
  - Actions
  - Docker
cover: https://img.aquariuslt.com/posts/2019/08/migrating-github-actions.png
---

# Github Actions: New YAML Syntax

## Background

在之前一篇博文里刚介绍完 Github Actions 配置的`HCL`语法不久，Github 官方就标记为 **deprecated** 了。原因是社区声音推崇他们使用新的 YAML 语法，这类的语法配置与现有的其他 CI 平台相对更加接近，更加容易举一反三写出合理的配置。

> The documentation at https://developer.github.com/actions and support for the HCL syntax in GitHub Actions will be deprecated on September 30, 2019. Documentation for the new limited public beta using the YAML syntax is available on https://help.github.com. See "Automating your workflow with GitHub Actions" for documentation using the YAML syntax.

自此之后，官方的 Github Actions Marketplace 也多了更多的官方 Actions (actions 官方 org 原本置顶的几个 actions 源代码也都换成了常见的项目集成 samples)

话不多说，就着本次 Github Actions Syntax Migration，还是以上次的 `jest-properties-loader` 为例子，我将它用 typescript 进行重写，并且把 workflow 以同样的思路，迁移到 `YAML` 语法版本。具体的语法不阐述了，基本是所谓的 **所见即所得** 理解模式。

## Comparison

既然是官方提倡的 Migration，Github 提供了很多帮助文档，来帮助你进行迁移。

最后的 [References](#references) 部分，会给出一些官方提及的参考链接，但在这里更想直观的提及的是这次 Migration 前后的几个重要对比。

- 在 Github Repo 的设置界面，原本的图形化修改 workflow 文件已经失效，直接变成一个 YAML 文件的在线编辑模式
- 默认的 workflow 默认路径，从 `.github/*.workflow` 变成了 `.github/workflows/*.yml`
- 对应每一个 Step 的构建日志，都添加了基础的高亮功能，在也不是默认的 `stdout | tee` 的形式了
- 给人的感觉是启动速度超快，以前触发一次 Actions 从对应的构建环境容器拉取、启动，都花了不少时间，现在基本对标其他 CI 平台的链路完成速度
- 元数据支持方面，多了很多可选的选项，可以在 YAML 配置里编写很多类似注释级别的 `metadata`
- 通过模板语法支持 `matrix build`

![Build Log Highlight](https://img.aquariuslt.com/posts/2019/08/build-log-highlight-support.png)

## Migrations

下面这里是我个人对 `jest-properties-loader` 在使用 TypeScript 重写后的的迁移过程。

### Step 0: Migration Solution

我直接放弃了官方的一些迁移手段: 比如先把官方一个迁移工具 clone 到本地，紧接着执行里面的脚本，将对应的 `.workflow` 文件转化成新的 Yaml 文件。

根据迁移后的实际流程，然后找官方提供的 Example 进行魔改。

目前来说，`jest-properties-loader` 作为一款 NPM Package，触发 CI/CD 的流程大致如下:

1. 平时提交代码，通过 CI 平台执行 `yarn test`, `yarn build`, 上传覆盖率报告到 **Codecov**
2. 触发 `release` 事件时，通过 CI 平台执行 `yarn build`，之后发布到 `npm registry` 上

### Step 1: Copy Official Node-CI Example

在确立了流程后，我们可以从任意 Repo 的 `Actions` 标签页，选择一些对应语言/平台的 `example workflow` 进行魔改。

![Select NPM Example Workflow](https://img.aquariuslt.com/posts/2019/08/select-sample-workflow-for-npm.png)

把官方的 `Node-CI` 直接应用到项目本身，也完全 OK。自此，我们第一步，通过 CI 平台执行`yarn test`,`yarn build`的功能就完成了。

```yaml
name: Node CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [8.x, 10.x, 12.x]

    steps:
      - uses: actions/checkout@v1
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - name: npm install, build, and test
        run: |
          npm install
          npm run build --if-present
          npm test
```

### Step 2: Upload coverage report to Codecov

上传通用的 `lcov.info` 覆盖率报告文件到 CodeCov， 这一步也从之前的野生第三方 actions 切换到官方的 actions。

如下图，我们使用 新的 `${{secrets.CODECOV_TOKEN}}` 来获取 repo secrets 中的对应变量

```yaml
- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v1.0.0
  with:
    token: ${{secrets.CODECOV_TOKEN}}
    file: ./reports/coverage/lcov.info
    flags: unittests
    name: codecov-umbrella
```

### Step 3: Trigger Build Step with Condition (Release)

在进行发布时，按照上篇博文的 **创建 Release 触发新的 Workflow** 的思路，原本的`HCL`配置应该这么写:

**Before:**

```hcl
workflow "release" {
  on = "release"
  resolves = ["npm:release"]
}

action "filter:release" {
  uses = "actions/bin/filter@master"
  args = "action created*"
}


action "npm:release" {
  needs = "filter:release"
  uses = "actions/npm@master"
  secrets = ["NPM_AUTH_TOKEN"]
  args = "publish"
}
```

**After:**

```yaml
name: Publish to NPM

on:
  release:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 10
      - run: |
          yarn install
          yarn test
          yarn build

  publish-npm:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 10
          registry-url: https://registry.npmjs.org/
      - run: |
          yarn install
          yarn test
          yarn build
      - run: npm publish
        if: github.event.action == 'created'
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_AUTH_TOKEN}}
```

还是原汁原味的读取 `NPM_AUTH_TOKEN` secrets 变量, 使用 `if` 条件表达式代替原来的 `bin/filter` + `args` 条件表达式。

即可完整地代替原本的 HCL 语法 Workflow 。

## References

- [Migrating GitHub Actions from HCL syntax to YAML syntax](https://help.github.com/en/articles/migrating-github-actions-from-hcl-syntax-to-yaml-syntax)
- [Automating your workflow with GitHub Actions](https://help.github.com/en/categories/automating-your-workflow-with-github-actions)
