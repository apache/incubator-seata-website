---
title: DML语句
keywords: [Seata]
description: Seata DML语句
---

# DML语句

本文介绍 DML 语句类型、SQL 实例以及 Seata 是否支持，帮助您在 Seata 更顺畅的使用 SQL。

| 类型&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;       | SQL 实例                                                     | 是否支持&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  |
| :------- | :----------------------------------------------------------- | :------- |
| INSERT   | `INSERT INTO tb1_name (col_name,...) VALUES ({expr \| FAULT},...),(...),...`或 `INSERT INTO tb1_name SET col_name={expr \| DEFAULT}, ...` 或`INSERT INTO tb1_name (col_name,...) VALUES ({expr \| FAULT},...) ON DUPLICATE KEY UPDATE field1=value1,...;`      | 是       |
| UPDATE   | `UPDATE tb1_name SET col_name1=expr1 [, col_name2=expr2 ...][WHERE where_definition]` | 是       |
| DELETE   | `DELETE FROM tb1_name [WHERE where_definition]`              | 是       |
| SELECT   | `SELECT [ALL \| DISTINCT \| DISTINCTROW ]select_expr, ... FROM tb1_name[WHERE where_definition]` | 是       |
| REPLACE  | `REPLACE [LOW_PRIORITY \| DELAYED][INTO] tb1_name [(col_name,...)]VALUES ({expr \| DEFAULT},...),(...),...`或`REPLACE [LOW_PRIORITY \| DELAYED][INTO] tb1_nameSET col_name={expr \| DEFAULT}, ...` | 否       |
| TRUNCATE | `TRUNCATE [TABLE] tb1_name`                                  | 否       |
| UPDATE JOIN   | `UPDATE tb1_name tb1 JOIN tb2_name tb2 ON tb2.col_name=tb1.col_name SET tb1.col_name1=expr1 [, tb1.col_name2=expr2 ...][ [WHERE where_definition]` | 是 since 1.6.0      |
