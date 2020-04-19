---
title: Seata 极简入门
description: 从 0 开始入门 Seata，搭建 Seata 服务，并接入 Java 项目中实现分布式事务
keywords: fescar、seata、分布式事务
author: 芋道源码
date: 2020/04/19
---

- [1. 概述](#)
- [2. 部署单机 TC Server](#)
- [3. 部署集群 TC Server](#)
- [4. 接入 Java 应用](#)

# 1. 概述

[Seata](https://github.com/seata/seata) 是**阿里**开源的一款开源的**分布式事务**解决方案，致力于提供高性能和简单易用的分布式事务服务。

## 1.1 四种事务模式

Seata 目标打造**一站式**的分布事务的解决方案，最终会提供四种事务模式：
* AT 模式：参见[《Seata AT 模式》](https://seata.io/zh-cn/docs/dev/mode/at-mode.html)文档
* TCC 模式：参见[《Seata TCC 模式》](https://seata.io/zh-cn/docs/dev/mode/tcc-mode.html)文档
* Saga 模式：参见[《SEATA Saga 模式》](https://seata.io/zh-cn/docs/dev/mode/saga-mode.html)文档
* XA 模式：正在开发中...

目前使用的**流行度**情况是：AT > TCC > Saga。因此，我们在学习 Seata 的时候，可以花更多精力在 **AT 模式**上，最好搞懂背后的实现原理，毕竟分布式事务涉及到数据的正确性，出问题需要快速排查定位并解决。

> 友情提示：具体的流行度，胖友可以选择看看 [Wanted: who's using Seata](https://github.com/seata/seata/issues/1246) 每个公司登记的使用方式。

## 1.2 三种角色

在 Seata 的架构中，一共有三个角色：

![三个角色](http://www.iocoder.cn/images/Seata/2017-01-01/02.png)

* **TC** (Transaction Coordinator) - 事务协调者：维护全局和分支事务的状态，驱动**全局事务**提交或回滚。
* **TM** (Transaction Manager) - 事务管理器：定义**全局事务**的范围，开始全局事务、提交或回滚全局事务。
* **RM** ( Resource Manager ) - 资源管理器：管理**分支事务**处理的资源( Resource )，与 TC 交谈以注册分支事务和报告分支事务的状态，并驱动**分支事务**提交或回滚。

其中，TC 为单独部署的 **Server** 服务端，TM 和 RM 为嵌入到应用中的 **Client** 客户端。

在 Seata 中，一个分布式事务的**生命周期**如下：

![架构图](http://www.iocoder.cn/images/Seata/2017-01-01/01.png)

> 友情提示：看下艿艿添加的红色小勾。

* TM 请求 TC 开启一个全局事务。TC 会生成一个 **XID** 作为该全局事务的编号。
    > **XID**，会在微服务的调用链路中传播，保证将多个微服务的子事务关联在一起。

* RM 请求 TC 将本地事务注册为全局事务的分支事务，通过全局事务的 **XID** 进行关联。
* TM 请求 TC 告诉 **XID** 对应的全局事务是进行提交还是回滚。
* TC 驱动 RM 们将 **XID** 对应的自己的本地事务进行提交还是回滚。

## 1.3 框架支持情况

Seata 目前提供了对主流的**微服务框架**的支持：
* Dubbo
    > 通过 [`seata-dubbo`](https://github.com/seata/seata/blob/develop/integration/dubbo/) 集成

* SOFA-RPC
    > 通过 [`seata-sofa-rpc`](https://github.com/seata/seata/blob/develop/integration/sofa-rpc/) 集成

* Motan
    > 通过 [`seata-motan`](https://github.com/seata/seata/blob/develop/integration/motan/) 集成

* gRPC
    > 通过 [`seata-grpc`](https://github.com/seata/seata/blob/develop/integration/gprc/) 集成

* Apache HttpClient
    > 通过 [`seata-http`](https://github.com/seata/seata/blob/develop/integration/http/) 集成

* Spring Cloud OpenFeign
    > 通过 [`spring-cloud-starter-alibaba-seata`](https://github.com/alibaba/spring-cloud-alibaba/blob/master/spring-cloud-alibaba-starters/spring-cloud-starter-alibaba-seata/src/main/java/com/alibaba/cloud/seata/) 的 [`feign`](https://github.com/alibaba/spring-cloud-alibaba/blob/master/spring-cloud-alibaba-starters/spring-cloud-starter-alibaba-seata/src/main/java/com/alibaba/cloud/seata/feign/) 模块
    
* Spring RestTemplate   
    > 通过 [`spring-cloud-starter-alibaba-seata`](https://github.com/alibaba/spring-cloud-alibaba/blob/master/spring-cloud-alibaba-starters/spring-cloud-starter-alibaba-seata/src/main/java/com/alibaba/cloud/seata/feign/SeataBeanPostProcessor.java) 的 [`rest`](https://github.com/alibaba/spring-cloud-alibaba/blob/master/spring-cloud-alibaba-starters/spring-cloud-starter-alibaba-seata/src/main/java/com/alibaba/cloud/seata/rest/) 模块

同时方便我们集成到 Java 项目当中，Seata 也提供了相应的 Starter 库：
* [`seata-spring-boot-starter`](https://mvnrepository.com/artifact/io.seata/seata-spring-boot-starter)
* [`spring-cloud-starter-alibaba-seata`](https://mvnrepository.com/artifact/com.alibaba.cloud/spring-cloud-starter-alibaba-seata)

因为 Seata 是基于 [DataSource](https://docs.oracle.com/javase/7/docs/api/javax/sql/DataSource.html) 数据源进行**代理**来拓展，所以天然对主流的 ORM 框架提供了非常好的支持：
* MyBatis、MyBatis-Plus
* JPA、Hibernate

## 1.4 案例情况

从 [Wanted: who's using Seata](https://github.com/seata/seata/issues/1246) 的登记情况，Seata 已经在国内很多团队开始落地，其中不乏有滴滴、韵达等大型公司。可汇总如下图：
                                                                                                               
![汇总图](http://www.iocoder.cn/images/Seata/2017-01-01/03.png)

另外，在 [awesome-seata](https://github.com/seata/awesome-seata) 仓库中，艿艿看到了滴滴等等公司的落地时的技术分享，还是非常真实可靠的。如下图所示：![awesome-seata 滴滴](http://www.iocoder.cn/images/Seata/2017-01-01/04.png)

从案例的情况来说，Seata 可能给是目前已知最可靠的分布式事务解决方案，至少对它进行技术投入是非常不错的选择。

# 2. 部署单机 TC Server

本小节，我们来学习部署**单机** Seata **TC** Server，常用于学习或测试使用，不建议在生产环境中部署单机。

因为 TC 需要进行全局事务和分支事务的记录，所以需要对应的**存储**。目前，TC 有两种存储模式( `store.mode` )：

* file 模式：适合**单机**模式，全局事务会话信息在**内存**中读写，并持久化本地文件 `root.data`，性能较高。
* db 模式：适合**集群**模式，全局事务会话信息通过 **db** 共享，相对性能差点。

显然，我们将采用 file 模式，最终我们部署单机 TC Server 如下图所示：![单机 TC Server](http://www.iocoder.cn/images/Seata/2017-01-01/11.png)

哔哔完这么多，我们开始正式部署单机 TC Server，这里艿艿使用 macOS 系统，和 Linux、Windows 是差不多的，胖友脑补翻译。

## 2.1 下载 Seata 软件包

打开 [Seata 下载页面](https://github.com/seata/seata/releases)，选择想要的 Seata 版本。这里，我们选择 [v1.1.0](https://github.com/seata/seata/releases/tag/v1.1.0) 最新版本。

```Bash
# 创建目录
$ mkdir -p /Users/yunai/Seata
$ cd /Users/yunai/Seata

# 下载
$ wget https://github.com/seata/seata/releases/download/v1.1.0/seata-server-1.1.0.tar.gz

# 解压
$ tar -zxvf seata-server-1.1.0.tar.gz

# 查看目录
$ cd seata
$ ls -ls
24 -rw-r--r--    1 yunai  staff  11365 May 13  2019 LICENSE
 0 drwxr-xr-x    4 yunai  staff    128 Apr  2 07:46 bin # 执行脚本
 0 drwxr-xr-x    9 yunai  staff    288 Feb 19 23:49 conf # 配置文件
 0 drwxr-xr-x  138 yunai  staff   4416 Apr  2 07:46 lib #  seata-*.jar + 依赖库 
```

## 2.2 启动 TC Server

执行 `nohup sh bin/seata-server.sh &` 命令，启动 TC Server 在后台。在 `nohup.out` 文件中，我们看到如下日志，说明启动成功：

```Java
# 使用 File 存储器
2020-04-02 08:36:01.302 INFO [main]io.seata.common.loader.EnhancedServiceLoader.loadFile:247 -load TransactionStoreManager[FILE] extension by class[io.seata.server.store.file.FileTransactionStoreManager]
2020-04-02 08:36:01.302 INFO [main]io.seata.common.loader.EnhancedServiceLoader.loadFile:247 -load SessionManager[FILE] extension by class[io.seata.server.session.file.FileBasedSessionManager]
# 启动成功
2020-04-02 08:36:01.597 INFO [main]io.seata.core.rpc.netty.RpcServerBootstrap.start:155 -Server started ...
```
* 默认配置下，Seata TC Server 启动在 **8091** 端点。

因为我们使用 file 模式，所以可以看到用于持久化的本地文件 `root.data`。操作命令如下：

```Bash
$ ls -ls sessionStore/
total 0
0 -rw-r--r--  1 yunai  staff  0 Apr  2 08:36 root.data
```

后续，胖友可以阅读[「4. 接入 Java 应用」](#)小节，开始使用 Seata 实现分布式事务。

# 3. 部署集群 TC Server

本小节，我们来学习部署**集群** Seata **TC** Server，实现高可用，生产环境下必备。在集群时，多个 Seata TC Server 通过 **db** 数据库，实现全局事务会话信息的共享。

同时，每个 Seata TC Server 可以注册自己到注册中心上，方便应用从注册中心获得到他们。最终我们部署 集群 TC Server 如下图所示：![集群 TC Server](http://www.iocoder.cn/images/Seata/2017-01-01/21.png)

Seata TC Server 对主流的注册中心都提供了集成，具体可见 [discovery](https://github.com/seata/seata/tree/develop/discovery) 目录。考虑到国内使用 Nacos 作为注册中心越来越流行，这里我们就采用它。

> 友情提示：如果对 Nacos 不了解的胖友，可以参考[《Nacos 安装部署》](http://www.iocoder.cn/Nacos/install/?self)文章。

哔哔完这么多，我们开始正式部署单机 TC Server，这里艿艿使用 macOS 系统，和 Linux、Windows 是差不多的，胖友脑补翻译。

## 3.1 下载 Seata 软件包

打开 [Seata 下载页面](https://github.com/seata/seata/releases)，选择想要的 Seata 版本。这里，我们选择 [v1.1.0](https://github.com/seata/seata/releases/tag/v1.1.0) 最新版本。

```Bash
# 创建目录
$ mkdir -p /Users/yunai/Seata
$ cd /Users/yunai/Seata

# 下载
$ wget https://github.com/seata/seata/releases/download/v1.1.0/seata-server-1.1.0.tar.gz

# 解压
$ tar -zxvf seata-server-1.1.0.tar.gz

# 查看目录
$ cd seata
$ ls -ls
24 -rw-r--r--    1 yunai  staff  11365 May 13  2019 LICENSE
 0 drwxr-xr-x    4 yunai  staff    128 Apr  2 07:46 bin # 执行脚本
 0 drwxr-xr-x    9 yunai  staff    288 Feb 19 23:49 conf # 配置文件
 0 drwxr-xr-x  138 yunai  staff   4416 Apr  2 07:46 lib #  seata-*.jar + 依赖库 
```

## 3.2 初始化数据库

① 使用 [`mysql.sql`](https://github.com/seata/seata/blob/develop/script/server/db/mysql.sql) 脚本，初始化 Seata TC Server 的 db 数据库。脚本内容如下：

```SQL
-- -------------------------------- The script used when storeMode is 'db' --------------------------------
-- the table to store GlobalSession data
CREATE TABLE IF NOT EXISTS `global_table`
(
    `xid`                       VARCHAR(128) NOT NULL,
    `transaction_id`            BIGINT,
    `status`                    TINYINT      NOT NULL,
    `application_id`            VARCHAR(32),
    `transaction_service_group` VARCHAR(32),
    `transaction_name`          VARCHAR(128),
    `timeout`                   INT,
    `begin_time`                BIGINT,
    `application_data`          VARCHAR(2000),
    `gmt_create`                DATETIME,
    `gmt_modified`              DATETIME,
    PRIMARY KEY (`xid`),
    KEY `idx_gmt_modified_status` (`gmt_modified`, `status`),
    KEY `idx_transaction_id` (`transaction_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- the table to store BranchSession data
CREATE TABLE IF NOT EXISTS `branch_table`
(
    `branch_id`         BIGINT       NOT NULL,
    `xid`               VARCHAR(128) NOT NULL,
    `transaction_id`    BIGINT,
    `resource_group_id` VARCHAR(32),
    `resource_id`       VARCHAR(256),
    `branch_type`       VARCHAR(8),
    `status`            TINYINT,
    `client_id`         VARCHAR(64),
    `application_data`  VARCHAR(2000),
    `gmt_create`        DATETIME(6),
    `gmt_modified`      DATETIME(6),
    PRIMARY KEY (`branch_id`),
    KEY `idx_xid` (`xid`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- the table to store lock data
CREATE TABLE IF NOT EXISTS `lock_table`
(
    `row_key`        VARCHAR(128) NOT NULL,
    `xid`            VARCHAR(96),
    `transaction_id` BIGINT,
    `branch_id`      BIGINT       NOT NULL,
    `resource_id`    VARCHAR(256),
    `table_name`     VARCHAR(32),
    `pk`             VARCHAR(36),
    `gmt_create`     DATETIME,
    `gmt_modified`   DATETIME,
    PRIMARY KEY (`row_key`),
    KEY `idx_branch_id` (`branch_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
```

在 MySQL 中，创建 `seata` 数据库，并在该库下执行该脚本。最终结果如下图：![`seata` 数据库 - MySQL 5.X](http://www.iocoder.cn/images/Seata/2017-01-01/22.png)

② 修改 `conf/file` 配置文件，修改使用 db 数据库，实现 Seata TC Server 的全局事务会话信息的共享。如下图所示：![`conf/file` 配置文件](http://www.iocoder.cn/images/Seata/2017-01-01/23.png)

③ MySQL8 的支持

> 如果胖友使用的 MySQL 是 8.X 版本，则需要看该步骤。否则，可以直接跳过。

首先，需要下载 MySQL 8.X JDBC 驱动，命令行操作如下：

```Bash
$ cd lib
$ wget https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.19/mysql-connector-java-8.0.19.jar
```

然后，修改 `conf/file` 配置文件，使用该 MySQL 8.X JDBC 驱动。如下图所示：![`seata` 数据库 - MySQL 8.X](http://www.iocoder.cn/images/Seata/2017-01-01/24.png)

## 3.3 设置使用 Nacos 注册中心

修改 `conf/registry.conf` 配置文件，设置使用 Nacos 注册中心。如下图所示：![`conf/registry.conf` 配置文件](http://www.iocoder.cn/images/Seata/2017-01-01/25.png)

## 3.4 启动 TC Server

① 执行 `nohup sh bin/seata-server.sh -p 18091 -n 1 &` 命令，启动**第一个** TC Server 在后台。
* `-p`：Seata TC Server 监听的端口。
* `-n`：Server node。在多个 TC Server 时，需区分各自节点，用于生成不同区间的 transactionId 事务编号，以免冲突。

在 `nohup.out` 文件中，我们看到如下日志，说明启动成功：

```Java
# 使用 DB 存储器
2020-04-05 16:54:12.793 INFO [main]io.seata.common.loader.EnhancedServiceLoader.loadFile:247 -load DataSourceGenerator[dbcp] extension by class[io.seata.server.store.db.DbcpDataSourceGenerator]
Loading class `com.mysql.jdbc.Driver'. This is deprecated. The new driver class is `com.mysql.cj.jdbc.Driver'. The driver is automatically registered via the SPI and manual loading of the driver class is generally unnecessary.
2020-04-05 16:54:13.442 INFO [main]io.seata.common.loader.EnhancedServiceLoader.loadFile:247 -load LogStore[DB] extension by class[io.seata.core.store.db.LogStoreDataBaseDAO]
2020-04-05 16:54:13.442 INFO [main]io.seata.common.loader.EnhancedServiceLoader.loadFile:247 -load TransactionStoreManager[DB] extension by class[io.seata.server.store.db.DatabaseTransactionStoreManager]
2020-04-05 16:54:13.442 INFO [main]io.seata.common.loader.EnhancedServiceLoader.loadFile:247 -load SessionManager[DB] extension by class[io.seata.server.session.db.DataBaseSessionManager]
# 启动成功
2020-04-05 16:54:13.779 INFO [main]io.seata.core.rpc.netty.RpcServerBootstrap.start:155 -Server started ...
# 使用 Nacos 注册中心
2020-04-05 16:54:13.788 INFO [main]io.seata.common.loader.EnhancedServiceLoader.loadFile:247 -load RegistryProvider[Nacos] extension by class[io.seata.discovery.registry.nacos.NacosRegistryProvider]
```

② 执行 `nohup sh bin/seata-server.sh -p 28091 -n 2 &` 命令，启动**第二个** TC Server 在后台。

③ 打开 Nacos 注册中心的控制台，我们可以看到有**两个** Seata TC Server 示例。如下图所示：![Nacos 控制台](http://www.iocoder.cn/images/Seata/2017-01-01/26.png)

# 4. 接入 Java 应用

## 4.1 AT 模式

**① Spring Boot**

1、[《芋道 Spring Boot 分布式事务 Seata 入门》](http://www.iocoder.cn/Spring-Boot/Seata/?self)的[「2. AT 模式 + 多数据源」](#)小节，实现单体 Spring Boot 项目在多数据源下的分布式事务。

![整体图](http://www.iocoder.cn/images/Spring-Boot/2020-10-01/01.png)

2、[《芋道 Spring Boot 分布式事务 Seata 入门》](http://www.iocoder.cn/Spring-Boot/Seata/?self)的[「AT 模式 + HttpClient 远程调用」](#)小节，实现多个 Spring Boot 项目的分布事务。

![整体图](http://www.iocoder.cn/images/Spring-Boot/2020-10-01/21.png)

**② Dubbo**

[《Dubbo 分布式事务 Seata 入门》](http://www.iocoder.cn/Dubbo/Seata/?sef)的[「2. AT 模式」](#)小节，实现多个 Dubbo 服务下的分布式事务。

![整体图](http://www.iocoder.cn/images/Dubbo/2020-04-15/01.png)

**③ Spring Cloud**

[《芋道 Spring Cloud Alibaba 分布式事务 Seata 入门》](http://www.iocoder.cn/Spring-Cloud-Alibaba/Seata/?self)的[「3. AT 模式 + Feign」](#)小节，实现多个 Spring Cloud 服务下的分布式事务。

![整体图](http://www.iocoder.cn/images/Spring-Cloud/2020-07-15/01.png)

## 4.2 TCC 模式

* 文档：[《Seata 文档 —— TCC 模式》](http://127.0.0.1:8080/zh-cn/docs/dev/mode/tcc-mode.html)
* 示例：<https://github.com/seata/seata-samples/blob/master/tcc>

## 4.3 Saga 模式

* 文档：[《Seata 文档 —— Saga 模式》](https://seata.io/zh-cn/docs/dev/mode/saga-mode.html)
* 示例：<https://github.com/seata/seata-samples/tree/master/saga>

## 4.4 XA 模式

Seata 正在开发中...
