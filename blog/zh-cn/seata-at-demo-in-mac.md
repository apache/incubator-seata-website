---
title: Mac下的Seata Demo环境搭建（AT模式）
author: portman xu
date: 2020/07/20
keywords: seata, 分布式事务, demo, mac, at
---

# Mac下的Seata Demo环境搭建（AT模式）

## 前言

最近因为工作需要，研究学习了Seata分布式事务框架，本文把自己学习的知识记录一下

## Seata总览

### cloc代码统计

先看一下seata项目cloc代码统计（截止到2020-07-20）

![cloc-seata](https://github.com/iportman/p/blob/master/blog/seata-at-demo-in-mac/cloc-seata.png?raw=true)

Java代码行数大约是 97K

### 代码质量

单元测试覆盖率50%

![cloc-seata](https://github.com/iportman/p/blob/master/blog/seata-at-demo-in-mac/coverage.png?raw=true)

### Demo代码

本文讲的Demo代码是seata-samples项目下的seata-samples-dubbo模块，地址如下：

https://github.com/seata/seata-samples/tree/master/dubbo

## 解决的核心问题

AT模式的Demo例子给出了一个典型的分布式事务场景：

- 在一个采购交易中，需要：
  
1. 扣减商品库存
2. 扣减用户账号余额
3. 生成采购订单

- 很明显，以上3个步骤必须：要么全部成功，要么全部失败，否则系统的数据会错乱
- 而现在流行的微服务架构，一般来说，库存，账号余额，订单是3个独立的系统
- 每个微服务有自己的数据库，相互独立

这里就是分布式事务的场景。

![设计图](http://seata.io/img/architecture.png)

## 解决方案

AT模式解决这个问题的思路其实很简单，一句话概括就是：

在分布式事务过程中，记录待修改的数据修改前和修改后的值到undo_log表，万一交易中出现异常，通过这个里的数据做回滚

当然，具体代码实现起来，我相信很多细节远没这么简单。

## Demo代码结构

从github上clone最新的代码

```sh
git clone git@github.com:seata/seata-samples.git
```

阅读Demo代码结构

```sh
$ cd seata-samples/dubbo/
$ tree -C  -I 'target' .
.
├── README.md
├── pom.xml
├── seata-samples-dubbo.iml
└── src
    └── main
        ├── java
        │   └── io
        │       └── seata
        │           └── samples
        │               └── dubbo
        │                   ├── ApplicationKeeper.java
        │                   ├── Order.java
        │                   ├── service
        │                   │   ├── AccountService.java
        │                   │   ├── BusinessService.java
        │                   │   ├── OrderService.java
        │                   │   ├── StorageService.java
        │                   │   └── impl
        │                   │       ├── AccountServiceImpl.java
        │                   │       ├── BusinessServiceImpl.java
        │                   │       ├── OrderServiceImpl.java
        │                   │       └── StorageServiceImpl.java
        │                   └── starter
        │                       ├── DubboAccountServiceStarter.java
        │                       ├── DubboBusinessTester.java
        │                       ├── DubboOrderServiceStarter.java
        │                       └── DubboStorageServiceStarter.java
        └── resources
            ├── file.conf
            ├── jdbc.properties
            ├── log4j.properties
            ├── registry.conf
            ├── spring
            │   ├── dubbo-account-service.xml
            │   ├── dubbo-business.xml
            │   ├── dubbo-order-service.xml
            │   └── dubbo-storage-service.xml
            └── sql
                ├── dubbo_biz.sql
                └── undo_log.sql

13 directories, 27 files
```

- 在io.seata.samples.dubbo.starter包下的4个\*Starter类，分别模拟上面所述的4个微服务
  - Account
  - Business
  - Order
  - Storage

- 4个服务都是标准的dubbo服务，配置文件在seata-samples/dubbo/src/main/resources/spring目录下
- 运行demo需要把这4个服务都启动起来，Business最后启动
- 主要的逻辑在io.seata.samples.dubbo.service，4个实现类分别对应4个微服务的业务逻辑
- 数据库信息的配置文件：src/main/resources/jdbc.properties

### 时序图

![cloc-seata](https://github.com/iportman/p/blob/master/blog/seata-at-demo-in-mac/timing-diagram.png?raw=true)

Ok, 赶紧动手, Make It Happen!

## 运行Demo

### MySQL

### 建表

执行seata-samples/dubbo/src/main/resources/sql的脚本dubbo_biz.sql和undo_log.sql

```sh
mysql> show tables;
+-----------------+
| Tables_in_seata |
+-----------------+
| account_tbl     |
| order_tbl       |
| storage_tbl     |
| undo_log        |
+-----------------+
4 rows in set (0.01 sec)
```

执行完之后，数据库里应该有4个表

修改seata-samples/dubbo/src/main/resources/jdbc.properties文件

根据你MySQL运行的环境修改变量的值

```properties
jdbc.account.url=jdbc:mysql://localhost:3306/seata
jdbc.account.username=your_username
jdbc.account.password=your_password
jdbc.account.driver=com.mysql.jdbc.Driver
# storage db config
jdbc.storage.url=jdbc:mysql://localhost:3306/seata
jdbc.storage.username=your_username
jdbc.storage.password=your_password
jdbc.storage.driver=com.mysql.jdbc.Driver
# order db config
jdbc.order.url=jdbc:mysql://localhost:3306/seata
jdbc.order.username=your_username
jdbc.order.password=your_password
jdbc.order.driver=com.mysql.jdbc.Driver
```

### ZooKeeper

启动ZooKeeper，我的本地的Mac是使用Homebrew安装启动的

```sh
$ brew services start zookeeper 
==> Successfully started `zookeeper` (label: homebrew.m

$ brew services list           
Name              Status  User    Plist
docker-machine    stopped         
elasticsearch     stopped         
kafka             stopped         
kibana            stopped         
mysql             started portman /Users/portman/Librar
y/LaunchAgents/homebrew.mxcl.mysql.plist
nginx             stopped         
postgresql        stopped         
redis             stopped         
zookeeper         started portman /Users/portman/Librar
y/LaunchAgents/homebrew.mxcl.zookeeper.plist
```

### 启动TC事务协调器

在这个[链接](https://github.com/seata/seata/releases)里页面中，下载对应版本的seata-server程序，我本地下载的是1.2.0版本

1. 进入文件所在目录并解压文件
2. 进入seata目录
3. 执行启动脚本

```sh
$ tar -zxvf seata-server-1.2.0.tar.gz
$ cd seata
$ bin/seata-server.sh
```

观察启动日志是否有报错信息，如果一切正常，并看到了以下的Server started的信息，说明启动成功了。

```sh
2020-07-23 13:45:13.810 INFO [main]io.seata.core.rpc.netty.RpcServerBootstrap.start:155 -Server started ...
```

### IDE中启动模拟的微服务

1. 首先要把seata-samples项目导入到本地IDE中，这里我用的是IntelliJ IDEA
2. 刷新Maven的工程依赖
3. 先启动Account，Order，Storage这个3个服务，然后Business才能去调用，对应的启动类分别是：

```java
io.seata.samples.dubbo.starter.DubboStorageServiceStarter
io.seata.samples.dubbo.starter.DubboOrderServiceStarter
io.seata.samples.dubbo.starter.DubboStorageServiceStarter
```

每个服务启动完之后，看到这句提示信息，说明服务启动成功了

```sh
Application is keep running ...
```

![cloc-seata](https://github.com/iportman/p/blob/master/blog/seata-at-demo-in-mac/service-boot.png?raw=true)

启动成功后，account_tbl，storage_tbl表会有两条初始化的数据，分别是账户余额和商品库存

```sh
mysql> SELECT * FROM account_tbl; SELECT * FROM storage_tbl;
+----+---------+-------+
| id | user_id | money |
+----+---------+-------+
|  1 | U100001 |   999 |
+----+---------+-------+
1 row in set (0.00 sec)

+----+----------------+-------+
| id | commodity_code | count |
+----+----------------+-------+
|  1 | C00321         |   100 |
+----+----------------+-------+
1 row in set (0.00 sec)
```

### 使用Business验证效果

#### 正常情况

还是在IDE中执行DubboBusinessTester类的主函数，程序跑完会自动退出

在程序一切正常的情况下，每个微服务的事物都应该是提交了的，数据保持一致

我们来看一下MySQL中数据的变化

```sh
mysql> SELECT * FROM account_tbl; SELECT * FROM order_tbl; SELECT * FROM storage_tbl;
+----+---------+-------+
| id | user_id | money |
+----+---------+-------+
|  1 | U100001 |   599 |
+----+---------+-------+
1 row in set (0.00 sec)

+----+---------+----------------+-------+-------+
| id | user_id | commodity_code | count | money |
+----+---------+----------------+-------+-------+
|  1 | U100001 | C00321         |     2 |   400 |
+----+---------+----------------+-------+-------+
1 row in set (0.00 sec)

+----+----------------+-------+
| id | commodity_code | count |
+----+----------------+-------+
|  1 | C00321         |    98 |
+----+----------------+-------+
1 row in set (0.00 sec)
```

从3个表的数据可以看到：账户余额扣减了400块；订单表增加了1条记录；商品库存扣减了2个

这个结果是程序的逻辑是一致的，说明事务没有问题

#### 异常情况

其实即使不加入分布式事务的控制，一切都正常情况下，事务本身就不会有问题的

所以我们来重点关注，当程序出现异常时的情况

现在我把BusinessServiceImpl的抛异常的代码注释放开，然后再执行一次DubboBusinessTester，来看看有什么情况发生

```java
		@Override
    @GlobalTransactional(timeoutMills = 300000, name = "dubbo-demo-tx")
    public void purchase(String userId, String commodityCode, int orderCount) {
        LOGGER.info("purchase begin ... xid: " + RootContext.getXID());
        storageService.deduct(commodityCode, orderCount);
        orderService.create(userId, commodityCode, orderCount);
      
        //放开这句抛异常的注释，模拟程序出现异常
        throw new RuntimeException("portman's foooooobar error.");

    }
```

接着，我再一次执行DubboBusinessTester，执行过程中在控制台可以看到异常报错信息

```java
Exception in thread "main" java.lang.RuntimeException: portman's foooooobar error.
```

现在我们再看一下MySQL里的数据变化，发现数据没有任何变化，说明分布式事务的控制已经起作用了

## 待思考问题

上面的步骤只是演示了seata最简单的demo程序，更多更复杂的情况后续大家可以一起讨论和验证

学习过程中还有一些问题和疑惑，后续进一步学习

- 全局锁对性能的影响程度
- undo_log日志可以回滚到原来状态，但是如果数据状态已经发生变化如何处理（比如增加的用户积分已经被别的本地事务花掉了）

## 参考文献

- [Seata 是什么?](http://seata.io/zh-cn/docs/overview/what-is-seata.html)
- [快速开始](http://seata.io/zh-cn/docs/user/quickstart.html)

## 作者信息

许晓加，金蝶软件架构师

[Github](https://github.com/iportman)
