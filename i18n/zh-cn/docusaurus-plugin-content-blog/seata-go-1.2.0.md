---
title: 生产环境可用的 seata-go 1.2.0 来了！！！
author: Seata社区
keywords: [seata、分布式事务、golang、1.2.0]
description: 生产环境可用的 seata-go 1.2.0 来了！！！
date: 2023/06/08
---

## 生产环境可用的 seata-go 1.2.0 来了

Seata 是一款开源的分布式事务解决方案，提供高性能和简单易用的分布式事务服务。

### 发布概览

Seata-go 1.2.0 版本支持 XA 模式。XA 协议是由 X/Open 组织提出的分布式事务处理规范，其优点是对业务代码无侵入。当前 Seata-go 的 XA 模式支持 MySQL 数据库。至此，seata-go 已经集齐 AT、TCC 和 XA 三种事务模式。 XA 模式的主要功能:

- 支持了 XA 数据源代理 https://github.com/apache/incubator-seata-go-samples/tree/main/xa
- 支持了 XA 事务模式
  XA 相关的 sampes 可以参考示例：https://github.com/apache/incubator-seata-go-samples/tree/main/xa

### feature

- [[#467](https://github.com/apache/incubator-seata-go/pull/467)] 实现 XA 模式支持 MySQL
- [[#534](https://github.com/apache/incubator-seata-go/pull/534)] 支持 session 的负载均衡

### bugfix

- [[#540](https://github.com/apache/incubator-seata-go/pull/540)] 修复初始化 xa 模式的 bug
- [[#545](https://github.com/apache/incubator-seata-go/pull/545)] 修复 xa 模式获取 db 版本号的 bug
- [[#548](https://github.com/apache/incubator-seata-go/pull/548)] 修复启动 xa 会失败的 bug
- [[#556](https://github.com/apache/incubator-seata-go/pull/556)] 修复 xa 数据源的 bug
- [[#562](https://github.com/apache/incubator-seata-go/pull/562)] 修复提交 xa 全局事务的 bug
- [[#564](https://github.com/apache/incubator-seata-go/pull/564)] 修复提交 xa 分支事务的 bug
- [[#566](https://github.com/apache/incubator-seata-go/pull/566)] 修复使用 xa 数据源执行本地事务的 bug

### optimize

- [[#523](https://github.com/apache/incubator-seata-go/pull/523)] 优化 CI 流程
- [[#525](https://github.com/apache/incubator-seata-go/pull/525)] 将 jackson 序列化重命名为 json
- [[#532](https://github.com/apache/incubator-seata-go/pull/532)] 移除重复的代码
- [[#536](https://github.com/apache/incubator-seata-go/pull/536)] 优化 go import 代码格式
- [[#554](https://github.com/apache/incubator-seata-go/pull/554)] 优化 xa 模式的性能
- [[#561](https://github.com/apache/incubator-seata-go/pull/561)] 优化 xa 模式的日志输出

### test

- [[#535](https://github.com/apache/incubator-seata-go/pull/535)] 添加集成测试

### doc

- [[#550](https://github.com/apache/incubator-seata-go/pull/550)] 添加 1.2.0 版本的改动日志

### contributors

Thanks to these contributors for their code commits. Please report an unintended omission.

- [georgehao](https://github.com/georgehao)
- [luky116](https://github.com/luky116)
- [jasondeng1997](https://github.com/jasondeng1997)
- [106umao](https://github.com/106umao)
- [wang1309](https://github.com/wang1309)
- [iSuperCoder](https://github.com/iSuperCoder)
- [Charlie17Li](https://github.com/Charlie17Li)
- [Code-Fight](https://github.com/Code-Fight)
- [Kirhaku](https://github.com/Kirhaku)
- [Vaderkai](https://github.com/VaderKai)

#### Link

- https://github.com/apache/incubator-seata
- https://github.com/apache/incubator-seata-go
- https://github.com/apache/incubator-seata-samples
- https://github.com/apache/incubator-seata-go-samples
- https://seata.apache.org
