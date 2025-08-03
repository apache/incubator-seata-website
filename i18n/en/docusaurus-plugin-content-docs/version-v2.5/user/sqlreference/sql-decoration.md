---
title: SQL Decoration
keywords: [Seata]
description: Seata SQL Decoration
---

# SQL Decoration

Seata's isolation level defaults to read uncommitted. In this mode, the SQL decoration usage of select statements in this article table is supported. Using for update proxy can make Seata achieve read committed. In this mode, the usage of select statements can only be partially supported.

### DML Statement Support

| Type         | SQL Example                                           | Supported or not                                                       |
| :----------- | :---------------------------------------------------- | :--------------------------------------------------------------------- | --- |
| AND & OR     | `UPDATE … WHERE col_name1=expr1 AND col_name2= expr2` | Yes                                                                    |
| LIKE         | `UPDATE ... WHERE col_name1 LIKE 'NE'`                | Yes                                                                    |
| Wildcard     | `UPDATE ... WHERE col_name1 LIKE 'NE%'`               | Yes                                                                    |
| BETWEEN      | `UPDATE ... WHERE col_name1 BETWEEN expr1 AND expr2`  | Yes                                                                    |
| ON DUPLICATE | `INSERT INTO tb1_name [(col_name,...)]VALUES (\{expr  | DEFAULT},...),(...),...[ ON DUPLICATE KEY UPDATE col_name=expr, ... ]` | Yes |

### Select Statement Support

| Type                                       | SQL Example                                                                                                                  | Read Uncommitted | Read Committed |
| :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :--------------- | :------------- |
| AND & OR                                   | `SELECT * FROM tb1_name WHERE col_name1=expr1 AND col_name2= expr2`                                                          | Yes              | Yes            |
| ORDER BY                                   | `SELECT col_name1, col_name2 FROM tb1_name ORDER BY col_name1`                                                               | Yes              | Yes            |
| GROUP BY                                   | `SELECT col_name1, col_name2 FROM tb1_name GROUP BY col_name1`                                                               | Yes              | Yes            |
| LIKE                                       | `SELECT col_name1, col_name2 FROM tb1_name WHERE col_name1 LIKE 'NE'`                                                        | Yes              | Yes            |
| Wildcards                                  | `SELECT col_name1, col_name2 FROM tb1_name WHERE col_name1 LIKE 'NE%'`                                                       | Yes              | Yes            |
| EXISTS                                     | `SELECT col_name1, col_name2 FROM tb1_name WHERE EXISTS (expr1)`                                                             | Yes              | Yes            |
| IN                                         | `SELECT col_name1, col_name2 FROM tb1_name WHERE col_name1 IN (expr1, expr2,...)`                                            | Yes              | Yes            |
| BETWEEN                                    | `SELECT col_name1, col_name2 FROM tb1_name WHERE col_name1 BETWEEN expr1 AND expr2`                                          | Yes              | Yes            |
| ON DUPLICATE                               | INSERT INTO tb1_name [(col_name,...)]VALUES (\{expr \| DEFAULT},...),(...),...[ ON DUPLICATE KEY UPDATE col_name=expr, ... ] | Yes              | Yes            |
| ALIASES                                    | `SELECT t1. col_name1, t2.col_name2 FROM tb1_name AS t1, tb2_name AS t2 WHERE t1. col_name=expr AND t2. col_name=expr`       | Yes              | Yes            |
| TOP                                        | `SELECT TOP 2 * FROM tb1_name`                                                                                               | Yes              | Yes            |
| LIMIT                                      | `SELECT col_name1, col_name2 FROM tb1_name LIMIT 5`                                                                          | Yes              | Yes            |
| JOININNER JOINLEFT JOINRIGHT JOINFULL JOIN | `SELECT col_name1, col_name2 FROM tb1_name JOIN tb2_name>ON tb1_name. col_name1= tb2_name. col_name1`                        | Yes              | No             |
| UNIONUNION ALLSELECT INTO                  | `SELECT col_name1, col_name2 FROM tb1_name UNION SELECT col_name1, col_name2 FROM tb2_name`                                  | Yes              | No             |
