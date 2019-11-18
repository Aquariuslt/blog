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

# Monorepo Practice in TypeScript Projects

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

可以看到，中间标记为工具库一类的类库，都有 `dist` 和 `src` 目录，作为以 TypeScript 为源代码的语言，我给他们人为地设定了基本的 `TypeScript` + `Lib` 的构建路径，所以在单个项目接口来看，他们都具有通用的 `tsconfig.json` 和 jest 使用的 `jest.config` (in package.json).

**tsconfig.json**

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "resolveJsonModule": true,
    "target": "es6",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "noImplicitAny": false,
    "typeRoots": ["./node_modules/@types"]
  },
  "exclude": ["node_modules", "dist", "reports", "**/*.test.ts"]
}
```

**jest.config**

```json
{
  "jest": {
    "moduleFileExtensions": ["ts", "js", "json"],
    "transform": {
      "^.+\\.ts$": "ts-jest",
      "^.*\\.md$": "jest-raw-loader"
    },
    "collectCoverageFrom": ["!**/__tests__/**", "<rootDir>/src/**/*.ts"],
    "testMatch": ["<rootDir>/src/**/*.test.ts"],
    "testEnvironment": "node",
    "coverageDirectory": "<rootDir>/reports/coverage"
  }
}
```

对于单一一个类库，必定有着两步 npm script: build, test:

- npm run build 将执行命令 tsc，根据 tsconfig.json 的配置，将 `src` 目录下的 ts 文件转译成 `dist` 目录下的 commonjs 文件。
- npm run test 将执行命令 jest，根据 jest 的配置， 读取 `"<rootDir>/src/**/*.test.ts"` unix path glob pattern 匹配的测试文件执行单元测试。

## Solutions

言归正传，我们回去之前引出的  Monorepo 在实践中诞生的第一个问题

- UnitTesting cross Monorepo

不过我们可以由浅入深，先来看看这些由纯工具类库构造成的 Monorepo 如何执行单元测试，再进化到遇到其他乱七八糟复杂的复杂情况时，应当如何应对。

### UnitTesting cross Monorepo

由于我们可以直接在每个工具类库下单独执行 `npm run test` 来分别执行单元测试，那么则可以在项目根目录下通过 `lerna run test` 执行。

啊哈！思考往往没有这么简单。我们执行单元测试的过程，不仅仅是为了为了分批执行多个子项目的单元测试，判断中间是否有非 0 退出的错误案例，用以快速反馈本次 commit 是否可能造成了破坏性的后果。还能结合很多测试结果相关的 CI 工具，反馈单元测试覆盖率等关键指标。

在开源界免费、支持度比较好覆盖率分析平台，不得不说 [Codecov](https://codecov.io/) 。基本上在尝试过所有类似的、免费的覆盖率报告分析平台后，最后都选择迁移到 Codecov 上。

那这里引发的关键思考点是: 我们分别在每个子项目下分别执行 `npm run test` ，根据各个子项目的 jestconfig, 将会在不同的子项目目录下生成覆盖率报告 (这里特指 jest 生成的 linux 标准的 `[lcov.info](http://lcov.info)` ) 文件。那么我们的 codecov 有办法汇总多个不同的 lcov.info 文件并为 Monorepo 的单个大项目仓库生成一份覆盖率报告吗 ?

我至今还没为这种思路找到经典、合理的解决方案。

如果在 Monorepo 的根目录里执行 `jest` ，接着为整个项目生成一份覆盖率报告，这样来说是不是比较方便的解决这个问题呢?

由于我们的工具类子仓库大部分都含有相同的目录结构，比如单元测试文件都可以用固定的 glob 表达式进行匹配，因而我们可以在项目根目录里安装 `typescript` 和 `jest` 相关依赖，然后自上而下的查找 sub-packages 中的测试文件执行测试，使得我们可以通过在不同的路径执行 `jest` 而达到不同的效果:

- 在根目录下执行 jest，可以一次执行所有 sub-packages 的测试，并在根目录指定的文件夹下生成覆盖率报告
- 在单个 sub-package 下执行 jest，可以快速的执行单个 sub-packages 下的测试，执行效率高，且能适配大多数 IDE、Editor 的单元测试执行上下文自动发现

所以这里的解决方案的前置要求便是:

- 每个 sub-package 具有类似的、统一的测试路径结构风格
- 每个 sub-package 使用到的 jest extension 不允许存在互斥的情况
- 根目录的 jest 配置是所有 sub-packages 的并集

到了这里，我们可以看一下在这种解决方案下的更目录的 jestconfig:

其中关键的节点是 `testMatch` 与 `collectCoverageFrom` 下的字段，用 `<rootDir>/packages/**/src/**/*` 去匹配所有 sub-packages 下的源代码与测试代码。

```json
{
  "jest": {
    "moduleFileExtensions": ["ts", "js", "json"],
    "transform": {
      "^.+\\.ts$": "ts-jest",
      "^.*\\.md$": "jest-raw-loader"
    },
    "collectCoverageFrom": [
      "!**/__tests__/**",
      "!**/src/index.ts",
      "!**/src/main.ts",
      "!**/src/plugins.ts",
      "!**/*.module.ts",
      "!**/migration.ts",
      "<rootDir>/src/**/*.ts",
      "<rootDir>/packages/**/src/**/*.ts"
    ],
    "testMatch": ["<rootDir>/src/**/*.test.ts", "<rootDir>/packages/**/src/**/*.test.ts"],
    "testEnvironment": "node",
    "coverageDirectory": "<rootDir>/reports/coverage"
  }
}
```

如此一来，我们便解决了基本的问题。

下面我们来看糅合了实际工作中一些复杂的情况：整合带 Path Alias 的子项目。

### Path Alias

这里将会以博客项目中的 `application` 子项目作为讲解。

`application` 子项目是一个使用了 nestjs 作为基本框架的项目，他在整个博客应用中起的作用是:

调用其他类库，并按照一定的顺序执行整个构建工作流，如扫描读取所有 Markdown 文件并提取其元数据，根据元信息构造路由，根据路由信息构造 API 内容 等等。

所以作为整个 Monorepo 中具有唯一性的、没有被其他 sub-package 依赖的调用方项目，我为他设置了一个 Path Alias: `@-> ./src`

在子项目路径  `packages/application` 目录下，tsconfig.json 中的路径别称是:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

在 jestconfig 中也需要声明这个 Path Alias:

```json
{
  "jest": {
    "moduleNameMapper": {
      "^@/(.*)$": "<rootDir>/src/$1"
    }
  }
}
```

为了遵循原先的解决方案需求，为应对这种具有 Path Alias 的子项目，我的实践如下:

- 子项目本身设立 Path Alias
- 子项目的测试代码结构与其他类库路径风格对齐
- 根目录在 jestconfig 下添加相关的 Path Alias 设置，即:

```json
{
  "jest": {
    "moduleNameMapper": {
      "^@/(.*)$": "<rootDir>/packages/application/src/$1"
    }
  }
}
```

这样便能解决 Path Alias x UnitTesting 的问题。

### Summarization

结合在项目中遇到的以上问题以及目前的实践方案，也反向引导出我们在项目中也需要遵循一些认为的、容易接受的约定。

总结这几个问题的解决思路，可以汇总成一下个情景。

我们在遇到 TypeScript + Jest + Monorepo 的场景时，需要遵循以下几种约定:

- 带有 Path Alias 的子项目，尽量不要被其他子项目所依赖
- 所有子项目的测试文件路径表达式尽量一致

在执行测试和构建方面，则需要注意以下的配置方式:

- 在根目录下执行 Jest，Jest 的配置是所有子项目 Jest 配置的并集
- 在根目录下执行 Jest，Jest 的配置需要理解带 Path Alias 子项目的路径 Mapping (即需要根目录理解此子项目的 Mapping 配置)

### More Complex Situation

中间还会发现有一些更复杂的情况

- 多个子项目的 tsconfig.json 不尽相同，无法合并出合理的并集?
- 子项目是一个前端项目，用到了很多不同的 loader 与插件，如 React/Vue ，根目录的配置是否也需要理解并安装这些 loader 呢?

## References

- Lerna at Github [https://github.com/lerna/lerna](https://github.com/lerna/lerna)
- Javascript Monorepo with Lerna [https://medium.com/@erzhtor/javascript-monorepo-with-lerna-5729d6242302](https://medium.com/@erzhtor/javascript-monorepo-with-lerna-5729d6242302)
