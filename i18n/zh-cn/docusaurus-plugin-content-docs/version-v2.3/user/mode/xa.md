---
title: Seata XA 模式
keywords: [Seata, XA]
description: Seata XA 模式用户文档
---

# Seata XA 模式

## 概述

XA 模式是从 1.2 版本支持的事务模式。XA 规范 是 X/Open 组织定义的分布式事务处理（DTP，Distributed Transaction Processing）标准。Seata XA 模式是利用事务资源（数据库、消息服务等）对 XA 协议的支持，以 XA 协议的机制来管理分支事务的一种事务模式。

<img src="https://img.alicdn.com/tfs/TB1hSpccIVl614jSZKPXXaGjpXa-1330-924.png" style={{ zoom:'50%' }} />

本文中，我们将重点介绍 Seata XA 模式的使用，如果您对于 XA 模式原理感兴趣，还请阅读对应于本篇文章的[开发者指南](../../dev/mode/xa-mode)。

### 优势

与 Seata 支持的其它事务模式不同，XA 协议要求事务资源本身提供对规范和协议的支持，所以事务资源（如数据库）可以保障从任意视角对数据的访问有效隔离，满足全局数据一致性。此外的一些优势还包括：

1. 业务无侵入：和 AT 一样，XA 模式将是业务无侵入的，不给应用设计和开发带来额外负担。
2. 数据库的支持广泛：XA 协议被主流关系型数据库广泛支持，不需要额外的适配即可使用。

### 缺点

XA prepare 后，分支事务进入阻塞阶段，收到 XA commit 或 XA rollback 前必须阻塞等待。事务资源长时间得不到释放，锁定周期长，而且在应用层上面无法干预，性能差。

### 适用场景

适用于想要迁移到 Seata 平台基于 XA 协议的老应用，使用 XA 模式将更平滑，还有 AT 模式未适配的数据库应用。

## 整体机制

- 执行阶段：
  - 可回滚：业务 SQL 操作放在 XA 分支中进行，由资源对 XA 协议的支持来保证 *可回滚*
  - 持久化：XA 分支完成后，执行 XA prepare，同样，由资源对 XA 协议的支持来保证 *持久化*（即，之后任何意外都不会造成无法回滚的情况）
- 完成阶段：
  - 分支提交：执行 XA 分支的 commit
  - 分支回滚：执行 XA 分支的 rollback

## 基本使用

XA 模式使用起来与 AT 模式基本一致，用法上的唯一区别在于数据源代理的替换：使用 `DataSourceProxyXA` 来替代 `DataSourceProxy`。

```java
public class DataSourceProxy {
    @Bean("dataSourceProxy")
    public DataSource dataSource(DruidDataSource druidDataSource) {
        // DataSourceProxyXA for XA mode
        return new DataSourceProxyXA(druidDataSource);
        // DataSourceProxy for AT mode
        // return new DataSourceProxy(druidDataSource);
    }
}
```

## 快速开始

请跟随 [seata-samples/xa](https://github.com/apache/incubator-seata-samples/tree/master/tcc) 中的示例进行实验。

