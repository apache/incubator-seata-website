---
title: Nacos 注册中心
keywords: [Seata, Nacos]
description: Nacos 注册中心。
---

# Nacos 注册中心

Nacos 是 Seata 组件中重要的注册中心实现.

## 预备工作

当您将`nacos-client`整合到您的 Seata工程之前，请确保后台已经启动 Nacos 服务。如果您尚且不熟悉 Nacos 的基本使用的话，可先行参考 [Nacos 快速入门](https://nacos.io/zh-cn/docs/quick-start.html)。建议使用 Nacos `1.4.0` 及以上的版本。

## 快速上手

Seata 融合 Nacos 注册中心的操作步骤非常简单，大致步骤可分为"增加 Maven 依赖"以及"配置注册中心"。

### 增加 Maven 依赖

首先，您需要将 `nacos-client` 的 Maven 依赖添加到您的项目 `pom.xml` 文件中。

```xml
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>最新版</version>
</dependency>
<dependency>
    <groupId>com.alibaba.nacos</groupId>
    <artifactId>nacos-client</artifactId>
    <version>1.4.0+</version>
</dependency>
```

### Client端配置注册中心

在 [**application.yml**](https://github.com/seata/seata/blob/2.0.0/script/client/spring/application.yml) 中加入对应的配置中心。

```yaml
seata:
  registry:
    type: nacos
    nacos:
      application: seata-server
      server-addr: 127.0.0.1:8848
      group : "SEATA_GROUP"
      namespace: ""
      username: ""
      password: ""
      context-path: ""
      ##if use MSE Nacos with auth, mutex with username/password attribute
      #access-key: ""
      #secret-key: ""
  tx-service-group: default_tx_group
  service:
    vgroup-mapping:
      default_tx_group: default

```

### Server端配置注册中心

在 `conf/application.yaml`加入以下配置, 其余配置参考 [configuration options](https://github.com/seata/seata/blob/2.0.0/server/src/main/resources/application.example.yml):

```yaml
seata:
  registry:
    type: nacos
    nacos:
      application: seata-server
      server-addr: 127.0.0.1:8848
      group: SEATA_GROUP
      namespace:
      cluster: default
      username:
      password:
      ##if use MSE Nacos with auth, mutex with username/password attribute
      #access-key: ""
      #secret-key: ""
```

随后,启动 Seata-Server 后，会发现Server端的服务出现在 Nacos 控制台中的注册中心列表中. Client 配置完成后启动应用就可以正式体验 Seata 服务。

Tips：请确保client与server的注册处于同一个namespace和group，不然会找不到服务。