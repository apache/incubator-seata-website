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
</details>
