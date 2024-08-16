---
title: Seata Quick Start
description: Getting started with Seata from scratch, setting up Seata services, and integrating distributed transactions into Java projects.
keywords: [fescar, seata, distributed transaction]
author: yudaoyuanma
date: 2020/04/19
---

- [1. Overview](#)
- [2. Deploying Standalone TC Server](#)
- [3. Deploying Cluster TC Server](#)
- [4. Accessing Java Applications](#)

# 1. Overview

[Seata](https://github.com/apache/incubator-seata) is an open source **Ali** open source **distributed transaction **solution , is committed to providing high-performance and easy-to-use distributed transaction services .

## 1.1 Four transaction patterns

Seata aims to create a **one-stop** solution for distributed transactions, and will eventually provide four transaction modes:

- AT mode: See the ["Seata AT mode"](/docs/dev/mode/at-mode/) document.
- TCC mode: see the Seata TCC mode document (/docs/dev/mode/tcc-mode/).
- Saga mode: see the document ["SEATA Saga mode"](/docs/dev/mode/saga-mode/).
- XA mode: under development...

Currently used **popularity** situation is: AT > TCC > Saga. therefore, when we learn Seata, we can spend more energy on **AT mode**, it is best to understand the principle behind the implementation, after all, distributed transaction involves the correctness of the data, the problem needs to be quickly troubleshooting to locate and solve.

> Friendly note: specific popularity, friends can choose to look at [Wanted: who's using Seata](https://github.com/apache/incubator-seata/issues/1246) each company registered use.

## 1.2 Three roles

There are three roles in the architecture of Seata:

! [Three Roles](http://www.iocoder.cn/images/Seata/2017-01-01/02.png)

- **TC** (Transaction Coordinator) - Transaction Coordinator: maintains the state of global and branch transactions, drives **global transactions** commit or rollback.
- **TM** (Transaction Manager) - Transaction Manager: defines the scope of a **global transaction**, starts the global transaction, commits or rolls back the global transaction.
- **RM** (Resource Manager) - Resource Manager: manages the resources processed by the **Branch Transaction**, talks to the TC to register the branch transaction and report on the status of the branch transaction, and drives the **Branch Transaction** to commit or rollback.

The TC is a separately deployed **Server** server and the TM and RM are **Client** clients embedded in the application.

In Seata, the **Lifecycle** of a distributed transaction is as follows:

! [Architecture diagram](http://www.iocoder.cn/images/Seata/2017-01-01/01.png)

> Friendly reminder: look at the red ticks added by the carrots.

- The TM requests the TC to open a global transaction. the TC generates a **XID** as the number of this global transaction.

> **XID**, which is propagated through the microservice's invocation chain, is guaranteed to associate multiple microservice sub-transactions together.

- RM requests the TC to register the local transaction as a branch transaction of the global transaction to be associated via the **XID** of the global transaction.
- The TM requests the TC to tell the **XID** whether the corresponding global transaction is to be committed or rolled back.
- TC drives RMs to commit or rollback their own local transactions corresponding to **XID**.

## 1.3 Framework Support

Seata currently provides support for the major **microservices frameworks**:

- Dubbo

> Integration via [`seata-dubbo`](https://github.com/apache/incubator-seata/blob/develop/integration/dubbo/)

- SOFA-RPC

> integrated via [`seata-sofa-rpc`](https://github.com/apache/incubator-seata/blob/develop/integration/sofa-rpc/)

- Motan

> Integrated via [`seata-motan`](https://github.com/apache/incubator-seata/blob/develop/integration/motan/)

- gRPC

> integrated via [`seata-grpc`](https://github.com/apache/incubator-seata/blob/develop/integration/gprc/)

- Apache HttpClient

> integrated via [`seata-http`](https://github.com/apache/incubator-seata/blob/develop/integration/http/)

- Spring Cloud OpenFeign
  > via [`spring-cloud-starter-alibaba-seata`](https://github.com/alibaba/spring-cloud-alibaba/blob/master/spring-cloud-alibaba-starters/spring-cloud-starter-alibaba-seata/src/main/java/com/alibaba/cloud/seata/) of [`feign`](https://github.com/alibaba/spring-cloud-alibaba/blob/master/spring-cloud-alibaba-starters/spring-cloud-starter-alibaba-seata/src/main/java/com/alibaba/cloud/seata/feign/) module
- Spring RestTemplate
  > via [`spring-cloud-starter-alibaba-seata`](https://github.com/alibaba/spring-cloud-alibaba/blob/master/spring-cloud-alibaba-starters/spring-cloud-starter-alibaba-seata/src/main/java/com/alibaba/cloud/seata/feign/SeataBeanPostProcessor.java) of [`rest`](https://github.com/alibaba/spring-cloud-alibaba/blob/master/spring-cloud-alibaba-starters/spring-cloud-starter-alibaba-seata/src/main/java/com/alibaba/cloud/seata/rest/) module


Seata also provides a Starter library for easy integration into Java projects:

- [`seata-spring-boot-starter`](https://mvnrepository.com/artifact/io.seata/seata-spring-boot-starter)
- [`spring-cloud-starter-alibaba-seata`](https://mvnrepository.com/artifact/com.alibaba.cloud/spring-cloud-starter-alibaba-seata)

Because Seata is based on the [DataSource](https://docs.oracle.com/javase/7/docs/api/javax/sql/DataSource.html) data source for **proxy** to extend, it naturally provides very good support for mainstream ORM frameworks:

- MyBatis, MyBatis-Plus
- JPA, Hibernate

## 1.4 Case Scenarios

From the registration of [Wanted: who's using Seata](https://github.com/apache/incubator-seata/issues/1246), Seata has started to land in many teams in China, including many large companies such as DDT and Rhyme. This can be summarised in the figure below:

! [summary chart](http://www.iocoder.cn/images/Seata/2017-01-01/03.png)

In addition, in the [awesome-seata](https://github.com/seata/awesome-seata) warehouse, carrots carrots see the drop and so on the company's landing when the technology to share, or very real and reliable. As shown in the picture below:! [awesome-seata 滴滴](http://www.iocoder.cn/images/Seata/2017-01-01/04.png)

In terms of the case, Seata is probably the most reliable distributed transaction solution known to date, or at least it is a very good choice to invest in it technically.

# 2. Deploying a Standalone TC Server

In this subsection, we will learn to deploy a **standalone** Seata **TC** Server, which is commonly used for learning or testing purposes, and is not recommended to be deployed in a production environment.

Because TC needs to record global and branch transactions, it needs corresponding **storage**. Currently, TC has two storage modes ( `store.mode`):

- file mode: suitable for **standalone** mode, global transaction session information is read/written in **memory** and persisted to local file `root.data`, with high performance.
- db mode: suitable for **cluster** mode, global transaction session information is shared via **db**, relatively low performance.

Obviously, we will adopt the file mode, and finally we deploy the standalone TC Server as shown below: ! [Standalone TC Server](http://www.iocoder.cn/images/Seata/2017-01-01/11.png)

After so much beeping, we start to formally deploy the standalone TC Server, here carrots carrots use macOS system, and Linux, Windows is similar to the friend of the brain to translate.

## 2.1 Download Seata Package

Open the [Seata download page](https://github.com/apache/incubator-seata/releases), and select the version of Seata you want. Here, we choose [v1.1.0](https://github.com/apache/incubator-seata/releases/tag/v1.1.0), the latest version.

 ```Bash
 # Create the directory
 $ mkdir -p /Users/yunai/Seata
 $ cd /Users/yunai/Seata

 # Download
 $ wget https://github.com/apache/incubator-seata/releases/download/v1.1.0/seata-server-1.1.0.tar.gz

 # Extract
 $ tar -zxvf seata-server-1.1.0.tar.gz

 # View directory
 $ cd seata
 $ ls -ls
 24 -rw-r--r-- 1 yunai staff 11365 May 13 2019 LICENSE
 0 drwxr-xr-x 4 yunai staff 128 Apr 2 07:46 bin # Executing scripts
 0 drwxr-xr-x 9 yunai staff 288 Feb 19 23:49 conf # configuration file
 0 drwxr-xr-x 138 yunai staff 4416 Apr 2 07:46 lib # seata-*.jar + dependency library
 ```

## 2.2 Starting TC Server

Execute the `nohup sh bin/seata-server.sh &` command to start TC Server in the background. In the `nohup.out` file, we see the following log, which indicates that the startup was successful:

```Java
# Using File Storage
2020-04-02 08:36:01.302 INFO [main]io.seata.common.loader.EnhancedServiceLoader.loadFile:247 -load TransactionStoreManager[FILE] extension by class[io.seata.server.store.file.FileTransactionStoreManager]
2020-04-02 08:36:01.302 INFO [main]io.seata.common.loader.EnhancedServiceLoader.loadFile:247 -load SessionManager[FILE] extension by class [io.seata.server.session.file.FileBasedSessionManager]
# Started successfully
2020-04-02 08:36:01.597 INFO [main]io.seata.core.rpc.netty.RpcServerBootstrap.start:155 -Server started ...
 ```

 - In the default configuration, Seata TC Server starts on the **8091** endpoint.

 Since we are using file mode, we can see the local file `root.data` for persistence. The command to do this is as follows:

 ```Bash
 $ ls -ls sessionStore/
 total 0
 0 -rw-r--r-- 1 yunai staff 0 Apr 2 08:36 root.data
 ```

As a follow-up, you can read the ["4. Getting Started with Java Applications"](#) subsection to get started with distributed transactions using Seata.

# 3. Deploying a Clustered TC Server

In this subsection, we will learn to deploy **Cluster** Seata **TC** Server to achieve high availability, a must for production environments. In clustering, multiple Seata TC Servers share global transaction session information through the **db** database.

At the same time, each Seata TC Server can register itself to the registry so that applications can get them from the registry. Eventually we deploy the Clustered TC Server as shown below: ! [Cluster TC Server](http://www.iocoder.cn/images/Seata/2017-01-01/21.png)

Seata TC Server provides integration with all major registries, as shown in the [discovery](https://github.com/apache/incubator-seata/tree/develop/discovery) directory. Considering the increasing popularity of using Nacos as a registry in China, we will use it here.

> Friendly note: If you don't know anything about Nacos, you can refer to the ["Nacos Installation and Deployment"](http://www.iocoder.cn/Nacos/install/?self) article.

After beeping so much, we start to deploy standalone TC Server formally, here carrots carrots use macOS system, and Linux, Windows is similar to the friend of the brain to translate.

## 3.1 Downloading the Seata package

Open the Seata download page (https://github.com/apache/incubator-seata/releases), and select the version of Seata you want. Here, we choose [v1.1.0](https://github.com/apache/incubator-seata/releases/tag/v1.1.0), the latest version.

 ```Bash
 # Create the directory
 $ mkdir -p /Users/yunai/Seata
 $ cd /Users/yunai/Seata

 # Download
 $ wget https://github.com/apache/incubator-seata/releases/download/v1.1.0/seata-server-1.1.0.tar.gz

 # Extract
 $ tar -zxvf seata-server-1.1.0.tar.gz

 # View directory
 $ cd seata
 $ ls -ls
 24 -rw-r--r-- 1 yunai staff 11365 May 13 2019 LICENSE
 0 drwxr-xr-x 4 yunai staff 128 Apr 2 07:46 bin # Executing scripts
 0 drwxr-xr-x 9 yunai staff 288 Feb 19 23:49 conf # configuration file
 0 drwxr-xr-x 138 yunai staff 4416 Apr 2 07:46 lib # seata-*.jar + dependency library
 ```

## 3.2 Initialising the database

① Use the [``mysql.sql``](https://github.com/apache/incubator-seata/blob/develop/script/server/db/mysql.sql) script to initialise the db database of Seata TC Server. The contents of the script are as follows:

 ```SQL
 -- -------------------------------- The script used when storeMode is 'db' --------------------------------
 -- the table to store GlobalSession data
 CREATE TABLE IF NOT EXISTS `global_table`
 (
    `xid`                       VARCHAR(128) NOT NULL,
    `transaction_id` BIGINT, `status` TINYL
    `status`                    TINYINT      NOT NULL,
    `application_id` VARCHAR(32), `transaction_service
    `transaction_service_group` VARCHAR(32),
    `transaction_name` VARCHAR(128),
    `timeout`                   INT,
    `begin_time`                BIGINT,
    `application_data` VARCHAR(2000), `gmt_create
    `gmt_create`                DATETIME,
    `gmt_modified`              DATETIME,
    PRIMARY KEY (`xid`),
    KEY `idx_gmt_modified_status` (`gmt_modified`, `status`),
    KEY `idx_transaction_id` (`transaction_id`)
 ) ENGINE = InnoDB
  DEFAULT CHARSET = utf8.

 -- the table to store BranchSession data
 CREATE TABLE IF NOT EXISTS `branch_table`
 (
    `branch_id` BIGINT NOT NULL, `xid` VARCHARGE
    `xid`               VARCHAR(128) NOT NULL,
    `transaction_id`    BIGINT,
    `resource_group_id` VARCHAR(32), `resource_id` VARCHAR(32), `transaction_id` BIGINT
    `resource_id`       VARCHAR(256),
    `branch_type` VARCHAR(8), `status` TINYINT
    `status`            TINYINT,
    `client_id` VARCHAR(64), `application_data` TINYINT, `client_id` VARCHAR(64), `application_data` TINYINT
    `application_data` VARCHAR(2000), `gmt_create
    `gmt_create`        DATETIME(6),
    `gmt_modified`      DATETIME(6),
    PRIMARY KEY (`branch_id`), `branch_id`, `idx_x
    KEY `idx_xid` (`xid`)
 ) ENGINE = InnoDB
  DEFAULT CHARSET = utf8; -- the table to store lock data.

 -- the table to store lock data
 CREATE TABLE IF NOT EXISTS `lock_table`
 (
    `row_key` VARCHAR(128) NOT NULL, `xid` VARCHAR(128) NOT NULL, -- the table to store lock data
    `xid`            VARCHAR(96),
    `transaction_id` BIGINT, `branch_id` BIGINT, `branch_id` BIGINT
    `branch_id` BIGINT NOT NULL,
    `resource_id`    VARCHAR(256),
    `table_name`     VARCHAR(32),
    `pk` VARCHAR(36), `gmt_create` VARCHAR(256), `gmt_create
    `gmt_create` DATETIME, `gmt_modify` VARCHAR(256), `pk` VARCHAR(36), `gmt_create` DATETIME
    `gmt_modified`   DATETIME,
    PRIMARY KEY (`row_key`),
    KEY `idx_branch_id` (`branch_id`)
 ) ENGINE = InnoDB
  DEFAULT CHARSET = utf8.
 ```

In MySQL, create `seata` database and execute the script under it. The final result is as follows: ! [`seata` Database - MySQL 5.X](http://www.iocoder.cn/images/Seata/2017-01-01/22.png)

② Modify the `conf/file` configuration file to use the db database to share the global transaction session information of Seata TC Server. As shown in the following figure: ! [`conf/file` configuration file](http://www.iocoder.cn/images/Seata/2017-01-01/23.png)

③ MySQL8 support

> If your friend is using MySQL version 8.X, you need to see this step. Otherwise, you can just skip it.

Firstly, you need to download the MySQL 8.X JDBC driver, the command line operation is as follows:

 ```Bash
 $ cd lib
 $ wget https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.19/mysql-connector-java-8.0.19.jar
 ```

Then, modify the `conf/file` configuration file to use the MySQL 8.X JDBC driver. As shown below: ! [`seata` database - MySQL 8.X](http://www.iocoder.cn/images/Seata/2017-01-01/24.png)

## 3.3 Setting up to use the Nacos Registry

Modify the `conf/registry.conf` configuration file to set up the Nacos registry. As shown in the following figure: ! [`conf/registry.conf` configuration file](http://www.iocoder.cn/images/Seata/2017-01-01/25.png)

## 3.4 Starting TC Server

① Execute `nohup sh bin/seata-server.sh -p 18091 -n 1 &` command to start **the first** TC Server in the background.

- `-p`: Port on which Seata TC Server listens.
- `-n`: Server node. In case of multiple TC Servers, it is necessary to differentiate the respective nodes for generating transactionId transaction numbers for different zones to avoid conflicts.

In the `nohup.out` file, we see the following log, indicating a successful startup:

```Java
# Using DB Stores
2020-04-05 16:54:12.793 INFO [main]io.seata.common.loader.EnhancedServiceLoader.loadFile:247 -load DataSourceGenerator[dbcp] extension by class[io.seata.server.store.db.DbcpDataSourceGenerator]
Loading class `com.mysql.jdbc.Driver'. This is deprecated. The new driver class is `com.mysql.cj.jdbc.Driver'. The driver is automatically registered via the SPI and manual loading of the driver class is generally unnecessary.
2020-04-05 16:54:13.442 INFO [main]io.seata.common.loader.EnhancedServiceLoader.loadFile:247 -load LogStore[DB] extension by class[io. seata.core.store.db.LogStoreDataBaseDAO]
2020-04-05 16:54:13.442 INFO [main]io.seata.common.loader.EnhancedServiceLoader.loadFile:247 -load TransactionStoreManager[DB] extension by class[io.seata.server.store.db.DatabaseTransactionStoreManager]
2020-04-05 16:54:13.442 INFO [main]io.seata.common.loader.EnhancedServiceLoader.loadFile:247 -load SessionManager[DB] extension by class[ io.seata.server.session.db.DataBaseSessionManager]
# Started successfully
2020-04-05 16:54:13.779 INFO [main]io.seata.core.rpc.netty.RpcServerBootstrap.start:155 -Server started ...
# Using the Nacos Registry
2020-04-05 16:54:13.788 INFO [main]io.seata.common.loader.EnhancedServiceLoader.loadFile:247 -load RegistryProvider[Nacos] extension by class[io.seata.discovery.registry.nacos.NacosRegistryProvider]
 ```

 ② Execute the `nohup sh bin/seata-server.sh -p 28091 -n 2 &` command to start the **second** TC Server in the background.

 ③ Open the Nacos Registry console and we can see that there are **two** Seata TC Server examples. As shown in the following figure: ! [Nacos console](http://www.iocoder.cn/images/Seata/2017-01-01/26.png)

 # 4. Accessing Java Applications

 ## 4.1 AT mode

 **① Spring Boot**.

 1. ["2. AT Mode + Multiple Data Sources"](#) subsection of ["Getting Started with Taro Road Spring Boot Distributed Transaction Seata"](http://www.iocoder.cn/Spring-Boot/Seata/?self) implements distributed transactions for a single Spring Boot project under multiple data sources.

 ! [Overall diagram](http://www.iocoder.cn/images/Spring-Boot/2020-10-01/01.png)

 2. ["AT Pattern + HttpClient Remote Call"](#) subsection of ["Getting Started with Taro Road Spring Boot Distributed Transaction Seata"](http://www.iocoder.cn/Spring-Boot/Seata/?self), to implement distributed transactions for multiple Spring Boot projects.

 ! [Overall diagram](http://www.iocoder.cn/images/Spring-Boot/2020-10-01/21.png)

 **② Dubbo**

 Subsection ["2. AT Patterns"](#) of ["Getting Started with Dubbo Distributed Transaction Seata"](http://www.iocoder.cn/Dubbo/Seata/?sef) implements distributed transactions under multiple Dubbo services.

 ! [Overall Diagram](http://www.iocoder.cn/images/Dubbo/2020-04-15/01.png)

 **③ Spring Cloud**

 The ["3. AT Patterns + Feign"](#) subsection of ["Getting Started with Alibaba Distributed Transaction Seata for Taro Road Spring Cloud"](http://www.iocoder.cn/Spring-Cloud-Alibaba/Seata/?self) implements multiple Spring Cloud services.

 ! [Overall diagram](http://www.iocoder.cn/images/Spring-Cloud/2020-07-15/01.png)

 ## 4.2 TCC Pattern

 - Documentation: ["Seata Documentation -- TCC Mode"](/docs/dev/mode/tcc-mode/)
 - Example: https://github.com/apache/incubator-seata-samples/blob/master/tcc

 ## 4.3 Saga mode

 - Documentation: ["Seata Documentation -- Saga Mode"](/docs/dev/mode/saga-mode/)
 - Example: https://github.com/apache/incubator-seata-samples/tree/master/saga

 ## 4.4 XA mode

 Seata is under development...
