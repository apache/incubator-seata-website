---
title: Version Upgrade Guide
keywords: [Seata]
description: Seata upgrade.
---

# Version Upgrade Guide

------

<h3>1. What compatibility matters need to be paid attention to when upgrading to seata 2.0.x? </h3>
<details>
   <summary><mark>Notes</mark></summary>
   If you upgrade from 1.8.x to 2.0.x, if you configure the Undolog or communication codec to FST, you need to change the serialization mode to something other than FST on the client before you can upgrade it on the server.
   Note: In version 2.0.0 of the server, there is a resource reentry issue in AT mode. For example, in a global transaction, if multiple local transactions make repeated data modifications that are not the same, registering multiple branches can lead to abnormal ordering of the two-phase commit. Therefore, if you encounter such scenarios, please refrain from upgrading to version 2.0.0 and consider upgrading to the latest snapshot or a higher version.
   The annotation @LocalTCC should be modified on the implementation class, and the annotation @TwoPhaseBusinessAction should be modified on the implementation class method prepare.
</details>
