---
title: SQL限制
keywords: Seata
description: Seata SQL限制
---

# SQL限制

Seata 事务目前支持 INSERT、UPDATE、DELETE 三类 DML 语法的部分功能，这些类型都是已经经过Seata开源社区的验证。SQL 的支持范围还在不断扩大，建议在本文限制的范围内使用。如果您有意帮助社区支持更多类型的SQL，请提交PR申请。

### 使用限制

- 不支持 SQL 嵌套
- 不支持多表复杂 SQL
- 不支持存储过程、触发器
- 不支持批量更新 SQL