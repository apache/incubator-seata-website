---
title: SQL Restrictions
keywords: [Seata]
description: Seata SQL restrictions
---

# SQL Restrictions

Seata transactions currently support some functions of the DML syntax of INSERT, UPDATE, and DELETE. These types have been verified by the Seata open source community. The scope of SQL support is still expanding, and it is recommended to use it within the limits of this article. If you are interested in helping the community support more types of SQL, please submit a PR.

### Usage restrictions

- SQL nesting is not supported
- Does not support multi-table complex SQL (Since version 1.6.0, MySQL supports UPDATE JOIN statement, <a href="./dml">Please see details</a>)
- Stored procedures and triggers are not supported
- Some databases do not support batch update, but support batch when using MySQL, Mariadb, PostgreSQL9.6+ as the database, the batch update method is as follows, taking Java as an example
```
    // use JdbcTemplate
    public void batchUpdate() {
        jdbcTemplate.batchUpdate(
            "update storage_tbl set count = count -1 where id = 1",
            "update storage_tbl set count = count -1 where id = 2"
		);
    }

    // use Statement
    public void batchUpdateTwo() {
        statement.addBatch("update storage_tbl set count = count -1 where id = 1");
        statement.addBatch("update storage_tbl set count = count -1 where id = 2");
        statement.executeBatch();
    }
```
