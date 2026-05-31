---
title: Seata Namingserver Combined with Raft Mode
keywords: [namingserver, Seata, consistency]
description: This article mainly introduces how to combine Seata Raft with Namingserver for service discovery.
author: funky-eyes
date: 2025-11-24
---

# Seata Namingserver Combined with Raft Mode

## Preface

**Seata Namingserver:**

A brand-new registry center developed from scratch by the Seata community, released in version 2.2.0. It aims to reduce unnecessary external dependencies for Seata, complete the self-contained ecosystem, focus on core transaction capabilities rather than investing long-term energy in endlessly iterating third-party registries, and enable traffic switching without relying on a configuration center.

In the future, Namingserver will gradually become the control plane for Seata, and currently, it has completed the capabilities for transaction control.

**Seata Raft:**

A mode built on Sofa-Jraft that integrates storage and computation. Compared to other storage modes, it has the advantages of high performance, high throughput, and ease of operation and deployment.

## Architecture

### Namingserver Data Model

##### Storage Structure

1. namespace
2. cluster
3. unit

![namingserver](img/namingserver/namingserver.jpg)

**Namespace** can be used for multi-tenant purposes to isolate resources under multiple tenants, such as development environment, test environment, production environment, etc.

**Cluster** is the cluster unit of Seata. For example, matching clusters of different specifications for different businesses and applications in the same environment.

**Unit** is the minimum load unit. Its main purpose is to associate with the raft group in Seata-Raft. For example, in a cluster where multiple groups (Multi-Raft) exist, each unit contains members of the corresponding group, such as leader, follower, learner, etc.

In non-Seata-Raft mode, a **unit** corresponds to each node. Since storage is globally shared among clusters under the separation of storage and computation, a single node is the minimum unit.

## Service Registration and Discovery Process

![namingserver](img/namingserver/registry.jpg)

Seata-Server distinguishes between stateful Raft and stateless clusters through the strategy pattern.

##### Seata Stateless Mode

In the stateless cluster mode, the unit is set to a UUID, and the node itself becomes a minimum unit.

When Namingserver (Seata) is enabled as the registry center, Seata-Server sends a heartbeat to Namingserver every 5 seconds. However, unlike other registry centers, Seata-Server carries metadata in every heartbeat. When the transaction group set on the server side changes, it is updated to Namingserver in real-time via the heartbeat.

##### Seata Raft Mode

In the stateful Raft cluster mode, the node reports its own Raft-Group as a unit to Namingserver. The same unit under the same cluster forms a combined unit.

## Load Balancing

![namingserver](img/namingserver/discovery.jpg)

As shown in the figure, the Seata-Client submits its transaction group configuration to Namingserver. After receiving the client's transaction group information, Namingserver retrieves all unit leaders (in non-raft mode, every unit node is considered a leader) in the cluster under the corresponding namespace for that transaction group and returns them to the client side.

When a request is made, the client obtains the server list through the `NamingserverRegistry` interface and then selects an available node using the load balancing algorithm specified by the client.

**Regarding Multi-Raft (Not yet released):**

A cluster contains multiple units, and each unit contains multiple nodes. The client will perform load balancing based on units, directing traffic to the leaders of different Raft Groups. This avoids the current issue with a single Raft Group where traffic skew causes high load on a single point and wastes Follower node resources.

For example, assume there are 3 TC nodes forming a Multi-Raft cluster. If we set up 3 Raft Groups, in the ideal scenario, each TC is the leader of one Group and a Follower of the others. Through load balancing measures, all 3 nodes can evenly receive requests from clients, resulting in optimal resource utilization. In contrast, with a single Group, since there is only one Leader, a single node has to handle all requests.

## Practice

### Namingserver Deployment

Since Namingserver is stateless, you only need to add the `username` and `password` required for retrieval to start it (configuration must be consistent across multiple nodes).

