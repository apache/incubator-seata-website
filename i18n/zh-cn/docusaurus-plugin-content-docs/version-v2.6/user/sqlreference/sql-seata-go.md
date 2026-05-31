---
title: Seata-go SQL支持
keywords: [Seata, Seata-go, SQL]
description: Seata-go AT 模式 SQL 支持
---

# Seata-go AT 模式 SQL 支持

本篇文档详细列出了 Seata-go 在 AT 模式下对 DML 语句、SQL 修饰及各类函数的支持现状。建议在本文限制的范围内编写业务 SQL，以确保分布式事务的稳定与数据一致性。

### 使用限制

- 不支持 SQL 嵌套
- 不支持存储过程、触发器
- 不支持多表复杂 SQL（目前仅 MySQL 数据库支持 UPDATE JOIN 语句，其余多表复杂联表暂不支持）
- 部分数据库不支持批量更新，在使用 MySQL 作为数据库时支持批量更新

### DML 语句支持

AT 模式目前支持 INSERT、UPDATE、DELETE 三类 DML 语法的核心功能。

| 类型 | SQL 实例 | 是否支持 |
| :--- | :--- | :--- |
| INSERT | `INSERT INTO tb1 (col_name,...) VALUES (...);` | 是 |
| INSERT ON DUPLICATE | `INSERT INTO tb1 (...) VALUES (...) ON DUPLICATE KEY UPDATE ...;` | 是 |
| UPDATE | `UPDATE tb1 SET col_name1=expr1 WHERE where_definition;` | 是 |
| UPDATE JOIN | `UPDATE tb1 JOIN tb2 ON tb1.id=tb2.id SET tb1.col=expr;` | 是 (MySQL支持) |
| DELETE | `DELETE FROM tb1 WHERE where_definition;` | 是 |
| SELECT | `SELECT select_expr, ... FROM tb1 WHERE where_definition;` | 是 |
| REPLACE | `REPLACE INTO tb1 (...) VALUES (...);` | 否 |
| TRUNCATE | `TRUNCATE TABLE tb1;` | 否 |

### SQL 修饰

Seata-go 的事务隔离级别默认为读未提交。该模式下本文表中的 select 语句的 SQL 修饰用法都是支持的；使用 for update 代理可以达到读已提交，该模式下 select 语句的用法只能部分支持。

**DML 语句支持**

在 UPDATE 或 DELETE 语句的 WHERE 条件中，支持以下修饰：

| 类型 | 说明 |
| :--- | :--- |
| AND & OR | 支持多条件逻辑组合 |
| LIKE | 支持模糊查询及通配符（如 `LIKE 'NE%'`） |
| BETWEEN | 支持范围条件查询 |

**Select 语句支持**

| 类型 | SQL 实例 | 读未提交 | 读已提交 |
| :--- | :--- | :--- | :--- |
| 基础条件 | `SELECT ... WHERE col1=ex1 AND col2=ex2` | 是 | 是 |
| 排序与分组 | `ORDER BY` / `GROUP BY` | 是 | 是 |
| 模糊查询 | `LIKE` / 通配符 `%` | 是 | 是 |
| 子条件/范围 | `EXISTS` / `IN` / `BETWEEN` | 是 | 是 |
| 别名机制 | `SELECT t1.col FROM tb1 AS t1` | 是 | 是 |
| 结果集分页 | `TOP` / `LIMIT` | 是 | 是 |
| 联表查询 | `INNER / LEFT / RIGHT / FULL JOIN` | 是 | 否 |
| 联合结果 | `UNION` / `UNION ALL` | 是 | 否 |

### 函数支持

需要注意的是，在 DML 语句中使用函数时，**不能将其作为主键列或作用于主键字段**，否则会导致 Seata-go 在构建数据前后快照（Before/After Image）时无法精准定位数据行。

**标量函数**

在 DQL 语句以及 DML 语句（非主键列赋值与条件过滤）中，**支持**以下标准函数：

* **字符串函数**：`CONCAT, INSTR, LCASE, UCASE, LEFT, RIGHT, LENGTH, LOCATE, LPAD, RPAD, LTRIM, RTRIM, TRIM, REPEAT, REPLACE, STRCMP, SUBSTRING, SPACE, LOAD_FILE`
* **数值函数**：`ABS, BIN, CEILING, FLOOR, CONV, FORMAT, HEX, LEAST, MOD, POWER, RAND, ROUND, SIGN, SQRT`
* **日期与时间函数**：`NOW, CURRENT_DATE, CURRENT_TIME, CURRENT_TIMESTAMP, DATE, DATE_ADD, DATE_SUB, DATE_FORMAT, STR_TO_DATE, DATEDIFF, TIMEDIFF, TIME_TO_SEC, SEC_TO_TIME, ADDTIME, CONVERT_TZ, EXTRACT, LAST_DAY, MAKEDATE, MAKETIME, YEAR, MONTH, MONTHNAME, DAY, DAYNAME, HOUR, MINUTE, MICROSECOND, DAYOFMONTH, DAYOFWEEK, DAYOFYEAR, WEEK`

**聚合函数**

聚合函数（如 SUM、COUNT 等）会改变返回的结果集结构，其支持情况受到当前事务隔离级别的限制：

| 类型 | DML 语句中 | 读未提交 | 读已提交 |
| :--- | :--- | :--- | :--- |
| FIRST() | 否 | 是 | 否 |
| LAST() | 否 | 是 | 否 |
| MIN() | 否 | 是 | 否 |
| MAX() | 否 | 是 | 否 |
| AVG() | 否 | 是 | 否 |
| SUM() | 否 | 是 | 否 |
| COUNT() | 否 | 是 | 否 |

### 暂不支持的复杂场景与限制

1. **多数据库生态支持**
   - **Java**：支持 MySQL、Oracle、PostgreSQL、TiDB、MariaDB、Dameng DB、SQLServer。
   - **Go**：仅支持 MySQL。
2. **SQL 嵌套与复杂子查询**
   - **Java**：支持在 WHERE 条件中嵌入简单的子查询来锁定行。
   - **Go**：不支持。遇到嵌套 AST 树时无法完成正确的行定位和快照拼装。
3. **非 MySQL 生态的主键生成策略**
   - **Java**：可以代理并识别 Oracle 的 SEQUENCE、PostgreSQL 的 SERIAL 机制。
   - **Go**：不支持。由于缺乏对应的驱动适配，在这些非 MySQL 场景下无法捕获回填的主键。
4. **复杂别名与关键字解析**
   - **Java**：能清晰辨认多层 AS 别名嵌套并精准映射回物理原表。
   - **Go**：面对多层 AS 嵌套或者字段名刚好撞上 MySQL 关键字（如 key、desc）且带有复杂别名时，易发生“找不到原始列名”的解析报错。
5. **REPLACE INTO 语句差异**
   - **Java**：入口硬拦截。解析时一旦识别到该语法会直接抛出不支持异常。
   - **Go**：解析器虽然能认出该语法，但底层没有写执行和回滚文件，业务调用可能会在二阶段引发分布式脏数据。