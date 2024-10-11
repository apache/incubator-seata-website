---
title: Seata XA Mode
keywords: [Seata]
description: Seata XA Mode
---

# Seata XA Mode

## Prerequisites

- Databases that support XA transaction.
- Java applications that access database via JDBC.

## Overall Mechanism

In the distributed transaction framework defined by Seata, XA mode is a transaction mode that manages branch transactions using the XA protocol mechanism, leveraging transaction resources such as databases and message services with XA protocol support.

<img src="https://img.alicdn.com/tfs/TB1hSpccIVl614jSZKPXXaGjpXa-1330-924.png" style={{ zoom:'50%' }} />

- Execution Phase:

  - Rollbackable: Business SQL operations are placed in XA branches, and the XA protocol support ensures *rollbackability*.
  - Persistent: After XA branches are completed, XA prepare is executed, and again, XA protocol support ensures *persistence* (i.e., no unexpected situations will prevent rollback).

- Completion Phase:

  - Branch Commit: Execute XA branch commit.
  - Branch Rollback: Execute XA branch rollback.

# Working Mechanism

#### 1. Overall Operation Mechanism

XA mode runs within the transaction framework defined by Seata:

<img src="https://img.alicdn.com/tfs/TB1uM2OaSslXu8jSZFuXXXg7FXa-1330-958.png" alt="xa-fw" style={{ zoom:'50%' }} />

- Execution Phase (E xecute):

  - XA start/XA end/XA prepare + SQL + Register Branch

- Completion Phase (F inish):

  - XA commit/XA rollback

#### 2. Data Source Proxy

XA mode requires XAConnection.

There are two ways to obtain XAConnection:

- Option 1: Developers are required to configure XADataSource.
- Option 2: Create it based on the developer's regular DataSource.

The first method adds cognitive burden to developers, as they need to learn and use XADataSource specifically for XA mode, which contradicts the design goal of transparent XA programming.

The second method is more developer-friendly. Like the AT mode, developers do not need to worry about any XA-related issues. They can maintain the local programming model.

We prioritize designing and implementing the second method: DataSource proxy creates the corresponding XAConnection based on the regular JDBC connection obtained from the regular data source.

Compared to the data source proxy mechanism in the AT mode, it looks like this:

<img src="https://img.alicdn.com/tfs/TB11_LJcggP7K4jSZFqXXamhVXa-1564-894.png" alt="ds1" style={{ zoom:'50%' }} />

However, the second method also has its limitations: it cannot guarantee compatibility correctness.

In fact, this method is what database drivers should do. The implementation mechanisms of database drivers from different vendors and versions are vendor-specific. We can only ensure correctness on well-tested driver programs. Differences in the versions of driver programs used by developers may lead to the failure of the mechanism.

This is particularly evident with Oracle. See the Druid issue: https://github.com/alibaba/druid/issues/3707

Taking all factors into consideration, the data source proxy design for XA mode needs to support the first method: proxy based on XADataSource.

Compared to the data source proxy mechanism in the AT mode, it looks like this:

<img src="https://img.alicdn.com/tfs/TB1qJ57XZieb18jSZFvXXaI3FXa-1564-894.png" alt="ds2" style={{ zoom:'50%' }} />

#### 3. Branch Registration

XA start requires an Xid parameter.

This parameter needs to be associated with the Seata global transaction's XID and BranchId so that the TC can drive the XA branch's commit or rollback.

Currently, Seata's BranchId is generated uniformly during branch registration. Therefore, the timing of XA mode branch registration needs to be before XA start.

A possible optimization in the future is:

Delay branch registration as much as possible. Similar to the AT mode, we register the branch just before local transaction submission to avoid registering meaningless branches in case of branch execution failure.

This optimization direction requires changes to the BranchId generation mechanism. BranchId should not be generated through branch registration but should be generated separately and then used to register the branch.

## How to use XA Mode

From a programming model perspective, XA mode is identical to AT mode.

You can refer to Seata's official sample: [seata-xa](https://github.com/apache/incubator-seata-samples/tree/master/seata-xa)

In the sample, the upper-level programming model is the same as the AT mode. You only need to modify the data source proxy to switch between XA mode and AT mode:

```java
@Bean("dataSource")
public DataSource dataSource(DruidDataSource druidDataSource) {
    // DataSourceProxy for AT mode
    // return new DataSourceProxy(druidDataSource);

    // DataSourceProxyXA for XA mode
    return new DataSourceProxyXA(druidDataSource);
}