```yaml
#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

server:
  port: 8081

spring:
  application:
    name: seata-namingserver
logging:
  config: classpath:logback-spring.xml
  file:
    path: ${log.home:${user.home}/logs/seata}
heartbeat:
  threshold: 90000
  period: 60000

console:
  user:
    username: seata
    password: seata
seata:
  security:
    secretKey: SeataSecretKey0c382ef121d778043159209298fd40bf3850a017
    tokenValidityInMilliseconds: 1800000
    csrf-ignore-urls: /naming/v1/**,/api/v1/naming/**
    ignore:
      urls: /,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.jpeg,/**/*.ico,/api/v1/auth/login,/version.json,/naming/v1/health,/error

```

Start the Namingserver node.

### Server-Raft Deployment

Modify `application.yml` to add Raft-related configurations. Since I am starting it locally, I need to distinguish the 3 TCs by port, and add `-Dserver.raftPort=` with the corresponding raft port number when starting each TC node. For example, for node 1, it would be `-Dserver.raftPort=9091`.

```yaml
#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
server:
  port: 8091
spring:
  application:
    name: seata-server
  main:
    web-application-type: none
logging:
  config: classpath:logback-spring.xml
  file:
    path: ${log.home:${user.home}/logs/seata}
  extend:
    logstash-appender:
      # off by default
      enabled: false
      destination: 127.0.0.1:4560
    kafka-appender:
      # off by default
      enabled: false
      bootstrap-servers: 127.0.0.1:9092
      topic: logback_to_logstash
      producer:
        acks: 0
        linger-ms: 1000
        max-block-ms: 0
    metric-appender:
      # off by default
      enabled: false

seata:
  config:
    # support: nacos, consul, apollo, zk, etcd3
    type: file
  registry:
    # support: nacos, eureka, redis, zk, consul, etcd3, sofa, seata
    type: seata
    seata:
      server-addr: 127.0.0.1:8081 # If there are multiple Namingserver nodes, separate them with commas and fill them all in
      cluster: default
      namespace: public
      heartbeat-period: 5000
      metadata-max-age-ms: 30000
      username: seata
      password: seata
      tokenValidityInMilliseconds: 1740000
  store:
    # support: file 、 db 、 redis 、 raft
    mode: raft
  server:
    raft:
      group: default
      server-addr: 127.0.0.1:9091,127.0.0.1:9092,127.0.0.1:9093
      snapshot-interval: 600
      apply-batch: 32
      max-append-bufferSize: 262144
      max-replicator-inflight-msgs: 256
      disruptor-buffer-size: 16384
      election-timeout-ms: 1000
      reporter-enabled: false
      reporter-initial-delay: 60
      serialization: jackson
      compressor: none
      sync: true # sync log&snapshot to disk

```

Start the three TC nodes and register them to Namingserver. Refer to: https://seata.apache.org/docs/user/registry/namingserver/

#### Register Transaction Group to Namingserver

##### Obtain Token

If you use the HTTP client built into IntelliJ IDEA, you can obtain the token as follows:

```text
POST http://localhost:8081/api/v1/auth/login
Content-Type: application/json

{
  "username": "username",
  "password": "password"
}
```

If you use `curl`, you can obtain the token as follows:

```shell
curl -X POST http://localhost:8081/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "username", "password": "password"}'
```

You will receive a response similar to the following. Please copy the `data` field content and put it into the `authorization` header for subsequent requests.

```text
{
  "code": "200",
  "message": "success",
  "data": "Bearer xxxxxxxxxx",
  "success": true
}
```

##### Create Mapping Relationship: Client Transaction Group -> Seata Cluster

Initiate an HTTP request to a Namingserver node to create the transaction group mapping relationship (the Namingserver node will automatically sync to other nodes).

```shell
curl -X POST -H "authorization: Bearer xxxxxxx" http://127.0.0.1:8081/naming/v1/addGroup?clusterName=default&namespace=public&unitName=default&vGroup=test
```

(Where `namespace` is the namespace configured on the client side, `vGroup` is the transaction group configured on the client side, `clusterName` is the name of the server-side cluster to map to, and `unitName` is the name of the raft group; it can be left blank for non-raft mode.)

### Client Configuration

To make it easier to get started, we select the `spring-dubbo-seata-tcc` module from Seata-Samples as an example and modify the configuration items of its internal provider and consumer.

