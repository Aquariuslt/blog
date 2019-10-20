---
title: 网站重构升级计划
id: site-upgrade-plan
created: 2015-12-27
updated: 2015-12-27
categories:
  - Blog
tags:
  - Site
  - Blog
  - VPS
  - Node
cover: ./cover.png
---

# 网站重构升级计划

## Background

大三的时候,终于接触了第一个能够证实上线的网站项目. 虽然那个项目最后的完成度不咋地,但是从头到尾从需求分析,代码编写, 最后部署到正式服务器上一条龙的经验还是被我全吃掉了.

有了掌控 Web 项目的部署运维的初级能力,所以我还是希望能够有一个自己的网站,自己亲手去维护. 由于自己设计 UI 又太 low,然后对 CMS 的能力还是掌控不够. 所以,在购买了自己的 VPS 和域名之后, 就一直使用`WordPress`作为博客应用.

作为兴趣使然的 Loser,收入不高.所以 VPS 一直都是购买的最低配. (单核,512M 内存,20GSSD)

本身这个配置去跑`WordPress`也是足够了.无奈将 WP 部署在阿里云的时候被攻击了好几次,导致经常瘫痪. 后来迁移到 DO 上情况还好,但是还是经常出现了 MySQL 进程死掉,守护进程也没用的情况. 一直觉得代码与资源都不在自己的掌握中比较苦难哦. 数据迁移与备份还需要导出 WP 的配置与 MySQL 的数据,操作起来比较繁琐.

> 更可能是因为我不懂高级的运维技巧)

后来,`Github Pages`静态博客的方式作为流行的一种打包型的博客托管方式进入我的视野, 也就是现在技术博客方面正在使用的方式.

毕业工作之后,开始接触到一些`MEAN`的技术栈,打算用这方面的知识,去构建新的主站方式.

## Plan

从目前的域名的管理情况来看,应该是打算 这样

> A 域名`aquariuslt.com`作为导航主站,纯手工 MEAN. CNAME`blog.aquariuslt.com`作为主要的博客站,放 Post CNAME`debug.aquariuslt.com`作为主要的跌坑笔记手册 -- CNAME`game.aquariuslt.com`作为我的(粗口)游戏哲学理论 --

[主站](https://aquariuslt.com)正在重建 ing,已经可以访问目前使用的是`iptables`命令进行端口转发当然日后也可能考虑`httpd`转发 or`nginx`.

## Source

所有代码都放在 Github 上.

Home:[https://github.com/Aquariuslt/Site-SourceCode](https://github.com/Aquariuslt/Site-SourceCode) Blog[https://github.com/Aquariuslt/Blog-SourceCode/](https://github.com/Aquariuslt/Blog-SourceCode/) Debug[https://github.com/Aquariuslt/Debug-SourceCode](https://github.com/Aquariuslt/Debug-SourceCode)
