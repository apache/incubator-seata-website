---
title: Seata-Raft 存储模式详解及入门
description: 从传统的存算分离，再到及存算一体化依靠分布式一致性算法保证事务数据一致性下的高可用模式，Seata 2.x做出了哪些改动？本文将详细介绍架构，及性能比对
keywords: [fescar、seata、分布式事务,raft]
author: funkye
date: 2023/10/13
---

- [1. 概述](#)
- [2. 架构介绍](#)
- [3. 使用部署](#)
- [4. 压测对比](#)
- [5. 总结](#)

# 1. 概述

Seata 是一款开源的分布式事务解决方案，star高达24000+，社区活跃度极高，致力于在微服务架构下提供高性能和简单易用的分布式事务服务.

目前Seata的分布式事务数据存储模式有file，db，redis，而本篇文章将Seata-Server Raft模式的架构，部署使用，压测对比，及为什么Seata需要Raft,并领略从调研对比,设计,到具体实现,再到知识沉淀的过程.

分享人：陈健斌（funkye） github id: [funky-eyes](https://github.com/funky-eyes)

# 2. 架构介绍
## 2.1 Raft 模式是什么？
首先需要明白什么是raft分布式一致性算法,这里直接摘抄sofa-jraft官网的相关介绍:

```
RAFT 是一种新型易于理解的分布式一致性复制协议，由斯坦福大学的 Diego Ongaro 和 John Ousterhout 提出，作为 RAMCloud 项目中的中心协调组件。Raft 是一种 Leader-Based 的 Multi-Paxos 变种，相比 Paxos、Zab、View Stamped Replication 等协议提供了更完整更清晰的协议描述，并提供了清晰的节点增删描述。 Raft 作为复制状态机，是分布式系统中最核心最基础的组件，提供命令在多个节点之间有序复制和执行，当多个节点初始状态一致的时候，保证节点之间状态一致。

简而言之Seata的Raft模式就是基于Sofa-Jraft组件实现可保证Seata-Server自身的数据一致性和服务高可用.
```
## 2.2 为什么需要raft模式
看完上述的Seata-Raft模式是什么的定义后,是否就有疑问,难道现在Seata-Server就无法保证一致性和高可用了吗?那么下面从一致性和高可用来看看目前Seata-Server是如何做的.
### 2.2.1 现有存储模式
在当前的 Seata 设计中，Server 端的作用是保证事务的二阶段被正确执行。然而，这取决于事务记录的正确存储。为确保事务记录不丢失，需要在保持状态正确的前提下，驱动所有的 Seata-RM 执行正确的二阶段行为。那么，Seata 目前是如何存储事务状态和记录的呢？

首先介绍一下 Seata 支持的三种事务存储模式：file、db 和 redis。根据一致性的排名，db 模式下的事务记录可以得到最好的保证，其次是 file 模式的异步刷盘，最后是 redis 模式下的 aof 和 rdb

顾名思义:

- file 模式是 Seata 自实现的事务存储方式，它以顺序写的形式将事务信息存储到本地磁盘上。为了兼顾性能，默认采用异步方式，并将事务信息存储在内存中，确保内存和磁盘上的数据一致性。当 Seata-Server（TC）意外宕机时，在重新启动时会从磁盘读取事务信息并恢复到内存中，以便继续运行事务上下文。
- db 是 Seata 的抽象事务存储管理器（AbstractTransactionStoreManager）的另一种实现方式。它依赖于数据库，如 PostgreSQL、MySQL、Oracle 等，在数据库中进行事务信息的增删改查操作。一致性由数据库的本地事务保证，数据也由数据库负责持久化到磁盘。
- redis 和 db 类似，也是一种事务存储方式。它利用 Jedis 和 Lua 脚本来进行事务的增删改查操作，部分操作（如竞争锁）在 Seata 2.x 版本中全部采用了 Lua 脚本。数据的存储与 db 类似，依赖于存储方（Redis）来保证数据的一致性。与 db 类似，redis 在 Seata 中采用了计算和存储分离的架构设计.

### 2.2.2 高可用

高可用简单理解就是集群能够在主节点宕机后继续正常运行，常见的方式是通过部署多个提供相同服务的节点，并通过注册中心实时感知主节点的上下线情况，以便及时切换到可用的节点。

看起来似乎只需要加几台机器进行部署，但实际上背后存在一个问题，即如何确保多个节点像一个整体一样运作。如果其中一个节点宕机，另一个节点能够完美接替宕机节点的工作，包括处理宕机节点的数据。解决这个问题的答案其实很简单，在计算与存储分离的架构下，只需将数据存储在共享的存储中间件中，任何一个节点都可以通过访问该公共存储区域获取所有节点操作的事务信息，从而实现高可用的能力。

然而，前提条件是计算与存储必须分离。为什么计算与存储一体化设计不可行呢？这就要说到 File 模式的实现了。如之前描述的，File 模式将数据存储在本地磁盘和节点内存中，数据写操作没有任何同步，这意味着目前的 File 模式无法实现高可用，仅支持单机部署。作为初级的快速入门和简单使用而言，File 模式适用性较低，高性能的基于内存的 File 模式也基本上不再被生产环境使用。
## 2.3 Seata-Raft是如何设计的呢？
### 2.3.1 设计原理
Seata-Raft模式的设计思路是通过封装无法高可用的file模式，利用Raft算法实现多个TC之间数据的同步。该模式保证了使用file模式时多个TC的数据一致性，同时将异步刷盘操作改为使用Raft日志和快照进行数据恢复。
![流程图](https://blog.funkye.icu/img/blog/Dingtalk_20230105203431.jpg)

在Seata-Raft模式中，client端在启动时会从配置中心获取当前client的事务分组（例如default）以及相关Raft集群节点的IP地址。通过向Seata-Server的控制端口发送请求，client可以获取到default分组对应的Raft集群的元数据，包括leader、follower和learner成员节点。然后，client会监视（watch）非leader节点的任意成员节点。

假设TM开始一个事务，并且本地的metadata中的leader节点指向了TC1的地址，那么TM只会与TC1进行交互。当TC1添加一个全局事务信息时，通过Raft协议，即图中标注为步骤1的日志发送，TC1会将日志发送给其他节点，步骤2是follower节点响应日志接收情况。当超过半数的节点（如TC2）接受并响应成功时，TC1上的状态机（FSM）将执行添加全局事务的动作。

![watch](https://blog.funkye.icu/img/blog/Dingtalk_20230105204423.jpg)
![watch2](https://blog.funkye.icu/img/blog/Dingtalk_20230105211035.jpg)

如果TC1宕机或发生重选举，会发生什么呢？由于首次启动时已经获取到了元数据，client会执行watch follower节点的接口来更新本地的metadata信息。因此，后续的事务请求将发送到新的leader（例如TC2）。同时，TC1的数据已经被同步到了TC2和TC3，因此数据一致性不会受到影响。只在选举发生的瞬间，如果某个事务正好发送给了旧的leader，该事务会被主动回滚，以确保数据的正确性。

需要注意的是，在该模式下，如果事务处于决议发送请求或一阶段流程还未走完的时刻，并且恰好在选举时发生，这些事务会被主动回滚。因为RPC节点已经宕机或发生了重选举，当前没有实现RPC重试。TM侧默认有5次重试机制，但由于选举需要大约1s-2s的时间，这些处于begin状态的事务可能无法成功决议，因此会优先回滚，释放锁，以避免影响其他业务的正确性。
### 2.3.2 故障恢复
在Seata中，当TC发生故障时，数据恢复的过程如下：

![故障恢复](https://blog.funkye.icu/img/blog/Dingtalk_20230106231817.jpg)

如上图所示
- 检查是否存在最新的数据快照：首先，系统会检查是否存在最新的数据快照文件。数据快照是基于内存的数据状态的一次全量拷贝，如果有最新的数据快照，则系统将直接加载该快照到内存中。

- 根据快照后的Raft日志进行回放：如果存在最新的快照或者没有快照文件，系统将根据之前记录的Raft日志进行数据回放。每个Seata-Server中的请求最终会经过ServerOnRequestProcessor进行处理，然后转移到具体的协调者类(DefaultCoordinator或RaftCoordinator)中，再转向具体的业务代码(DefaultCore)进行相应的事务处理（如begin、commit、rollback等）。

- 当日志回放完成后，便会由leader发起日志的同步，并继续执行相关事务的增删改动作。

通过以上步骤，Seata能够实现在故障发生后的数据恢复。首先尝试加载最新的快照，如果有的话可以减少回放的时间；然后根据Raft日志进行回放，保证数据操作的一致性；最后通过日志同步机制，确保数据在多节点之间的一致性。
### 2.3.3 业务处理同步过程
![流程](https://blog.funkye.icu/img/blog/Dingtalk_20230106230931.jpg)
对于client侧获取最新metadata时恰好有业务线程在执行begin、commit或registry等操作的情况，Seata采取了以下处理方式：

- client侧：

    - 如果客户端正在执行begin、commit或registry等操作，并且此时需要获取最新metadata，由于此时的leader可能已经不存在或不是当前leader，因此客户端的RPC请求可能会失败。
    - 如果请求失败，客户端会收到异常响应，此时客户端需要根据请求的结果进行回滚操作。
- TC侧对旧leader的检测：

    - 在TC侧，如果此时客户端的请求到达旧的leader节点，TC会进行当前是否是leader的检测，如果不是leader，则会拒绝该请求。
    - 如果是leader但在中途失败，比如在提交任务到状态机的过程中失败，由于当前已经不是leader，创建任务（createTask）的动作会失败。这样，客户端也会接收到响应异常。
    - 旧leader的提交任务也会失败，确保了事务信息的一致性。
通过上述处理方式，当客户端获取最新metadata时恰好遇到业务操作的情况，Seata能够保证数据的一致性和事务的正确性。如果客户端的RPC请求失败，将触发回滚操作；而在TC侧，对旧leader的检测和任务提交的失败可以防止事务信息不一致的问题。这样，客户端的数据也能保持一致性。
### 2.4 设计上问题的探讨
1.为什么要同步file模式的数据

答: 首先file不支持高可用的原因就是数据不同步,导致宕机后事务数据无法共享,部分数据可能被脏写,如AT模式需要全局锁来保证隔离性,如果多个tc使用file模式各自为营,那么client端通过LB策略请求的tc截然不同,必定造成数据混乱,从而影响分布式事务的一致性

2.那为什么不直接同步LOCK数据即可?

答: 无法只同步lock数据,其一是一致性问题,如果通过同步lock的话,其余tc在接收到写请求时,lock数据还未同步到位,此时是从何查起呢?不知源头,不知何时同步,不知该不该阻塞等待,所以基本上主流的分布式一致性算法都是由leader来写入数据,因为leader才是真正数据最准确的存在,且也避免了上述所说的不知道什么时候lock数据才同步到位的尴尬局面,所以无法保证分布式事务的隔离性,必须由leader来处理,并不只是同步数据那么简单.

3.那为什么不独立lock到公共存储如db或者redis呢?

答: 未来会支持这种方式,通过lb策略,使begin时路由到的TC的raft-group作为标识,后续的所有rm都会直接请求begin的那个group集群的leader,这样事务信息保证了在此raft-group内是一致准确的.这样在tcc xa saga模式下无需全局锁互斥时,可大幅提升吞吐量,而at需要全局锁互斥必定需要一个公共的地方存放锁,在单raft集群模式下直接存储在raft集群中即可,multi-raft下存储在外置存储器上虽然带来了一定吞吐下降,但相对之前的计算与存储完全分离下理论上有可靠的提升.

4.为什么目前由client端主动请求leader节点,而不像zookeeper之类的进行写请求转发呢?

答: 1.性能考虑: 分布式事务的二阶段下,明显带来的就是多次rpc确认事务决议状态,并下发响应结果造成的性能下降,如果直接由server端进行转发,那么其实也存在转发过程中leader的变更,这种由server端转发的方案会带来一定的性能下降,所以目前没有此考虑. 2.中间件职责不同: zookeeper这类的工具并不会像seata那样会有大量的读写请求(其实有,但是性能非常不理想,这也是为什么那么多开源中间件开始放弃zk的原因之一),即便使用的tps低一些也是能接受.再者在2022年年底宣布KRaft集群模式生产可用(GA)的Kafka而言,其也是通过metadata方式刷新client本地的路由,client的消息也是从metadata中找到分区leader进行发送,如果分区leader重选举会刷新元数据重试,及rocketmq也有类似的功能,定时从namingserver中拉取元数据.

5.与redis-cluster/sentinel及db模式主备模式比,raft模式的优劣

答:

redis模式对比:

一.cluster跟sentinel一样,存在数据丢失的可能,cluster是一主一备6台redis服务组成,master同步到slave时无法保证强一致性,且cluster适合超大数据量需要数据分片的场景,当前TC的设计在事务结束后就删除,其实是不太适合的.

二.sentinel也是一样无法保证强一致,比如aof的持久化,极大影响redis吞吐,sentinel可以设置让master得到slave写入响应,但是这样一来也就跟raft无太大差距,如raft也需要让follower写入,自身再写,redis又是外部存储多了一次网络io的开销,再吞吐上理论上是比不过raft模式

db模式对比:

一.db模式在seata中目前尚不支持主备切换,首先虽然根据数据库的redolog&binlog二阶段提交来同步到slave,但是说到底master并不会感知slave是否写入了数据,只是关注是否发出了广播,再极限情况下比如master写入了全局锁后宕机,server端对client响应分支注册成功,此时slave接替master后,又来了一个分支进行update操作去争取全局锁,而此时slave还没收到master的全局锁写入广播(可能由于网络问题),所以另一个分支的update操作就被准许,此时前一个事务如果需要回滚会因为后续的update事务没有被全局锁隔离,导致脏写无法回滚的局面,这是不可取的.

二.目前基于db的模式对磁盘和cpu的要求较高,seata-server在事务结束后立马就删除造成的数据库频繁的擦写操作,在并发量大的时候,很可能导致大量的页分裂,页合并等行为有严重影响性能的可能性,而raft模式基于对file模式的包装,基于内存的操作,效率理论上远高于db模式,且也能保证数据的一致性.

6.在raft这类事务结束时就将事务信息删除的模式,如何追溯历史数据?

答:

一. 社区目前已有完成的将事务全部流转状态(增删改)全部发送至kafka中的pr,业务侧可消费此topic将事务存储至hive或Cassandra等数据中间件中持久化存储,可做报表或查询平台功能.

二. 社区未来可能针对此问题引入rocksdb或h2这类本地存储中,将事务的删除转为删除+存储至rocksdb或h2中方便事务的回溯查询

## 3.使用部署
在使用和部署上，社区秉持着最小侵入，最小改动的原则，所以整体的部署上手应该是非常简单的，接下来分开client与server两端的部署改动点进行介绍
### 3.1 client
首先，使用注册配置中心较多的同学应该知道Seata的配置项中有一个`seata.registry.type`的配置项，支持了nacos，zk，etcd，redis等等，而在2.0以后增加了一个raft的配置项
```
   registry:
      type: raft
      raft:
         server-addr: 192.168.0.111:7091, 192.168.0.112:7091, 192.168.0.113:7091
```
将`registry.type` 改为raft，并配置raft相关元数据的获取地址，该地址统一为seata-server的ip+http端口
然后必不可少的就是传统的事务分组的配置
```
seata:
   tx-service-group: default_tx_group
   service:
      vgroup-mapping:
         default_tx_group: default
```
如现在使用的事务分组为`default_tx_group`，那么对应的seata集群/分组就是default，这个是有对应关系的，后续再server部署环节上会介绍
至此client的改动已经完成了
### 3.2 server
对于server的改动可能会多一些，要熟悉一些调优参数和配置，当然也可以选择默认值不做任何修改
```
seata:
  server:
    raft:
      group: default #此值代表该raft集群的group，client的事务分支对应的值要与之对应
      server-addr: 192.168.0.111:9091,192.168.0.112:9091,192.168.0.113:9091 # 3台节点的ip和端口，端口为该节点的netty端口+1000，默认netty端口为8091
      snapshot-interval: 600 # 600秒做一次数据的快照，以便raftlog的快速滚动，但是每次做快照如果内存中事务数据过多会导致每600秒产生一次业务rt的抖动，但是对于故障恢复比较友好，重启节点较快，可以调整为30分钟，1小时都行，具体按业务来，可以自行压测看看是否有抖动，在rt抖动和故障恢复中自行找个平衡点
      apply-batch: 32 # 最多批量32次动作做一次提交raftlog
      max-append-bufferSize: 262144 #日志存储缓冲区最大大小，默认256K
      max-replicator-inflight-msgs: 256 #在启用 pipeline 请求情况下，最大 in-flight 请求数，默认256
      disruptor-buffer-size: 16384 #内部 disruptor buffer 大小，如果是写入吞吐量较高场景，需要适当调高该值，默认 16384
      election-timeout-ms: 1000 #超过多久没有leader的心跳开始重选举
      reporter-enabled: false # raft自身的监控是否开启
      reporter-initial-delay: 60 # 监控的区间间隔
      serialization: jackson # 序列化方式，不要改动
      compressor: none # raftlog的压缩方式，如gzip，zstd等
      sync: true # raft日志的刷盘方式，默认是同步刷盘
  config:
    # support: nacos, consul, apollo, zk, etcd3
    type: file # 该配置可以选择不同的配置中心
  registry:
    # support: nacos, eureka, redis, zk, consul, etcd3, sofa
    type: file # raft模式下不允许使用非file的其他注册中心
  store:
    # support: file 、 db 、 redis 、 raft
    mode: raft # 使用raft存储模式
    file:
      dir: sessionStore # 该路径为raftlog及事务相关日志的存储位置，默认是相对路径，最好设置一个固定的位置
```
在3个或者大于3个节点的seata-server中配置完以上参数后，直接启动便可以看到类似以下的日志输出,就代表集群已经正常启动了
```
2023-10-13 17:20:06.392  WARN --- [Rpc-netty-server-worker-10-thread-1] [com.alipay.sofa.jraft.rpc.impl.BoltRaftRpcFactory] [ensurePipeline] []: JRaft SET bolt.rpc.dispatch-msg-list-in-default-executor to be false for replicator pipeline optimistic.
2023-10-13 17:20:06.439  INFO --- [default/PeerPair[10.58.16.231:9091 -> 10.58.12.217:9091]-AppendEntriesThread0] [com.alipay.sofa.jraft.storage.impl.LocalRaftMetaStorage] [save] []: Save raft meta, path=sessionStore/raft/9091/default/raft_meta, term=4, votedFor=0.0.0.0:0, cost time=25 ms
2023-10-13 17:20:06.441  WARN --- [default/PeerPair[10.58.16.231:9091 -> 10.58.12.217:9091]-AppendEntriesThread0] [com.alipay.sofa.jraft.core.NodeImpl] [handleAppendEntriesRequest] []: Node <default/10.58.16.231:9091> reject term_unmatched AppendEntriesRequest from 10.58.12.217:9091, term=4, prevLogIndex=4, prevLogTerm=4, localPrevLogTerm=0, lastLogIndex=0, entriesSize=0.
2023-10-13 17:20:06.442  INFO --- [JRaft-FSMCaller-Disruptor-0] [io.seata.server.cluster.raft.RaftStateMachine] [onStartFollowing] []: groupId: default, onStartFollowing: LeaderChangeContext [leaderId=10.58.12.217:9091, term=4, status=Status[ENEWLEADER<10011>: Raft node receives message from new leader with higher term.]].
2023-10-13 17:20:06.449  WARN --- [default/PeerPair[10.58.16.231:9091 -> 10.58.12.217:9091]-AppendEntriesThread0] [com.alipay.sofa.jraft.core.NodeImpl] [handleAppendEntriesRequest] []: Node <default/10.58.16.231:9091> reject term_unmatched AppendEntriesRequest from 10.58.12.217:9091, term=4, prevLogIndex=4, prevLogTerm=4, localPrevLogTerm=0, lastLogIndex=0, entriesSize=0.
2023-10-13 17:20:06.459  INFO --- [Bolt-default-executor-4-thread-1] [com.alipay.sofa.jraft.core.NodeImpl] [handleInstallSnapshot] []: Node <default/10.58.16.231:9091> received InstallSnapshotRequest from 10.58.12.217:9091, lastIncludedLogIndex=4, lastIncludedLogTerm=4, lastLogId=LogId [index=0, term=0].
2023-10-13 17:20:06.489  INFO --- [Bolt-conn-event-executor-13-thread-1] [com.alipay.sofa.jraft.rpc.impl.core.ClientServiceConnectionEventProcessor] [onEvent] []: Peer 10.58.12.217:9091 is connected
2023-10-13 17:20:06.519  INFO --- [JRaft-Group-Default-Executor-0] [com.alipay.sofa.jraft.util.Recyclers] [<clinit>] []: -Djraft.recyclers.maxCapacityPerThread: 4096.
2023-10-13 17:20:06.574  INFO --- [JRaft-Group-Default-Executor-0] [com.alipay.sofa.jraft.storage.snapshot.local.LocalSnapshotStorage] [destroySnapshot] []: Deleting snapshot sessionStore/raft/9091/default/snapshot/snapshot_4.
2023-10-13 17:20:06.574  INFO --- [JRaft-Group-Default-Executor-0] [com.alipay.sofa.jraft.storage.snapshot.local.LocalSnapshotStorage] [close] []: Renaming sessionStore/raft/9091/default/snapshot/temp to sessionStore/raft/9091/default/snapshot/snapshot_4.
2023-10-13 17:20:06.689  INFO --- [JRaft-FSMCaller-Disruptor-0] [io.seata.server.cluster.raft.snapshot.session.SessionSnapshotFile] [load] []: on snapshot load start index: 4
2023-10-13 17:20:06.694  INFO --- [JRaft-FSMCaller-Disruptor-0] [io.seata.server.cluster.raft.snapshot.session.SessionSnapshotFile] [load] []: on snapshot load end index: 4
2023-10-13 17:20:06.694  INFO --- [JRaft-FSMCaller-Disruptor-0] [io.seata.server.cluster.raft.RaftStateMachine] [onSnapshotLoad] []: groupId: default, onSnapshotLoad cost: 110 ms.
2023-10-13 17:20:06.694  INFO --- [JRaft-FSMCaller-Disruptor-0] [io.seata.server.cluster.raft.RaftStateMachine] [onConfigurationCommitted] []: groupId: default, onConfigurationCommitted: 10.58.12.165:9091,10.58.12.217:9091,10.58.16.231:9091.
2023-10-13 17:20:06.705  INFO --- [JRaft-FSMCaller-Disruptor-0] [com.alipay.sofa.jraft.storage.snapshot.SnapshotExecutorImpl] [onSnapshotLoadDone] []: Node <default/10.58.16.231:9091> onSnapshotLoadDone, last_included_index: 4
last_included_term: 4
peers: "10.58.12.165:9091"
peers: "10.58.12.217:9091"
peers: "10.58.16.231:9091"

2023-10-13 17:20:06.722  INFO --- [JRaft-Group-Default-Executor-1] [com.alipay.sofa.jraft.storage.impl.RocksDBLogStorage] [lambda$truncatePrefixInBackground$2] []: Truncated prefix logs in data path: sessionStore/raft/9091/default/log from log index 1 to 5, cost 0 ms.
```
### 3.3 faq
- 当`seata.raft.server-addr`配置好后，必须通过server的openapi进行集群的扩缩容，直接改动该配置进行重启是不会生效的
接口为`/metadata/v1/changeCluster?raftClusterStr=新的集群列表` 
- 如果要在相同ip的机器上部署raft集群，那么只需要将对应的Seata-Server进程的http端口或netty端口改变即可（如果没有指定netty端口，netty端口为http端口+1000偏移量，如http端口为7091，netty端口就为8091，raft端口为netty端口+1000偏移量，可得出为9091）

## 4.压测对比
压测对比分为两种场景,并且为了避免数据热点冲突与线程调优等情况,将Client侧的数据初始化300W条商品,并直接使用jdk21虚拟线程+spring boot3+seata AT来测试,在gc方面全部采用分代ZGC进行,压测工具为阿里云PTS，Server侧统一使用jdk21(目前还未适配虚拟线程) 服务器配置如下
TC: 4c8g*3  Client: 4c*8G*1  数据库为阿里云rds 4c16g
- 64并发压测只增加`@Globaltransactional`注解接口的性能
- 随机300W数据进行32并发10分钟的扣库存
### 4.1 1.7.1 db模式
![raft压测模型](https://img.alicdn.com/imgextra/i3/O1CN011dNh3H1UK8G5prQAg_!!6000000002498-0-tps-731-333.jpg)
#### 空压 64C
![db64-2](http://tiebapic.baidu.com/tieba/pic/item/6609c93d70cf3bc74c2a5fd89700baa1cd112ad8.jpg?tbpicau=2023-10-22-05_16e8895e27b5b10d2adb57126976217e)
#### 随机扣库存 32C
![db32-2](http://tiebapic.baidu.com/tieba/pic/item/7dd98d1001e93901ae0d1f0a3dec54e736d196f3.jpg?tbpicau=2023-10-22-05_ac6845ba369a13b8487be87a998511f7)

### 4.2 2.0 raft模式
![raft压测模型](https://img.alicdn.com/imgextra/i2/O1CN01nNL6oe1X95YcQQEjs_!!6000000002880-0-tps-773-353.jpg)

#### 空压 64C
![raft64-2](http://tiebapic.baidu.com/tieba/pic/item/91529822720e0cf38481dccf4c46f21fbe09aa94.jpg?tbpicau=2023-10-22-05_dfea5e155226bc16d91d9096a44681c2)

#### 随机扣库存 32C
![raft32c-2](http://tiebapic.baidu.com/tieba/pic/item/09fa513d269759ee7a3bf3fff4fb43166d22df9f.jpg?tbpicau=2023-10-22-05_2dbafae92a68a1df3b0704a7a465a333)

### 4.3 压测结果对比
32并发对300W商品随机扣库存场景
|     tps avg  | tps max | count| error| 存储类型|
| ----------- | ----------- | ----------- | ----------- | ----------- |
| 1709      |   2019    |1228803 | 0 | raft|
| 1201      |   1668    |864105 | 0 | db|

64并发空压`@Globaltransactional`接口（压测峰值上限为8000）
|     tps avg  | tps max | count| error| 存储类型|
| ----------- | ----------- | ----------- | ----------- | ----------- |
| 5704      |   8062    |4101236 | 0 | raft|
| 4743   |   6172    |3410240 | 0 | db|




## 5.总结
在Seata未来的发展中,性能，入门门槛，部署运维成本都是我们需要关注和不断优化的方向，在raft模式退出后有以下几个特点
1.如存储方面，存算分离后Seata对其优化的上限被拔高，自主可控
2.成本更低，无需额外的注册中心，存储中间件
3.入门的门槛更低，无需学习其他的一些如注册中心的知识，一站式直接使用Seata-Raft 即可上手

而针对业界发展趋势,如clickhouse和kafka都开始抛弃zk,转为自研的如clickkeeper和KRaft,将元数据等信息交由自身保证存储,减少第三方依赖减少运维成本和学习成本,这也是非常成熟和可借鉴效仿的特性.

当然现阶段可能raft模式还不太成熟,未必有上述描述的那般美好,但更因为理论如此,应该让事实如此,在此欢迎任何对Seata有兴趣的同学加入社区,共同维护,共同进步,一起为Seata分布式事务添砖加瓦!