Modify `file.conf` in `spring-dubbo-seata-tcc-provider` and `spring-dubbo-seata-tcc-consumer`.

Add the `test` transaction group created earlier to the `service` section.

```
service {
  #transaction service group mapping
  vgroupMapping.test = "default"
}
```

If you want to have 2 transaction groups, you can create a new one following the previous process. For convenience here, the consumer and provider share the same transaction group.

Now start the provider first. After completion, start the consumer, and it will automatically perform transaction commit and rollback tests.

If the following logs appear, it means the entire link has been successfully established.

Provider:

```
2025-12-01 09:52:39.788 [main] INFO  o.a.s.c.l.EnhancedServiceLoader$InnerEnhancedServiceLoader - Load compatible class io.seata.core.auth.AuthSigner
2025-12-01 09:52:39.796 [main] INFO  o.a.s.c.r.netty.NettyClientBootstrap - NettyClientBootstrap has started
2025-12-01 09:52:39.798 [main] INFO  o.a.s.d.registry.RegistryFactory - use registry center type: seata
2025-12-01 09:52:39.802 [main] INFO  o.a.s.c.l.EnhancedServiceLoader$InnerEnhancedServiceLoader - Load compatible class io.seata.discovery.registry.RegistryProvider
2025-12-01 09:52:40.436 [main] INFO  o.a.s.c.r.n.NettyClientChannelManager - will connect to 10.56.10.53:8091
2025-12-01 09:52:40.439 [main] INFO  o.a.s.c.r.netty.NettyPoolableFactory - NettyPool create channel to transactionRole:TMROLE,address:10.56.10.53:8091,msg:< RegisterTMRequest{version='2.4.0-SNAPSHOT', applicationId='tcc-sample-provider', transactionServiceGroup='test', extraData='ak=null
digest=test,10.37.129.2,1764553960438
timestamp=1764553960438
authVersion=V4
vgroup=test
ip=10.37.129.2
'} >
2025-12-01 09:52:45.608 [NettyClientSelector_TMROLE_1_1] INFO  o.a.s.c.l.EnhancedServiceLoader$InnerEnhancedServiceLoader - Load compatible class io.seata.core.serializer.Serializer
2025-12-01 09:52:45.649 [main] INFO  o.a.s.c.r.n.TmNettyRemotingClient - register TM success. client version:2.4.0-SNAPSHOT, server version:2.6.0-SNAPSHOT,channel:[id: 0x870b93aa, L:/10.56.10.53:63269 - R:/10.56.10.53:8091]
2025-12-01 09:52:45.654 [main] INFO  o.a.s.c.r.netty.NettyPoolableFactory - register success, cost 62 ms, version:2.6.0-SNAPSHOT,role:TMROLE,channel:[id: 0x870b93aa, L:/10.56.10.53:63269 - R:/10.56.10.53:8091]
2025-12-01 09:52:45.655 [main] INFO  o.a.s.s.a.GlobalTransactionScanner - Transaction Manager Client is initialized. applicationId[tcc-sample-provider] txServiceGroup[test]
2025-12-01 09:52:45.663 [main] INFO  o.a.s.c.l.EnhancedServiceLoader$InnerEnhancedServiceLoader - Load compatible class io.seata.core.model.ResourceManager
2025-12-01 09:52:45.665 [main] INFO  o.a.seata.rm.datasource.AsyncWorker - Async Commit Buffer Limit: 10000
2025-12-01 09:52:45.665 [main] INFO  o.a.s.r.d.xa.ResourceManagerXA - ResourceManagerXA init ...
2025-12-01 09:52:45.670 [main] INFO  o.a.s.c.r.netty.NettyClientBootstrap - NettyClientBootstrap has started
2025-12-01 09:52:45.670 [main] INFO  o.a.s.s.a.GlobalTransactionScanner - Resource Manager is initialized. applicationId[tcc-sample-provider] txServiceGroup[test]
2025-12-01 09:52:45.671 [main] INFO  o.a.s.s.a.GlobalTransactionScanner - Global Transaction Clients are initialized. 
2025-12-01 09:52:45.678 [main] INFO  o.a.s.s.a.GlobalTransactionScanner - The needed enhancement business beans are : [tccActionTwoImpl, tccActionOneImpl]
```

