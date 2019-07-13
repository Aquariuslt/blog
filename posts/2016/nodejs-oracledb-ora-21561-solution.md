# Node.js oracledb "ORA-21561 - OID generation failed" 解决方案

```metadata
title: Node.js oracledb "ORA-21561 - OID generation failed" 解决方案
created: 2016-01-12
updated: 2016-01-12
category: Debug
tags:
- Node
- Linux
cover: https://picsum.photos/id/501/800/300
```

## Background

千辛万苦在虚拟机的`CentOS 6`下编译好`oracledb`,运行时报错 "ORA-21561 - OID generation failed"

## Solution

原因是虚拟机下的`CentOS`连接到 oracle 服务器的时候,本地没有有效的连接名称(机器名)

需要在`hosts`列表中添加本地的机器名. 假设我 local 机器名为`centos-vm`

```sh
sudo gedit /etc/hosts   (vi也行)
```

查找`127.0.0.1` 在对应的 hostname 后面添加`centos-vm`,即本机器名

![修改CentOS hosts文件](https://img.aquariuslt.com/posts/2016/01/update-centos-hosts.png)

重启即可.

[Origin Post](https://chaos667.tumblr.com/post/20006357466/ora-21561-and-oracle-instant-client-112)
