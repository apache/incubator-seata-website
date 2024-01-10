---
title: Etcd3 配置中心
keywords: [Seata, Etcd3]
description: Etcd3 配置中心。
---

# Etcd3 配置中心

Etcd3 是 Seata 组件中重要的配置中心实现.

## 预备工作

当您将`Etcd3`整合到您的 Seata工程之前，请确保后台已经启动 Etcd3 Server服务。如果您尚且不熟悉 Etcd3的基本使用的话，可先行参考 [Etcd3快速入门](https://etcd.io/docs/v3.5/quickstart)。建议使用 Etcd3 `3.5.0` 及以上的版本。

## 快速上手

Seata 融合 Etcd3 注册中心的操作步骤非常简单，大致步骤可分为“增加 Maven 依赖”以及“配置注册中心“。

### 增加 Maven 依赖

首先，您需要将 `jetcd-core` 的 Maven 依赖添加到您的项目 `pom.xml` 文件中，建议使用 jetcd-core `0.3.0+`,`spring-cloud-starter-alibaba-seata`的版本与对应微服务版本对应关系请参考[版本说明](https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E)

```xml
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>最新版</version>
</dependency>
        <!-- Etcd3 客户端依赖 -->
<dependency>
    <groupId>io.etcd</groupId>
    <artifactId>jetcd-core</artifactId>
    <version>0.3.0及以上</version>
</dependency>
```

### Client端配置中心

在 [**application.yml**](https://github.com/apache/incubator-seata/blob/develop/script/client/spring/application.yml) 中加入对应的配置中心,其余[配置参考](https://github.com/apache/incubator-seata/tree/develop/script/client)

```yaml
seata:
  config:
    type: etcd3
    etcd3:
      server-addr: http://localhost:2379
```

### Server端配置中心

在 [registry.conf](https://github.com/apache/incubator-seata/blob/develop/script/server/config/registry.conf) 中加入对应配置中心,其余[配置参考](https://github.com/apache/incubator-seata/tree/develop/script/server)

```
config {
  type = "etcd3"

  etcd3 {
    serverAddr = "http://localhost:2379"
  }
}

```

### 上传配置至Etcd3配置中心

#### 通过脚本上传配置到Etcd3

参考https://github.com/apache/incubator-seata/tree/develop/script/config-center 的config.txt并修改,之后运行仓库中提供的etcd3脚本,将信息提交到Etcd3服务端,如果有需要更改,可直接通过控制台更改.

eg: sh ${SEATAPATH}/script/config-center/etcd3/etcd3-config.sh -h localhost -p 2379

详细解析参考 [Readme文档](https://github.com/apache/incubator-seata/blob/develop/script/config-center/README.md)

随后,启动 Seata-Server 和 Client（业务侧）应用，如果在导入配置至Etcd3前，已启动Seata-Server 和Client（业务侧）应用需要进行重启。