Consumer (will simulate transaction commit and rollback immediately after startup):

```
2025-12-01 09:54:09.216 [main] INFO  o.a.s.tm.TransactionManagerHolder - TransactionManager Singleton org.apache.seata.tm.DefaultTransactionManager@756aadfc
2025-12-01 09:54:09.296 [main] INFO  o.a.s.t.api.DefaultGlobalTransaction - Begin new global transaction [10.56.10.53:8091:5774336103997718529]
2025-12-01 09:54:09.321 [main] INFO  o.a.d.r.p.d.LazyConnectExchangeClient -  [DUBBO] Lazy connect to dubbo://10.37.129.2:20880/org.apache.seata.action.TccActionOne?anyhost=true&application=tcc-sample-reference&background=false&category=providers,configurators,routers&check=false&codec=dubbo&deprecated=false&dubbo=2.0.2&dynamic=true&generic=false&heartbeat=60000&interface=org.apache.seata.action.TccActionOne&ipv6=fdb2:2c26:f4e4:1:0:0:0:1&lazy=true&loadbalance=roundrobin&methods=commit,prepare,rollback&pid=81561&qos.enable=false&release=3.1.11&service-name-mapping=true&side=consumer&sticky=false&threadpool=fixed&threads=10&timeout=10000&unloadClusterRelated=false, dubbo version: 3.1.11, current host: 10.37.129.2
2025-12-01 09:54:09.329 [main] INFO  o.a.d.r.transport.AbstractClient -  [DUBBO] Successfully connect to server /fdb2:2c26:f4e4:1:0:0:0:1:20880 from NettyClient 10.37.129.2 using dubbo version 3.1.11, channel is NettyChannel [channel=[id: 0xb7e07852, L:/fdb2:2c26:f4e4:1:0:0:0:1:63981 - R:/fdb2:2c26:f4e4:1:0:0:0:1:20880]], dubbo version: 3.1.11, current host: 10.37.129.2
2025-12-01 09:54:09.329 [main] INFO  o.a.d.r.transport.AbstractClient -  [DUBBO] Start NettyClient /10.37.129.2 connect to the server /fdb2:2c26:f4e4:1:0:0:0:1:20880, dubbo version: 3.1.11, current host: 10.37.129.2
2025-12-01 09:54:09.330 [NettyClientWorker-4-1] INFO  o.a.d.r.t.netty4.NettyClientHandler -  [DUBBO] The connection of /fdb2:2c26:f4e4:1:0:0:0:1:63981 -> /fdb2:2c26:f4e4:1:0:0:0:1:20880 is established., dubbo version: 3.1.11, current host: 10.37.129.2
2025-12-01 09:54:09.494 [main] INFO  o.a.s.t.api.DefaultGlobalTransaction - transaction 10.56.10.53:8091:5774336103997718529 will be commit
2025-12-01 09:54:09.589 [main] INFO  o.a.s.t.api.DefaultGlobalTransaction - transaction end, xid = 10.56.10.53:8091:5774336103997718529
2025-12-01 09:54:09.589 [main] INFO  o.a.s.t.api.DefaultGlobalTransaction - [10.56.10.53:8091:5774336103997718529] commit status: Committed
10.56.10.53:8091:5774336103997718529
transaction commit demo finish.
2025-12-01 09:54:09.600 [main] INFO  o.a.s.t.api.DefaultGlobalTransaction - Begin new global transaction [10.56.10.53:8091:5774336103997718532]
2025-12-01 09:54:09.626 [main] INFO  o.a.s.t.api.DefaultGlobalTransaction - transaction 10.56.10.53:8091:5774336103997718532 will be rollback
2025-12-01 09:54:09.693 [main] INFO  o.a.s.t.api.DefaultGlobalTransaction - transaction end, xid = 10.56.10.53:8091:5774336103997718532
2025-12-01 09:54:09.693 [main] INFO  o.a.s.t.api.DefaultGlobalTransaction - [10.56.10.53:8091:5774336103997718532] rollback status: Rollbacked
transaction rollback demo finish.
```

