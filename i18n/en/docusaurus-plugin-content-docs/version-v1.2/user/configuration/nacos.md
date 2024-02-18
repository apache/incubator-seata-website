---
title: Nacos Configuration Center
keywords: [Seata, Nacos]
description: Nacos Configuration Center.
---

# Nacos Configuration Center

Nacos is an important configuration center implementation in the Seata component.

## Prerequisites

Before integrating `nacos-client` into your Seata project, make sure that the Nacos service is already started in the background. If you are not familiar with the basic usage of Nacos, you can refer to the [Nacos Quick Start](https://nacos.io/en-us/docs/quick-start.html) first. It is recommended to use Nacos version `1.2.0` or above.

## Quick Start

The steps to integrate Seata with Nacos configuration center are very simple, and can be roughly divided into "adding Maven dependencies" and "configuring Nacos configuration center" and submitting the configuration to Nacos-Server.

### Add Maven Dependencies

First, you need to add the Maven dependency of `nacos-client` to your project's `pom.xml` file, it is recommended to use Seata `1.4.0+`:

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

### Client-side Configuration Center

Add the corresponding configuration center in [**application.yml**](https://github.com/apache/incubator-seata/blob/develop/script/client/spring/application.yml), other [configuration references](https://github.com/apache/incubator-seata/tree/develop/script/client) are available.

```yaml
seata:
  config:
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
      group: 'SEATA_GROUP'
      namespace: ''
      username: 'nacos'
      password: 'nacos'
```

### Server-side Configuration Center

Add the corresponding configuration center in [registry.conf](https://github.com/apache/incubator-seata/blob/develop/script/server/config/registry.conf), other [configuration references](https://github.com/apache/incubator-seata/tree/develop/script/server) are available.

```
config {
  type = "nacos"

  nacos {
    serverAddr = "127.0.0.1:8848"
    group = "SEATA_GROUP"
    namespace = ""
    username = "nacos"
    password = "nacos"
  }
}

```

### Upload Configuration to Nacos Configuration Center

#### Configuration through dataId

1. Starting from version 1.4.2, it is supported to obtain all configuration information from a Nacos dataId. You just need to add an additional dataId configuration item.

2. First, you need to create a new configuration in Nacos. The dataId here is seataServer.properties, and the configuration content refers to https://github.com/apache/incubator-seata/tree/develop/script/config-center/config.txt and modify it as needed.

3. In the client, modify the configuration as follows:

```yaml
seata:
  config:
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
      group: 'SEATA_GROUP'
      namespace: ''
      dataId: 'seataServer.properties'
      username: 'nacos'
      password: 'nacos'
```

#### Upload Configuration to Nacos Using Script

Refer to https://github.com/apache/incubator-seata/tree/develop/script/config-center/config.txt and make modifications. Then run the provided Nacos script in the repository to submit the information to the Nacos console. If any changes are needed, they can be directly made through the console.

Example: sh $\{SEATAPATH}/script/config-center/nacos/nacos-config.sh -h localhost -p 8848 -g SEATA_GROUP -t 5a3c7d6c-f497-4d68-a71a-2e5e3340b3ca -u username -w password

For detailed instructions, refer to the [Readme document](https://github.com/apache/incubator-seata/blob/develop/script/config-center/README.md)

Afterwards, start the Seata-Server and Client (business side) applications. If the Seata-Server and Client (business side) applications were already started before importing the configuration to Nacos, they need to be restarted.

> This post is translated using ChatGPT, please [**feedback**](https://github.com/linyuxuanlin/Wiki_MkDocs/issues/new) if any omissions.
