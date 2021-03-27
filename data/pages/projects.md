---
title: 'Projects'
id: projects
created: 2019-02-14
updated: 2020-02-14
categories:
  - Blog
tags:
  - Link
cover: ./projects.png
---

# Projects

> 介绍下我放在 [Github](https://github.com/aquariuslt?tab=repositories) 上的项目。

## blog

个人博客及其框架。

[项目地址](https://github.com/aquariuslt/blog)

## nestx-amqp

一个 NestJS x [amqp-connection-manager](https://www.npmjs.com/package/amqp-connection-manager) 的模块。提供了一个 Symbol 为 `AMQP_CONNECTION` 的单例 AMQP Connection.

[NPM 地址](https://www.npmjs.com/package/nestx-amqp)

[项目地址](https://github.com/aquariuslt/nestx-amqp)

## properties-json-loader

一个 Webpack Loader 插件，基于 [properties](https://www.npmjs.com/package/properties) 针对 `*.properties` 格式文件做解析。使其可以通过 `require` 或者 `import` 合法的 `properties` 文件，并转化为 JSON 值对象。

初衷是为了以 `properties` 文件作为纯前端的 i18n 相关映射值时，能够提供一个比 `json` 描述更好的体验。也更好的可以从 Java 系主流的国际化方案配置文件方便地迁移过来。

[NPM 地址](https://www.npmjs.com/package/properties-json-loader)

[项目地址](https://github.com/aquariuslt/properties-json-loader)

## jest-properties-loader

一个 Jest Transformer 插件，同样也是基于 [properties](https://www.npmjs.com/package/properties) 提供的能力。在执行 Jest 单元测试时使用，以供得到与 Webpack Loader 一致的体验。

[NPM 地址](https://www.npmjs.com/package/jest-properties-loader)

[项目地址](https://github.com/aquariuslt/jest-properties-loader)

## react-disqus-components

由于官方的 [disqus-react](https://github.com/disqus/disqus-react) 使用了很多 react 标记为 deprecated 的生命周期，所以使用 FunctionalComponent + hooks 的形式造了个同等通能的轮子。(仅适用于 React 16.8 +)

[NPM 地址](https://www.npmjs.com/package/react-disqus-components)

[项目地址](https://github.com/aquariuslt/react-disqus-components)

## nest-rabbitmq-appender

一个 [NestJS](https://nestjs.com) 的 LoggerAppender Module，以 NPM Package 的形式发布。

主要目的是提供一个异步的远程日志输出方式，协助将应用内部打印的日志发送到 RabbitMQ 中。(方便后续 RabbitMQ 消费者，如 LogStash -> ES 后续的日志聚合功能)

[NPM 地址](https://www.npmjs.com/package/nest-rabbitmq-appender)

[项目地址](https://github.com/aquariuslt/nest-rabbitmq-appender)
