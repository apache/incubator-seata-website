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
首先要明白什么是raft分布式一致性算法,这里直接摘抄sofa-jraft官网的相关介绍:

```
RAFT 是一种新型易于理解的分布式一致性复制协议，由斯坦福大学的 Diego Ongaro 和 John Ousterhout 提出，作为 RAMCloud 项目中的中心协调组件。Raft 是一种 Leader-Based 的 Multi-Paxos 变种，相比 Paxos、Zab、View Stamped Replication 等协议提供了更完整更清晰的协议描述，并提供了清晰的节点增删描述。 Raft 作为复制状态机，是分布式系统中最核心最基础的组件，提供命令在多个节点之间有序复制和执行，当多个节点初始状态一致的时候，保证节点之间状态一致。

简而言之Seata的Raft模式就是基于Sofa-Jraft组件实现可保证Seata-Server自身的数据一致性和服务高可用.
```
## 2.2 为什么需要raft模式
看完上述的Seata-Raft模式是什么的定义后,是否就有疑问,难道现在Seata-Server就无法保证一致性和高可用了吗?那么下面从一致性和高可用来看看目前Seata-Server是如何做的.
### 2.2.1
在目前Seata的设计中,Server端的作用就是用来保证事务的二阶段被正确的执行,所以他是基于正确的事务数据进行一个正确的协调，那么应该知道被正确的执行的前提条件是什么?

没错,就是事务记录的正确存储,要确保事务记录不丢失,在状态不错误下,二阶段驱动所有的Seata-RM时一定是正确的行为,而Seata目前对事务状态和记录是如何存储的?

首先要介绍Seata支持事务存储模式有: file, db, redis 三种模式,根据一致性的排名来db(事务保证)>file(默认异步刷盘)>redis(aof,rdb)

顾名思义:

- file就是Seata自实现的事务存储,默认以异步形式进行存储事务信息到本地磁盘上,为了兼顾性能,默认是async,且事务信息存储在内存中,保证内存和磁盘上的一致性,在Seata-Server(以下简称TC)意外宕机时,会在启动时从磁盘读取事务信息并存储到内存中,以便恢复事务上下文继续运转.
- db是Seata抽象出的AbstractTransactionStoreManager另一个实现,背后由数据库如pgsql,mysql,oracle来实现事务存储,这个比较好理解,就是对数据库的增删改查,一致性由数据库的本地事务保证,数据也由数据库的保证落盘.
- redis同上,背后就是利用jedis+lua脚本(部分如竞争锁时，2.x上增删改将全部使用lua脚本)来进行事务的增删改查,数据也是由存储方保证,与db一样在seata中处于计算和存储分离架构设计.

### 2.2.2

高可用其实简单点理解,就是对集群的容灾,是否在TC宕机后,服务能正常运行,常见的方式就是Provider集群部署(可以说TC就是Seata-Client端的一个Provider),再通过注册中心实时感知TC的上线下,及时的切换到可用的TC.

看起来好像加几台机器,部署即可,但是背后存在了一个问题,如何让多个TC像一个整体一样,即便其中一个宕机后,另一个TC能接手宕机时TC的数据完美善后呢?答案其实很简单,在计算与存储分离的情况下,只要把数据丢到存储中间件,任意一个TC通过这个公共的存储区域读取即可得到所有TC操作的事务信息,也就保证了高可用的能力.

但是也提到了一个前提条件,也就是计算与存储分离下,那么计算与存储一体化设计下为什么不行呢?

