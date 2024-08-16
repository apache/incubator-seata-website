---
title: Consul 注册中心
keywords: [Seata, Consul]
description: Consul 注册中心。
---

# Consul 注册中心

Consul 是 Seata 组件中重要的注册中心实现

本文基于 Seata 1.4.2，把 Seata 注册到 Consul 上，以 file 作为配置中心

Consul 版本建议 1.8+，下文以 Consul 1.11.2 为例

## 预备工作


当您准备将 **Seata** 注册到 Consul 之前，请确保已经启动 Consul 服务。如果您尚且不熟悉 Consul 的基本使用的话，
可先行参考 [Consul 官方文档](https://www.consul.io/docs) 

如果您只想快速体验，也可以使用以下 docker 命令启动一个 Consul 容器，输入 http://localhost:8500 访问 Consul 控制台

```shell
docker run -d --name=consul -p 8500:8500 -p 8600:8600/udp consul:1.11.2 agent -dev -client=0.0.0.0 -ui
```

## 快速上手

Seata 融合 Consul 注册中心的非常简单，分 Server 端和 Client 端

Server 端只需要配置“注册中心”

Client 端则需要增加 Maven 依赖以及配置

### Server端配置注册中心
下载 [Seata 1.4.2 release](https://github.com/apache/incubator-seata/releases/tag/v1.4.2) 并解压

在 /conf/registry.conf 中修改对应配置中心，其余[配置参考](https://github.com/apache/incubator-seata/blob/develop/script/client/conf/registry.conf)

```
registry {
  type = "consul"

  consul {
    # 注册到 Consul 上的集群名称，默认是 default
    cluster = "default"
    serverAddr = "127.0.0.1:8500"
    aclToken = ""
  }
}
```

执行 /bin/seata-server.bat (Windows) 或 /bin/seata-server.sh (Unix) 启动 Seata，服务将运行在本地 8091 端口上

进入 Consul 控制台，查看 Seata 是否注册成功

### Client 端增加 Maven 依赖

**以 SpringBoot 项目为例，在项目 pom.xml 中加入**

```xml
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>最新版（Seata版本）</version>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-consul-discovery</artifactId>
</dependency>
```

### Client端配置

在 application.yml 中加入对应的注册中心，其余[配置参考](https://github.com/apache/incubator-seata/blob/develop/script/client/spring/application.yml)

```yaml
seata:
  registry:
    consul:
      server-addr: 127.0.0.1:8500
  # 事务分组配置，1.4.2 默认名称为 my_test_tx_group ，1.5版本将改为 default_tx_group
  # 有关事务分组，请参考 https://seata.apache.org/zh-cn/docs/user/txgroup/transaction-group/
  tx-service-group: my_test_tx_group
  service:
    # 事务分组与集群映射关系
    vgroup-mapping:
      my_test_tx_group: default
```

Client 配置完成后启动应用并稍待片刻，出现以下后日志就可以正式体验 Seata 服务

```text
register TM success. client version:1.4.2, server version:1.4.2,channel:[id: 0xa4675e28, L:/127.0.0.1:8238 - R:/127.0.0.1:8091]
register RM success. client version:1.4.2, server version:1.4.2,channel:[id: 0x408192d3, L:/127.0.0.1:8237 - R:/127.0.0.1:8091]
register success, cost 94 ms, version:1.4.2,role:RMROLE,channel:[id: 0x408192d3, L:/127.0.0.1:8237 - R:/127.0.0.1:8091]
register success, cost 94 ms, version:1.4.2,role:TMROLE,channel:[id: 0xa4675e28, L:/127.0.0.1:8238 - R:/127.0.0.1:8091]
```
