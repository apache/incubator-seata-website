---
title: Version Upgrade Guide
keywords: [Seata]
description: Seata upgrade.
---

# Version Upgrade Guide

------

<h3>1. What compatibility matters need to be paid attention to when upgrading to seata 1.3.0? </h3>
<details>
   <summary><mark>Notes</mark></summary>

1. The nacos registration center adds a new group attribute configuration `seata.registry.nacos.group`. If it is not configured, the default value is `DEFAULT_GROUP`. The server and client must be consistent.
2. The mysql `undolog` table removes the `id` field and enhances the timestamp accuracy together with `branch_table` to prevent dirty data from being rolled back due to sequence errors during undolog rollback. (Note: mysql version 5.6 or above is required)

</details>
