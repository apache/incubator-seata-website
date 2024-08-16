---
title: Nacos Registry Center
keywords: [Seata, Nacos, Registry Center]
description: Nacos Registry Center.
---

# Nacos Registry

Nacos is an important registry implementation in the Seata component.

## Prerequisites

Before integrating `nacos-client` into your Seata project, make sure that the Nacos service is already running in the background. If you are not familiar with the basic usage of Nacos, you can refer to the [Nacos Quick Start](https://nacos.io/en-us/docs/quick-start.html) guide. It is recommended to use Nacos version `1.4.0` or above.

## Quick Start

The steps to integrate Nacos registry into Seata are very simple and can be roughly divided into "adding Maven dependencies" and "configuring the registry".

### Adding Maven Dependencies

First, you need to add the Maven dependency for `nacos-client` to your project's `pom.xml` file.

```xml
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>latest version</version>
</dependency>
<dependency>
    <groupId>com.alibaba.nacos</groupId>
    <artifactId>nacos-client</artifactId>
    <version>1.4.0+</version>
</dependency>
```

### Configuring the Registry on the Client Side

Add the corresponding configuration to [**application.yml**](https://github.com/apache/incubator-seata/blob/2.x/script/client/spring/application.yml):

```yaml
seata:
  registry:
    type: nacos
    nacos:
      application: seata-server
      namespace: ""
      server-addr: 127.0.0.1:8848
      group: SEATA_GROUP
      username: ""
      password: ""
      ##if use MSE Nacos with auth, mutex with username/password attribute
      #access-key: ""
      #secret-key: ""
      data-id: seata.properties
  tx-service-group: default_tx_group
  service:
    vgroup-mapping:
      default_tx_group: default

```

### Configuring the Registry on the Server Side

Add the corresponding configuration to `conf/application.yaml`, and refer to other [configuration options](https://github.com/apache/incubator-seata/blob/2.x/server/src/main/resources/application.example.yml):

```yaml
seata:
  registry:
    type: nacos
    nacos:
      application: seata-server
      server-addr: 127.0.0.1:8848
      group: SEATA_GROUP
      namespace:
      cluster: default
      username:
      password:
      ##if use MSE Nacos with auth, mutex with username/password attribute
      #access-key: ""
      #secret-key: ""
```

After that, when you start the Seata-Server, you will see the server's service appearing in the registry list on the Nacos console. Once the client is configured, you can start the application to experience the Seata service.

Tips: Make sure that the client and server are registered in the same namespace and group, otherwise the service will not be found.