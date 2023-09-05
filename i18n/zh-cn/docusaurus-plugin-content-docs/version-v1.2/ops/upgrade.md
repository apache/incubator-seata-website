---
title: 版本升级指南
keywords: [Seata]
description: Seata upgrade.
---

# 版本升级指南

********

<h3>1. 升级到 seata 1.2.0 有哪些兼容性事项是需要注意的？</h3>
<details>
  <summary><mark>注意事项</mark></summary>

1. nacos注册中心新增服务名的属性配置registry.nacos.application = "seata-server"，原固定名为serverAddr，现默认为seata-server，Server和Client端需保持一致。
       

</details>  
