---
title: seata-go 1.2.0 Ready for Production Environment!!!
author: Seata Community
keywords: [seata, distributed transaction, golang, 1.2.0]
description: seata-go 1.2.0, ready for production environment!!!
date: 2023/06/08
---


## Production-ready seata-go 1.2.0 is here!

Seata is an open source distributed transaction solution that provides high-performance and easy-to-use distributed transaction services.

### Release overview

Seata-go version 1.2.0 supports the XA schema, a distributed transaction processing specification proposed by the X/Open organisation, which has the advantage of being non-intrusive to business code. Currently, Seata-go's XA mode supports MySQL databases. So far, seata-go has gathered three transaction modes: AT, TCC and XA. Main features of XA mode.

- Supported XA data source proxy https://github.com/apache/incubator-seata-go-samples/tree/main/xa
- XA transaction mode is supported.
  XA related sampes can be found in the following example: https://github.com/apache/incubator-seata-go-samples/tree/main/xa

### feature

- [[#467](https://github.com/apache/incubator-seata-go/pull/467)] implements XA schema support for MySQL.
- [[#534](https://github.com/apache/incubator-seata-go/pull/534)] Load balancing for session support.

### bugfix

- [[#540](https://github.com/apache/incubator-seata-go/pull/540)] Fix a bug in initialising xa mode.
- [[#545](https://github.com/apache/incubator-seata-go/pull/545)] Fix a bug in getting db version number in xa mode.
- [[#548](https://github.com/apache/incubator-seata-go/pull/548)] Fix bug where starting xa fails.
- [[#556](https://github.com/apache/incubator-seata-go/pull/556)] Fix bug in xa datasource.
- [[#562](https://github.com/apache/incubator-seata-go/pull/562)] Fix bug with committing xa global transaction
- [[#564](https://github.com/apache/incubator-seata-go/pull/564)] Fix bug committing xa branching transactions
- [[#566](https://github.com/apache/incubator-seata-go/pull/566)] Fix bug with local transactions using xa data source.

### optimise

- [[#523](https://github.com/apache/incubator-seata-go/pull/523)] Optimise CI process
- [[#525](https://github.com/apache/incubator-seata-go/pull/525)] rename jackson serialisation to json
- [[#532](https://github.com/apache/incubator-seata-go/pull/532)] Remove duplicate code
- [[#536](https://github.com/apache/incubator-seata-go/pull/536)] optimise go import code formatting
- [[#554](https://github.com/apache/incubator-seata-go/pull/554)] optimise xa mode performance
- [[#561](https://github.com/apache/incubator-seata-go/pull/561)] Optimise xa mode logging output

### test

- [[#535](https://github.com/apache/incubator-seata-go/pull/535)] Add integration tests.

### doc

- [[#550](https://github.com/apache/incubator-seata-go/pull/550)] Added changelog for version 1.2.0.

### contributors

Thanks to these contributors for their code commits. Please report an unintended omission.

- [georgehao](https://github.com/georgehao)
- [luky116](https://github.com/luky116)
- [jasondeng1997](https://github.com/jasondeng1997)
- [106umao](https://github.com/106umao)
- [wang1309](https://github.com/wang1309)
- [iSuperCoder](https://github.com/iSuperCoder)
- [Charlie17Li](https://github.com/Charlie17Li)
- [Code-Fight](https://github.com/Code-Fight)
- [Kirhaku](https://github.com/Kirhaku)
- [Vaderkai](https://github.com/VaderKai)

#### Link

- https://github.com/apache/incubator-seata
- https://github.com/apache/incubator-seata-go
- https://github.com/apache/incubator-seata-samples
- https://github.com/apache/incubator-seata-go-samples
- https://seata.apache.org

