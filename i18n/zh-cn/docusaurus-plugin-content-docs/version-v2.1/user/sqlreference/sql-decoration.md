---
title: SQL修饰
keywords: [Seata]
description: Seata SQL修饰
---

# SQL 修饰

Seata 的隔离级别默认为读未提交，该模式下本文表中的 select 语句的 SQL 修饰用法都是支持的；使用 for update 代理可以让 Seata 达到读已提交，该模式下 select 语句的用法只能部分支持。

### DML 语句支持

| 类型         | SQL 实例                                              | 是否支持                                                               |
| :----------- | :---------------------------------------------------- | :--------------------------------------------------------------------- | --- |
| AND & OR     | `UPDATE … WHERE col_name1=expr1 AND col_name2= expr2` | 是                                                                     |
| LIKE         | `UPDATE ... WHERE col_name1 LIKE 'NE'`                | 是                                                                     |
| 通配符       | `UPDATE ... WHERE col_name1 LIKE 'NE%'`               | 是                                                                     |
| BETWEEN      | `UPDATE ... WHERE col_name1 BETWEEN expr1 AND expr2`  | 是                                                                     |
| ON DUPLICATE | `INSERT INTO tb1_name [(col_name,...)]VALUES (\{expr  | DEFAULT},...),(...),...[ ON DUPLICATE KEY UPDATE col_name=expr, ... ]` | 是  |

### Select 语句支持

| 类型                                       | SQL 实例                                                                                                                     | 读未提交 | 读已提交 |
| :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :------- | :------- |
| AND & OR                                   | `SELECT * FROM tb1_name WHERE col_name1=expr1 AND col_name2= expr2`                                                          | 是       | 是       |
| ORDER BY                                   | `SELECT col_name1, col_name2 FROM tb1_name ORDER BY col_name1`                                                               | 是       | 是       |
| GROUP BY                                   | `SELECT col_name1, col_name2 FROM tb1_name GROUP BY col_name1`                                                               | 是       | 是       |
| LIKE                                       | `SELECT col_name1, col_name2 FROM tb1_name WHERE col_name1 LIKE 'NE'`                                                        | 是       | 是       |
| 通配符                                     | `SELECT col_name1, col_name2 FROM tb1_name WHERE col_name1 LIKE 'NE%'`                                                       | 是       | 是       |
| EXISTS                                     | `SELECT col_name1, col_name2 FROM tb1_name WHERE EXISTS (expr1)`                                                             | 是       | 是       |
| IN                                         | `SELECT col_name1, col_name2 FROM tb1_name WHERE col_name1 IN (expr1, expr2,...)`                                            | 是       | 是       |
| BETWEEN                                    | `SELECT col_name1, col_name2 FROM tb1_name WHERE col_name1 BETWEEN expr1 AND expr2`                                          | 是       | 是       |
| ON DUPLICATE                               | INSERT INTO tb1_name [(col_name,...)]VALUES (\{expr \| DEFAULT},...),(...),...[ ON DUPLICATE KEY UPDATE col_name=expr, ... ] | 是       | 是       |
| ALIASES                                    | `SELECT t1. col_name1, t2.col_name2 FROM tb1_name AS t1, tb2_name AS t2 WHERE t1. col_name=expr AND t2. col_name=expr`       | 是       | 是       |
| TOP                                        | `SELECT TOP 2 * FROM tb1_name`                                                                                               | 是       | 是       |
| LIMIT                                      | `SELECT col_name1, col_name2 FROM tb1_name LIMIT 5`                                                                          | 是       | 是       |
| JOININNER JOINLEFT JOINRIGHT JOINFULL JOIN | `SELECT col_name1, col_name2 FROM tb1_name JOIN tb2_name>ON tb1_name. col_name1= tb2_name. col_name1`                        | 是       | 否       |
| UNIONUNION ALLSELECT INTO                  | `SELECT col_name1, col_name2 FROM tb1_name UNION SELECT col_name1, col_name2 FROM tb2_name`                                  | 是       | 否       |
