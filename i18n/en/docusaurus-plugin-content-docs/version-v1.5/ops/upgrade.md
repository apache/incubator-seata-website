---
title: Version Upgrade Guide
keywords: [Seata]
description: Seata upgrade.
---

# Version Upgrade Guide

------

<h3>1. What compatibility matters need to be paid attention to when upgrading to seata 1.5.0? </h3>
<details>
   <summary><mark>Notes</mark></summary>

1. When the storage mode of seata-server is db, you need to pay attention to the table structure changes. You need to change the table structure before upgrading to 1.5.0:

  - The table structure character set is uniformly adjusted from utf8 to utf8mb4.
  - The `global_table` adjustment index is adjusted from `idx_gmt_modified_status` to `idx_status_gmt_modified`.
  - `lock_table` adds `status` field, and adds `idx_status`, `idx_xid_and_branch_id` index.
  - Add `distributed_lock` table for seata-server asynchronous task scheduling.
   Before upgrading to 1.5.0, please pay attention to the table structure changes. For details on the table structure, please [click here](https://github.com/apache/incubator-seata/tree/1.5.0/script/server/db).
   
2. TCC transaction mode adds anti-hanging function in 1.5.0. If you need to enable anti-hanging by Seata framework, you need to add [this table](https://github.com/apache/incubator-seata/tree/1.5.0/script/client/tcc/db) to the client business library in advance. 
   
3. The first-stage method of TCC mode has been optimized. It is no longer necessary to define `BusinessActionContext` as an interface parameter in the first stage. If `BusinessActionContext` needs to be used in the first stage, it can be obtained through `BusinessActionContextUtil.getContext()`.

4. The internal structure of the redis registration center has been adjusted and is no longer backward compatible. If you use redis as the registration center of seata, please also upgrade both seata-all (seata-spring-boot-starter) and seata-server that the client depends on.

5. The transaction group configuration supports default values. In order to avoid ambiguity and reduce learning costs, the default transaction group is changed from `my_test_tx_group` to `default_tx_group`. It will be backward compatible in version 1.5.X.

</details>
