---
title: Zookeeper 注册中心
keywords: [Seata, Zookeeper]
description: Zookeeper 注册中心。
---

# ZooKeeper 注册中心

ZooKeeper是 Seata 组件中重要的注册中心实现

本文以ZooKeeper作为注册中心，以 file 作为配置中心

ZooKeeper版本建议 3.4.13及以上，下文以 ZooKeeper 3.4.14版本为例

## 预备工作

当您准备将 **Seata** 注册到 ZooKeeper 之前，请确保已经启动 ZooKeeper 服务。如果您尚且不熟悉 ZooKeeper 的基本使用的话，可先行参考 [ZooKeeper官方文档](https://zookeeper.apache.org/doc/r3.4.14/index.html)



## 快速上手

Seata 融合 ZooKeeper 注册中心的操作步骤非常简单，大致步骤可分为“增加 Maven 依赖”以及“配置注册中心“。



### Server端配置注册中心

下载 [Seata 1.8.0 release](https://github.com/seata/seata/releases/tag/v1.8.0) 并解压

在 /conf/registry.conf 中修改对应配置中心，其余[配置参考](https://github.com/seata/seata/blob/develop/script/client/conf/registry.conf)

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

执行 /bin/seata-server.bat (Windows) 或 /bin/seata-server.sh (Unix) 启动 Seata，服务将运行在本地 8091 端口上，打开ZooKeeper客户端命令行，输入` ls /registry/zk/default`，查看到节点地址即注册成功（如下）

```text
[zk: localhost:2181(CONNECTED) 1] ls /registry/zk/default
[127.0.0.1:8091]
```





### Client 端增加 Maven 依赖



建议使用新版Seata ，`spring-cloud-starter-alibaba-seata`的版本与对应微服务版本对应关系请参考[版本说明](https://github.com/alibaba/spring-cloud-alibaba/wiki/版本说明)

**以 SpringBoot 项目为例，在项目 pom.xml 中加入**

```xml
<!-- seata -->
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>${seata.version}</version>
</dependency>
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
    <version>${alibaba.cloud.version}</version>
    <exclusions>
        <exclusion>
            <groupId>io.seata</groupId>
            <artifactId>seata-spring-boot-starter</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!-- ZooKeeper客户端依赖 -->
<dependency>
    <groupId>com.101tec</groupId>
    <artifactId>zkclient</artifactId>
    <version>0.11</version>
    <exclusions>
        <exclusion>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
        </exclusion>
    </exclusions>
</dependency>


<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
    <version>3.5.9</version>
    <exclusions>
        <exclusion>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
        </exclusion>
        <exclusion>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
        </exclusion>
    </exclusions>
</dependency>

```

### Client端配置

在 application.yml 中加入对应的注册中心，其余[配置参考](https://github.com/seata/seata/blob/develop/script/client/spring/application.yml)

```yaml
seata:
  registry:
    type: zk
    zk:
      server-addr: 127.0.0.1:2181
  # 有关事务分组，请参考 https://seata.io/zh-cn/docs/user/txgroup/transaction-group
      session-timeout: 6000
      connect-timeout: 2000
      username:
      password:
  tx-service-group: default_tx_group
  service:
    # 事务分组与集群映射关系
    vgroup-mapping:
      default_tx_group: default
```

Client 配置完成后启动应用并稍待片刻，即可正式体验 Seata 服务





