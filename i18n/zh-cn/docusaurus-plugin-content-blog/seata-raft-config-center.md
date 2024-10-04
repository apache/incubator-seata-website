---
title: Seata Raft模式配置中心
author: 蒋奕晨-清华大学，Seata 开源之夏学生参与者
description: 在本文中，我将分享基于Raft和RocksDB设计的Seata配置中心和使用方式。
date: 2024/09/19
keywords: [seata,分布式事务,配置中心,Raft,RocksDB]
---

# 1. 项目背景
目前seata支持丰富的第三方配置中心，但是考虑使用的便捷性同时为了降低使用seata的门槛，在seata-server利用现有的sofa-jraft+rocksdb构建一个配置中心功能，seata-client直接与seata-server通信,获取seata相关的配置，不需要再去第三方配置中心读取，实现配置中心自闭环。


# 2. 设计说明
## 2.1 配置中心

在现有的第三方配置中心实现中，Client端和Server端对于配置中心是解耦的，Client端和Server端直接通过`Configuration`实例获取配置项，且`Configuration`对于Client端和Server端的初始化行为是一致的，都是先连接到配置中心中间件然后获取配置，以及添加监听器等。
![img](/img/blog/seata-raft-config-center1.png)

当使用Raft的实现配置中心后，由于所有的配置项信息是保存在Server端的，因此初始化`Configuration`实例时对于Client端和Server端的行为是**不一致**的。

此外为保证和原来配置中心的逻辑相同，Client端和Server端获取配置项依旧统一从`RaftConfiguration`实例中获取，不直接和RocksDB进行交互。
![img](/img/blog/seata-raft-config-center2.png)



![img](/img/blog/seata-raft-config-center3.png)

`RaftConfiguration`分为Server端和Client端，按照启动环境返回不同配置实例。

```Java
public class RaftConfigurationProvider implements ConfigurationProvider {
    @Override
    public Configuration provide() {
        String applicationType = System.getProperty(APPLICATION_TYPE_KEY);
        if (APPLICATION_TYPE_SERVER.equals(applicationType)){
            return RaftConfigurationServer.getInstance();
        }else{
            return RaftConfigurationClient.getInstance();
        }
    }
}

@SpringBootApplication(scanBasePackages = {"org.apache.seata"})
public class ServerApplication {
    public static void main(String[] args) throws IOException {
        System.setProperty(APPLICATION_TYPE_KEY, APPLICATION_TYPE_SERVER);
        // run the spring-boot application
        SpringApplication.run(ServerApplication.class, args);
    }
}
```


## 2.2 配置存储模块
![img](/img/blog/seata-raft-config-center4.png)
### 抽象设计

为了未来支持和拓展更多的KV内存键值对数据库（如LevelDB，Caffeine），现抽象一个`ConfigStoreManager`接口以及抽象类`AbstractConfigStoreManager`，提供如下公共方法：

- Get：获取指定namespace，dataId中名为key的单一配置项
- GetAll：获取指定namespace，dataId中全部配置项
- Put：新增/修改指定namespace，dataId中某一配置项`<key,value>`
- Delete：删除指定namespace，dataId中名为key的配置项
- DeleteAll：删除指定namespace，dataId中全部配置项
- Clear：清空所有配置
- GetAllNamespaces：获取所有命名空间
- GetAllDataIds：获取指定namespace下的所有配置dataIds
- ...

ConfigStoreManagerFactory、ConfigStoreManagerProvider.java：使用SPI机制实现的配置存储工厂类和提供者。
### 配置监听

Server端和Client端配置中心需要监听配置项的变化。

在Server端，由于配置本身存储在Server端，我们直接拦截配置变更的方法即可。我们在抽象接口中定义了`addConfigListener`、`removeConfigListener`方法用户添加和删除配置监听器。监听的逻辑由具体的实现类负责。

