---
title: Apollo 配置中心
keywords: [Seata, Apollo]
description: Apollo 配置中心。
---

# Apollo 配置中心

## 预备工作

当您将`apollo-client`整合到您的 Seata 工程之前，请确保后台已经启动 Apollo 服务。如果您尚且不熟悉 Apollo 的基本使用的话，可先行参考 [Apollo 快速入门](https://www.apolloconfig.com/)。建议使用 Apollo `1.6.0` 及以上的版本。

## 快速上手

Seata 融合 Apollo 配置中心的操作步骤非常简单，大致步骤可分为“增加 Maven 依赖”以及“配置 Apollo 配置中心“和提交配置至 Apollo-Server。

### 增加 Maven 依赖

首先，您需要将 `apollo-client` 的 Maven 依赖添加到您的项目 `pom.xml` 文件中，建议使用 Seata `1.4.0+`：

```java
           <dependency>
                <groupId>io.seata</groupId>
                <artifactId>seata-spring-boot-starter</artifactId>
                <version>最新版</version>
            </dependency>
            <dependency>
                <groupId>com.ctrip.framework.apollo</groupId>
                <artifactId>apollo-client</artifactId>
                <version>${apollo-client.version}</version>
            </dependency>
```

### Client 端配置中心

在 [**application.yml**](https://github.com/apache/incubator-seata/blob/develop/script/client/spring/application.yml) 中加入对应的配置中心,其余[配置参考](https://github.com/apache/incubator-seata/tree/develop/script/client)

```yaml
seata:
  config:
    type: apollo
    apollo:
      apollo-meta: http://192.168.1.204:8801
      app-id: seata-server
      namespace: application
      apollo-accesskey-secret: ''
```

### Server 端配置中心

在 [registry.conf](https://github.com/apache/incubator-seata/blob/develop/script/server/config/registry.conf) 中加入对应配置中心,其余[配置参考](https://github.com/apache/incubator-seata/tree/develop/script/server)

```
config {
  type = "apollo"

  apollo {
    appId = "seata-server"
    apolloMeta = "http://192.168.1.204:8801"
    namespace = "application"
    apolloAccesskeySecret = ""
  }
}

```

### 上传配置至 Apollo 配置中心

参考https://github.com/apache/incubator-seata/tree/develop/script/config-center 的 config.txt 并修改,之后运行仓库中提供的 Apollo 脚本,将信息提交到 Apollo 控制台, 如果有需要更改,可直接通过控制台更改.

eg: sh $\{SEATAPATH}/script/config-center/apollo/apollo-config.sh -h localhost -p 8070 -e DEV -a seata-server -c default -n application -d apollo -r apollo -t 3aa026fc8435d0fc4505b345b8fa4578fb646a2c

详细解析参考 [Readme 文档](https://github.com/apache/incubator-seata/blob/develop/script/config-center/README.md)

随后,启动 Seata-Server 和 Client（业务侧）应用，如果在导入配置至 Apollo 前，已启动 Seata-Server 和 Client（业务侧）应用需要进行重启。
