---
title: Version Upgrade Guide
keywords: [Seata]
description: Seata upgrade.
---

# Version Upgrade Guide

------
<h3>1. What compatibility matters need to be paid attention to when upgrading to seata 1.4.0? </h3>
<details>
   <summary><mark>Notes</mark></summary>


1. The Redis data of version 1.3 and 1.4 are incompatible. Since the Redis mode reconstructs the data storage structure into hash, users who upgrade from 1.3 to 1.4 need to wait for all transactions to run completely before iterating.
       

</details>
