---
title: SkyWalking
keywords: [Seata, SkyWalking]
description: Seata SkyWalking
---

# SkyWalking

SkyWalking 是 Seata 组件中重要的APM（应用性能监控）实现.

## 预备工作

当您将 SkyWalking 整合到您的 Seata 工程前，请确保后台已经启动 SkyWalking 服务，如果您尚且不熟悉 SkyWalking 的基本使用的话，可先行参考 [SkyWalking 快速入门](https://github.com/apache/skywalking/tree/master/docs)。建议使用 SkyWalking `8.6.0` 及以上的版本。

## 快速上手

Seata 融合 SkyWalking 应用性能监控的操作步骤非常简单，大致步骤可分为"编译&配置"以及"接入监控"这两个步骤。

### 编译&配置

首先，您需要下载Seata源码，并在源码根目录执行:

`mvn clean package -Dmaven.test.skip=true`

将`seata/ext/apm-skywalking/target/seata-skywalking-{version}.jar`放入SkyWalking 探针插件文件夹中

强烈地推荐您使用 Seata 最新版：

### 接入监控

Seata 的客户端和服务端接入SkyWalking与其他应用服务并无二致，可参考[SkyWalking 探针配置](https://github.com/apache/skywalking/blob/f3b567160ce61675cb692c3417101162d67093de/docs/en/setup/service-agent/java-agent/Setting-override.md)。

Seata 涉及的重要参数有：

| 参数         | 备注|
|---------------|----|
| skywalking.plugin.seata.server             |布尔属性，当值为`true`，标识本应用服务是否为Seata server|
| skywalking.plugin.jdbc.trace_sql_parameters|布尔属性，当值为`true`，本应用服务记录sql参数|
| skywalking.agent.service_name              |字符串属性，标识本应用服务在SkyWalking的唯一标识|

Seata客户端探针参数可参考
```
java -javaagent:{path}/skywalking-agent.jar -Dskywalking.agent.service_name=seata_biz -Dskywalking.plugin.jdbc.trace_sql_parameters=true -jar seata_biz.jar
```

Seata服务端探针参数可参考
```
java -javaagent:{path}/skywalking-agent.jar -Dskywalking.agent.service_name=seata_tc -Dskywalking.plugin.jdbc.trace_sql_parameters=true -Dskywalking.plugin.seata.server=true -jar seata_tc.jar
```

## 注意事项

1. 当前只支持非批处理（enableClientBatchSendRequest 为 false）的分布式事务模式
