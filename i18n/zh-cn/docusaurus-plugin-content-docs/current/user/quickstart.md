---
title: 快速启动
keywords: [Seata, 分布式事务, 微服务, 快速开始]
description: 通过一个微服务示例，15 分钟快速上手 Seata。
---

# 快速开始

本指南将通过一个实际的微服务示例，帮助您快速上手 Seata。您将学习如何将 Seata 集成到分布式系统中，并实现分布式事务管理。

**预计用时：** 15-20 分钟

## 前置条件

开始之前，请确保您已安装并配置以下环境：

- **Java 开发工具包（JDK）**：版本 8 或更高
- **Maven**：版本 3.x 或更高
- **MySQL**：版本 5.7 或更高，使用 InnoDB 引擎
- **Git**：用于克隆示例代码仓库

## 业务场景介绍

我们将使用一个典型的电商场景：**用户购买商品**。该业务逻辑涉及三个独立的微服务：

- **账户服务（Account Service）**：管理用户账户余额，购买时扣减账户金额
- **订单服务（Order Service）**：创建和管理订单
- **库存服务（Stock Service）**：管理商品库存，购买时扣减库存数量

### 分布式事务的挑战

在微服务架构中，每个服务都有自己独立的数据库。当用户购买商品时：

1. **库存服务**扣减商品库存
2. **订单服务**创建订单记录
3. **账户服务**扣减账户余额

这些操作必须**要么全部成功，要么全部失败**。如果账户扣款失败（例如余额不足），则库存和订单也应该回滚。这就是 Seata 要解决的典型分布式事务问题。

### 架构图

![架构图](/img/architecture.png)

### 服务接口定义

**StockService** - 库存管理

```java
public interface StockService {
    /**
     * 扣减指定商品的库存数量
     * @param commodityCode 商品编码
     * @param count 扣减数量
     */
    void deduct(String commodityCode, int count);
}
```

**OrderService** - 订单管理

```java
public interface OrderService {
    /**
     * 创建新订单
     * @param userId 用户ID
     * @param commodityCode 商品编码
     * @param orderCount 购买数量
     * @return 创建的订单
     */
    Order create(String userId, String commodityCode, int orderCount);
}
```

**AccountService** - 账户管理

```java
public interface AccountService {
    /**
     * 从用户账户扣款
     * @param userId 用户ID
     * @param money 扣款金额
     */
    void debit(String userId, int money);
}
```

### 业务逻辑实现

**主业务服务** - 编排购买流程

```java
public class BusinessServiceImpl implements BusinessService {

    private StockService stockService;
    private OrderService orderService;

    /**
     * 执行购买业务
     * 该方法协调多个微服务的调用
     */
    public void purchase(String userId, String commodityCode, int orderCount) {
        // 步骤 1：扣减库存
        stockService.deduct(commodityCode, orderCount);

        // 步骤 2：创建订单（同时会扣减账户余额）
        orderService.create(userId, commodityCode, orderCount);
    }
}
```

**订单服务实现** - 创建订单并扣款

```java
public class OrderServiceImpl implements OrderService {

    private OrderDAO orderDAO;
    private AccountService accountService;

    public Order create(String userId, String commodityCode, int orderCount) {
        // 计算订单金额
        int orderMoney = calculate(commodityCode, orderCount);

        // 步骤 1：扣减用户账户余额
        accountService.debit(userId, orderMoney);

        // 步骤 2：创建订单记录
        Order order = new Order();
        order.userId = userId;
        order.commodityCode = commodityCode;
        order.count = orderCount;
        order.money = orderMoney;

        // 持久化订单到数据库
        return orderDAO.insert(order);
    }
}
```

## Seata 的解决方案

Seata 提供了简单优雅的解决方案来管理跨多个微服务的分布式事务。

![Seata 解决方案](/img/solution.png)

### 工作原理

使用 Seata，您只需要在业务方法上添加一个 `@GlobalTransactional` 注解：

```java
@GlobalTransactional
public void purchase(String userId, String commodityCode, int orderCount) {
    // 该方法内的所有操作现在都是全局事务的一部分
    stockService.deduct(commodityCode, orderCount);
    orderService.create(userId, commodityCode, orderCount);
    // 如果任何操作失败，所有更改都将自动回滚
}
```

就是这么简单！Seata 会帮您处理：
- **协调**：管理两阶段提交协议
- **回滚**：如果任何服务失败，自动回滚所有更改
- **一致性**：确保所有微服务之间的数据一致性

