---
title: 'A Karma Plugin: Karma-JAWR Development Note'
id: karma-jawr-development-note
created: 2018-04-01
updated: 2018-04-01
categories:
  - Blog
tags:
  - Karma
  - Node
  - AngularJS
  - JavaScript
  - JAWR
cover: ./cover.png
---

# 基于 Karma 的非分离式前端单元测试基础方案

## Background

### Why

上一篇文章**基于 Karma 的非分离式前端单元测试基础方案**描述了在拆分基于 JAWR 的，前后端的方案的时候，无可避免的为中间编写一个插件的背景故事。

## Knowledge Base

在总结开发这个 karma 插件的笔记的时候，最终目的并不是希望读这篇文章的童鞋了解`jawr`这个插件所解决的核心问题，更多的是介绍 karma 和 karma 插件的设计理念，稍微对 karma 这个 test-runner 有一个更好的印象；亦或是在前端单元测试框架选型/亦或是根据实际项目需要，为了使得项目可被测试，无可避免的做出比较多的修改的时候，能够遵循这种插件开发的约定，使得项目测试方面更好的走向工程化。

### History: node-di, angular.js and karma

在介绍整个问题之前，无可避免的先介绍一下**karma**的一些背景。

如果曾经接触过 angular.js 相关项目的开发，那就一定需要了解一下 angular.js 的依赖注入机制相关知识。

