---
title: 版本升级指南
keywords: [Seata]
description: Seata upgrade.
---

# 版本升级指南

------

<h3>1. 升级到 seata 1.3.0 有哪些兼容性事项是需要注意的？</h3>
<details>
  <summary><mark>注意事项</mark></summary>

1. nacos注册中心新增group的属性配置seata.registry.nacos.group，如果无配置,则默认为DEFAULT_GROUP，Server和Client端需保持一致。
2. mysql undolog表去除id字段,与branch_table一并加强时间戳精度,防止undolog回滚时顺序错误导致出现脏数据无法回滚.(注:需要mysql5.6版本以上)

</details>  
