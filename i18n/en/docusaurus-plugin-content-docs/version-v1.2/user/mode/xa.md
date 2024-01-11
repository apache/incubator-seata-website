---
title: Seata XA Mode
keywords: [Seata, XA]
description: User guide for Seata XA mode
---
# Seata XA Mode

## Overview

XA Mode is a transaction mode supported from version 1.2. The XA specification is a Distributed Transaction Processing (DTP) standard defined by the X/Open organization. Seata XA Mode utilizes the support of the XA protocol by transaction resources (databases, message services, etc.) to manage branch transactions using the mechanisms of the XA protocol.

![Overview of a global transaction](https://img.alicdn.com/tfs/TB1hSpccIVl614jSZKPXXaGjpXa-1330-924.png)

In this document, we will focus on the usage of Seata XA Mode. If you are interested in the principles behind XA Mode, please read the corresponding [Developer Guide](../../dev/mode/xa-mode).

### Advantages

Unlike other transaction modes supported by Seata, the XA protocol requires transaction resources themselves to support the specification and protocol. This ensures effective isolation of data from any perspective, meeting global data consistency. Some additional advantages include:

1. Non-intrusive to business: Similar to AT Mode, XA Mode is non-intrusive to business, not imposing additional burdens on application design and development.
2. Wide database support: The XA protocol is widely supported by mainstream relational databases, requiring no additional adaptation for use.

### Disadvantages

After XA prepare, the branch transaction enters a blocking stage and must wait for XA commit or XA rollback. The transaction resource is not released for a long time, leading to a long lock cycle. Additionally, intervention at the application layer is not possible, resulting in poor performance.

### Use Cases

Suitable for migrating old applications to the Seata platform based on the XA protocol. Using XA Mode provides a smoother transition, especially for database applications not adapted to AT Mode.

## Overall Mechanism

- Execution Phase:
    - Rollback Capability: Business SQL operations are performed within the XA branch, and the support of resources for the XA protocol ensures *rollback capability*.
    - Persistence: After the XA branch is completed, XA prepare is executed. Similarly, the support of resources for the XA protocol ensures *persistence* (i.e., any subsequent accidents will not prevent rollback).
- Completion Phase:
    - Branch Commit: Execute XA branch commit.
    - Branch Rollback: Execute XA branch rollback.

## Basic Usage

Using XA Mode is almost identical to AT Mode in terms of usage. The only difference lies in the replacement of the data source proxy: use `DataSourceProxyXA` instead of `DataSourceProxy`.

```java
public class DataSourceProxy {
    @Bean("dataSourceProxy")
    public DataSource dataSource(DruidDataSource druidDataSource) {
        // DataSourceProxyXA for XA mode
        return new DataSourceProxyXA(druidDataSource);
        // DataSourceProxy for AT mode
        // return new DataSourceProxy(druidDataSource);
    }
}
```

## Getting Started

Follow the examples in [seata-samples/xa](https://github.com/apache/incubator-seata-samples/tree/master/tcc) for experimentation.