## 实战示例：Dubbo + Seata

现在让我们使用 Dubbo 作为 RPC 框架，Seata 作为分布式事务管理器，搭建一个可运行的示例。

### 步骤 1：配置数据库

**环境要求：**
- MySQL 5.7+ 使用 InnoDB 引擎
- 创建名为 `seata_example` 的数据库

**创建数据库：**

为了简化示例，我们使用一个数据库和三张独立的表。在生产环境中，通常每个服务会使用独立的数据库。

```sql
CREATE DATABASE IF NOT EXISTS seata_example DEFAULT CHARSET utf8mb4;
USE seata_example;
```

### 步骤 2：创建 UNDO_LOG 表

Seata 的 AT 模式需要 `UNDO_LOG` 表来存储每个服务的回滚信息。

**为什么需要这张表？**
Seata 使用此表记录数据变更前后的快照，以便在事务失败时能够自动回滚。

执行以下 SQL：

```sql
CREATE TABLE IF NOT EXISTS `undo_log`
(
    `branch_id`     BIGINT       NOT NULL COMMENT '分支事务ID',
    `xid`           VARCHAR(128) NOT NULL COMMENT '全局事务ID',
    `context`       VARCHAR(128) NOT NULL COMMENT 'undo_log 上下文，如序列化配置',
    `rollback_info` LONGBLOB     NOT NULL COMMENT '回滚信息',
    `log_status`    INT(11)      NOT NULL COMMENT '0:正常状态,1:防御状态',
    `log_created`   DATETIME(6)  NOT NULL COMMENT '创建时间',
    `log_modified`  DATETIME(6)  NOT NULL COMMENT '修改时间',
    UNIQUE KEY `ux_undo_log` (`xid`, `branch_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8mb4
  COMMENT = 'AT 事务模式 undo 日志表';

-- 添加索引以优化性能
ALTER TABLE `undo_log` ADD INDEX `ix_log_created` (`log_created`);
```

:::tip
您可以在 [Seata GitHub 仓库](https://github.com/apache/incubator-seata/tree/2.x/script/client/at/db) 中找到适用于不同数据库的最新 SQL 脚本。
:::

### 步骤 3：创建业务表

为三个服务创建对应的业务表：

```sql
-- 库存服务表
DROP TABLE IF EXISTS `stock_tbl`;
CREATE TABLE `stock_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commodity_code` varchar(255) DEFAULT NULL,
  `count` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`commodity_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 订单服务表
DROP TABLE IF EXISTS `order_tbl`;
CREATE TABLE `order_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `commodity_code` varchar(255) DEFAULT NULL,
  `count` int(11) DEFAULT 0,
  `money` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 账户服务表
DROP TABLE IF EXISTS `account_tbl`;
CREATE TABLE `account_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `money` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

**插入测试数据：**

```sql
-- 添加测试商品和初始库存
INSERT INTO stock_tbl (commodity_code, count) VALUES ('PRODUCT_001', 100);

-- 添加测试用户和初始余额
INSERT INTO account_tbl (user_id, money) VALUES ('USER_001', 1000);
```

### 步骤 4：下载并启动 Seata Server

**下载 Seata Server：**

1. 访问 [Seata Releases 页面](https://github.com/apache/incubator-seata/releases)
2. 下载最新版本（例如 `seata-server-2.x.x.zip`）
3. 解压压缩包

**启动服务器：**

Linux/Mac 系统：

```bash
cd seata-server-2.x.x
sh ./bin/seata-server.sh -p 8091 -h 127.0.0.1 -m file
```

Windows 系统：

```cmd
cd seata-server-2.x.x
bin\seata-server.bat -p 8091 -h 127.0.0.1 -m file
```

**可用参数说明：**

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `-h, --host` | 暴露给注册中心的 IP 地址 | 0.0.0.0 |
| `-p, --port` | 监听端口 | 8091 |
| `-m, --storeMode` | 事务日志存储模式：`file` 或 `db` | file |

**验证服务器启动成功：**

您应该看到类似以下的输出：

```
Server started, listen port: 8091
```

### 步骤 5：运行示例应用

**克隆示例代码仓库：**

```bash
git clone https://github.com/apache/incubator-seata-samples.git
cd incubator-seata-samples/at-sample/springboot-dubbo-seata
```

**配置数据库连接：**

编辑每个服务的配置文件以使用您的数据库：

- `account-service/src/main/resources/application.properties`
- `order-service/src/main/resources/application.properties`
- `stock-service/src/main/resources/application.properties`

更新数据库连接配置：

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/seata_example
spring.datasource.username=您的数据库用户名
spring.datasource.password=您的数据库密码
```

