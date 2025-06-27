---
title: DML
keywords: [Seata]
description: Seata DML
---

# DML

This article introduces the types of DML statements, SQL instances, and whether Seata supports them, helping you to use SQL more smoothly in Seata.

| Type&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;       |SQL Examples| Support&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  |
| :------- | :----------------------------------------------------------- | :------- |
| INSERT   | `INSERT INTO tb1_name (col_name,...) VALUES ({expr \| FAULT},...),(...),...` or `INSERT INTO tb1_name SET col_name={expr \| DEFAULT}, ...` or `INSERT INTO tb1_name (col_name,...) VALUES ({expr \| FAULT},...) ON DUPLICATE KEY UPDATE field1=value1,...;`      | Yes       |
| UPDATE   | `UPDATE tb1_name SET col_name1=expr1 [, col_name2=expr2 ...][WHERE where_definition]` | Yes       |
| DELETE   | `DELETE FROM tb1_name [WHERE where_definition]`              | Yes       |
| SELECT   | `SELECT [ALL \| DISTINCT \| DISTINCTROW ]select_expr, ... FROM tb1_name[WHERE where_definition]` | Yes       |
| REPLACE  | `REPLACE [LOW_PRIORITY \| DELAYED][INTO] tb1_name [(col_name,...)]VALUES ({expr \| DEFAULT},...),(...),...` or `REPLACE [LOW_PRIORITY \| DELAYED][INTO] tb1_nameSET col_name={expr \| DEFAULT}, ...` | No       |
| TRUNCATE | `TRUNCATE [TABLE] tb1_name`                                  | No       |
| UPDATE JOIN   | `UPDATE tb1_name tb1 JOIN tb2_name tb2 ON tb2.col_name=tb1.col_name SET tb1.col_name1=expr1 [, tb1.col_name2=expr2 ...][ [WHERE where_definition]` | Yes,since 1.6.0      |
