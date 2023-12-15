---
title: Version Upgrade Guide
keywords: [Seata]
description: Seata upgrade.
---

# Version Upgrade Guide

------

<h3>1. What compatibility matters need to be paid attention to when upgrading to seata 1.8.x? </h3>
<details>
   <summary><mark>Notes</mark></summary>
   If you upgrade from 1.8.x to 2.0.x, if you configure the Undolog or communication codec to FST, you need to change the serialization mode to something other than FST on the client before you can upgrade it on the server.
</details>
