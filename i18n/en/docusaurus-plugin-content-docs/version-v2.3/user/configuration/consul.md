---
title: Consul Configuration Center
keywords: [Seata, Consul]
description: Consul Configuration Center.
---

# Consul Configuration Center

Based on [Using Consul as a Registry](/docs/user/registry/consul), put Seata configuration into Consul.

This article is based on Seata 1.4.2, and Consul version 1.8+ is recommended. Consul 1.11.2 is used as an example in the following text.

## Preparation

Before using Consul as the Seata configuration center, make sure that the Consul service has been started.

## Quick Start

The steps to configure Consul as the Seata configuration center are very simple and can be divided into the following steps:

1. Configure Consul as the configuration center for seata-server.
2. Submit Key-Value configuration to Consul.
3. Configure Consul as the configuration center for the client.

### Configure Consul as the Configuration Center

First, make sure that your Consul service has been started.

In the Seata directory /conf/registry.conf, add the corresponding configuration center. For other configuration references, please refer to [here](https://github.com/apache/incubator-seata/blob/1.4.2/script/server/config/registry.conf).

```
config {
  type = "consul"

  consul {
    serverAddr = "127.0.0.1:8500"
    aclToken = ""
  }
}
```

**At this time, when starting the Seata service, the following information will be prompted. You can close the service first.**

```
config operation timeout,cost:5015 ms,op:GET,dataId:store.mode
config operation timeout,cost:5006 ms,op:GET,dataId:metrics.enabled
config operation timeout,cost:5001 ms,op:GET,dataId:transport.threadFactory.bossThreadPrefix
config operation timeout,cost:5009 ms,op:GET,dataId:transport.threadFactory.workerThreadPrefix
# Other similar information is omitted here~
```

### Submit Key-Value Configuration to Consul

The above error message appears because the corresponding configuration is missing in Consul. Please submit the configuration to Consul Key/Value in one of the following ways:

1. Through the Consul console UI, Key/Value -> create.
2. Through [HTTP requests](https://www.consul.io/api-docs/kv).
3. Through [Consul command-line tools](https://www.consul.io/commands/kv).
4. **Recommended: Use the official provided script to upload the configuration**.

**Tips**: For version 1.4.2, you need to create key-value one by one. Starting from version 1.5.0, it supports key corresponding to a file.

Taking store.mode=file as an example, submit the configuration corresponding to the error message. You can find the [default configuration](https://github.com/apache/incubator-seata/blob/1.4.2/script/config-center/config.txt) here.

```properties
store.mode=file
store.publicKey=
store.file.dir=file_store/data
store.file.maxBranchSessionSize=16384
# The remaining configuration items are omitted~
```

**Recommended to use official script:** The above methods 1~3 require adding configurations one by one, which is cumbersome. To address this, the official provides a [script](https://github.com/apache/incubator-seata/blob/1.4.2/script/config-center/consul/consul-config.sh) and [default configuration](https://github.com/apache/incubator-seata/blob/1.4.2/script/config-center/config.txt) for quickly adding configurations.

Place the config.txt file in the **parent directory** of consul-config.sh, and adjust the configuration in config.txt according to your needs (mainly seata.mode and configurations with prefixes seata.file, seata.db, and seata.redis).

Execute the following command:

```shell
sh {PATH}/consul-config.sh -h localhost -p 8500
```

For specific operations, refer to the [README.md](https://github.com/apache/incubator-seata/blob/1.4.2/script/config-center/README.md).

Restart the Seata service at this point, and you will find that there are no more errors, indicating that Consul is successfully used as the configuration center. If you need to adjust the configuration later, you can go to the console to modify the corresponding configuration separately, and restart the service after modification.

### Client-side Configuration of Consul as Configuration Center

**Taking a SpringBoot project as an example, add the following to the project's pom.xml file:**

```xml

<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>latest version (Seata version)</version>
</dependency>
<dependency>
<groupId>org.springframework.cloud</groupId>
<artifactId>spring-cloud-starter-consul-config</artifactId>
</dependency>
```

### Client-side Configuration

Add the corresponding configuration center in application.yml, and refer to other [configurations](https://github.com/apache/incubator-seata/blob/develop/script/client/spring/application.yml).

```yaml
seata:
  config:
    type: consul
    consul:
      server-addr: 127.0.0.1:8500
```

Restart the Client.
