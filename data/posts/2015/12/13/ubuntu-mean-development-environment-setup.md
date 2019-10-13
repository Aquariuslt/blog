---
title: Linux Mean 开发环境搭建
id: ubuntu-mean-development-environment-setup
created: 2015-12-13
updated: 2015-12-13
categories:
  - Blog
tags:
  - Ubuntu
  - Linux
  - IntelliJ IDEA
cover: ./cover.png
---

# Linux Mean 开发环境搭建

## Background

最近一个项目中需要用到`Redis`和 Node.js 操作 OracleDB,而 Windows 下开发就是屁事多. 恰好用到的这两个东西,都写明了官方不支持 Windows,`Redis`在 Widnows 下的版本是由微软的工程师们在维护. 在 Windows 下搭建好了环境之后,发现`Redis`在 Windows 下会有一些常见的崩溃情况,上网搜了下估计是 Windows 才会有的情况. 本篇主要介绍在 Linux(Ubuntu)下搭建 MEAN Stack 的相关内容,包括:

- Linux 下`Redis`的安装与配置
- Ubuntu 下`Node.js`与`MongoDB`安装与配置
- Linux 下`oracledb`的安装与配置
- Ubuntu 下`IntelliJ IDEA`的配置

> 可能看起来有点奇怪,为什么我会`Linux`,`Ubuntu`这样穿插这顺序反过来写这是因为由于`Ubuntu`安装`Node.js`这方面我使用的是 `apt-get`来管理安装包而`oracledb`又是`Node.js`的一个类库

## Linux 下 Redis 的安装与配置

### 下载

