---
title: SkyWalking
keywords: [Seata, SkyWalking]
description: Seata SkyWalking
---

# SkyWalking

SkyWalking is an important APM (Application Performance Monitoring) implementation in the Seata component.

## Prerequisites

Before integrating SkyWalking into your Seata project, please make sure that the SkyWalking service has been started in the background. If you are not familiar with the basic usage of SkyWalking, you can refer to the [SkyWalking Quick Start](https://github.com/apache/skywalking/tree/master/docs) first. It is recommended to use SkyWalking version `8.6.0` or above.

## Quick Start

The steps to integrate SkyWalking application performance monitoring into Seata are very simple. It can be roughly divided into "Compile & Configure" and "Access Monitoring" steps.

### Compile & Configure

First, you need to download the Seata source code and execute the following command in the root directory of the source code:

`mvn clean package -Dmaven.test.skip=true`

Put `seata/ext/apm-skywalking/target/seata-skywalking-{version}.jar` into the SkyWalking probe plugin folder.

It is strongly recommended to use the latest version of Seata:

### Access Monitoring

The integration of Seata client and server with SkyWalking is no different from other application services. You can refer to the [SkyWalking Probe Configuration](https://github.com/apache/skywalking/blob/f3b567160ce61675cb692c3417101162d67093de/docs/en/setup/service-agent/java-agent/Setting-override.md).

The important parameters involved in Seata are:

| Parameter         | Description|
|---------------|----|
| skywalking.plugin.seata.server             |Boolean attribute, when set to `true`, indicates whether the application service is a Seata server|
| skywalking.plugin.jdbc.trace_sql_parameters|Boolean attribute, when set to `true`, the application service records SQL parameters|
| skywalking.agent.service_name              |String attribute, identifies the unique identifier of the application service in SkyWalking|

Seata client probe parameters can refer to
```
java -javaagent:{path}/skywalking-agent.jar -Dskywalking.agent.service_name=seata_biz -Dskywalking.plugin.jdbc.trace_sql_parameters=true -jar seata_biz.jar
```

Seata server probe parameters can refer to
```
java -javaagent:{path}/skywalking-agent.jar -Dskywalking.agent.service_name=seata_tc -Dskywalking.plugin.jdbc.trace_sql_parameters=true -Dskywalking.plugin.seata.server=true -jar seata_tc.jar
```

## Notes

1. Currently, only non-batch processing (enableClientBatchSendRequest is false) distributed transaction mode is supported.
