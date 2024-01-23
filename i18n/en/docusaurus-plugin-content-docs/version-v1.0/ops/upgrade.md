---
title: Version Upgrade Guide
keywords: [Seata]
description: Seata upgrade.
---

# Version Upgrade Guide

***********

<h3 id='1'>1. How to upgrade versions 0.8 and 0.9 to version 1.0? </h3>
<details>
   <summary><mark>Notes</mark></summary>

   1. (Optional) 1.0 supports yml and properties, and seata-all needs to be replaced with seata-spring-boot-starter
   2. (Required) Add a common index to the branch_id field of the TC side table lock_table
   3. (Optional) Some parameter naming changes, <a href="/docs/user/configurations100" target="_blank">Click here to check the parameter configuration</a>.
   4. client.report.success.enable can be set as false to improve performance.
      

</details>   
