---
title: 基于Karma的非分离式前端单元测试基础方案
created: 2018-03-04
updated: 2018-03-04
category: Blog
tags:
  - Java
  - JAWR
  - Karma
  - JavaScript
  - Webpack
  - ExtJS
  - Spring
  - JSF
  - SpringMVC
cover: https://picsum.photos/id/220/800/300
---

# 基于 Karma 的非分离式前端单元测试基础方案

TL;DR

## Background

之前在为公司一个稍微有些年头的核心系统的代码寻找一个合理的单元测试方案，在摆弄了一段时间后，目前奠定了一个基于 Karma 的前端单元测试方案。

如果你的项目符合以下条件，那么这个解决方案和其中的思路也许能对你的项目有点帮助。

原本的项目与前端相关的部分属于 Java Web 项目，抛开与本次主题无关的部分，具体影响单元测试方案选型和落地的几个因素，我把他归结成几类：

- 原本的前后端框架选型
- 在原本的前端代码中，是否具有可见的可测试的单元
- 在基础的前后端相关框架中，随着时间的变迁，是否有不合理的写法、运用导致在通往可被测试的过程中需要做较大量的代码改动
- 单元测试方案与流程，是否拥有持续集成的能力

### Existing Platform & Technical Selection

先裸列出项目中与前端相关的，和后端有分离不开的技术点，后面再来看如何一步一步处理这些问题。

那么在没有引入前端测试解决方案之前，项目中使用到的技术栈就是：

- Maven (Java 端构建相关，需要关注其构建过程是否用了影响前端的静态资源文件生成路径)
- JAWR(曾是 Java 官方社区维护的一个前端资源解决方案)
- SpringMVC (提供了相关的 DispatcherServlet，和一个 JAWR 的 i18n 方案)
- JSF(与前端资源在页面加载方案有关，因为 jawr 提供了一系列的 JSTL/facelets tags)