在`RocksDBConfigStoreManager`中，定义了`notifyConfigChange`方法来触发监听，当调用写相关操作时（如Put、Delete)触发该方法来通知配置的变更。从而触发回调事件通知Server端配置中心。

在Client端，我们定义了**配置版本号**和**长连接机制**来实现配置的监听。具体的Client端在启动时，与Server建立长连接并定期刷新该连接。Server端内部维护一个`watchMap`存放所有客户端的监听信息。每当Raft状态机执行配置更新的操作会发送一个`ApplicationEvent`事件，该事件被`ClusterConfigWatcherManager`监听，从而通知`watchMap`中所有客户端配置变更。此外使用了配置版本号来优化实现，在建立长连接时，客户端需要传入版本号，当版本号低于Server端对应配置的版本号时直接返回最新配置。反之，若Server端配置版本号低于本地，则Client端认为该Server的配置已经过期（可能宕机或集群发生脑裂）会重试请求集群中其他的节点。

### 多租户方案

在Seata-Server端存放配置时，需要实现多租户的配置隔离，要求不同租户间的配置是相互独立、物理/逻辑上是隔离的。

首先调研了业内使用RocksDB的开源项目的实现，总结如下。
1. JRaft，单RocksDB实例，两个列族，一个用来存Raft条目，一个用来存元信息。
2. TiKV，两个RocksDB实例，分别为raftDB，kvDB。kvDB中使用了多个列族存放元数据，用户数据，锁数据等。
3. Pika，为每个数据结构（String，Hash，List，Set，Zset等）创建了一个RocksDB实例，每个RocksDB实例分别用多个列族存储数据，比如Data、Meta


考虑到无法提前知道租户数量（无法在启动时创建指定数量的RocksDB)，因此使用单个RocksDB实例，多列族存储。不同租户使用`namespace`区分，在Rocksdb中通过列族（ColumnFamily）进行逻辑隔离，一个namespace对应一个列族。列族相当于关系型数据库中表的概念。在配置的增删改查时指定namespace操作具体的列族，实现多租户的隔离。此外名为`config_version`的列族是内置的，用于对现有的配置进行版本号跟踪。
![img](/img/blog/seata-raft-config-center5.png)
# 3. 使用方式
## 3.0 准备配置文件

