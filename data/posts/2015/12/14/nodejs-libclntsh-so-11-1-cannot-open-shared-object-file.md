---
title: Linux "libclntsh.so.11.1 cannot open shared object file no such file or directory"解决方案
created: 2015-12-14
updated: 2015-12-14
category: Debug
tags:
  - Ubuntu
  - Linux
  - Oracle
  - Node
cover: https://picsum.photos/id/76/800/300
---

# Linux "libclntsh.so.11.1 cannot open shared object file no such file or directory"解决方案

## Description

`Ubuntu 14.04` `node v4.2.3` `oracledb v1.4.0` 在正常安装好`Node.js`和`oracledb`,之后,用到 oracledb 的那一步就开始提示这个错误; 重新跑`npm install`不能解决问题

## RootCause

`LD_LIBRARY_PATH`没有设置好. 我将 OracleInstantClient 的安装目录的路径,释放在当前用户的环境变量中. 即将`export LD_LIBRARY_PATH=XXXX`写在当前 user 的`.bashrc`中导致 terminal 中启动的时候,读不到 LB_LIBRARY_PATH 变量. 如果运行如下命令,没有设置环境变量的话,可以通过该解决方案解决.

```
locate libclntsh.so.11.1
```

## Solutions

将环境变量设置在`/etc/profile`中,问题解决.