**构建并启动服务：**

```bash
# 构建所有服务
mvn clean install

# 在不同的终端窗口启动各个服务：

# 终端 1 - 账户服务
cd account-service
mvn spring-boot:run

# 终端 2 - 订单服务
cd order-service
mvn spring-boot:run

# 终端 3 - 库存服务
cd stock-service
mvn spring-boot:run

# 终端 4 - 业务服务
cd business-service
mvn spring-boot:run
```

### 步骤 6：测试分布式事务

所有服务启动后，您可以测试分布式事务：

**成功场景：**

```bash
curl -X POST http://localhost:8084/purchase \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_001",
    "commodityCode": "PRODUCT_001",
    "orderCount": 1
  }'
```

**预期结果：**
- 订单创建成功
- 库存扣减成功
- 账户余额减少
- 检查数据库验证所有更改

**失败场景（余额不足）：**

修改账户余额为不足的金额：

```sql
UPDATE account_tbl SET money = 1 WHERE user_id = 'USER_001';
```

再次尝试购买 - 整个事务应该回滚：

```bash
curl -X POST http://localhost:8084/purchase \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_001",
    "commodityCode": "PRODUCT_001",
    "orderCount": 1
  }'
```

**预期结果：**
- 事务失败
- 没有创建订单
- 库存数量保持不变
- 账户余额保持不变

## 验证

查看 Seata 日志以观察事务协调过程：

```bash
tail -f seata-server-2.x.x/logs/seata-server.log
```

您应该看到显示以下内容的日志：
- 全局事务开始
- 分支事务注册
- 两阶段提交或回滚

## 下一步

恭喜！您已经成功使用 Seata 搭建并运行了分布式事务。接下来您可以探索：

- **[事务模式](../dev/mode/at-mode)**：了解不同的事务模式（AT、TCC、SAGA、XA）
- **[微服务集成](./microservice)**：将 Seata 集成到各种微服务框架
- **[生产部署](../ops/deploy-guide-beginner)**：在生产环境部署 Seata Server
- **[性能优化](./performance)**：针对高性能场景优化 Seata
- **[配置指南](./configuration/)**：针对不同场景配置 Seata

## 故障排查

**服务无法连接到 Seata Server**
- 验证 Seata Server 是否在 8091 端口运行
- 检查防火墙设置
- 确保服务配置中的主机和端口与 Seata Server 匹配

**事务没有回滚**
- 验证是否添加了 `@GlobalTransactional` 注解
- 检查所有数据库中是否存在 `UNDO_LOG` 表
- 查看应用日志中的错误信息

**数据库连接错误**
- 验证配置文件中的数据库凭据
- 确保 MySQL 正在运行且可访问
- 检查数据库和表是否存在

更多故障排查技巧，请访问 [常见问题](../overview/faq) 或查看我们的 [贡献指南](../developers/guide_dev)。

## RocketMQ 接入 Seata

使用 RocketMQ 作为 Seata 分布式事务的参与者非常简单。首先，确保已经引入了 seata-all 或者 seata 的 springboot-starter 依赖。

通过 `SeataMQProducerFactory` 创建生产者，然后通过 `SeataMQProducer` 可以直接使用 RocketMQ 发送消息。以下是一个示例：

```java
public class BusinessServiceImpl implements BusinessService {
    private static final String NAME_SERVER = "127.0.0.1:9876";
    private static final String PRODUCER_GROUP = "test-group";
    private static final String TOPIC = "test-topic";
    private static SeataMQProducer producer = SeataMQProducerFactory.createSingle(NAME_SERVER, PRODUCER_GROUP);

    public void purchase(String userId, String commodityCode, int orderCount) {
        producer.send(new Message(TOPIC, "testMessage".getBytes(StandardCharsets.UTF_8)));
        // 执行其他业务逻辑
    }
}
```

这样达到的效果是：生产消息作为 Seata 分布式事务的参与者 RM，当全局事务的一阶段完成，这个 MQ 消息会根据二阶段要求 commit/rollback 进行消息的提交或撤回，在此之前消息不会被消费。

:::note
如果当前线程中没有 xid，该 producer 会退化为普通的 send，而不是发送半消息。
:::
