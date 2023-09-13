---
title: Version Upgrade Guide
keywords: [Seata]
description: Seata upgrade.
---

# Version Upgrade Guide

***********

<h3>1. What compatibility matters need to be paid attention to when upgrading to seata 1.2.0? </h3>
<details>
   <summary><mark>Notes</mark></summary>

1. The nacos registration center adds a new service attribute configuration `registry.nacos.application` = "seata-server". The original default name is serverAddr, and now the default is seata-server. The Server and Client must be consistent.
       

</details>
