---
title: 版本升级指南
keywords: [Seata]
description: Seata upgrade.
---

# 版本升级指南

------

<h3>1. 升级到 seata 2.0.x 有哪些兼容性事项是需要注意的？</h3>
<details>
  <summary><mark>注意事项</mark></summary>
  从1.8.x 版本升级2.0.x 版本，如果undolog或通信编解码为fst都需要先提前在client修改为fst以外的序列化方式,server侧才可进行升级。
  注: 2.0.0的server 存在at模式下资源重入,比如一个全局事务中,非同一个本地事务进行了多次相同的数据修改,注册了多个分支后会导致二阶段下发顺序异常,故如果有此类场景请勿升级到2.0.0版本,建议升级到最新snapshot或更高版本。
  注解@LocalTCC要修饰在实现类上，注解@TwoPhaseBusinessAction要修饰在实现类方法prepare上。
</details>
