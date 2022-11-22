# Eureka 注册中心

Eureka是 Seata 组件中重要的注册中心实现.

## 预备工作

当您将`Eureka`整合到您的 Seata工程之前，请确保后台已经启动 Eureka Server服务。如果您尚且不熟悉 Eureka的基本使用的话，可先行参考 [Eureka快速入门](https://projects.spring.io/spring-cloud/spring-cloud.html#_service_discovery_eureka_clients)。建议使用 Eureka `2.X` 及以上的版本。

## 快速上手

Seata 融合 Eureka注册中心的操作步骤非常简单，大致步骤可分为“增加 Maven 依赖”以及“配置注册中心“。

### 增加 Maven 依赖

首先，您需要将 `spring-cloud-starter-netflix-eureka-client` 的 Maven 依赖添加到您的项目 `pom.xml` 文件中，建议使用 Seata `1.4.0+`，`spring-cloud-starter-alibaba-seata`的版本与对应微服务版本对应关系请参考[版本说明](https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E)

```xml
<!-- seata 依赖 -->
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>最新版</version>
</dependency>
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
    <version>2.1.2.RELEASE及以上版本</version>
    <exclusions>
        <exclusion>
            <groupId>io.seata</groupId>
            <artifactId>seata-spring-boot-starter</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!-- eureka 客户端依赖 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    <version>2.0.0.RELEASE及以上版本</version>
</dependency>
```

### Client端配置注册中心

在 [**application.yml**](https://github.com/seata/seata/blob/develop/script/client/spring/application.yml) 中加入对应的配置中心,其余[配置参考](https://github.com/seata/seata/tree/develop/script/client)

```yaml
seata:
  tx-service-group: my_test_tx_group
  service:
    vgroup-mapping:
      my_test_tx_group: seata-server # 此处配置对应Server端配置registry.eureka.application的值
  registry:
    type: eureka
    eureka:
      service-url: http://localhost:8761/eureka
      weight: 1
```

### Server端配置注册中心

在 [registry.conf](https://github.com/seata/seata/blob/develop/script/server/config/registry.conf) 中加入对应配置中心,其余[配置参考](https://github.com/seata/seata/tree/develop/script/server)

```
registry {
  type = "eureka"
 
  eureka {
    serviceUrl = "http://localhost:8761/eureka"
    application = "seata-server"
    weight = "1"
  }
}
```

随后,启动 Seata-Server 后，会发现Server端的服务出现在 Eureka控制台中的注册中心列表中. Client 配置完成后启动应用就可以正式体验 Seata 服务。