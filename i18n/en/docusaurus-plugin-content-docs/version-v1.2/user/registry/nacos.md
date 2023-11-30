---
title: Nacos Registry Center
keywords: [Seata, Nacos, Registry Center]
description: Nacos Registry Center.
---

# Nacos Registry

Nacos is an important registry implementation in the Seata component.

## Prerequisites

Before integrating `nacos-client` into your Seata project, make sure that the Nacos service is already running in the background. If you are not familiar with the basic usage of Nacos, you can refer to the [Nacos Quick Start](https://nacos.io/en-us/docs/quick-start.html) guide. It is recommended to use Nacos version `1.2.0` or above.

## Quick Start

The steps to integrate Nacos registry into Seata are very simple and can be roughly divided into "adding Maven dependencies" and "configuring the registry".

### Adding Maven Dependencies

First, you need to add the Maven dependency for `nacos-client` to your project's `pom.xml` file. It is recommended to use Seata `1.4.0+`:

```xml
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>latest version</version>
</dependency>
<dependency>
    <groupId>com.alibaba.nacos</groupId>
    <artifactId>nacos-client</artifactId>
    <version>1.2.0 or above</version>
</dependency>
```

### Configuring the Registry on the Client Side

Add the corresponding configuration to [**application.yml**](https://github.com/seata/seata/blob/develop/script/client/spring/application.yml), and refer to other [configuration options](https://github.com/seata/seata/tree/develop/script/client):

```yaml
seata:
  tx-service-group: my_test_tx_group
  service:
    vgroup-mapping:
      my_test_tx_group: default 
  registry:
    type: nacos
    nacos:
      application: seata-server
      server-addr: localhost
      namespace:
      userName: ""
      password: ""
```

### Configuring the Registry on the Server Side

Add the corresponding configuration to [registry.conf](https://github.com/seata/seata/blob/develop/script/server/config/registry.conf), and refer to other [configuration options](https://github.com/seata/seata/tree/develop/script/server):

```
registry {
  type = "nacos"

  nacos {
    application = "seata-server"
    serverAddr = "localhost"
    namespace = ""
    cluster = "default"
    username = ""
    password = ""
  }
}

```

After that, when you start the Seata-Server, you will see the server's service appearing in the registry list on the Nacos console. Once the client is configured, you can start the application to experience the Seata service.

Tips: Make sure that the client and server are registered in the same namespace and group, otherwise the service will not be found.
