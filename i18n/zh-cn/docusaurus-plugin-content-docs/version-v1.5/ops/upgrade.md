---
title: 版本升级指南
keywords: [Seata]
description: Seata upgrade.
---

# 版本升级指南

------

<h3>1. 升级到 seata 1.5.0 有哪些兼容性事项是需要注意的？</h3>
<details>
  <summary><mark>注意事项</mark></summary>

1. seata-server 存储模式为 db 时，需要注意表结构变更，在升级1.5.0 前需先变更表结构：

 - 表结构字符集统一从 utf8 调整为 utf8mb4
 - global_table 调整索引从 idx_gmt_modified_status 调整为 idx_status_gmt_modified
 - lock_table 增加 status 字段,增加 idx_status，idx_xid_and_branch_id 索引
 - 增加 distributed_lock 表用于 seata-server 异步任务调度
  升级1.5.0前，请注意表结构变更，表结构详情请[点击此处](https://github.com/seata/seata/tree/1.5.0/script/server/db)
   
2. TCC事务模式在1.5.0 增加防悬挂功能,如需由 Seata 框架开启防悬挂,需要提前在客户端业务库中增加[此表](https://github.com/seata/seata/tree/1.5.0/script/client/tcc/db)
   
3. TCC模式一阶段方法进行了优化，不再需要在一阶段的接口入参定义`BusinessActionContext`，若一阶段需要使用到`BusinessActionContext`，可以通过`BusinessActionContextUtil.getContext()`取得

4. redis注册中心内部结构调整,不再向下兼容,如使用redis作为seata的注册中心,请将客户端依赖的 seata-all(seata-spring-boot-starter) 和 seata-server 一并升级。

5. 事务分组配置支持了默认值，为了避免歧义和降低学习成本，默认事务分组的由`my_test_tx_group` 修改为 `default_tx_group`。在1.5.X的版本中会向下进行兼容。

</details>  
