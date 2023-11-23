---
title: Data Source support
keywords: [Seata, Data Source]
description: Seata data source support
---

# Data source support
## AT mode
Databases supported by AT mode include: MySQL, Oracle, PostgreSQL, TiDB, and MariaDB.

## TCC mode
TCC mode does not rely on data sources (for version 1.4.2 and before). After version 1.4.2, TCC anti-hanging measures are added, which requires data source support.

## Saga Mode

Saga mode does not rely on data sources.

## XA mode

XA mode only supports databases that implement the XA protocol. Seata supports MySQL, Oracle, PostgreSQL and MariaDB.