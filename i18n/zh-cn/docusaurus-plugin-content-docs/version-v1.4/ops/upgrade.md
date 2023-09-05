---
title: 版本升级指南
keywords: [Seata]
description: Seata upgrade.
---

# 版本升级指南

------

<h3>1. 升级到 seata 1.4.0 有哪些兼容性事项是需要注意的？</h3>
<details>
  <summary><mark>注意事项</mark></summary>


1. 1.3与1.4的Redis数据无法兼容,因Redis模式重构数据存储结构为hash,1.3升级的用户需等待事务全部运行完毕后再做迭代.
       

</details>  
