---
title: Etcd3 Configuration Center
keywords: [Seata, Etcd3]
description: Etcd3 Configuration Center.
---

# Etcd3 Configuration Center

Etcd3 is an important configuration center implementation in the Seata component.

## Prerequisites

Before integrating `Etcd3` into your Seata project, make sure that the Etcd3 Server service has been started in the background. If you are not familiar with the basic usage of Etcd3, you can refer to the [Etcd3 Quickstart](https://etcd.io/docs/v3.5/quickstart) for preliminary understanding. It is recommended to use Etcd3 version `3.5.0` or above.

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

### Client-side Configuration Center

Add the corresponding configuration center to the [**application.yml**](https://github.com/apache/incubator-seata/blob/develop/script/client/spring/application.yml) file. For other configurations, please refer to the [Configuration Reference](https://github.com/apache/incubator-seata/tree/develop/script/client).

```yaml
seata:
  config:
    type: etcd3
    etcd3:
      server-addr: http://localhost:2379
```

### Server-side Configuration Center

Add the corresponding configuration center to the [registry.conf](https://github.com/apache/incubator-seata/blob/develop/script/server/config/registry.conf) file. For other configurations, please refer to the [Configuration Reference](https://github.com/apache/incubator-seata/tree/develop/script/server).

```
config {
  type = "etcd3"

  etcd3 {
    serverAddr = "http://localhost:2379"
  }
}

```

### Upload Configuration to Etcd3 Configuration Center

#### Upload Configuration to Etcd3 via Script

Refer to the [config.txt](https://github.com/apache/incubator-seata/tree/develop/script/config-center) in the repository and make modifications. Then run the provided etcd3 script in the repository to submit the information to the Etcd3 server. If necessary, you can directly modify it through the console.

eg: sh $\{SEATAPATH}/script/config-center/etcd3/etcd3-config.sh -h localhost -p 2379

For detailed analysis, please refer to the [Readme document](https://github.com/apache/incubator-seata/blob/develop/script/config-center/README.md)

After that, start the Seata-Server and Client (business side) applications. If the Seata-Server and Client (business side) applications have already been started before importing the configuration to Etcd3, they need to be restarted.
