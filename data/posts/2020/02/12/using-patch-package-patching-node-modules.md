---
title: '使用 Patch Package 魔改第三方NPM包'
id: using-patch-package-patching-node-modules
created: 2020-02-12
updated: 2020-02-12
categories:
  - Blog
tags:
  - Node
  - CI
cover: ./cover.png
---

# 使用 Patch Package 魔改第三方 NPM 包

> 开源社区一直有一个做法(说法): 一言不合就 Fork。

自古以来文人相轻，这些一言不合就 fork 的做法挺能体现这些现象的。

目前看来，对于一个开源项目，我遇到的所谓的一言不合就 fork ，但不是以 fork 作为正常的工作流(也就是说后续不会往 origin repository 提交 Pull Request)，大致来自于以下几种原因：

- 需要魔改类库，改个名字包装下重出江湖
- 作为一个类库，项目本身没有暴露出某些公共的 API，难以修改其内部逻辑(或许设计如此)
- 社区内部发生了分歧，准备分家

对于情况二我还是挺能理解的，当研究一个开源类库项目，通常关心是否能直接调用公有的 API 即可符合需求需要。

然而，此时发现这个项目源代码的这个功能非常不符合设计模式中的开闭原则，也就是说，难以在不修改内部源码的情况按照需求进行扩展。

同一时间，你发现你的这个需求比较崎岖，并没有一个很好的借口给作者团队提出 issue。

这时候除了要怎么办呢?

对于 Node 项目，有一个目前极其合理的做法：使用 `patch-package` 魔改 node_modules 下的第三方模块源代码。

## What is patch/diff file

参见维基百科 Patch [https://zh.wikipedia.org/zh-hk/Patch](https://zh.wikipedia.org/zh-hk/Patch)

Patch 文件通常有 diff 所产生，用以描述两个不同的文件(集)，或者同一个文件(集)的两个不同的版本(reversion)

通过版本控制工具 Git 产生 diff 大概是什么样?

大概如下:

```diff
diff --git a/node_modules/lighthouse/lighthouse-core/lib/emulation.js b/node_modules/lighthouse/lighthouse-core/lib/emulation.js
index 7869b7f..87b6725 100644
--- a/node_modules/lighthouse/lighthouse-core/lib/emulation.js
+++ b/node_modules/lighthouse/lighthouse-core/lib/emulation.js
@@ -90,6 +90,18 @@ async function enableDesktop(driver) {
   ]);
 }

+/**
+ * @param {Driver} driver
+ * @param {String} userAgent
+ * @return {Promise<void>}
+ */
+async function enableCustomUserAgent(driver, userAgent) {
+  await Promise.all([
+    driver.sendCommand('Network.setUserAgentOverride', {userAgent: userAgent}),
+  ]);
+}
+
+
```

## How did patch-package work

从流程上讲，`patch-package` 的使用主要分成三部分

- Update node_modules source code(先魔改 node_modules 目录下，你想修改的类库源码)
- Making patches (执行命令 `patch-package ${package-name}` 生成一份 patch 文件)
- Applying patches (执行命令 `patch-package` 自动查找 patch 文件，并执行 patch 脚本)
- Integration with NPM Scripts (通过在 patch-package 中的 script 下，为不同的生命周期如 `postinstall` 后自动执行 Update patches)

## 实际应用场景

到底在什么场景下，才应该搬出这个 `patch-package` 呢?

这里分享下我个人的一个使用场景：给 lighthouse 打 patch 以获取调用其诊断网页时，自定义 `UserAgent` 的功能。

### 挑战: Lighthouse x UserAgent

当希望程序化调用 `lighthouse` 的时候，默认执行 lighthouse 诊断所使用的设备 user agent，要么就是 默认的 `Nexus 5` (在 lighthouse v5.7.0+ 版本应该默认换成了 Moto G4) ，要么就是默认的 `DESKTOP_USERAGENT`。

lighthouse 的 configuration 中，并没有包含 user agent 相关配置，也没有暴露出一个 public 的 API 去让开发者覆盖此属性。

> 为什么一直没有暴露出这个 API 呢，我没有在相关 issue 中找到答案。我猜应该是设计如此，故意屏蔽了这部分内容。

### 初期解决方案

一开始我是怎么做的?

1. 先是定位出关键需要魔改的、配置 UserAgent 的关键模块在源代码中的位置
2. fork 一份源码，作为个人仓库，修改关键源码
3. 从调用 lighthouse 的项目中，移除 npm 官方版本 lighthouse
4. 利用 git submodule + yarn workspace 安装魔改后的 lighthouse

一共要 4 步，其 3，4 步看起来还是挺崎岖的。

他先是需要新建另外新建一个 git 仓库，还要用隐晦的 yarn workspace 将其安装到 node_modules 下。根据以往的工程经验，除了操作、理解概念麻烦，还有很多后续扩展时存在的缺点

- 使用 git submodule 的形式关联其他项目，实际上做 CI CD 集成要关联很多权限，相对繁琐
- 对于 monorepo + lerna 的形式， yarn workspace 无法很好的与 monorepo 共存
- fork 出来的项目源码，在需要对齐 origin repo 的更新时，魔改源码的 commit 会与官方源码的 commit 混搭在一起，代码更变追踪不方便

### patch-package 上场

有了 patch-package 后，需要怎么做?

1. 先是定位出关键需要魔改的、配置 UserAgent 的关键模块在源代码中的位置
2. 修改项目 node_modules/lighthouse 下对应的关键代码位置
3. 使用 patch-package 生成 patch 文件，将 patch 文件加入到 git 中
4. 修改项目 post-install script，集成 patch-package 调用，以确保项目安装好 npm 依赖后，能够自动给 node_modules 下的源代码打 patch

## 小结

首先，对需要魔改的项目源码要有必要程序的了解，这是通用、必须的步骤。

在此基础上，使用 `patch-package` 才能够有效的帮助我们解决魔改 node 类型项目代码时遇到的一些工程化问题。使得魔改代码的更变可追踪、更新 patch 的流程可持续集成。

## References

- patch-package github: [https://github.com/ds300/patch-package](https://github.com/ds300/patch-package)
- 涉及魔改的 lighthouse user-agent 代码位置: [https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/lib/emulation.js](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/lib/emulation.js)
