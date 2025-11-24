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

A brand-new registry center developed from scratch by the Seata community, released in version 2.2.0. It aims to reduce unnecessary external dependencies for Seata, complete the self-contained ecosystem, and focus on core transaction capabilities rather than investing long-term energy into infinitely iterating third-party registries. Additionally, it allows for traffic switching without relying on a configuration center.

In the future, Namingserver will gradually assume the role of Seata's control plane. Currently, it has completed the capabilities for transaction control.

**Seata Raft:**

A storage-compute integrated mode built on Sofa-Jraft. Compared to other storage modes, it offers advantages such as high performance, high throughput, and ease of operation and deployment.

## Architecture

### Namingserver Data Model

##### Storage Structure

1.  namespace
2.  cluster
3.  unit

![namingserver](img/namingserver/namingserver.jpg)

**Namespace** can be used for multi-tenant purposes, isolating resources under multiple tenants, such as development environments, test environments, production environments, etc.

**Cluster** is the cluster unit of Seata. For example, different specifications of clusters can be matched for different businesses and applications within the same environment.

**Unit** is the smallest load unit. Its main purpose is to associate with the Raft group in Seata-Raft. For instance, in a cluster where multiple groups exist (Multi-Raft), each unit contains the members of the corresponding group, such as leader, follower, learner, etc.

In non-Seata-Raft modes, a unit represents each node. Since storage is globally shared among the cluster in a storage-compute separation architecture, a single node is the smallest unit.

## Service Registration and Discovery Process

![namingserver](img/namingserver/registry.jpg)

Seata-Server distinguishes between stateful Raft and stateless clusters through the strategy pattern.

##### Seata Stateless Mode

In the stateless cluster mode, the unit is set to a UUID, and the node itself becomes a minimum unit.

When Namingserver (Seata) is enabled as the registry center, Seata-Server sends a heartbeat to Namingserver every 5 seconds. However, unlike other registry centers, Seata-Server carries metadata information in each heartbeat. When the server-side transaction group set changes, it is updated to Namingserver in real-time via the heartbeat.

##### Seata Raft Mode

In the stateful Raft cluster mode, the node reports its own Raft-Group as the unit to Namingserver. The same unit under the same cluster forms a combined unit.

## Load Balancing

![namingserver](img/namingserver/discovery.jpg)

As shown in the figure, the Seata-Client submits its transaction group configuration to Namingserver. After receiving the client's transaction group information, Namingserver retrieves all unit leaders (in non-Raft mode, every unit node is considered a leader) in the cluster under the corresponding namespace for that transaction group and returns them to the client side.

When a request is made, the client obtains the server list through the `NamingserverRegistry` interface and then selects an available node using the load balancing algorithm specified by the client.

**Regarding Multi-Raft (Not yet released):**

A cluster contains multiple units, and each unit contains multiple nodes. The client performs load balancing through units, directing traffic requests to the leaders of different Raft Groups. This avoids the current issue with a single Raft Group where traffic skew causes excessive load on a single point and wastes resources on Follower nodes.

For example, assume there are 3 TC nodes forming a Multi-Raft cluster. If we set up 3 Raft Groups, in the ideal scenario, each TC is the leader of one Group and a Follower of the others. Through load balancing measures, all 3 nodes can evenly receive requests from clients, optimizing resource utilization. In contrast, with a single Group, since there is only one Leader, a single node must handle all requests.

## Practice

### Namingserver Deployment

Since Namingserver is stateless, you only need to add the username and password required for retrieval to start it (configurations across multiple nodes must be consistent).

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

Modify `application.yml` to add Raft-related configurations. Since I am starting this locally, I need to distinguish the 3 TCs by port, and add `-Dserver.raftPort=` with the corresponding Raft port number when starting each TC node. For example, for node 1, it would be `-Dserver.raftPort=9091`.

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
      server-addr: 127.0.0.1:8081 # If there are multiple Namingserver nodes, separate them with commas and fill them all in.
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

##### Get Token

If you use the HTTP client built into IntelliJ IDEA, you can refer to the following method to get the token:

```text
POST http://localhost:8081/api/v1/auth/login
Content-Type: application/json

{
  "username": "username",
  "password": "password"
}
```

If you use `curl`, you can refer to the following method to get the token:

```shell
curl -X POST http://localhost:8081/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "username", "password": "password"}'
```

You will receive a response similar to the following. Please copy the `data` field and put it into the `authorization` header for subsequent requests.

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
curl -X POST -H "authorization: Bearer xxxxxxx" http://127.0.0.1:8081/naming/v1/addGroup?clusterName=cluster2&namespace=public&unitName=default&vGroup=test
```

(Where `namespace` is the namespace configured on the client side, `vGroup` is the transaction group configured on the client side, `clusterName` is the name of the server-side cluster to map to, and `unitName` is the name of the Raft group; it can be left blank for non-Raft modes.)

### Client Configuration

To make it easier to get started, we select the `spring-dubbo-seata-tcc` module from Seata-Samples as an example and modify the configuration items for its internal provider and consumer.

Modify `file.conf` in `spring-dubbo-seata-tcc-provider` and `spring-dubbo-seata-tcc-consumer`.

Add the `test` transaction group created earlier to the `service` section.

```nginx
service {
  #transaction service group mapping
  vgroupMapping.test = "default"
}
```

If you want to have 2 transaction groups, you can follow the previous process to create a new one. For convenience here, the consumer and provider share the same transaction group.

At this point, start the provider first. After completion, start the consumer, and it will automatically perform transaction tests for commit and rollback.

If the following logs appear, it means the entire link has been successfully set up.

