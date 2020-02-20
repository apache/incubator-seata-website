---
title: Seata 快速开始
keywords: Seata
description: Seata 快速开始。
---

# 快速开始

让我们从一个微服务示例开始。

## 用例

用户购买商品的业务逻辑。整个业务逻辑由3个微服务提供支持：

- 仓储服务：对给定的商品扣除仓储数量。
- 订单服务：根据采购需求创建订单。
- 帐户服务：从用户帐户中扣除余额。

### 架构图

![Architecture](/img/architecture.png) 


### 仓储服务

```java
public interface StorageService {

    /**
     * 扣除存储数量
     */
    void deduct(String commodityCode, int count);
}
```

### 订单服务

```java
public interface OrderService {

    /**
     * 创建订单
     */
    Order create(String userId, String commodityCode, int orderCount);
}
```

### 帐户服务

```java
public interface AccountService {

    /**
     * 从用户账户中借出
     */
    void debit(String userId, int money);
}
```

### 主要业务逻辑

```java
public class BusinessServiceImpl implements BusinessService {

    private StorageService storageService;

    private OrderService orderService;

    /**
     * 采购
     */
    public void purchase(String userId, String commodityCode, int orderCount) {

        storageService.deduct(commodityCode, orderCount);

        orderService.create(userId, commodityCode, orderCount);
    }
}
```

```java
public class OrderServiceImpl implements OrderService {

    private OrderDAO orderDAO;

    private AccountService accountService;

    public Order create(String userId, String commodityCode, int orderCount) {

        int orderMoney = calculate(commodityCode, orderCount);

        accountService.debit(userId, orderMoney);

        Order order = new Order();
        order.userId = userId;
        order.commodityCode = commodityCode;
        order.count = orderCount;
        order.money = orderMoney;

        // INSERT INTO orders ...
        return orderDAO.insert(order);
    }
}
```

## SEATA 的分布式交易解决方案

![](/img/solution.png)
我们只需要使用一个 `@GlobalTransactional` 注解在业务方法上: 

```java

    @GlobalTransactional
    public void purchase(String userId, String commodityCode, int orderCount) {
        ......
    }
```

## 由Dubbo + SEATA提供支持的示例

### 步骤 1：建立数据库

- 要求：具有InnoDB引擎的MySQL。

**注意:** 实际上，在示例用例中，这3个服务应该有3个数据库。 但是，为了简单起见，我们只能创建一个数据库并配置3个数据源。 

使用您刚创建的数据库 URL/username/password 修改Spring XML。

dubbo-account-service.xml
dubbo-order-service.xml
dubbo-storage-service.xml

```xml
        <property name="url" value="jdbc:mysql://x.x.x.x:3306/xxx" />
        <property name="username" value="xxx" />
        <property name="password" value="xxx" />
```
### 步骤 2：创建 UNDO_LOG 表

SEATA AT 模式需要 `UNDO_LOG` 表

```sql
-- 注意此处0.3.0+ 增加唯一索引 ux_undo_log
CREATE TABLE `undo_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `branch_id` bigint(20) NOT NULL,
  `xid` varchar(100) NOT NULL,
  `context` varchar(128) NOT NULL,
  `rollback_info` longblob NOT NULL,
  `log_status` int(11) NOT NULL,
  `log_created` datetime NOT NULL,
  `log_modified` datetime NOT NULL,
  `ext` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_undo_log` (`xid`,`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```

### 步骤 3：为示例业务创建表

```sql

DROP TABLE IF EXISTS `storage_tbl`;
CREATE TABLE `storage_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commodity_code` varchar(255) DEFAULT NULL,
  `count` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`commodity_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `order_tbl`;
CREATE TABLE `order_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `commodity_code` varchar(255) DEFAULT NULL,
  `count` int(11) DEFAULT 0,
  `money` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `account_tbl`;
CREATE TABLE `account_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `money` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
### 步骤 4: 启动服务

- 从 <https://github.com/seata/seata/releases>,下载服务器软件包，将其解压缩。

```shell
Usage: sh seata-server.sh(for linux and mac) or cmd seata-server.bat(for windows) [options]
  Options:
    --host, -h
      The host to bind.
      Default: 0.0.0.0
    --port, -p
      The port to listen.
      Default: 8091
    --storeMode, -m
      log store mode : file、db
      Default: file
    --help

e.g.

sh seata-server.sh -p 8091 -h 127.0.0.1 -m file
```

### 步骤 5: 运行示例

示例仓库: [seata-samples](https://github.com/seata/seata-samples)

- 启动 DubboAccountServiceStarter
- 启动 DubboStorageServiceStarter
- 启动 DubboOrderServiceStarter
- 运行 DubboBusinessTester for demo test

TBD: 运行演示应用程序的脚本
