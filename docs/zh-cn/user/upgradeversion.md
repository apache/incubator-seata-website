---
title: Seata 版本升级指南
keywords: Seata
description: Seata 版本升级指南
---

Q: 17. 1.0.0版本升级到1.1.0版本？

**A:** 
* （可选）1.0支持yml、properties，需用seata-spring-boot-starter替换掉seata-all
* （必选）TC端表lock_table字段branch_id增加普通索引
* （可选）部分参数命名改动，<a href="https://seata.io/zh-cn/docs/user/configurations.html" target="_blank">点击查看参数配置</a>
* （可选） client.report.success.enable可以置为false，提升性能


Q: 17. 0.8、0.9版本升级到1.0.0版本？

**A:** 
* （可选）1.0支持yml、properties，需用seata-spring-boot-starter替换掉seata-all
* （必选）TC端表lock_table字段branch_id增加普通索引
* （可选）部分参数命名改动，<a href="https://seata.io/zh-cn/docs/user/configurations.html" target="_blank">点击查看参数配置</a>
* （可选） client.report.success.enable可以置为false，提升性能
