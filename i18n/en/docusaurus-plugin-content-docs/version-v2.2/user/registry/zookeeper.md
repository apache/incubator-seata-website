---
title: Zookeeper Registry Center
keywords: [Seata, Zookeeper, Registry Center]
description: Zookeeper Registry Center.
---
#  ZooKeeper Registry Center

ZooKeeper serves as a critical registry center implementation within the Seata component.

This document is based on Seata 2.0.0, demonstrating how to register Seata with ZooKeeper using a file as the configuration center.

It is recommended to use ZooKeeper version 3.4.13 or above. The following example uses ZooKeeper version 3.4.14.

## Prerequisites

Before registering **Seata** with ZooKeeper, ensure that the ZooKeeper service is running. If you are unfamiliar with basic ZooKeeper usage, you can refer to the [ZooKeeper official documentation](https://zookeeper.apache.org/doc/r3.4.14/index.html).

## Quick Start

Integrating Seata with ZooKeeper involves simple steps, roughly categorized as "Adding Maven Dependencies" and "Configuring the Registry Center."

### Server-side Registry Center Configuration

Download [Seata 2.0.0 release](https://github.com/apache/incubator-seata/releases/tag/v2.0.0) and extract the files.

Modify the corresponding configuration in `/conf/application.yaml`. For other configuration options, refer to the [Seata configuration reference](https://github.com/apache/incubator-seata/blob/develop/server/src/main/resources/application.example.yml).

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


### Client-side Configuration


If you are using the `io.seata:seata-spring-boot-starter` dependency, you need to add the following ZooKeeper configuration in the application.yml file. For additional configurations, please refer to the [configuration reference](https://github.com/apache/incubator-seata/blob/2.x/script/client/spring/application.yml)
:
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
Alternatively, if you are using the `io.seata:seata-all` dependency, you need to add transaction group and cluster mapping in the `file.conf` as follows:

```
vgroupMapping.default_tx_group = "default"
```
Additionally, include ZooKeeper configuration in the `registry.conf` file. For other configurations, please refer to the [configuration reference](https://github.com/apache/incubator-seata/tree/2.x/script/client/conf):

```
zk {
    serverAddr = "127.0.0.1:2181"
    sessionTimeout = 6000
    connectTimeout = 2000
    username = ""
    password = ""
}
```

After configuring the client, start the application and wait for a moment, the Seata service will be operational soon.