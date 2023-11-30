---
title: Seata AT 模式
keywords: [Seata, AT]
description: Seata AT 模式用户文档
---

# Seata AT 模式

## 概述

AT 模式是 Seata 创新的一种非侵入式的分布式事务解决方案，Seata 在内部做了对数据库操作的代理层，我们使用 Seata AT 模式时，实际上用的是 Seata 自带的数据源代理 DataSourceProxy，Seata 在这层代理中加入了很多逻辑，比如插入回滚 undo_log 日志，检查全局锁等。

本文中，我们将重点介绍 Seata AT 模式的使用，如果您对于 AT 模式原理感兴趣，还请阅读对应于本篇文章的[开发者指南](../../dev/mode/at-mode)。



### 整体机制

两阶段提交协议的演变：

- 一阶段：业务数据和回滚日志记录在同一个本地事务中提交，释放本地锁和连接资源。
- 二阶段：
  - 提交异步化，非常快速地完成。
  - 回滚通过一阶段的回滚日志进行反向补偿。



## 基本使用

我们首先抽象一个使用场景，在用户购买行为的时候需要减少库存并减少账户余额，当库存表 `stock_tbl` 和 `account_tbl` 在同一个数据库时，我们可以使用关系数据库自身提供的能力非常容易实现事务。但如果这两个表分属于不同的数据源，我们就要使用 Seata 提供的分布式事务能力了。

观察下方的示例代码，

```java
@GlobalTransactional
public void purchase(String userId, String commodityCode, int count, int money) {
    jdbcTemplateA.update("update stock_tbl set count = count - ? where commodity_code = ?", new Object[] {count, commodityCode});
    jdbcTemplateB.update("update account_tbl set money = money - ? where user_id = ?", new Object[] {money, userId});
}
```

如果您曾使用过 Spring 框架 `@Transactional` 注解的话，也可以根据命名类比理解 `@GlobalTransactional` 的功能。是的，这里只是引入了一个注解就轻松实现了分布式事务能力，使用 AT 模式可以最小程度减少业务改造成本。

同时，需要注意的是，`jdbcTemplateA` 和 `jdbcTemplateB` 使用了不同的数据源进行构造，而这两个不同的数据源都需要使用 Seata 提供的 AT 数据源代理类 `DataSourceProxy` 进行包装。有关数据源代理帮助我们做了什么，请阅读附录中的[事务隔离](../appendix/isolation#从代理数据源说起)。



## 快速开始

请跟随 [快速启动](../quickstart) 章节上手一个完整的示例。
