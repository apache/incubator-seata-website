---
title: 部署Raft集群
keywords: [Seata]
description: Server-Raft mode 部署。
---

# 部署 Server-Raft
Seata-Raft模式为存算一体的高性能易扩展，入门门槛低，运维成本低等特定的事务存储模式。更加详细的了解架构和使用，[请点击此处](/blog/seata-raft-detailed-explanation/)
注：由于此模式不支持与第三方注册中心搭配，故全链路只允许存在一个tc集群，也就是客户端的事务分组对应的tc集群要保持一致。后续Seata社区将会推出自闭环的NamingServer，将于Seata-Raft模式对接，支持multi-raft。

## Server
1. 在[RELEASE](https://github.com/apache/incubator-seata/releases)页面下载相应版本并解压 

2. 修改配置
将conf中application.yml编辑，在`seata:`下增加以下参数
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
如果`server-addr:`中的地址都为本机，那么需要根据本机上不同的server的netty端口增加1000的偏移量，如`server.port: 7092`那么netty端口为8092，raft选举和通信端口便为9092，需要增加启动参数`-Dserver.raftPort=9092`.
Linux下可以通过`export JAVA_OPT="-Dserver.raftPort=9092"`等方式指定。

3. 直接启动

在 Linux/Mac 下

```bash
$ sh ./bin/seata-server.sh
```

在 Windows 下

```cmd
bin\seata-server.bat
```

4. 扩缩容方式

假设原集群列表为`192.168.0.111:7091,192.168.0.112:7091,192.168.0.113:7091`，无论是扩容还是缩容，只需要对这个字符串进行修改，并提交到一个所在成员的扩缩容接口即可，比如扩容`curl -X POST -i http://192.168.0.111:7091/metadata/v1/changeCluster?raftClusterStr=192.168.0.111:7091,192.168.0.112:7091,192.168.0.113:7091,192.168.0.114:7091"`，如果是缩容，只需要将集群连接串中需要下线的节点进行去除，并调用扩缩容接口即可.
注：seata.server.raft.server-addr配置只要集群构建完成后，修改该配置就无效了，请统一通过api方式进行扩缩容，后续控制台中也会集成扩缩容和集群管理功能。

## Client

1. 修改`registry.type`
```
   registry:
      type: raft
      raft:
         server-addr: 192.168.0.111:7091, 192.168.0.112:7091, 192.168.0.113:7091
```
2. 将事务分组对应的tc集群改为server的raft group
```
seata:
   tx-service-group: default_tx_group
   service:
      vgroup-mapping:
         default_tx_group: 如果server.raft.group为default，那么此处便是default
```