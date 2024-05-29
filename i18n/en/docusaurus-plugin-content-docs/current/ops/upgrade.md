---
title: Version Upgrade Guide
keywords: [Seata]
description: Seata upgrade.
---

# Version Upgrade Guide

<a href="#9" target="_self">9. What compatibility matters need to be paid attention to when upgrading to seata 2.1? </a>
<br/>

<a href="#8" target="_self">8. What compatibility matters need to be paid attention to when upgrading to seata 2.0? </a>
<br/>

<a href="#7" target="_self">7. What compatibility matters need to be paid attention to when upgrading to seata 1.6.x? </a>
<br/>

<a href="#6" target="_self">6. What compatibility matters need to be paid attention to when upgrading to seata 1.5.0? </a>
<br/>

<a href="#5" target="_self">5. What compatibility matters need to be paid attention to when upgrading to seata 1.4.0? </a>
<br/>

<a href="#4" target="_self">4. What compatibility matters need to be paid attention to when upgrading to seata 1.3.0? </a>
<br/>

<a href="#3" target="_self">3. What compatibility matters need to be paid attention to when upgrading to seata 1.2.0? </a>
<br/>

<a href="#2" target="_self">2. What compatibility matters need to be paid attention to when upgrading to seata 1.1.0? </a>
<br/>

<a href="#1" target="_self">1. How to upgrade versions 0.8 and 0.9 to version 1.0? </a>
<br/>

------

