# Nacos 注册中心

Nacos 是 Seata 组件中重要的注册中心实现.

## 预备工作

当您将`nacos-client`整合到您的 Seata工程之前，请确保后台已经启动 Nacos 服务。如果您尚且不熟悉 Nacos 的基本使用的话，可先行参考 [Nacos 快速入门](https://nacos.io/zh-cn/docs/quick-start.html)。建议使用 Nacos `1.2.0` 及以上的版本。

## 快速上手

Seata 融合 Nacos 注册中心的操作步骤非常简单，大致步骤可分为“增加 Maven 依赖”以及“配置注册中心“。

### 增加 Maven 依赖

首先，您需要将 `nacos-client` 的 Maven 依赖添加到您的项目 `pom.xml` 文件中，并且强烈地推荐您使用 Seata `1.4.0`：

```java
           <dependency>
                <groupId>io.seata</groupId>
                <artifactId>seata-spring-boot-starter</artifactId>
                <version>最新版</version>
            </dependency>
            <dependency>
                <groupId>com.alibaba.nacos</groupId>
                <artifactId>nacos-client</artifactId>
                <version>1.3.2</version>
            </dependency>
```

### Client端配置注册中心

在 [**application.yml**](https://github.com/seata/seata/blob/develop/script/client/spring/application.yml) 中加入对应的配置中心,其余[配置参考](https://github.com/seata/seata/tree/develop/script/client)

```yaml
seata:
  registry:
    type: nacos
    nacos:
      application: seata-server
      server-addr: 127.0.0.1:8848
      group : "SEATA_GROUP"
      namespace: ""
      username: "nacos"
      password: "nacos"
```

### Server端配置注册中心

在 [registry.conf](https://github.com/seata/seata/blob/develop/script/server/config/registry.conf) 中加入对应配置中心,其余[配置参考](https://github.com/seata/seata/tree/develop/script/server/config)

```
registry {
  type = "nacos"

  nacos {
    application = "seata-server"
    serverAddr = "127.0.0.1:8848"
    group = "SEATA_GROUP"
    namespace = ""
    cluster = "default"
    username = ""
    password = ""
  }
}

```

随后,重启 Seata-Server 应用后，您同样也能发现Server端的服务提供信息在 Nacos 控制台中.此时重启Client端即可看到注册效果.