这就要说说的File实现了,file在一致性那块的描述已经说了,他只是将数据存储在本地磁盘和TC内存中,这个数据写操作是没有任何同步,也就代表了目前的File模式无法高可用,仅支持单机部署,作为初级的快速入门的简单使用,这也让高性能的file(基于内存)基本被告别生产环境的使用.
## 2.3 Seata-Raft是如何设计的呢？
### 2.3.1 设计原理
Seata-Raft模式的设计思路是来自于当前无法高可用的file模式的包装,将其的所有增删改操作利用raft算法进行同步,这也就保证了多个TC使用file模式时,数据是一致的,且摒弃了file模式的异步刷盘操作,改为通过raftlog+snapshot恢复数据
![流程图](https://blog.funkye.icu/img/blog/Dingtalk_20230105203431.jpg)
设计示意如上图,client端在启动时,会通过配置中心读取当前client的事务分组对应的集群拿到，比如是default,以及相关的raft集群其中一个节点的ip(当然不嫌麻烦的话可以把整个集群的节点都写上,参考zookeeper那样),通过将获取元数据的request发向Seata-Server的ip:httpport(称之为Seata-Server的control端口)节点后,tc将会把该default raft集群下的元数据返回,即leader&follower&learner,随后将进行watch非leader的任意成员节点
假设tm begin一个事务,那么由于本地的metadata指向了tc1的地址,那么他只会与tc1进行交互,而tc1在增加一个全局事务信息时,会通过raft协议,也就是图上标注的步骤1,发送日志,步骤2follower应答日志接收情况,当超过半数节点,如tc2接受成功并相应,那么tc1上的状态机(fsm)将执行添加全局事务动作(详细下面会说到).
如果tc1宕机了,或者重选举了会发生什么呢?由于第一次启动拉取到了metadata,client便会执行watch follower节点的watch接口(因为只有非leader才可能成为leader,watch leader是无意义的,且集群发生重选举或增删节点,每个tc节点都会感知)
![watch](https://blog.funkye.icu/img/blog/Dingtalk_20230105204423.jpg)
![watch2](https://blog.funkye.icu/img/blog/Dingtalk_20230105211035.jpg)

当tc1宕机后,tc2选举成为leader,而tm通过tc3或者tc2(只要是follower)的watch成功更新本地的metadata信息,后续的事务将请求至tc2,而tc1的数据本身就被同步到了tc2和tc3,数据一致性没影响,只不过在选举发生的一瞬间,且如果事务恰好处于决议发送request至旧leader时,该事务会被主动回滚(因为rpc的节点已经宕机或者重选举了,目前没做该rpc重试,tm侧默认有5次,但由于选举大约需要1s-2s时间,大概率处于这个阶段的begin状态未决议的事务会回滚,因为这部分begin状态的事务大概率无法决议成功，优先回滚释放锁，避免影响其他业务正确性)
### 2.3.2 故障恢复
既然讲到了一个正常的事务流程及原理，那么当tc发生故障时，数据又是如何恢复的呢？
![故障恢复](https://blog.funkye.icu/img/blog/Dingtalk_20230106231817.jpg)

如上图所示，首先每个Seata-Server中的请求最终会走到ServerOnRequestProcessor进行处理，再将请求转移到具体的协调者类DefaultCoordinator(Raft实现时是在RaftCoordinator中，继承DefaultCoordinator)中，再转向到具体的业务代码中如DefaultCore进行对应的事务begin，commit，rollback等处理。
而在发生故障重启的时候，首先就是如图所示的第一步，先从snapshot中查看是否有最新的数据快照（基于内存的快照），如果有，那么会直接加载到内存中，再按照快照之后的raftlog进行回放这段时间的行为，再这个时候可以理解每一次Seata-Server对事务数据的增删改，都会是一个raftlog，将这个行为同步（过半提交）到其他的follower/learner中，所以只要从头(或者从快照时间点后)就可以跟上leader的数据内容，那么数据就是一至的。
### 2.3.3 业务处理同步过程
![流程](https://blog.funkye.icu/img/blog/Dingtalk_20230106230931.jpg)
看过了watch和queryMetadata的同学相信会有一个疑问,就是如果client侧获取最新metadata时,恰好有业务线程在begin或者commit或者registry的动作会发生什么?它们所请求的leader很可能在这一刻已经不存在或者不是leader了,那么前者比较简单rpc就会失败,后者在tc侧做了一个当前是否是leader的检测,如果不是leader将拒绝该请求,如果是leader但在中途失败,那么会由于当前已经不是leader,createTask提交到状态机的动作会失败,那么client侧也会接收到响应异常,而该旧leader的提交任务也会失败,也避免了事务信息不一致的问题,总结下来就是client提交失败，必然回滚，server提交任务失败，必然这个状态没有被提交，也是回滚，client侧数据自然也是一致的
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

二.目前基于db的模式对磁盘和cpu的要求较高,一些用户使用8c16g配置,ssd硬盘可轻松上1200+tps,而使用同等配置下使用机械硬盘可能只有800+左右的tps.究其原因便是seata-server在事务结束后立马就删除造成的数据库频繁的写擦操作,在并发量大的时候,很可能导致大量的页分裂,页合并等行为有严重影响性能的可能性,而raft模式基于对file模式的包装,基于内存的操作,效率理论上远高于db模式,且也能保证数据的一致性.

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

## 4.压测对比
压测对比分为两种场景,并且为了避免数据热点冲突与线程调优等情况,将Client侧的数据初始化100W条商品,并直接使用jdk21虚拟线程+spring boot3+seata AT来测试,压测工具为[locust](https://locust.io/),Server侧统一使用jdk21(目前还未适配虚拟线程) 服务器配置如下
TC: 2c4g*3  Client: 4c*8G*1  数据库为阿里云rds 
- `@Globaltransactional`注解的性能
- 随机数据进行10分钟的扣库存对比
### 4.1 1.7.1 db模式

### 4.2 2.0 raft模式

## 5.总结
在Seata未来的发展中,性能是至关重要了,要对二阶段协议带来的性能下降做尽可能的优化,如存储方面,资源利用率方面,通信方面.这也就代表了需要将更多可掌握的拿捏在手,file模式就是一个自实现的事务存储模式,基于此,可在自己能力范畴中,以及社区的力量加强对其的优化,把存储性能掌握在自己手中,而外部存储的方案当然也是有好处的,但是对其调优能力因人而异,维护seata组件的相关同学既要维护server端的相关优化指标,也要关注数据库的相关指标,导致有关注点分散,性能问题不好定位的情况.raft模式的到来,代表了类似于redis模式的基于内存的写操作的性能提升,足够的可操控空间,除去了外部的磁盘&网络io开销,达到一个自主可控的阶段.

并针对业界发展趋势,如clickhouse和kafka都开始抛弃zk,转为自研的如clickkeeper和KRaft,将元数据等信息交由自身保证存储,减少第三方依赖减少运维成本和学习成本,这也是非常成熟和可借鉴效仿的特性.

当然现阶段可能raft模式还不太成熟,未必有上述描述的那般美好,但更因为理论如此,应该让事实如此,在此欢迎任何对Seata有兴趣的同学加入社区,共同维护,共同进步,一起为Seata分布式事务添砖加瓦!


