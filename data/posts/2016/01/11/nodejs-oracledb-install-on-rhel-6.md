---
title: RHEL(CentOS)6环境下安装node-oracledb
created: 2016-01-11
updated: 2016-01-11
category: Debug
tags:
  - Node
  - Linux
cover: https://picsum.photos/id/306/800/300
---

# RHEL(CentOS)6 环境下安装 node-oracledb

## Background

最近准备升级一下 PROD 服务器上的`node-oracledb`版本. 但是遇到一个很奇怪的现象,就是我本地无法构建出服务器上可用的`oracledb`. (因为部署方式是打包部署而不是从`git`拉代码部署)

一开始以为是`C++运行库`的原因. 因为又仔细读了一遍`node-oracledb`的官方安装文档,发现`oracledb`在编译的时候,只支持支持`C++11`的编译器.

立马查看本地环境的`gcc`版本与运行库版本`glibc`

```
gcc -v
ldd --version
```

发现本地`CentOS 6.6`版本自带的`gcc`版本是 4.4,`glibc`版本是 2.12 但是支持编译和运行 C++11 新特性的`gcc`版本是 4.7+,`glibc`版本是 2.14+ 这.版本都不一样怎么玩.

## RootCause

马上比较了一下 本地构建`oracledb`与服务器的各种版本发现相关的版本信息如下:

> 服务器 OS:RedHat Enterprise Linux 6.6 gcc Version:4.4 (Red Hat) glibc Version:2.12 node Version:v0.10.38 npm Version:1.4.28(npm 版本应该不会影响构建,预防万一还是提及一下) node-gyp Version:不明.因为没权限调用该命令. oracle instantclient Version:11.2

> 本地环境 OS:CentOS 6.7 x64 gcc Version:4.4 (Red Hat) glibc Version:2.12 node Version:v4.2.4 npm Version:2.14.8 node-gyp Version:3.2.1 oracle instantclient Version:11.2

## Solution

思前想后,想想也不知道`node.js`本身版本到底会对`oracledb`的构建有什么影响. 毕竟`oracledb`官方对构建时的`C++11`编译支持的要求先入为主了

最后还是决定先切换一下`node.js`版本,结果问题顺利解决

```sh
$npm install n
$n v0.10.38
$npm install oracledb
```

构建成功.
