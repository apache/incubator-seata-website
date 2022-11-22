---
title: Seata ORM框架支持
keywords: Seata
description: Seata ORM框架支持。
---

# ORM框架支持
Seata 虽然是保证数据一致性的组件，但对于 ORM 框架并没有特殊的要求，像主流的Mybatis，Mybatis-Plus，Spring Data JPA,
Hibernate等都支持。这是因为ORM框架位于JDBC结构的上层，而 Seata 的 AT,XA 事务模式是对 JDBC 标准接口操作的拦截和增强。