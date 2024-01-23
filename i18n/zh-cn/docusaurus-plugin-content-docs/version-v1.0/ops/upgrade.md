---
title: 版本升级指南
keywords: [Seata]
description: Seata upgrade.
---

# 版本升级指南

********

<h3>1. 0.8、0.9版本如何升级到1.0版本？</h3>   
<details>
  <summary><mark>注意事项</mark></summary>

   1. （可选）1.0支持yml、properties，需用seata-spring-boot-starter替换掉 seata-all   
   2.  （必选）TC端表lock_table字段branch_id增加普通索引   
   3. （可选）部分参数命名改动，<a href="/docs/user/configurations100" target="_blank">点击查看参数配置</a>   
   4. （可选） client.report.success.enable可以置为false，提升性能   
      

</details>   