<h3 id='9'>9. What compatibility matters need to be paid attention to when upgrading to seata 2.1?</h3>
<details>
   <summary><mark>Notes</mark></summary>
  
  1. After using the Seata 2.0 Raft storage mode, upgrading to 2.1 requires logging in to obtain a token, carrying a token to request /metadata/v1/cluster?group= in the value of seata.server.raft.group in application.yml, and querying the cluster metadata Later. Upgrade the follower node first, and then upgrade the leader node. Note: After this upgrade is completed, the Raft storage mode is not allowed to be downgraded to 2.0. Please fully verify it in the offline environment before upgrading the production environment.
  2.When users upgrade to Seata 2.1, they need to configure the Seata Raft authentication information. First, on the Seata server side, add /metadata/v1/** to ignore.url to temporarily disable the authentication function. Then, on the Seata client side, configure username, password, and tokenValidityInMilliseconds in seata.registry.raft in application.yaml or registry.conf (note that the username and password on the client side should match those configured on the server side, and the tokenValidityInMilliseconds on the client side should be slightly smaller than what you configure on the server side). Finally, remove /metadata/v1/** from ignore.url on the server side to enable Raft metadata authentication capability.
</details>


------

<h3 id='8'>8. What compatibility matters need to be paid attention to when upgrading to seata 2.0? </h3>
<details>
   <summary><mark>Notes</mark></summary>
   If you upgrade from 1.8.x to 2.0.x, if you configure the Undolog or communication codec to FST, you need to change the serialization mode to something other than FST on the client before you can upgrade it on the server.
   Note: In version 2.0.0 of the server, there is a resource reentry issue in AT mode. For example, in a global transaction, if multiple local transactions make repeated data modifications that are not the same, registering multiple branches can lead to abnormal ordering of the two-phase commit. Therefore, if you encounter such scenarios, please refrain from upgrading to version 2.0.0 and consider upgrading to the latest snapshot or a higher version.
</details>

------

<h3 id='7'>7. What compatibility matters need to be paid attention to when upgrading to seata 1.6.x? </h3>
<details>
   <summary><mark>Notes</mark></summary>
   When upgrading from version 1.5.x to version 1.6.x, both client SDK and seata-server are completely smoothly compatible, and no other changes are required other than upgrading the version.
</details>

------

<h3 id='6'>6. What compatibility matters need to be paid attention to when upgrading to seata 1.5.0? </h3>
<details>
   <summary><mark>Notes</mark></summary>

1. When the storage mode of seata-server is db, you need to pay attention to the table structure changes. You need to change the table structure before upgrading to 1.5.0:

  - The table structure character set is uniformly adjusted from utf8 to utf8mb4.
  - The `global_table` adjustment index is adjusted from `idx_gmt_modified_status` to `idx_status_gmt_modified`.
  - `lock_table` adds `status` field, and adds `idx_status`, `idx_xid_and_branch_id` index.
  - Add `distributed_lock` table for seata-server asynchronous task scheduling.
   Before upgrading to 1.5.0, please pay attention to the table structure changes. For details on the table structure, please [click here](https://github.com/apache/incubator-seata/tree/1.5.0/script/server/db).
   
2. TCC transaction mode adds anti-hanging function in 1.5.0. If you need to enable anti-hanging by Seata framework, you need to add [this table](https://github.com/apache/incubator-seata/tree/1.5.0/script/client/tcc/db) to the client business library in advance. 
   
3. The first-stage method of TCC mode has been optimized. It is no longer necessary to define `BusinessActionContext` as an interface parameter in the first stage. If `BusinessActionContext` needs to be used in the first stage, it can be obtained through `BusinessActionContextUtil.getContext()`.

4. The internal structure of the redis registration center has been adjusted and is no longer backward compatible. If you use redis as the registration center of seata, please also upgrade both seata-all (seata-spring-boot-starter) and seata-server that the client depends on.

5. The transaction group configuration supports default values. In order to avoid ambiguity and reduce learning costs, the default transaction group is changed from `my_test_tx_group` to `default_tx_group`. It will be backward compatible in version 1.5.X.

</details>

------

<h3 id='5'>5. What compatibility matters need to be paid attention to when upgrading to seata 1.4.0? </h3>
<details>
   <summary><mark>Notes</mark></summary>


1. The Redis data of version 1.3 and 1.4 are incompatible. Since the Redis mode reconstructs the data storage structure into hash, users who upgrade from 1.3 to 1.4 need to wait for all transactions to run completely before iterating.
       

</details>

------

<h3 id='4'>4. What compatibility matters need to be paid attention to when upgrading to seata 1.3.0? </h3>
<details>
   <summary><mark>Notes</mark></summary>

1. The nacos registration center adds a new group attribute configuration `seata.registry.nacos.group`. If it is not configured, the default value is `DEFAULT_GROUP`. The server and client must be consistent.
2. The mysql `undolog` table removes the `id` field and enhances the timestamp accuracy together with `branch_table` to prevent dirty data from being rolled back due to sequence errors during undolog rollback. (Note: mysql version 5.6 or above is required)

</details>

***********

<h3 id='3'>3. What compatibility matters need to be paid attention to when upgrading to seata 1.2.0? </h3>
<details>
   <summary><mark>Notes</mark></summary>

1. The nacos registration center adds a new service attribute configuration `registry.nacos.application` = "seata-server". The original default name is serverAddr, and now the default is seata-server. The Server and Client must be consistent.
       

</details>

***********

<h3 id='2'>2. What compatibility matters need to be paid attention to when upgrading to seata 1.1.0? </h3>
<details>
   <summary><mark>Notes</mark></summary>

1. Pay attention to the compatibility of configuration items. Version 1.1.0 has unified the styles of configuration items.
If the program relies on seata-all, corresponding to the *.conf file, the naming style of the configuration items in the conf file is unified with a dot + camel case combination, [1.1.0 Configuration Item Description](/docs/user/configurations), [1.1.0 Configuration Reference](https://github.com/apache/incubator-seata/tree/1.1.0/script/client/conf);
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

***********

<h3 id='1'>1. How to upgrade versions 0.8 and 0.9 to version 1.0? </h3>
<details>
   <summary><mark>Notes</mark></summary>

   1. (Optional) 1.0 supports yml and properties, and seata-all needs to be replaced with seata-spring-boot-starter
   2. (Required) Add a common index to the branch_id field of the TC side table lock_table
   3. (Optional) Some parameter naming changes, <a href="/docs/user/configurations100" target="_blank">Click here to check the parameter configuration</a>.
   4. client.report.success.enable can be set as false to improve performance.
      

</details>   

********

