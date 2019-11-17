---
title: 'Monorepo Practice in TypeScript Projects'
id: monorepo-practice-in-typescript-projects
created: 2019-11-14
updated: 2019-11-14
categories:
  - Blog
tags:
  - NPM
  - CI
  - Typescript
  - Monorepo
  - Lerna
  - Jest
cover: ./cover.png
---

## Background

随着 Node 生态社区的发展，越来越多的 Nodejs 代码仓库开始采用 Monorepo 的形式进行管理。

我们可以看到一些前端 UI 框架、Web 框架，在新版本/一开始就采用了 monorepo 的形式管理代码。

> Q: 什么是 Monorepo? Monorepo 的基本好处是什么? A: 这里不多阐述，可以参考之湖上的这篇文章: [https://zhuanlan.zhihu.com/p/31289463](https://zhuanlan.zhihu.com/p/31289463)

由于在其他(这里值一些较较成熟的语言，如 Java)语言的包管理生态圈里已有很多成熟的解决方案，如 Java 世界里的 Maven/Gradle , 其中都有很多较佳时间在各种成熟的开源项目中有所体现。

由于 Node 官方的 NPM Package Registry 并没有提供一个官方的解决方案，所以目前会有很多的实现方案，比如 `Lerna` , `Yarn Workspace` , 更甚者还有一些脚本替换发布方案。

近期我在好几个 Node with TypeScript 项目(不管是工作中的项目抑或是自己的项目)中，都尝试开始使用 MonoRepo 的形式去组织代码结构与 CICD 流程。这里分享下对 Nodejs + TypeScript 的一些实践经验。

### Problems

要使用 Multi-Repo 还是 Monorepo，又或者是如何从 Multi-Repo 迁移、进化成 Monorepo，不同项目都面对着不同的问题。

我抽取了我在这些 Node 项目在修改成 Monorepo 的过程中面对的一些问题，并在下文中给出目前我觉得较为合理的一些解决方案。

### Unit Testing

常规的 Multi-Repo 的单元测试流程理解起来会比较简单。以常见的 `jest` 来看，为单个 Repo 设立单元测试、为单个 Repo 关联代码覆盖率相关的 CI 配置/平台，都相当简单。

当执行 Jest 进行单元测试的时候，我们只用维护一份 Jest 配置。接着一切便按照 Jest 的配置正常运作:

- 代码覆盖率相关的 CI 读取 Jest 配置中执行的 `coverageDirectory` 下相关的覆盖率报告文件
- 需要在 Jest 执行的各种生命周期的 Hooks 都能通过配置一目了然

当我们把这些 Multi-Repo 集中到一起的时候，问题便显现出来：

- 运行测试是逐个 sub-packages 单独执行测试吗? 如 `lerna run test`
- 单元测试的配置应该如何维护? 维护在 Monorepo 的根目录还是单独拆分维护在每个 sub-package 下?
- 如何像 Multi-Repo 那样与测试覆盖率的 CI 集合起来?

### Path Alias

现代化的 Node 项目(不管是 Node 还是前端项目)，很多时候都有一些 Path-Alias 的技巧。

具体表现是什么呢? 比如利用 `webpack` 的 `path.resolve` 配置或者 `tsconfig` 中 `paths` 的配置，做一些路径的简化，以节省各种相对路径 `../..` 的使用。

如 `@/main.ts` 实际指向了以项目根目录开始的 `<rootDir>/src/main.ts`

但是，在 Monorepo 下，我们在想方便的以 `@` 作为 Path Alias，则会遇到很多思考上的问题。

在单个 sub-package 内 理解并执行 Path-Alias 会跟原先的方式没什么区别。但是需要 root package

也理解 sub-package 的 Path-Alias 配置则需要很多思考：

- 多个使用 相同 Path-Alias 的 sub-packages 之间应该如何解析? 大家都在使用相同的 `@` 作为引用路径别名的情况下，怎么知道此时的 `@` 是对应哪一个正确的绝对路径呢
- 在 Monorepo 的情况下，还该不该使用 Path-Alias

相信这些问题，都将是大家在实践中会遇到的一些问题

## Example Project

下面以我的博客 repo v6.0 使用 TypeScript 和 monorepo 形式开发过程中的一些实践。

将会以比较简短的篇幅描述项目 Monorepo 相关的目录结构与相关的配置、配置要点，并描述如何/使用哪种方案去解决以上提及的问题。

### Example Project Introduction

整个项目源代码形式都以 TypeScript 作为主要语言，项目使用 Monorepo 进行一些子库之间的依赖管理。

其中使用 Lerna 进行 Monorepo 管理的主要工具，使用 Jest 作为贯穿所有子项目的单元测试框架。

整类子项目大概可以分成以下几种类型：

```
packages
├── api-generator      // 工具库 - 根据路由元数据生成 JSON 结构的 API 相应内容
├── application        // 核心构建流程，讲所有工具库和主题通过一定的构建流程串联在一起
├── article-tools      // 工具库 - 将 .md 文件结合Markdown工具库转换成文章数据
├── common             // 公共接口声明
├── config             // 工具库 - 博客项目的配置发现与读取类库
├── markdown           // 工具库 - 基于 Markdown-it 编写的各种扩展与插件
├── migration          // 临时脚本 - 将上一版本的博客应用数据结构迁移的脚本集
├── pwa-tools          // 工具库 - 基于 Workbox 生成 PWA 相关资源
├── routes-tools       // 工具库 - 生成静态路由极其 Meta 信息
├── theme-react        // 基于 React + Material UI 的前端主题
└── theme-vue          // 基于 Vue + vuematerial 的前端主题
```

按照互相之间的依赖路径，会是以下这样一种依赖形式: (可以通过 `lerna ls --graph --all` 命令查看 )

```
{
  "@blog/api-generator": [
    "@blog/article-tools",
    "@blog/common",
    "@blog/routes-tools"
  ],
  "@blog/application": [
    "@blog/api-generator",
    "@blog/article-tools",
    "@blog/common",
    "@blog/config"
  ],
  "@blog/article-tools": [
    "@blog/common",
    "@blog/markdown"
  ],
  "@blog/common": [
  ],
  "@blog/config": [
  ],
  "@blog/markdown": [
    "@blog/common"
  ],
  "@blog/migration": [
    "@blog/article-tools",
    "@blog/markdown"
  ],
  "@blog/pwa-tools": [
    "@blog/common"
  ],
  "@blog/routes-tools": [
    "@blog/article-tools",
    "@blog/common",
    "@blog/config"
  ],
  "@blog/theme-react": [
    "@blog/common",
    "@blog/config"
  ],
  "@blog/theme-vue": [
    "@blog/common",
    "@blog/config",
    "@blog/routes-tools"
  ]
}
```

### Example Project Folder Structure

现在我们来看整个项目的结构，以及其特点 (为节省面板，省略部分结构相同的工具类库目录)

```
├── CHANGELOG.md
├── LICENSE
├── README.md
├── data
├── lerna.json
├── package.json
├── packages
│   ├── api-generator
│   ├── application
│   │   ├── README.md
│   │   ├── dist
│   │   ├── nest-cli.json
│   │   ├── package.json
│   │   ├── src
│   │   ├── tsconfig.build.json
│   │   ├── tsconfig.json
│   ├── article-tools
│   ├── common
│   │   ├── README.md
│   │   ├── constants
│   │   ├── interfaces
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── utils
│   │   └── yarn.lock
│   ├── config
│   │   ├── README.md
│   │   ├── dist
│   │   ├── package.json
│   │   ├── src
│   │   ├── tsconfig.json
│   │   └── yarn.lock
│   ├── markdown
│   │   ├── README.md
│   │   ├── dist
│   │   ├── package.json
│   │   ├── src
│   │   ├── tsconfig.json
│   │   └── yarn.lock
│   ├── migration
│   ├── pwa-tools
│   ├── routes-tools
│   ├── theme-react
│   │   ├── dist
│   │   ├── gulpfile.ts
│   │   ├── package.json
│   │   ├── src
│   │   ├── tsconfig.json
│   │   ├── tsconfig.webpack.json
│   │   ├── webpack
│   │   ├── yarn-error.log
│   │   └── yarn.lock
│   └── theme-vue
│       ├── README.md
│       ├── dist
│       ├── package.json
│       ├── public
│       ├── src
│       ├── tsconfig.json
│       ├── vue.config.js
│       ├── vue.config.ts
│       ├── webpack.config.js
│       └── yarn.lock
```

## References

- Lerna at Github [https://github.com/lerna/lerna](https://github.com/lerna/lerna)
- Javascript Monorepo with Lerna [https://medium.com/@erzhtor/javascript-monorepo-with-lerna-5729d6242302](https://medium.com/@erzhtor/javascript-monorepo-with-lerna-5729d6242302)
