---
title: Zookeeper Registry Center
keywords: [Seata, Zookeeper, Registry Center]
description: Zookeeper Registry Center.
---
#  ZooKeeper Registry Center

ZooKeeper serves as a critical registry center implementation within the Seata component.

This document is based on Seata 1.8.0, demonstrating how to register Seata with ZooKeeper using a file as the configuration center.

It is recommended to use ZooKeeper version 3.4.13 or above. The following example uses ZooKeeper version 3.4.14.

## Prerequisites

Before registering **Seata** with ZooKeeper, ensure that the ZooKeeper service is running. If you are unfamiliar with basic ZooKeeper usage, you can refer to the [ZooKeeper official documentation](https://zookeeper.apache.org/doc/r3.4.14/index.html).

## Quick Start

Integrating Seata with ZooKeeper involves simple steps, roughly categorized as "Adding Maven Dependencies" and "Configuring the Registry Center."

### Server-side Registry Center Configuration

Download [Seata 1.8.0 release](https://github.com/seata/seata/releases/tag/v1.8.0) and extract the files.

Modify the corresponding configuration in `/conf/application.yaml`. For other configuration options, refer to the [Seata configuration reference](https://github.com/seata/seata/blob/develop/server/src/main/resources/application.example.yml).

```yaml
seata:
  registry:
    type: zk
    zk:
      cluster: default
      server-addr: 127.0.0.1:2181
      session-timeout: 6000
      connect-timeout: 2000
      username: ""
      password: ""
```

Execute `/bin/seata-server.bat` (Windows) or `/bin/seata-server.sh` (Unix) to start Seata. The service will run on the local port 8091. Open the ZooKeeper command-line client and enter `ls /registry/zk/default`, check if the node address is listed, indicating successful registration (as shown below).

```
[zk: localhost:2181(CONNECTED) 1] ls /registry/zk/default
[127.0.0.1:8091]
```

### Client-side Maven Dependency

**For a Spring Boot project, add the following dependencies to your `pom.xml` file.**

It is recommended to use the latest version of Seata. Refer to the [version compatibility](https://github.com/alibaba/spring-cloud-alibaba/wiki/版本说明) between `spring-cloud-starter-alibaba-seata` and the corresponding microservices version.

```xml
<!-- Seata -->
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>${seata.version}</version>
</dependency>
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
    <version>${alibaba.cloud.version}</version>
    <exclusions>
        <exclusion>
            <groupId>io.seata</groupId>
            <artifactId>seata-spring-boot-starter</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!-- ZooKeeper client dependency -->
<dependency>
    <groupId>com.101tec</groupId>
    <artifactId>zkclient</artifactId>
    <version>0.11</version>
    <exclusions>
        <exclusion>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
    <version>3.5.9</version>
    <exclusions>
        <exclusion>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
        </exclusion>
        <exclusion>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

### Client-side Configuration

Add the following configuration to `application.yml`. For other configuration options, refer to the [Seata Spring configuration reference](https://github.com/seata/seata/blob/develop/script/client/spring/application.yml).

```yaml
seata:
  registry:
    type: zk
    zk:
      server-addr: 127.0.0.1:2181
      session-timeout: 6000
      connect-timeout: 2000
      username:
      password:
  tx-service-group: default_tx_group
  service:
    vgroup-mapping:
      default_tx_group: default
```

After configuring the client, start the application and wait for a moment, the Seata service will be operational soon.