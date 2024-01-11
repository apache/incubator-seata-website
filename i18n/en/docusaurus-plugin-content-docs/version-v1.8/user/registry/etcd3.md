---
title: Etcd3 Registry Center
keywords: [Seata, Etcd3, Registry Center]
description: Etcd3 Registry Center.
---

# Etcd3 Registry Center

Etcd3 is an important implementation of the registry center in the Seata component.

## Prerequisites

Before integrating `Etcd3` into your Seata project, make sure that the Etcd3 Server service has been started in the background. If you are not familiar with the basic usage of Etcd3, you can refer to the [Etcd3 Quickstart](https://etcd.io/docs/v3.5/quickstart) for a preliminary understanding. It is recommended to use Etcd3 version `3.5.0` or above.

## Quick Start

The steps to integrate Etcd3 registry center into Seata are very simple, and can be roughly divided into "Adding Maven Dependencies" and "Configuring the Registry Center".

### Adding Maven Dependencies

First, you need to add the Maven dependency of `jetcd-core` to your project's `pom.xml` file. It is recommended to use jetcd-core version `0.3.0+`. The version relationship between `spring-cloud-starter-alibaba-seata` and the corresponding microservice version can be found in the [Version Description](https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E).

```xml
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>latest version</version>
</dependency>
        <!-- Etcd3 Client Dependency -->
<dependency>
    <groupId>io.etcd</groupId>
    <artifactId>jetcd-core</artifactId>
    <version>0.3.0 or above</version>
</dependency>

```

### Configuring the Registry Center on the Client Side

Add the corresponding configuration to [**application.yml**](https://github.com/apache/incubator-seata/blob/develop/script/client/spring/application.yml), and refer to the [Configuration Reference](https://github.com/apache/incubator-seata/tree/develop/script/client) for other configurations.

```yaml
seata:
  tx-service-group: default_tx_group
  service:
    vgroup-mapping:
      my_test_tx_group: seata-server # Configure the value corresponding to registry.eureka.application in the server-side configuration here
  registry:
    type: etcd3
    etcd3:
      server-addr: http://localhost:2379
```

### Configuring the Registry Center on the Server Side

Add the corresponding configuration to [registry.conf](https://github.com/apache/incubator-seata/blob/develop/script/server/config/registry.conf), and refer to the [Configuration Reference](https://github.com/apache/incubator-seata/tree/develop/script/server) for other configurations.

```
registry {
  type = "etcd3"
 
  etcd3 {
    serverAddr = "http://localhost:2379"
  }
}
```

After the configuration is completed, start the application to experience the Seata service.