从官方地址 [https://github.com/antirez/redis/archive/2.8.23.tar.gz](https://github.com/antirez/redis/archive/2.8.23.tar.gz) 下载. 由于项目用到的 Redis 版本是 2.8,所以下的是 2.8 版本.

### 安装

将 redis2.8.23.tar.gz 解压到任意文件夹.

> 目前按照个人习惯还是放在 home 下面一个叫 server 的目录但是 unix 系统的路径与程序摆放位置应该是大有讲究的,近期将会加强研究之后更新结论先凑合着放

此时文件列表应该如下:

```
Macbook:redis-2.8.23 Aquariuslt$ tree -L 1
.
├── 00-RELEASENOTES
├── BUGS
├── CONTRIBUTING
├── COPYING
├── INSTALL
├── MANIFESTO
├── Makefile
├── README
├── deps
├── redis.conf
├── runtest
├── runtest-sentinel
├── sentinel.conf
├── src
├── tests
└── utils

4 directories, 12 files

```

看到有`makefile`就知道需要自己编译一边,其实这里按照官网的 Installation 就可以. 直接输入`make`编译

```
$ wget https://download.redis.io/releases/redis-3.0.5.tar.gz
$ tar xzf redis-3.0.5.tar.gz
$ cd redis-3.0.5
$ make
```

### 以服务运行

在`Redis`安装目录下有一些脚本,执行之后,帮助以 Service 运行

```

In order to install Redis binaries into /usr/local/bin just use:

    % make install

You can use "make PREFIX=/some/other/directory install" if you wish to use a
different destination.

Make install will just install binaries in your system, but will not configure
init scripts and configuration files in the appropriate place. This is not
needed if you want just to play a bit with Redis, but if you are installing
it the proper way for a production system, we have a script doing this
for Ubuntu and Debian systems:

    % cd utils
    % ./install_server.sh

The script will ask you a few questions and will setup everything you need
to run Redis properly as a background daemon that will start again on
system reboots.

You'll be able to stop and start Redis using the script named
/etc/init.d/redis_<portnumber>, for instance /etc/init.d/redis_6379.
```

如果执行`make install`命令,则自动 ln 到`/usr/local/bin` 如果执行`utils`路径下的`install_server.sh`则会添加启动项,开机自动运行.

## Ubuntu 下 Node.js 与 MongoDB 的安装与配置

> 在 Linux 下`Node.js`的安装并不像`Windows`,`OS X`有.msi,.pkg 安装包走 UI 安装. 但是在各个发行版的 Linux 下都有自己对应的包管理器. `Ubuntu`就有自己的包管理器`apt-get`(但是会有坑)

Ubuntu 安装`Node.js`可以分成如下步骤

1. 更新包管理器的版本,使之能够获取最新版本的应用程序包
2. 通过包管理器,安装`Node.js`
3. 通过`npm`再更新一次`Node.js`

### 更新 Ubuntu 的包管理器

```
$apt-get update
```

### 通过包管理器安装 Node.js

```
$apt-get install nodejs-legacy
```

通过此命令安装的是一个比较老版本的 Node.js 输入查看版本命令大概是 node v0.10 和 npm v1.14

> 我也不知道为什么 Ubuntu 的 package list 更新了之后 Node.js 包版本还是那么低.. 下面更新的 Node.js 版本以 2015-12-13 官网的稳定版本为准

```
node -v && npm -v
```

这时候,首先先升级 `npm` 到 `npm3`

```
$npm install -g npm
```

> 此时 npm 的版本应该更新到 v3.5.1+

然后通过`npm`安装一个用`node`去切换`node`版本的库,叫做`n`

```
$npm install -g n
```

接着用`n`去安装所需版本的`node.js`

```
$n v4.2.3
```

重启电脑之后在查看`node`和`npm`版本,应该如下图 ![更新Node.js](./update-nodejs.png)

## Linux 下 Node-OracleDB 的配置

Linux 下搭建好 node-oracledb 也是相当操蛋. 大概需要做下面几个工作:

- 下载 version >= 11.2 的 OracleInstantClient(basic&sdk)
- 设置环境变量,供构建 npm install oracledb 构建使用

### 下载 OracleInstantClient for Linux

官网还要登陆下载,太过傻逼.所以放出了个某度的链接 [https://pan.baidu.com/s/1boxV2iV](https://pan.baidu.com/s/1boxV2iV)

### 设置环境变量

先将下载的两个 zip 包解压到`/opt/oracle/instantclient`下.

> 官方推荐,可自行替换路径

然后修改全局的环境变量.

> **注意** 这里说的是 **全局变量**,这里曾经被坑过一次. 通过命令行的 `export PATH=XXX:PATH`之类的命令.只能作为临时变量,重启之后就会失效而 Linux 的环境变量,跟 Windows 类似,也分成全局的环境变量和当前用户的环境变量. 在系统启动之后,先读取全局变量,用户登陆之后,再继承全局环境变量的前提下,读取当前用户的环境变量

```
$sudo gedit /etc/profile
```

在底部添加如下内容

```
# Export Oracle Client Varirable
export OCI_LIB_DIR=/opt/oracle/instantclient
export OCI_INC_DIR=/OPT/oracle/instantclient
export ORACLE_HOME=$OCI_LIB_DIR
export LD_LIBRARY_PATH=/opt/oracle/instantclient:$LD_LIBRARY_PATH
```

![添加Oracle Client 相关全局环境变量](./add-oracle-cli-global-env-var.png)

此时执行命令安装 `oracledb` 大概应该不会出问题了

> 其实还有个小问题,`oracledb`得必须是 1.3.0 以上的版本..不然爆的错我也无法入手解决

```
$npm install oracledb
```

## Ubuntu 下 IntelliJ IDEA 的配置

终于到重头戏了.其实我就是想说这个在 GNOME 下安装 Idea 遵循下面几步

1. 安装 JDK,设置 JDK 相关环境变量
2. 配置 Idea 在 Ubuntu 的启动图标
3. 一些关于 Idea 在 Linux 下与 Widnows/Mac 不同的特殊配置

### 安装 JDK

从 Oracle 官网下载 Linux 版本 jdk,解压到`/usr/lib/jvm/jdk8`下.

> 该路径也是个人喜好,官网推荐这么做就照做了因为 Idea 启动的时候需要检查 Java 的安装.且是按照`IDEA_JDK`, `JDK_HOME`,`JAVA_HOME`的顺序来进行查找,只要其中之一存在且对应了 JDK 的路径即可

所以,在系统中添加全局环境变量如下图

```
$sudo gedit /etc/profile
```

在底部添加

```
# Set JAVA_HOME fOR Maven/Idea Settings
export JAVA_HOME=/usr/lib/jvm/jdk8
export JDK_HOME=$JAVA_HOME
export IDEA_JDK=$JAVA_HOME
export PATH=$PATH:$JAVA_HOME/bin
```

保存后,查看 java 版本

```
$java -version
```

![配置JDK路径](./config-jdk-path.png)

### 配置 Idea 在 Ubuntu 中的启动图标

默认情况下,通过 Idea 目录下的`/bin/idea.sh`即可启动 IdeaUI 但是为了能够显示 Ubuntu 的 docker 里面(左边那条任务栏,不知道叫什么东西,叫 docker 吧)

需要在`/usr/share/applications`下新建一个`intellij-idea.desktop` 加个配置文件

> 我本地的 Idea 解压后的目录在`/home/dev/Applications/IntellijIdea15`

```
[Desktop Entry]
Type=Application
Name=IntelliJ IDEA
Comment=The best Java and MEAN IDE
Icon=/home/dev/Applications/IntellijIdea15/bin/idea.png
Exec=/home/dev/Applications/IntellijIdea15/bin/idea.sh
Terminal=false
Categories=Development;IDE;Java;
```

![添加Ubuntu Applications启动图标](./add-app-launch-icon.png)

### Idea 在 Ubuntu 下一些特殊的配置

> 虽然都是类 Unix 系统,Idea 跟 Mac 在一些读取环境变量时候的做法不大一样. 本质上其实还是我对他认识不够深,还找不到原因..以后找到会更新 Liux 下在`run configuration`里面添加新的`Node.js`脚本或者`shell`脚本的时候,有一些不一样的地方就是通过 Ubuntu 桌面启动 Idea,会读不到用户级别的环境变量. 所以有一在配置一些的脚本的时候,需要确保运行时的环境变量,查看方法

在`Run Configurations`->`Environment Variables`->`Include Parents Variables`->`Show` 查看所有环境变量. 如果没有,烦请自己加上,为求能达到与 Terminal 运行同样的结果.

![查看Run Configurations全局变量](./check-run-configuration.png)
