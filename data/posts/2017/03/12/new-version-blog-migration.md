---
title: Blog Structure Update
id: new-version-blog-migration
created: 2017-03-12
updated: 2017-03-12
category: Blog
tags:
  - Blog
  - Angular
cover: ./cover.jpg
---

# Blog Structure Update

## Background

最近正在接触学习`Angular2`+`RxJS`相关知识.当`Angular`发布了`@angular/cli`之后, 内置的 webpack 工作流程提供了一个官方推荐的比较完整的编译,打包,配置切换的工作流程, 使得其在工程化方面显得有板有眼,愈发被我所接受.

于是使用`Angular2`+完成度极低`@angular/material`重写之前的 Blog 框架.

## Features

基于`Angular2`所提供的解决方案,相对之前用`Angular1`版本,提供了如下新功能:(包括但不限于 Angular 本身)

1. 支持自己文章的一些新定义的 metadata. 比如有些文章属于特殊的 category,不会显示在首页上. 只有从 category 下面进去看到对应的文章.
2. 新的边框主题色,通过在 HTML header 里面声明`theme-color`来实现.
3. 支持渐进式网页应用 [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/). 通过现代的移动浏览器,已经可以添加一个离线的快捷方式查看.

通过 Chrome 浏览的时候提示可以添加到桌面

![通过Chrome浏览的时候提示可以添加到桌面](./add-shortcut.png)

桌面版本也可以可以添加快捷方式,像桌面版本的 Google Keep 一样

![桌面版本快捷方式](./desktop-version-shortcut.png)

添加成功后桌面会有一个快捷方式

![添加成功后桌面会有一个快捷方式](./shortcut.png)

打开快捷方式会有一个自定义的启动动画

![打开快捷方式会有一个默认的启动动画](./launching.png)

```
颜色,图表可通过PWA提供的manifest.webapp来配置
```

此外,还有如下变化:

1. 通过[CloudFlare](https://www.cloudflare.com/)提供的免费 SSL 证书 全站 https.
2. 修改了构建出来的文章形式,返回的文章信息以过滤后的 token 形式,数据文件大小更小了.

## TODO

1. 修改了解析后的文章段落的标题,添加一个 TOC 的实现
2. 添加代码块的语法高亮
3. 添加大量过场动画
4. 添加 GFM,FlowChart 的支持

## Finally

代码位于[https://github.com/Aquariuslt/Site](https://github.com/Aquariuslt/Site) 的新默认分支`NG2`下.

之前版本的文章与内容,还是保留在[https://aquariuslt.com](https://aquariuslt.com)中.

```
文章的源文件内容和Schema并没有大的改动,只是在源代码里面加多了一些metadata的解析工作.
正在准备逐步迁移过来,并且删除掉那些经过自我检讨之后没有什么卵用的垃圾文章.
```