为此我根据项目中前后端在测试方面未能被解耦的情况，抽离出一个最小化能体现这几点技术的一个样例项目项目地址： [karma-jawr-sample](https://github.com/aquariuslt/karma-jawr-sample)

> 为了方便看到项目之前的样子，我给他还没引入单元测试的过程里面打了一个 tag:  
> [https://github.com/aquariuslt/karma-jawr-sample/releases/tag/no-frontend-unittest](https://github.com/aquariuslt/karma-jawr-sample/releases/tag/no-frontend-unittest)  
> 可以在这里看到当时的一个可运行的一个版本。

#### References:

- [jawr-main-repo](https://github.com/j-a-w-r/jawr-main-repo) 目前的 jawr 官方源代码 repo
- [jawr i18n message generator](https://j-a-w-r.github.io/docs/messages_gen.html) jawr 的前端国际化方案(带与 SpringMVC 集成文档)
- [jawr-quickstart](https://j-a-w-r.github.io/tutorials/quickstart.html) jawr 的官方文档首页

> TODO：添加一份相关的前端资源请求解析流程图，正在勾画 ing

### Existing Frontend Core Framework Test Support

在稍微了解了项目当前使用到的前端相关选型之后，就要开始思考几个问题：

1. 在当前项目中使用的框架 本身是具有可模块化，测试化的思想吗？
2. 在 1 确定的前提下，是否会出现，随着时间的发展，为项目贡献代码的过程中出现了错误的使用方法，导致越来越难以测试？
3. 如何可以将目前主流框架的单元测试框架和手段应用到项目中？还是要自己造个轮子？
4. 这个流程设计得具有通用性吗，对于其他使用类似技术栈的项目，是否可以快速应用上去？

#### ExtJS + JAWR Modularize + Component Based Development

历史的车轮滚滚前进，不同时代的项目技术选型也都都有当时的前瞻性。

幸运的是， 项目在这方面的技术选型的时候，当时的前辈应该是考虑到了几点

- **jawr** 为源代码模块化提供了基础，正因为源代码能够被模块化，测试的单元至少可以限定在一小部模块(取决于实际使用情况)
- **ExtJS** 无论是项目使用到的 3/4 本身已经是组件化开发思想的一个先祖了，在代码写的最乱的情况我们也能够将一个页面的整个 layout 当成是一个大组件，测试单元从真正的单一最小化组件变成一个少复杂的大组件而已。一旦可被测试，后面的测试思想便能够引导整个开发团队接纳运用这方面的思想。

结论： 我们就认为在最原始的项目结构里面，前端部分是可以被单元测试的。

#### Wrong Usage Since Long Long Ago

项目代码的发展啊，当然要框架本身思想牛逼，但是也要考虑到历史的行程，那就是会不会出现各种滥用的情况，导致代码结构絮乱，为了完成需求各种邪门歪道奇技淫巧，而不遵循正确的开发手段。

我稍微分析了下项目有哪些反模式的地方，加大了可被测试的难度(这部分后面会用一些过渡类型的手段来补救，但终究不属于合理 CRUD 的做法)

- 页面之间传值大量通过全局变量做引用(有隐式提升的全局变量，也有刻意为之的全局变量)
- 实际页面在加载的时候，会用到第三方的，页面运行时才加载的，的其他 JS 代码提供释放出的变量/方法(比如版本更新比较快的内部框架)

还有一些属于并非反模式，但是加大了前后端耦合度的：

- jawr i18n message generator 会在运行时提供释放一系列全局函数，执行之后才返回当前对应文本的对应语言版本。需要被测试的时候，我们必须有一个不依赖任何后端服务器的 能够根据配置国际化配置文件来模拟 java 版本实现，生成同样的全局函数的手段。

### Situations Blocking Writing UnitTest

Block 住单元测试执行的情况，大部分都是由于业务代码的问题，少部分是 ExtJS 操作 CSS 动画的问题。这部分在设计测试框架及其流程的时候没有先考虑到，需要根据实际情况做调整。

> TODO: 后面会持续举例子

### Is It Easy to Understand

假设我提出了一个单元测试的技术选型和对应的流程，那么编写测试代码的时候的开发体验如何，无疑会影响大家后面持续自发编写测试用例的激情。

为了提高整个单元测试框架和流程的说服力，我觉得符合以下特点越多 越能够被人接受：

- 单元测试技术选型必须有主流测试框架作为背书
- 单元测试框架组合程度相对较高
- 绝对不能依赖后台运行时服务，可以真正的单独运行
- 有可持续更新的文档来对应各种应用场景，防止为了测试写测试，或者其他反正确实践手段

下面 **Design & Benefits** 这一章，会描述选型背后的一些顾虑和我眼中的亮点。

## Design and Benefits

### Design Background

我对前端的单元测试的认识，大概是从 2016 年开始，一方面是当时的几大框架 比如`Angular 2`,`React`,`Vue` 有一些比较流行的手脚架，提供了基本的测试框架，和完善的最基础情况的单元测试 example，帮助我在确立目前项目的前端单元测试方案中提供了很多正确的思路)

(感谢后来的`angular-cli~@angular/cli`，`vue-cli`,`create-react-app`背后的相关的 template 项目，提供了多种测试方案的 example)

在对比了一些用过的前端单元测试的 Test-Runner 譬如[karma](https://karma-runner.github.io/)， [ava](https://github.com/avajs/ava)，[jest](https://facebook.github.io/jest/)，[jasmine](https://jasmine.github.io/) 之后

目前是选用了一套以`karma`为基础的测试方案。中间为了提升编写测试代码的体验，配合`webpack`和一个 karma 插件[karma-jawr](https://www.npmjs.com/package/karma-jawr)

下面这部分，会描述实际用到的测试相关的 lib 及其作用

### Test Framework Selection

可以先看看整个`package.json`里面单元测试相关的 lib [样例](https://github.com/aquariuslt/karma-jawr-sample/blob/master/package.json)

```json
{
  "name": "karma-jawr-sample",
  "version": "1.0.4",
  "description": "spring + jawr + extjs sample project with unittest using karma-jawr",
  "repository": "https://github.com/aquariuslt/spring-jawr-ext.git",
  "author": "Aquariuslt <superaquariuslt@gmail.com>",
  "license": "MIT",
  "keywords": ["extjs", "ext3", "spring", "jawr", "jsf", "karma", "mocha"],
  "scripts": {
    "test": "gulp test"
  },
  "devDependencies": {
    "@types/chai": "^4.1.2",
    "@types/extjs": "^4.2.32",
    "@types/lodash": "^4.14.104",
    "@types/mocha": "^2.2.48",
    "@types/sinon": "^4.3.0",
    "ajv": "^6.2.1",
    "chai": "^4.1.2",
    "coveralls": "^3.0.0",
    "css-loader": "^0.28.10",
    "file-loader": "^1.1.11",
    "gulp": "^3.9.1",
    "gulp-sequence": "^1.0.0",
    "istanbul": "^0.4.5",
    "istanbul-instrumenter-loader": "^3.0.0",
    "karma": "^2.0.0",
    "karma-chai": "^0.1.0",
    "karma-chrome-launcher": "^2.2.0",
    "karma-coverage": "^1.1.1",
    "karma-coverage-istanbul-reporter": "^1.4.1",
    "karma-firefox-launcher": "^1.1.0",
    "karma-iframes": "^1.1.1",
    "karma-jawr": "^0.1.12",
    "karma-junit-reporter": "^1.2.0",
    "karma-mocha": "^1.3.0",
    "karma-sinon": "^1.0.5",
    "karma-sourcemap-loader": "^0.3.7",
    "karma-spec-reporter": "^0.0.32",
    "karma-webpack": "^2.0.13",
    "lodash": "^4.17.5",
    "mocha": "^4.1.0",
    "mocha-lcov-reporter": "^1.3.0",
    "puppeteer": "^1.1.1",
    "sinon": "^4.4.2",
    "style-loader": "^0.19.0",
    "url-loader": "^0.6.2",
    "webpack": "^3.11.0"
  }
}
```

值得提到的相关 lib 是：

- karma: test-runner 本身
- karma-chai, karma-chrome-launcher, karma-coverage 等等等以 `karma-` 作为开头的 便是 karma 与其他框架集成的相关框架
- mocha
- chai 提供测试断言相关 API
- sinon 提供 mock 相关 API
- puppeteer 提供 headless Chrome 的 node.js API 可以在 CI 服务器上方面的提供浏览器环境
- webpack 及其相关 loader 通过 webpack + 各种 loader 可以方便的引用各种测试家具(fixture), 生成 sourcemap，和根据项目实际情况各种忽略规则。

每个 lib 单独使用起来都能够稍作文章，但是最终要的就是这些测试用到的相关 lib，都是可以自由组合的，这也是使用 karma 作为单元测试流程基础的一部分。

### Diagram

具体的测试执行流程 其实都可以通过项目里面的`karma.conf.js`来定义。

这里以样例项目代码的`tasks/config/karma.conf.js`来描述一下这个项目在启动测试步骤的时候，经过了些什么。

#### karma.conf.js

```javascript
var webpackTestConfig = require('./webpack.test.config');
var pathUtil = require('../utils/path.util');

var puppeteer = require('puppeteer');
process.env.CHROMIUM_BIN = puppeteer.executablePath();

module.exports = function(config) {
  config.set({
    logLevel: config.LOG_DEBUG,
    customLaunchers: {
      ChromiumHeadlessNoSandbox: {
        base: 'ChromiumHeadless',
        flags: ['--no-sandbox']
      }
    },
    browsers: ['ChromiumHeadlessNoSandbox'],
    plugins: [
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-spec-reporter',
      'karma-coverage',
      'karma-coverage-istanbul-reporter',
      'karma-sourcemap-loader',
      'karma-sinon',
      'karma-webpack',
      'karma-jawr'
    ],
    frameworks: ['jawr', 'mocha', 'sinon', 'chai'],
    files: [pathUtil.resolve('src/test/js/unit/specs') + '/**/*.spec.js'],
    reporters: ['spec', 'coverage-istanbul'],
    preprocessors: {
      '/**/*.spec.js': ['webpack', 'sourcemap']
    },
    jawr: {
      configLocation: pathUtil.resolve('src/main/resources/jawr/') + 'jawr.properties',
      webappLocation: pathUtil.resolve('src/main/webapp'),
      targetLocation: pathUtil.resolve('src/test/js/build'),
      localeConfigLocation: pathUtil.resolve('src/main/resources')
    },
    webpack: webpackTestConfig,
    webpackMiddleware: {
      stats: 'errors-only',
      noInfo: true
    },
    coverageIstanbulReporter: {
      dir: pathUtil.resolve('src/test/js/unit') + '/coverage',
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: true,
      thresholds: {
        emitWarning: false,
        global: {
          statements: 1,
          lines: 1,
          branches: 1,
          functions: 1
        }
      }
    }
  });
};
```

1. 在启动 karma 服务器的时候，读取这个`karma.conf.js`来加载配置。
2. 如果在 config 里面 没有`plugins` field，则会自动扫描并加载所有 packge.json 里面定义的，以`karma-`开头的，符合`karma-plugin` 依赖注入规则的插件。如果有，则之加载`plugins` field 里面定义的插件。
3. 接着我们定义一个`files`数组，里面数组的每一行都可以使用 [unix glob style path patterns](<https://en.wikipedia.org/wiki/Glob_(programming)>) 描述我们定义的所有的单元测试文件。

这里是`pathUtil.resolve('src/test/js/unit/specs') + '/**/*.spec.js'`，意为扫描的是在`src/teest/js/unit/spec`文件夹及其子文件夹下，所有以`.spec.js`为结尾的文件。

4.  接着我们定义一个`browsers` field，表示 karma 服务器启动之后，将会根据`browsers`中定义的浏览器名字，通过对应的`karma-${browsers-core}-launcher`提供 API 来唤起对应的浏览器，在运行时候把上面`files` field 定义的所有测试文件加载到所启动的浏览器的单一 tab 中。

5.  浏览器直接加载那些`**/*.spec`类型的单元测试代码就可以了吗?如果用到了一些 CommonJS 语法 来编写单元测试，或者你想方便的加载一些测试家具，比如离线加载一些原本在运行时才能被加载的第三方 css，或者为了 mockup 返回的使用 json/文本形式保存的模拟的业务数据返回值... 等操作

那么推荐的做法是在 `preprocessors`里面通过 karma 提供的 preprocessor API，结合第三方 processor 插件，来对单元测试的源代码做一个预处理的过程。

这里貌似有点拗口，我们通过加与不加`preprocessors`的时候的一个比较来说明两种情况的区别。

`base.spec.js`

```javascript
require('@/jsBundles/extJs.js');
require('@/jsBundles/home.js');

describe('ext', function() {
  before(function() {
    Ext.onReady(function() {
      Ext.QuickTips.init();
      new agile.example.app.Home({
        renderTo: Ext.getBody()
      });
    });
  });
  it('# check extjs is loaded', function() {
    var expectExtVersion = '3.3.1';
    expect(Ext.version).to.eq(expectExtVersion);
  });
});
```

在没有`preprocessors`的情况，浏览器直接把`base.spec.js` 加载到 karma server 启动的浏览器页面中。由于不能识别代码里面的 CommonJS 语法而抛出错误，同样第，因为没有加载到 ExtJS 的源代码文件，也会抛出错误。

添加了`preprocessors` 里面`karma-webpack`,`karma-sourcemap-loader`，和添加了相关这些预处理器的相关插件的时候，在 karma server 启动的浏览器页面中，由于加载过的是被`webpack`解析构建好之后的 bundle 文件，则能够正确的按需加载所有需要加载的 js 文件。

在这里`karma-webpack`所提供的配置选项是`webpack`和`webpackMiddleware`两个 option，告诉了使用对于单个单元测试文件，使用哪个 webpack 的配置文件来解析单元测试源代码。

有关 karma 相关插件的开发，和这次为了解耦开发的`karma-jawr`插件，将会在另外一篇文章里面详解。

6. 那么测试浏览器加载的所有单元测试文件，被当前用到的`mocha`框架解析并执行对应的测试代码，执行之后，我们想知道单元测试的完整覆盖率，那么我们要怎么做呢？

那就是`reporters`这一个 field。

在`reporters` 里面定义的相关的报告生成器，他们实际上是把对应的测试框架的报告功能统一管理了，执行基于什么类型的单元测试框架，这个单元测试框架如果要统计并展现覆盖率，应该提供哪些配置细节，都在`reporters`里面定义相关的`karma-reporter`插件，并根据该插件要求的配置，来生成对应的覆盖率报告文件。

这里选用的是`spec` + `coverage-istanbul`插件他们将会根据`webpack.test.config`里面配置的 post-loader `istanbul-instrumenter-loader`反向与源代码联系在一起，在执行单元测试的过程中，记录各种方法，变量的调用情况，最后根据`coverageIstanbulReporter`中定义的`reports`类型，生成 html 报告，通用的`lcov.info`覆盖率描述文件，和一个终端输出的报告。

7. 那么那个`karma-jawr`起到的是什么作用呢，这是一个为了根据前后端技术选型 解耦的 自己开发的一个 karma 插件，在下面这个 **Decoupled Solution** 一章会讲这里的设计

### Decoupled Solution

我们先来看看在本地开发环境下~~即根据环境分离的相关配置都设置成 env=development,debug=on 之类的参数)~~

假设在样例项目中，我们在浏览器里面访问某个 url `xxxx/home`，在经过 SpringMVC 的 viewResolver，mapping 到一个`home.xhtml` 。此时 xhtml 的内容里面，有一些 jawr 相关的 facelets tags，譬如

```htmlbars
<jawr:style src="/cssBundles/ext.css"/>
<jawr:script src="/jsBundles/extJs.js"/>
<jawr:script src="/jsBundles/home.js"/>
```

这表示他们会根据根据 jawr 的配置文件`jawr.properties`

```
jawr.js.bundle.names=i18n, extJs, home, login
jawr.css.bundle.names=extCss
# JAWR Bundle Definitions
jawr.js.bundle.extJs.id=/jsBundles/extJs.js
jawr.js.bundle.extJs.composite=true
jawr.js.bundle.extJs.child.names=\
  extDebug,\
  extProd
## ExtJS Debug Source
jawr.js.bundle.extDebug.debugonly=true
jawr.js.bundle.extDebug.mappings=/js/vendor/ext/ext-base-debug.js, /js/vendor/ext/ext-all-debug-w-comments.js
## ExtJS Prod Source
jawr.js.bundle.extProd.debugnever=true
jawr.js.bundle.extProd.mappings=/js/vendor/ext/ext-base.js, /js/vendor/ext/ext-all.js
## ExtJS CSS Source
jawr.css.bundle.extCss.id=/cssBundles/ext.css
jawr.css.bundle.extCss.mappings=/css/vendor/ext/ext-all.css
## Home Page Application JS Bundles
jawr.js.bundle.home.id=/jsBundles/home.js
jawr.js.bundle.home.composite=true
jawr.js.bundle.home.child.names=homeStore, homeUi, homeImpl
### Home Store
jawr.js.bundle.homeStore.mappings=/js/home/datastore/**
### Home Ui
jawr.js.bundle.homeUi.mappings=/js/home/ui/**
jawr.js.bundle.homeUi.dependencies=homeStore
### Home Impl
jawr.js.bundle.homeImpl.mappings=/js/home/impl/**
jawr.js.bundle.homeImpl.dependencies=homeUi

### Mappings include jawr bundle example
jawr.js.bundle.login.id=/jsBundles/login.js
jawr.js.bundle.login.mappings=homeUi
```

查找并释放转换为对应的 mapping 的若干个`<script src=${source-path} type=${source-type}/>`标签。

如果启用了 jawr 的 i18n message generator 功能，即添加了下面相关配置

```
# JAWR i18n Resolver with Spring MVC
jawr.locale.resolver=net.jawr.web.resource.bundle.locale.SpringLocaleResolver
jawr.js.bundle.i18n.id=/jsBundles/i18n.js
jawr.js.bundle.i18n.global=true
jawr.js.bundle.i18n.order=1
jawr.js.bundle.i18n.mappings=messages:i18n.i18n(locale)
```

那么还会多出系列 message generator 的全局函数。

实际渲染出的 html 页面为

```htmlbars
<script type="text/javascript">/* Finished adding global members. */</script>
<script type="text/javascript">/* Start adding members resolved by '/cssBundles/ext.css'. Bundle id is: '/cssBundles/ext.css' */</script>
<link rel="stylesheet" type="text/css" media="screen" href="/css/vendor/ext/ext-all.css?d=354974446" />
<script type="text/javascript">/* Finished adding members resolved by /cssBundles/ext.css */</script>
<script type="text/javascript">/* Start adding global members. */</script>
<script type="text/javascript" src="/jawr_generator.js?d=1002165950&generationConfigParam=messages%3Ai18n.i18n%28locale%29" ></script>
<script type="text/javascript">/* Finished adding global members. */</script>
<script type="text/javascript">/* Start adding members resolved by '/jsBundles/extJs.js'. Bundle id is: '/jsBundles/extJs.js' */</script>
<script type="text/javascript" src="/js/vendor/ext/ext-base-debug.js?d=905484299" ></script>
<script type="text/javascript" src="/js/vendor/ext/ext-all-debug-w-comments.js?d=1203100109" ></script>
<script type="text/javascript">/* Finished adding members resolved by /jsBundles/extJs.js */</script>
<script type="text/javascript">/* Start adding members resolved by '/jsBundles/home.js'. Bundle id is: '/jsBundles/home.js' */</script>
<script type="text/javascript" src="/js/home/datastore/home.base.datastore.js?d=394071763" ></script>
<script type="text/javascript" src="/js/home/ui/home.ui.js?d=1374816983" ></script>
<script type="text/javascript" src="/js/home/impl/home.impl.js?d=1755247404" ></script>
<script type="text/javascript">/* Finished adding members resolved by /jsBundles/home.js */</script>
```

大致的可以用一个流程来解释一下这里的情况，与后面解耦部分密切相关的几点：

- 我们需要知道一个页面所加载的前端资源，具体的模块配置入口是位于 jawr 配置文件的哪一个 bundle
- 这些页面加载的前端资源，在开发环境模式下，如何逐条转换成对应的 script，css 标签
- 如果开启了 jawr 对应的国际化功能，我们应该如何在测试中生成这些全局的国际化函数

为了解耦呢，这个`karma-jawr`的中间件提供了这样一个功能

根据`jawr.properties`的位置，参考 jawr Java 的路径解释部分实现，生成了一个中间文件夹 ![generated-indexes folder](https://img.aquariuslt.com/posts/2018/03/karma-jawr-generated-index.jpg) 配合 webpack 的`alias`功能，我们只要在单元测试代码里面使用类似这样的语法

```javascript
require('@/jsBundles/extJs.js');
```

便能够按需加载页面的资源文件执行，原本在 jsf facelet view 里面使用什么 tag 就知道在单元测试文件加载什么依赖。为了解决中间生成的国际化相关的全局函数，也是参考了 jawr Java 端读取 i18n 相关 properties 的实现，撸了一个输出结果一样的 i18n 的自动添加到每个 index.js 相关的文件列表的最前面，确保他们优先生效，不影响后面 webpack 的解析工作。

具体的实现思路，也可以单独作一篇文章，讲解 karma-framework 和 karma-preprocessor 等相关的机制和其作者的一些依赖注入在 node.js 方面的实现。

### Benefits

主要是从开发体验上面来讲，好处是如下

- 一旦了解 karma 的基本工作机制，便可以自由搭配各种可搭配的测试框架。(比如`mocha`换`jasmine`,`chai`换`expect.js`,`sinon`..额 sinon 目前还没见到可被替换的有效方案)
- 根据项目浏览器的兼容性，可以修改成各种浏览器及其相关启动 flag
- 基于 webpack 的各种 loader 特性，可以很方便的通过 require 语法引入各种测试家具: (json 格式不必额外的 loader, css 则是基于 style-loader，和 css-loader 的各种配合使用, 纯文本形式可以搭配 file-loader)。不必自己再写各种工具类轮子来实现持久化模拟数据读取的恶心轮子。

一些额外的提升开发体验的糖果

1. 首先如果大家的 IDE 支持 webpack 的 alias 快速跳转(比如 IDEAU 2017.2 之后的版本) 根据引用部分
2. 配合 IDEA 的 karma 插件，在编写单元测试的时候，可以动态给 karma.Server 注入不同的参数，配合本身`karma-webpack`内置的 webpack-dev-server 可以做到刷新立刻动态构建单元测试，提升单元测试开发效率。

## Example

### Example Usage

关于食用方法，可以参考上面提供的样例项目代码的地址。

大家可以直接根据[travivs-ci.org](https://travis-ci.org/aquariuslt/karma-jawr-sample/jobs/354402343)上的构建记录来看看实际跑的时候经过了什么步骤。

```
  ext
    ✓ # check extjs is loaded
    ✓ # expect home ui is rendered
  css
    ✓ # should load css from require syntax success
  home
    ✓ # test home resources load correctly
    ✓ # test home ui render correctly
    ✓ # test home ui render correctly 2
  i18n
    ✓ # check locale message is loaded normally
    ✓ # check locale message with arguments loaded normally
    special characters in locale message properties
      ✓ # check json array value in locale message properties
      ✓ # check if boolean value in locale message properties
      ✓ # check if string value contains escape characters
  ws
    ✓ # ext ajax simple mockup
HeadlessChrome 67.0.3372 (Linux 0.0.0): Executed 12 of 12 SUCCESS (0.109 secs / 0.056 secs)
TOTAL: 12 SUCCESS
16 03 2018 16:33:19.396:DEBUG [reporter.coverage-istanbul]: File [/home/travis/build/aquariuslt/karma-jawr-sample/src/main/webapp/js/home/datastore/home.base.datastore.js] ignored, nothing could be mapped
16 03 2018 16:33:19.397:DEBUG [reporter.coverage-istanbul]: Writing coverage reports: [ 'html', 'lcovonly', 'text-summary' ]
=============================== Coverage summary ===============================
Statements   : 100% ( 11/11 )
Branches     : 100% ( 0/0 )
Functions    : 100% ( 3/3 )
Lines        : 100% ( 11/11 )
================================================================================
16 03 2018 16:33:19.461:DEBUG [karma]: Run complete, exiting.
16 03 2018 16:33:19.462:DEBUG [launcher]: Disconnecting all browsers
16 03 2018 16:33:19.474:DEBUG [launcher]: Process ChromiumHeadless exited with code 0
16 03 2018 16:33:19.474:DEBUG [temp-dir]: Cleaning temp dir /tmp/karma-79051576
16 03 2018 16:33:19.482:DEBUG [launcher]: Finished all browsers
[16:33:19] Finished 'ext:unittest' after 12 s
[16:33:19] Finished 'test' after 12 s
```

## Result

基于这个方案落地并付诸实践整个测试流程之后，引导大家逐渐开始为该项目编写前端部分的单元测试，并且逐渐可以发展到其他使用到类似技术栈和遇到同样痛点的项目组。

目前项目前端业务源代码总量大概在 300K 行 经过三个月的单元测试编写，目前从覆盖率上讲，从 0 达到了 11%左右。

我们在为一些特别难以测试的案例里面，根据不同典型的错误场景，也做了不同的对应解决方案，有直接安全重构的，有扩展全局测试用例 timeout 时间的，有非安全重构的。都逐渐提醒整个开发团队在编写新代码或者为旧代码扩展的时候，对代码有着更多的精益思考。虽然前端代码的时间方面，并没有真正做到测试先行的最终目标，但是从不能被单元测试到可被单元测试，代码风格和代码质量都朝着正确的方向走去，少走了很多歪路。

## Summary

这次为项目设计的这个单元测试流程，考验了很多方面的开发与设计能力：

首先必须了解目前项目使用的后端技术栈，推导出当时选型时候的设计背景，再上熟练运用后端技术栈中的前端资源解决方案。在根据公司项目抽离出不相关的技术栈，搭建一个最小化能复现当时技术栈的相关代码结构，也考验分离项目结构的基本功。

其次必须对主流的前端单元测试方案有所了解，使用什么框架，结合什么插件，这些框架哪些部分在进行前后端结构解耦的时候需要考虑，如何快速测试方案是否具有可用性。

后面还得了解测试背后如何方便能够展现覆盖率，如何能够通过测试流程自动发现代码中存在的问题，还得有足够的持续集成相关经验。

串联起来比较考验综合能力，在落地宣讲的时候，为了寻求背书支撑也做了很多资料搜集的功夫。

综合起来就是 考验了小部分项目结构分析能力，前端框架和构建工具选型水平，持续集成选型，和在必要的时候造个中间件的轮子的能力。感觉当时要是哪个方面少了哪一点 可能最后都不能得出一个较为可行的方案。算是一个多面打杂之后的综合输出考验吧。
