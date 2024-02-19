---
title: Nacos 配置中心
keywords: [Seata, Nacos]
description: Nacos 配置中心。
---

# Nacos 配置中心

Nacos 是 Seata 组件中重要的配置中心实现.

## 预备工作

当您将`nacos-client`整合到您的 Seata 工程之前，请确保后台已经启动 Nacos 服务。如果您尚且不熟悉 Nacos 的基本使用的话，可先行参考 [Nacos 快速入门](https://nacos.io/zh-cn/docs/quick-start.html)。建议使用 Nacos `1.2.0` 及以上的版本。

## 快速上手

Seata 融合 Nacos 配置中心的操作步骤非常简单，大致步骤可分为“增加 Maven 依赖”以及“配置 nacos 配置中心“和提交配置至 Nacos-Server。

### 增加 Maven 依赖

首先，您需要将 `nacos-client` 的 Maven 依赖添加到您的项目 `pom.xml` 文件中，建议使用 Seata `1.4.0+`：

```xml
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>最新版</version>
</dependency>
<dependency>
    <groupId>com.alibaba.nacos</groupId>
    <artifactId>nacos-client</artifactId>
    <version>1.2.0及以上版本</version>
</dependency>
```

### Client 端配置中心

在 [**application.yml**](https://github.com/apache/incubator-seata/blob/develop/script/client/spring/application.yml) 中加入对应的配置中心,其余[配置参考](https://github.com/apache/incubator-seata/tree/develop/script/client)

```yaml
seata:
  config:
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
      group: 'SEATA_GROUP'
      namespace: ''
      username: 'nacos'
      password: 'nacos'
```

### Server 端配置中心

在 [registry.conf](https://github.com/apache/incubator-seata/blob/develop/script/server/config/registry.conf) 中加入对应配置中心,其余[配置参考](https://github.com/apache/incubator-seata/tree/develop/script/server)

```
config {
  type = "nacos"

  nacos {
    serverAddr = "127.0.0.1:8848"
    group = "SEATA_GROUP"
    namespace = ""
    username = "nacos"
    password = "nacos"
  }
}

```

### 上传配置至 Nacos 配置中心

#### 通过 dataId 配置

1. 从 v1.4.2 版本开始，已支持从一个 Nacos dataId 中获取所有配置信息,你只需要额外添加一个 dataId 配置项。

2. 首先你需要在 nacos 新建配置，此处 dataId 为 seataServer.properties,配置内容参考https://github.com/apache/incubator-seata/tree/develop/script/config-center 的 config.txt 并按需修改保存

3. 在 client 参考如下配置进行修改,

```yaml
seata:
  config:
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
      group: 'SEATA_GROUP'
      namespace: ''
      dataId: 'seataServer.properties'
      username: 'nacos'
      password: 'nacos'
```

#### 通过脚本上传配置到 Nacos

参考https://github.com/apache/incubator-seata/tree/develop/script/config-center 的 config.txt 并修改,之后运行仓库中提供的 nacos 脚本,将信息提交到 nacos 控制台,如果有需要更改,可直接通过控制台更改.

eg: sh $\{SEATAPATH}/script/config-center/nacos/nacos-config.sh -h localhost -p 8848 -g SEATA_GROUP -t 5a3c7d6c-f497-4d68-a71a-2e5e3340b3ca -u username -w password

详细解析参考 [Readme 文档](https://github.com/apache/incubator-seata/blob/develop/script/config-center/README.md)

随后,启动 Seata-Server 和 Client（业务侧）应用，如果在导入配置至 Nacos 前，已启动 Seata-Server 和 Client（业务侧）应用需要进行重启。
