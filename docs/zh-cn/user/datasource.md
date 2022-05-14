---
title: Seata 数据源支持
keywords: Seata
description: Seata 数据源支持。
---

# 数据源支持
## AT模式
AT模式支持的数据库有：MySQL、Oracle、PostgreSQL、 TiDB、MariaDB。

## TCC模式
TCC模式不依赖数据源(1.4.2版本及之前)，1.4.2版本之后增加了TCC防悬挂措施，需要数据源支持。

## Saga模式

Saga模式不依赖数据源。

## XA模式

XA模式只支持实现了XA协议的数据库。Seata支持MySQL、Oracle、PostgreSQL和MariaDB。
