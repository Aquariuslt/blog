---
title: '管理你的 .ignore 类文件'
id: dot-ignore-management-for-npm-package
created: 2020-03-15
updated: 2020-03-15
categories:
  - Blog
tags:
  - Node
  - NPM
  - Git
cover: ./gitignore.png
---

# 管理你的 `.ignore` 类文件

## 背景

每次初始化项目的时候，都根据 不同项目的语言、框架、IDE、一遍组合人工创建与合并 `.gitignore` 文件，比较麻烦。

我经常在疑惑，是否有较为标准的 schematic 概念可以协助组装起来?

比方说，我常用的 IDE 是 `IntelliJ IDEA`，偶尔使用 `VSCode` 看看日志、进行简单的编辑文本工作;

从项目开发语言上看，接触的主要语言可能是 `Node`/`Java`;

再从包管理器、构建工具上看，相关语言生态中经常遇到的关键词则是 `NPM`/`Yarn`/`Maven`/`Gradle`/`SBT`(?)。

如何寻找一个合理的 `.gitignore` 组合方式?

> 这是一份奇怪的知识归纳，主要是为了舒缓个人在项目工程化方面纠结的一些细节。通过学习一个维护 `.ignore` 文件内容的方法论，并及时对自己的已有项目、按照新的、有意义的实践方法进行重构、改造，后面在面临一些方案选型时，可以增加自己对既有方案、观点的说服力。

## 创建与维护 `.gitignore` 文件合理的做法

对于 Git 的 `.gitignore`，其实 Github 的官方文档、和一些 Star 数比较多的 Github Repo 中，都已经提及部分的较佳实践。

详情可以看后面 **References** 部分的链接。

在学习了上面的文档之后，决定使用 `gitignore.io` 来协创建与维护 `.gitignore` 文件内容。

### `.gitignore` 文件的组合