首先准备好配置文件，具体可以参考：[配置文件示例](https://github.com/apache/incubator-seata/blob/2.x/script/config-center/config.txt)。
并将配置文件置于Seata server项目资源目录下。

## 3.1 Server端配置

在 **[application.yml](https://github.com/apache/incubator-seata/blob/develop/script/client/spring/application.yml)** 中加入Raft配置中心配置,其余[配置参考](https://seata.apache.org/zh-cn/docs/next/user/configurations)

```YAML
config:
  # support: nacos, consul, apollo, zk, etcd3, raft
  type: raft
  raft:
    db:
      type: rocksdb # db类型，目前只支持rocksdb
      dir: configStore  # db文件存储目录
      destroy-on-shutdown: false #应用关闭时是否清除db文件, 默认false
      namespace: 'default' # 命名空间
      dataId: 'seata.properties' # 配置文件id
  file:
    name: 'file' # 初始配置文件名

server:
  raft:
    group: default #此值代表该raft集群的group，client的事务分组对应的值要与之对应
    server-addr: 192.168.241.1:9091, 192.168.241.2:9091 ,192.168.241.3:9091 # 其他Raft节点的ip和端口，端口为该节点的netty端口+1000，默认netty端口为8091
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
```

在Seata-Server下，需要一个**初始配置文件**作为Server端的配置文件（也就是上一步所述的配置文件），`file.name`配置项需要和该文件名保持一致。在Server初次启动时，会将该配置文件作为Raft配置中心的初始配置。目前支持的文件类型有：conf、yaml、properties、txt。

> 注意：Raft集群内节点的**初始配置文件**需要保持一致。

## 3.2 控制台配置管理界面
当Server端使用**Raft模式**的配置中心后，可通过在[Seata Console](http://127.0.0.1:7091)中内置的配置管理页面，进行配置中心的管理。用户可以通过在该页面对存储于Seata-Server集群的配置进行增删改查，注意该操作是对于集群生效的，因此可以在集群中的**任意节点**进行修改，所有操作会通过Raft在集群内进行同步。

> 注意：该配置管理页面仅在配置中心为**Raft模式**下开启，对其他类型的配置中心不开放。

### 3.2.1 配置隔离

Raft配置中心提供了**namespace命名空间**的机制来实现多租户的配置隔离。不同**namespace**下的配置通过底层存储机制实现逻辑隔离。在同一**namespace**下可以有多套配置文件，不同的配置文件用**dataId**进行区分。一套配置以**namespace**和**dataId**来唯一标识。

例如：

- namespace=default（默认），dataId=seata.properties（默认）

- namespace=dev，dataId=seata-server.properties，dataId=seata-client.yaml

- namespace=prop，dataId=seata-server.properties，dataId=seata-client.txt


![img](/img/blog/seata-raft-config-center配置隔离.png)


### 3.2.2 配置上传

在Sever启动时，Server端配置的初始文件会自动上传到配置中心。此外用户还可以通过点击"上传（Upload）"按钮上传配置文件到指定的**namespace**和**dataId。**
当配置上传到Server端配置中心后，Client端就可以通过**namespace**和**dataId**来获取具体的配置文件了。

![img](/img/blog/seata-raft-config-center配置上传.png)

目前支持上传的配置文件类型有：txt、text、yaml、properties类型。具体的配置文件可参考示例：[配置文件示例](https://github.com/apache/incubator-seata/blob/2.x/script/config-center/config.txt)

### 3.2.3 配置查询

选择**namespace**和**dataId**后，可点击"**搜索（Search）**"按钮查询该配置下的所有配置项信息。

配置以配置项列表的形式呈现，每一行都代表一个配置项，以**Key**和**Value**展示。

![img](/img/blog/seata-raft-config-center配置查询.png)

### 3.2.4 配置删除

当不再需要某一套配置时，用户可以删除指定**namespace**和**dataId**的配置数据。

注意该操作一旦完成，会清空该配置下的所有配置项信息，且无法恢复。请避免删除正在使用中的配置。

![img](/img/blog/seata-raft-config-center配置删除.png)

### 3.2.5 配置修改

在配置项列表中，用户可以对该配置下的某个配置项进行**新增**、**修改**或**删除**操作。操作成功后Server端和Client端会及时收到配置变更，从而获取到最新的值。

- **新增：在当前配置下添加配置项**。


![img](/img/blog/seata-raft-config-center配置修改1.png)

- **修改：修改指定配置项的值。**


![img](/img/blog/seata-raft-config-center配置修改2.png)

- **删除：删除指定的配置项**。


![img](/img/blog/seata-raft-config-center配置修改3.png)



## 3.3 Client端配置

Client需要添加如下的配置项。其中`raft.server-addr`需要和**Server端Raft集群的IP地址列表**一致。

```YAML
config:
    type: raft # Raft模式
    raft:
        server-addr: 192.168.241.1:7091, 192.168.241.2:7091 ,192.168.241.3:7091 # 配置raft相关元数据的获取地址
        username: 'seata' # 鉴权
        password: 'seata' # 鉴权
        db:
            namespace: 'default' # 命名空间
            dataId: 'seata.properties' # 配置文件Id
```

此外，client需要引入**HttpClient**依赖，用于通过Http请求向Seata-Server集群获取配置信息

```YAML
<dependency>
    <groupId>org.apache.httpcomponents</groupId>
    <artifactId>httpclient</artifactId>
</dependency>
```

配置完成后，Client应用启动时就会从`raft.server-addr`配置的Server中订阅并获取指定**namespace**和**dataId**的配置，并通过监听机制在配置发生变更时获取获取最新配置。
