---
title: Version Upgrade Guide
keywords: [Seata]
description: Seata upgrade.
---

# Version Upgrade Guide

***********

<h3>1. What compatibility matters need to be paid attention to when upgrading to seata 1.1.0? </h3>
<details>
   <summary><mark>Notes</mark></summary>

1. Pay attention to the compatibility of configuration items. Version 1.1.0 has unified the styles of configuration items.
If the program relies on seata-all, corresponding to the *.conf file, the naming style of the configuration items in the conf file is unified with a dot + camel case combination, [1.1.0 Configuration Item Description](https://seata.io/zh-cn/docs/user/configurations.html), [1.1.0 Configuration Reference](https://github.com/apache/incubator-seata/tree/1.1.0/script/client/conf);
If the program depends on seata-spring-boot-starter, corresponding to *.properties or *.yml, the naming style of property and yml files is unified to the combination of dot + underscore.
[1.1.0 Configuration Reference](https://github.com/apache/incubator-seata/tree/1.1.0/script/client/spring) What needs special attention is the 1.0.0 version configuration item seata.service
.vgroup-mapping=default 1.1.0 changed to: seata.service.vgroup-mapping
.my_test_tx_group=default, where my_test_tx_group represents the transaction group used by the program; 1.0.0 version configuration item seata.service.grouplist=127.0.0.1:8091, 1.1.0
Change to: seata.service.grouplist.default=127.0.0.1:8091 where default represents the seata registration service name.

2. seata-all does not enable automatic proxying of data sources by default. The original conf file configuration items in seata-all
The client.support.spring.datasource.autoproxy configuration item is invalid and is annotated by @EnableAutoDataSourceProxy
Instead of annotation, the annotation parameter can choose to use jdk proxy or cglib proxy. When using HikariDataSource, it is recommended to use cglib proxy mode.
seata-spring-boot-starter enables the data source proxy by default, and the corresponding data source automatic proxy configuration items remain unchanged from version 1.0.0.

3. When using the spring cloud framework, you need to use [Spring Cloud Alibaba](https://github.com/alibaba/spring-cloud-alibaba) for seata
Transmission of transaction context. So seata has integration dependencies with Spring Cloud Alibaba version, refer to [version notes](https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E)
spring-cloud-alibaba-seata relied on seata-all before version 2.2.0.RELEASE. If you continue to use a lower version of spring-cloud-alibaba-seata, you can use a higher version of seata-all to replace the built-in seata-all version;
Spring-cloud-alibaba-seata starts to rely on seata-spring-boot-starter internally starting from 2.2.0.RELEASE (inclusive). 2.2.0.RELEASE internally integrates seata-spring-boot-starter 1.0.0 and can be upgraded to seata-spring-boot-starter 1.1.0, seata-spring-boot-starter integrates seata-all, seata-spring-boot-starter wraps the autoconfig function for properties or yml configuration, in spring-cloud-alibaba-seata Before 2.2.0.RELEASE
The autoconfig function is supported by itself. Afterwards, the autoconfig about seata itself in spring-cloud-alibaba-seata is removed and is supported by seata-spring-boot-starter. Therefore, the lower version of spring-cloud-alibaba-seata can only be used with seata-all. Use, the higher version spring-cloud-alibaba-seata can only be used with seata-spring-boot-starter, with 2.2.0.RELEASE as the dividing point.

4. When the TC side adopts db storage mode, the precision of gmt_create and gmt_modified fields is added to branch_table to accurately confirm the order of rollback.
[Reference for each database script](https://github.com/apache/incubator-seata/tree/1.1.0/script/server/db).

</details>