> 其实观看 [gitignore.io 的教学视频](https://docs.gitignore.io/) 已经能清晰了解应该做什么，但这里还是重复的描述下流程。

在了解了一部分 `.gitignore` 模板之后，对于 IDE/语言/语言生态 来讲，最终只需要拆分成两部分。

语言相关的 `.gitignore` template 已经涵盖了 语言生态相关的部分。

所以我们只需要从两方面关心我们改组合哪两种方向的 `.gitignore` template。

如开发 NPM Package 类项目，我会使用 `Jetbrains` 家 IDE + `VSCode` + `NPM/Yarn` 相关的 `.gitignore` template。

在 gitignore.io 上，则可以将其简化成下面三个组合:

[https://www.gitignore.io/api/node,code,jetbrains+all](https://www.gitignore.io/api/node,code,jetbrains+all)

`gitignore.io` 的 API 会根据你的查询条件进行排序、输出一个合并后的 `.gitignore` 内容，复制粘贴即可使用。

## 衍生的新问题: 如何管理 `.npmignore` 文件?

事实上，在 `.ignore` 的世界里，有很多其他类似的文件，有时候都需要考虑如何合理地编写与维护。

如:

- .dockerignore
- .npmignore
- .eslintignore
- .prettierignore .....

开始纠结这件事情后，我又开始寻找 `.npmignore` 的最佳实践。

直到被 [For the love of god, dont't use .npmignore - Medium](https://medium.com/@jdxcode/for-the-love-of-god-dont-use-npmignore-f93c08909d8d) 这篇文章启发，重读了 NPM Package 的一些 Specification，又涨了新的姿势。

### 搏击俱乐部的第一条规则

> `.npmignore` 文件的最佳实践，便是没有 `.npmignore` 文件。

NPM 相关的 `.npmignore` 文件，其实是控制在包发布时的文件忽略规则，相当于:

```
源代码 + 构建产物 - 忽略文件 = 最终发布时被打包的文件。
```

上面的形式其实是要对项目文件目录做一个减法。对于需要发布的产物，其实用加法的思想，心智负担会更少。

有一行命令，可以帮助你预览，当执行 `npm publish` 时，发布的文件树:

```shell script
npm pack && tar -xvzf *.tgz && rm -rf package *.tgz
```

他会输出类似以下内容:

```shell script
$ npm pack && tar -xvzf *.tgz && rm -rf package *.tgz
npm notice
npm notice 📦  nestx-amqp@1.0.6
npm notice === Tarball Contents ===
npm notice 1.1kB LICENSE
npm notice 199B  dist/amqp.constants.js
npm notice 1.9kB dist/amqp.module.js
npm notice 77B   dist/amqp.options.js
npm notice 1.3kB dist/amqp.providers.js
npm notice 288B  dist/index.js
npm notice 3.3kB package.json
npm notice 1.8kB CHANGELOG.md
npm notice 2.3kB README.md
npm notice 114B  dist/amqp.constants.d.ts
npm notice 313B  dist/amqp.module.d.ts
npm notice 487B  dist/amqp.options.d.ts
npm notice 549B  dist/amqp.providers.d.ts
npm notice 131B  dist/index.d.ts
npm notice === Tarball Details ===
npm notice name:          nestx-amqp
npm notice version:       1.0.6
npm notice filename:      nestx-amqp-1.0.6.tgz
npm notice package size:  5.0 kB
npm notice unpacked size: 13.9 kB
npm notice shasum:        198fb0b7768525133d21488b901367ea4d26bfc9
npm notice integrity:     sha512-szLqvt0ZUNW2z[...]MagAIZuZRrUWQ==
npm notice total files:   14
npm notice
nestx-amqp-1.0.6.tgz
x package/LICENSE
x package/dist/amqp.constants.js
x package/dist/amqp.module.js
x package/dist/amqp.options.js
x package/dist/amqp.providers.js
x package/dist/index.js
x package/package.json
x package/CHANGELOG.md
x package/README.md
x package/dist/amqp.constants.d.ts
x package/dist/amqp.module.d.ts
x package/dist/amqp.options.d.ts
x package/dist/amqp.providers.d.ts
x package/dist/index.d.ts
```

有了这个命令之后，我们在更改/删除 `.npmignore` 时，就能方便地对比出变化

### package.json 的 `files` 字段

现在，我们删掉 `.npmignore` 文件，使用 [package.json 的 `files` 字段](https://docs.npmjs.com/files/package.json#files) 声明打包内容，做加法。

`files` 字段的类型，是一个字符串数组，数组的每一行使用 unix path glob pattern，以 `package.json` 所在目录进行路径匹配。

如上一部分的 `npm pack` 输出的内容，具体的 `files` 字段是:

```json
{
  "files": ["dist"]
}
```

表示了 `dist` 目录下所有的文件，都会被打包。

奇奇怪怪的问题来了，那为什么在输出中有可能看到其他的文件呢? `package.json` 是否需要显式地声明在 `files` 字段中?

这里还是要阅读下 `files` 及其背后的约定。

`npm publish`，永远优先读取 `files` 匹配的文件，永不忽略，其次再从 `.npmignore` 中进行减法。

下面这些文件，如果存在，将会默认地加入到 `npm publish` 所发布的内容里，不需要在 `files` 中再声明。 (NPM 默认约定)

同时也包括 `package.json#main` 中声明的文件。

```
package.json
README
CHANGES / CHANGELOG / HISTORY
LICENSE / LICENCE
NOTICE
README, CHANGES, LICENSE & NOTICE can have any case and extension.
```

下面这些路径，将会默认地被忽略，永远不会被 `npm publish` 所发布。(NPM 默认约定)

```
.git
CVS
.svn
.hg
.lock-wscript
.wafpickle-N
.*.swp
.DS_Store
._*
npm-debug.log
.npmrc
node_modules
config.gypi
*.orig
package-lock.json (use shrinkwrap instead)
```

了解到这部分奇奇怪怪的知识与约定后，我马上删除了所有 NPM Package 项目代码中的 `.npmignore`，使用 `files` 做简单的加法。

## 小结

- 创建/维护 `.gitignore` 可以使用 gitignore.io 的 API 组合生成内容
- 开始停止使用 `.npmignore`，而是用 `package.json#files` 进行 NPM 库发布文件树管理

## References

- [A collection of `.gitignore` templates - Github](https://github.com/github/gitignore)
- [For the love of god, dont't use .npmignore - Medium](https://medium.com/@jdxcode/for-the-love-of-god-dont-use-npmignore-f93c08909d8d)
