---
title: Seata-go SQL Support
keywords: [Seata, Seata-go, SQL]
description: Seata-go AT Mode SQL Support
---

# Seata-go AT Mode SQL Support

This document details the current support status of Seata-go for DML statements, SQL clauses and modifiers, and various functions in AT mode. It is recommended to write business SQL within the limits of this article to ensure the stability and data consistency of distributed transactions.

### Usage restrictions

- Nested queries are not supported
- Stored procedures and triggers are not supported
- Does not support multi-table complex SQL (Currently, only MySQL database supports the UPDATE JOIN statement; other multi-table complex joins are not yet supported)
- Some databases do not support batch updates. Batch updates are supported when using MySQL as the database.

### DML Statement Support

The AT mode currently supports the core functions of three types of DML syntax: INSERT, UPDATE, and DELETE.

| Type | SQL Examples | Support |
| :--- | :--- | :--- |
| INSERT | `INSERT INTO tb1 (col_name,...) VALUES (...);` | Yes |
| INSERT ON DUPLICATE | `INSERT INTO tb1 (...) VALUES (...) ON DUPLICATE KEY UPDATE ...;` | Yes |
| UPDATE | `UPDATE tb1 SET col_name1=expr1 WHERE where_definition;` | Yes |
| UPDATE JOIN | `UPDATE tb1 JOIN tb2 ON tb1.id=tb2.id SET tb1.col=expr;` | Yes (Supported by MySQL) |
| DELETE | `DELETE FROM tb1 WHERE where_definition;` | Yes |
| SELECT | `SELECT select_expr, ... FROM tb1 WHERE where_definition;` | Yes |
| REPLACE | `REPLACE INTO tb1 (...) VALUES (...);` | No |
| TRUNCATE | `TRUNCATE TABLE tb1;` | No |

### SQL Clauses and Modifiers

Seata-go's transaction isolation level defaults to read uncommitted. In this mode, the SQL modifiers usage of select statements in this article's table is supported; using the `FOR UPDATE` proxy can make Seata achieve read committed. In this mode, the usage of select statements can only be partially supported.

**DML Statement Support**

In the WHERE condition of UPDATE or DELETE statements, the following conditions are supported:

| Type | Description |
| :--- | :--- |
| AND & OR | Supports multi-condition logical combinations |
| LIKE | Supports fuzzy queries and wildcards (e.g., `LIKE 'NE%'`) |
| BETWEEN | Supports range condition queries |

**Select Statement Support**

| Type | SQL Examples | Read Uncommitted | Read Committed |
| :--- | :--- | :--- | :--- |
| Basic conditions | `SELECT ... WHERE col1=ex1 AND col2=ex2` | Yes | Yes |
| Sorting and grouping | `ORDER BY` / `GROUP BY` | Yes | Yes |
| Fuzzy queries | `LIKE` / Wildcard `%` | Yes | Yes |
| Sub-conditions/ranges | `EXISTS` / `IN` / `BETWEEN` | Yes | Yes |
| Aliases mechanism | `SELECT t1.col FROM tb1 AS t1` | Yes | Yes |
| Result set pagination | `TOP` / `LIMIT` | Yes | Yes |
| Join queries | `INNER / LEFT / RIGHT / FULL JOIN` | Yes | No |
| Union results | `UNION` / `UNION ALL` | Yes | No |

### Functions Support

It is important to note that when using functions in DML statements, **they cannot be used as primary key columns or applied to primary key fields**, otherwise it will cause Seata-go to fail to accurately locate data rows when building the before/after image of the data.

**Scalar Functions**

In DQL statements and DML statements (non-primary key column assignment and condition filtering), the following standard functions are **supported**:

* **String functions**: `CONCAT, INSTR, LCASE, UCASE, LEFT, RIGHT, LENGTH, LOCATE, LPAD, RPAD, LTRIM, RTRIM, TRIM, REPEAT, REPLACE, STRCMP, SUBSTRING, SPACE, LOAD_FILE`
* **Numeric functions**: `ABS, BIN, CEILING, FLOOR, CONV, FORMAT, HEX, LEAST, MOD, POWER, RAND, ROUND, SIGN, SQRT`
* **Date and time functions**: `NOW, CURRENT_DATE, CURRENT_TIME, CURRENT_TIMESTAMP, DATE, DATE_ADD, DATE_SUB, DATE_FORMAT, STR_TO_DATE, DATEDIFF, TIMEDIFF, TIME_TO_SEC, SEC_TO_TIME, ADDTIME, CONVERT_TZ, EXTRACT, LAST_DAY, MAKEDATE, MAKETIME, YEAR, MONTH, MONTHNAME, DAY, DAYNAME, HOUR, MINUTE, MICROSECOND, DAYOFMONTH, DAYOFWEEK, DAYOFYEAR, WEEK`

**Aggregate Functions**

Aggregate functions (such as SUM, COUNT, etc.) will change the structure of the returned result set, and their support is limited by the current transaction isolation level:

| Type | In DML Statements | Read Uncommitted | Read Committed |
| :--- | :--- | :--- | :--- |
| FIRST() | No | Yes | No |
| LAST() | No | Yes | No |
| MIN() | No | Yes | No |
| MAX() | No | Yes | No |
| AVG() | No | Yes | No |
| SUM() | No | Yes | No |
| COUNT() | No | Yes | No |

### Complex Scenarios and Restrictions Not Yet Supported

1. **Multi-database ecosystem support**
   * **Java**: Supports MySQL, Oracle, PostgreSQL, TiDB, MariaDB, Dameng DB, and SQLServer.
   * **Go**: Only supports MySQL.
2. **SQL nesting and complex subqueries**
   * **Java**: Supports embedding simple subqueries in the WHERE condition to lock rows.
   * **Go**: Not supported. It cannot complete correct row positioning and snapshot assembly when encountering nested AST trees.
3. **Primary key generation strategies in non-MySQL ecosystems**
   * **Java**: Can proxy and recognize Oracle's SEQUENCE and PostgreSQL's SERIAL mechanisms.
   * **Go**: Not supported. Due to the lack of corresponding driver adaptation, the backfilled primary keys cannot be captured in these non-MySQL scenarios.
4. **Complex aliases and keyword parsing**
   * **Java**: Can clearly identify multi-layer AS alias nesting and accurately map it back to the physical original table.
   * **Go**: When facing multi-layer AS nesting or field names that happen to hit MySQL keywords (such as key, desc) with complex aliases, it is prone to parsing errors of "cannot find the original column name".
5. **Differences in REPLACE INTO statements**
   * **Java**: Strict interception at the entry point. Once this syntax is recognized during parsing, an unsupported exception will be thrown directly.
   * **Go**: Although the parser can recognize this syntax, the underlying execution and rollback files are not written, and business calls may cause distributed dirty data in the second phase.