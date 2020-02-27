---
title: Seata 版本升级指南
keywords: Seata
description: Seata 版本升级指南
---

### 1.0.0升级到1.1.0

* （必选）TC端表branch_table字段gmt_create和gmt_modified提升精度
* （必选）参数格式统一转换为驼峰格式 <a href="https://seata.io/zh-cn/docs/user/configurations.html" target="_blank">查看参数配置</a> <a href="https://github.com/seata/seata/tree/1.1.0/script" target="_blank">查看官方脚本</a>
* （可选）1.1.0 数据源自动代理: seata-all取消属性只支持用@EnableAutoDataSourceProxy开启，seata-spring-boot-starter属性和注解都支持
* （可选）client.report.success.enable默认为false

### 0.8、0.9升级到1.0.0

* （必选）TC端表lock_table字段branch_id增加普通索引
* （可选）1.0支持yml、properties，需用seata-spring-boot-starter替换掉seata-all
* （可选）部分参数命名改动，<a href="https://seata.io/zh-cn/docs/user/configurations100.html" target="_blank">查看1.0.0参数配置</a>
* （可选） client.report.success.enable可以置为false，提升性能
