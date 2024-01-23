---
title: Consul Registry Center
keywords: [Seata, Consul, Registry Center]
description: Consul Registry Center.
---

# Consul Registry

Consul is an important registry implementation in the Seata component.

This article is based on Seata 1.4.2 and registers Seata to Consul with file as the configuration center.

Consul version recommended is 1.8+. The following text uses Consul 1.11.2 as an example.

## Prerequisites

Before you register **Seata** to Consul, make sure that the Consul service is already running. If you are not familiar with the basic usage of Consul, you can refer to the [Consul official documentation](https://www.consul.io/docs) first.

If you just want to experience it quickly, you can also use the following docker command to start a Consul container and access the Consul console at http://localhost:8500.

```shell
docker run -d --name=consul -p 8500:8500 -p 8600:8600/udp consul:1.11.2 agent -dev -client=0.0.0.0 -ui
```

## Quick Start

Integrating Consul registry into Seata is very simple, with a Server-side and a Client-side.

The Server-side only needs to configure the "registry".

The Client-side needs to add Maven dependencies and configure them.

### Server-side configuration of registry

Download [Seata 1.4.2 release](https://github.com/apache/incubator-seata/releases/tag/v1.4.2) and extract it.

Modify the corresponding configuration center in /conf/registry.conf, and refer to the rest of the [configuration](https://github.com/apache/incubator-seata/blob/develop/script/client/conf/registry.conf).

```
registry {
  type = "consul"

  consul {
    # The cluster name registered to Consul, default is default
    cluster = "default"
    serverAddr = "127.0.0.1:8500"
    aclToken = ""
  }
}
```

Execute /bin/seata-server.bat (Windows) or /bin/seata-server.sh (Unix) to start Seata. The service will run on port 8091 locally.

Go to the Consul console to check if Seata is registered successfully.

### Client-side adding Maven dependencies

**Taking a SpringBoot project as an example, add the following to the project's pom.xml**

```xml
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>latest version (Seata version)</version>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-consul-discovery</artifactId>
</dependency>
```

### Client-side configuration

Add the corresponding registry to application.yml, and refer to the rest of the [configuration](https://github.com/apache/incubator-seata/blob/develop/script/client/spring/application.yml).

```yaml
seata:
  registry:
    consul:
      server-addr: 127.0.0.1:8500
  # Transaction group configuration, default name is my_test_tx_group in version 1.4.2, will be changed to default_tx_group in version 1.5
  # For more information about transaction groups, please refer to https://seata.apache.org/docs/user/txgroup/transaction-group/
  tx-service-group: my_test_tx_group
  service:
    # Mapping between transaction group and cluster
    vgroup-mapping:
      my_test_tx_group: default
```

After completing the client configuration, start the application and wait for a moment. When the following log appears, you can officially experience the Seata service.

```text
register TM success. client version:1.4.2, server version:1.4.2,channel:[id: 0xa4675e28, L:/127.0.0.1:8238 - R:/127.0.0.1:8091]
register RM success. client version:1.4.2, server version:1.4.2,channel:[id: 0x408192d3, L:/127.0.0.1:8237 - R:/127.0.0.1:8091]
register success, cost 94 ms, version:1.4.2,role:RMROLE,channel:[id: 0x408192d3, L:/127.0.0.1:8237 - R:/127.0.0.1:8091]
register success, cost 94 ms, version:1.4.2,role:TMROLE,channel:[id: 0xa4675e28, L:/127.0.0.1:8238 - R:/127.0.0.1:8091]
```