angular.js v1 的依赖注入机制及其实现呢，其实就是来自于`node-di`的实现(后来 DEPRECATED 并迁移到`angular/di.js`，虽然后面 angular v2+也并没有使用这个实现)。而`node-di`，`angular.js v1`，和`karma`中的依赖注入实现的主要作者都是同一位大神: [vojtajina](https://github.com/vojtajina)

所以我们可以看到在根据获取依赖的时候的一些类似的语法，诸如`$inject`等。

所以一旦你看过一些其他的 karma 相关的 framework 的源代码，大概就知道要如何起手了去看了，起码你能够从一些基本的 ioc 设计原则上知道 karma 如何加载相关插件，等等。

### Karma Plugin Types

在 karma 的官方文档的[plugins 页面](https://karma-runner.github.io/2.0/dev/plugins.html)，提供了 karma 不同类型的插件及其常见列表。(其中很大部分是 karma 团队自己维护的，有一个官方的参考对象)。

这里转贴一部分常见的不同几个类型。

#### Frameworks

- karma-jasmine
- karma-mocha
- karma-requirejs

> karma frameworks 类型比较杂，功能可能是覆盖所有下面多种情况的一种或者多种

#### Reporters

- karma-junit-reporter
- karma-coverage-istanbul-reporter

> karma reporters 常见的功能是在 karma 运行完测试流程之后，根据测试过程记录下的各种记录文件，生成覆盖率，测试用例列表等报告的功能。

#### Launchers

- karma-chrome-launcher
- karma-firefox-launcher

> karma launcher 的功能就是提供给你启动所有位于系统中的浏览器的链接功能。比如出场率相当高的 karma-chrome-launcher 就实现了各个系统的 **Chrome**，**Chromium**，**Chrome Dev**，**Headless Chrome(puppeteer)** 的链接启动功能，通过默认的参数/或者自己穿进去的环境变量 等形式 可以唤起对应版本的浏览器实例来运行脚本。

#### Preprocessors

- karma-webpack
- karma-babel-preprocessor

> Preprocessors 顾名思义就是预处理器。很有可能你的单元测试代码是使用 ES6+的语法进行编写的，可能需要通过 babel 进行转译，或者根据 webpack 的配置 + 不同的 loader 进行转译，才能在运行中的浏览器示例上正常被解析执行。所以在一些 karma config options 里面能够看到类似下面的预处理流程：
>
> ```
> preprocessors: {
>      '/**/*.spec.js': ['webpack', 'sourcemap']
> },
> ```

## Development Note

### Concert & Situations

在编写`karma-jawr`插件之前，我的设想需求，从编写单元测试代码的角度反向推导开之后，是这样一个流程：

**jawr.properties**(片段)

```
# JAWR Bundle Definitions
jawr.js.bundle.extJs.id=/jsBundles/extJs.js
jawr.js.bundle.extJs.composite=true
jawr.js.bundle.extJs.child.names=\
  extDebug,\
  extProd
## ExtJS Debug Source
jawr.js.bundle.extDebug.debugonly=true
jawr.js.bundle.extDebug.mappings=/js/vendor/ext/ext-base-debug.js, /js/vendor/ext/ext-all-debug-w-comments.js
## Home Page Application JS Bundles
jawr.js.bundle.home.id=/jsBundles/home.js
jawr.js.bundle.home.composite=true
jawr.js.bundle.home.child.names=homeStore, homeUi, homeImpl
```

**xxx.xhtml**

```htmlbars
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns:jawr="https://jawr.java.net/jsf/facelets">
<head>
  <title>Karma Jawr Sample Page</title>
  <link rel="shortcut icon" href="${pageContext.request.contextPath}/images/icons/favicon.png" type="image/x-icon"/>
  <jawr:style src="/cssBundles/ext.css"/>
  <jawr:script src="/jsBundles/extJs.js"/>
  <jawr:script src="/jsBundles/home.js"/>
</head>

<body>

<script type="text/javascript">
  Ext.onReady(function() {
    Ext.QuickTips.init();
    new karma.jawr.sample.app.Home({
      renderTo: Ext.getBody()
    });
  });
</script>
</body>
</html>

```

**xxx.spec.js**(片段)

```
require('@/jsBundles/extJs.js');
require('@/jsBundles/home.js');

describe('ext', function() {
  it('# check extjs is loaded', function() {
    var expectExtVersion = '3.3.1';
    expect(Ext.version).to.eq(expectExtVersion);
  });

  it('# expect home ui is rendered', function() {
    expect(Ext.getCmp('app.home')).not.to.eq(undefined);
  });
});

```

在进行测试的流程里面

首先单元测试文件经过 preprocessor 的处理，能够把`require('@/jsBundles/extJs.js')` 正确根据`jawr.properties`的配置内容加载 extjs ~~这里且不说 extjs 本身的代码是否支持 umd 形式的 export~~ 接着在浏览器执行的时候的 html 引入的时候，已经是能够被浏览器正确识别的，转译后的代码。

所以从流程上，结合已有的插件，列出了从后到前的顺序点：

- 编写 BDD 形式的单元测试文件，通过 require/import + jawr bundle id 导入对应的业务代码依赖
- 经过 webpack 转译成可被浏览器识别的代码
- 在 karma 启动时的 client html 中通过 mocha 执行所有测试用例

### Design

那么主要的问题就在于，如何使得测试文件中的 `require('@/jsBundles/home.js');` 能够正确根据 jawr 的配置 反向引导对应的源代码呢？

除此之外，还有一些 jawr+spring 国际化本身的一些实现，如何根据对应的国际化文件，生成那些全局，执行后返回对应语言版本国际化变量呢?

对于第一步，目前设计的解决方案是如下：

**第一步:** 给`karma.conf.js` 提供一个额外的 options field: jawr 主要是提供一些 jawr 相关配置文件的绝对路径

目前我给他设置了一个 type-definition

```typescript
declare interface JawrOptions {
  configLocation: string;
  webappLocation: string;
  targetLocation: string;

  // optional locale config location for jawr i18n generator
  localeConfigLocation?: string;
}
```

实际上的使用大概是这样: karma.confg.js

```
module.exports = function(config){
	config.set({
		/*....*/
		jawr: {
	      configLocation: pathUtil.resolve('src/main/resources/jawr/') + 'jawr.properties',
	      webappLocation: pathUtil.resolve('src/main/webapp'),
	      targetLocation: pathUtil.resolve('src/test/js/build'),
	      localeConfigLocation: pathUtil.resolve('src/main/resources')
	    },
	})
}
```

里面需要知道的是:

- jawr.properties 的路径
- webapp 文件夹的路径(目的是为了定位 js,css 业务源代码的路径)
- 生成的中间临时文件夹的路径: 根据 jawr 配置文件生成的实际路径的处于`*.spec.js`和源代码中间的临时 link 文件夹
- 如果启用了可选的国际化模块，则需要填写国际化源代码文件的路径

**第二步** 根据 jawr 的 Java 源代码，使用 js 实现以下功能

- 解析 jawr 配置文件，根据每个 bundle id 来查找到对应的源代码文件
- 解析 i18n 配置文件，生成对应的全局变量行数

**第三步** 通过 karma 结合 webpack 做预处理器，结合`mocha`，`chai`，`sinon` 做基本的测试。

### Development Roadmap

#### Local Testing

如果没有了解 npm 加载模块机制和 karma 所使用的 di 约定的时候，可能本地测试必须依赖已经发布的 npm package.

正确的做法应该是:

在**karma.conf.js** 的 plugins 显式声明一个本地的引用该引用等同`package.json`里面`main`的指向

```
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
      localJawrFramework //  ==> var localJawrFramework = require('../../lib');
    ],
```

**package.json**

```json
{
  "name": "karma-jawr",
  "main": "lib/index.js"
}
```

**lib/index.js**

```javascript
var frameworkLogger = require('./logger');

var jawrHandler = require('./jawr.handler');

/**
 * @param {Array} files: file pattern
 * @param {JawrOptions} jawrOptions: jawrOptions
 * @param {Object} logger: karma logger
 * */
var framework = function(files, jawrOptions, logger) {
  frameworkLogger.initLogger(logger);
  jawrHandler.handle(jawrOptions);
};

framework.$inject = ['config.files', 'config.jawr', 'logger'];
module.exports = { 'framework:jawr': ['factory', framework] };
```

#### Integrate with CI

目前只有测试部分与`travis-ci`和`circleci`集成了。

[circleci](https://circleci.com/gh/aquariuslt/karma-jawr) [travis-ci](https://travis-ci.org/aquariuslt/karma-jawr)

#### Pre-Release and Testing

为了解决其他在实际应用中遇到的问题，包括但不限于各种

- jawr 配置的胡乱使用
- node.js 的 properties 解释实现并没有覆盖 properties 事实标准的所有情况

等...我是自己维护了 issue 列表并且把每次修改的测试用例都加到本身的单元测试流程中

目前详见[issues](https://github.com/aquariuslt/karma-jawr/issues)

~~有一个目前因为技术原因暂时被我 标记了 wont fix~~

## References

[项目源代码 Repo](https://github.com/aquariuslt/karma-jawr)

[Karma 作者的设计论文](https://github.com/karma-runner/karma/raw/master/thesis.pdf)

[Karma 测试框架的前世今生 - 淘宝 TED | Karma 作者论文译文](http://taobaofed.org/blog/2016/01/08/karma-origin/)
