---
title: Seata Namingserver结合Raft模式
keywords: [namingserver,Seata,一致性]
description: 本文主要介绍如何将Seata raft结合Namingserver进行服务发现
author: funky-eyes
date: 2025-11-24
---

# Seata Namingserver结合Raft模式

## 前言：

Seata Namingserver：

​	一个由Seata社区从0到1开发的全新注册中心于2.2.0版本发布，旨在为Seata减少不必要的外部依赖，完成生态自闭环，聚焦事务核心能力而非将精力长期投入至无限迭代的第三方注册中，并且可不依赖配置中心完成流量切换。

​	未来Namingserver将逐步成为Seata的控制面定位，目前已经完成了对事务控制的能力。

Seata Raft：

​	基于Sofa-Jraft所构建的存储计算一体化的模式，相对其它存储模式具有高性能高吞吐，运维和部署简单易用的优势



## 架构

### Namingserver数据模型

##### 存储结构

1. namespace
2. cluster
3. unit

![namingserver](img/namingserver/namingserver.jpg)

namespace可以作多租户相关用途，进行隔离多个租户下的资源。如开发环境，测试环境，生产环境等。

cluster则为Seata的集群单位，比如相同环境下为不同业务和不同应用匹配不同规格的集群。

unit则为最小负载单位，其主要用途负责与Seata-Raft中的raft group所关联，比如一个集群中，存在多个group（Multi-Raft）的情况，每个单元中则存在对应group的成员如leader，follower，learner等角色。

而在非Seata-Raft模式中，unit则为每一个节点，因为在存储计算分离下存储是集群间全局共享的，所以单个节点则为最小单元。



## 服务注册与发现流程

![namingserver](img/namingserver/registry.jpg)

Seata-Server通过策略模式将有状态的Raft和无状态的集群区分



##### Seata 无状态模式



无状态集群模式则将unit设置为uuid，自身成为一个最小单元

当启用Namingserver(Seata)作为注册中心时，每5秒Seata-Server则会发送一次心跳至Namingserver, 但与其它注册中心不同的是，Seata-Server每次心跳中会携带元数据信息，当服务端的事务分组集产生变化会通过心跳实时更新至Namingserver中。



##### Seata Raft模式



有状态Raft集群模式则将自身的Raft-Group作为unit报告至Namingserver，相同cluster下的相同unit为一个组合单元



## 负载均衡

![namingserver](img/namingserver/discovery.jpg)

如图所示，Seata-Client从Namingserver提交自身的事务分组配置，而Namingserver接收到client的事务分组信息后，则会检索该事务分组所对应的namespace下的cluster中的所有unit leader（非raft模式，每个unit节点都被认为是leader），将其返回至client侧。



当有请求进行时client通过NamingserverRegistry的接口获取服务端列表，随后通过客户端指定的负载均衡算法进行选取可用节点。



而针对Multi-Raft（还未推出）

一个cluster中存在多个unit，每个unit中则存在多个节点，而客户端将通过unit进行负载均衡，将流量请求至不同的Raft Group的leader中，避免现阶段单Raft Group时流量倾斜的单点负载过高，而Follower节点资源产生浪费的问题。

举个例子，假设有3台TC节点组成一个Multi-Raft集群，那么设置3个Raft Group，最理想的情况下则每一个TC是一个Group的leader，其余节点互为彼此的Follower，那么通过负载均衡等措施，3个节点都能均匀的接受到来自客户端的请求，资源利用率最佳。而单Group，由于只有一个Leader，所以单节点要处理所有的请求。



## 实践

### Namingserver部署

由于namingserver无状态，故只需要增加检索所需的username和password即可启动（多台节点配置需一致）

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

启动Namingserver节点

### Server-Raft部署

修改application.yml 增加raft相关配置，由于我使用本机启动，故需要端口区分开3台tc，并且需要在每个TC节点启动时增加-Dserver.raftPort=对应的raft端口号，如节点1则为-Dserver.raftPort=9091

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
      server-addr: 127.0.0.1:8081 #如果有多台Namingserver节点需要使用逗号隔开全部都填入
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

启动三台tc节点，使其注册至Namingserver参考https://seata.apache.org/zh-cn/docs/user/registry/namingserver/

#### 注册事务分组至Namingserver中

##### 获取token

如果你使用idea自带的httpclient，可参考以下方式获取token

```text
POST http://localhost:8081/api/v1/auth/login
Content-Type: application/json

{
  "username": "username",
  "password": "password"
}
```



如果你使用curl，可参考以下方式获取token

```shell
curl -X POST http://localhost:8081/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "username", "password": "password"}'
```



将会得到如下响应，请复制其中的data放入后续的`authorization`请求头中

```text
{
  "code": "200",
  "message": "success",
  "data": "Bearer xxxxxxxxxx",
  "success": true
}
```



##### 创建client端的事务分组->seata集群的映射关系

向一个namingserver节点发起创建事务分组映射关系的http请求（namingserver节点会自动同步给其它节点）

```shell
curl -X POST -H "authorization: Bearer xxxxxxx" http://127.0.0.1:8081/naming/v1/addGroup?clusterName=default&namespace=public&unitName=default&vGroup=test
```

（其中namespace是client端配置的命名空间，vGroup是client端配置的事务分组，clusterName是需要映射到的server端的集群名称,unitName为raft group的名称非raft模式可不填）



### Client配置

为了方便入门，这里选取Seata-Samples中的spring-dubbo-seata-tcc模块作为例子，修改其内部provider和consumer的配置项

修改spring-dubbo-seata-tcc-provider和spring-dubbo-seata-tcc-consumer的file.conf

将其中的service中增加刚才创建好的test事务分组

```
service {
  #transaction service group mapping
  vgroupMapping.test = "default"
}
```

如果你想要有2个事务分组，则可以按照之前的流程创建一个新的，此处为了方便则将consumer和provider共用相同的事务分组

此时先启动provider，完成后启动consumer则会自动进行commit和rollback的事务测试

如出现以下日志则代表整体链路已经搭建成功。

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

Consumer(启动后会立刻模拟事务的提交和回滚):

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



