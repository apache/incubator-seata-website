---
title: In-Depth Analysis of Seata AT Mode Transaction Isolation Levels and Global Lock Design
author: chenghui.zhang
keywords: [Seata, distributed transaction, AT mode, Transaction, GlobalLock]
description: The transaction isolation in Seata AT mode is built on the basis of local isolation levels of supporting transactions. Assuming a database local isolation level of Read Committed or higher, Seata designs a global write-exclusive lock maintained by the transaction coordinator to ensure write isolation between transactions. Meanwhile, the default isolation level for global transactions is defined at Read Uncommitted.
date: 2022/01/12
---
