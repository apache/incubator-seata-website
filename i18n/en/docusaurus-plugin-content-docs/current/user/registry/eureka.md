---
title: Eureka Registry Center
keywords: [Seata, Eureka, Registry Center]
description: Eureka Registry Center.
---

# Eureka Registry

Eureka is an important registry implementation in the Seata component.

## Prerequisites

Before integrating `Eureka` into your Seata project, make sure that the Eureka Server service is already running in the background. If you are not familiar with the basic usage of Eureka, you can refer to the [Eureka Quick Start](https://projects.spring.io/spring-cloud/spring-cloud.html#_service_discovery_eureka_clients) for reference. It is recommended to use Eureka version `2.X` or above.

## Quick Start

The steps to integrate Eureka registry into Seata are very simple, and can be roughly divided into "Adding Maven Dependencies" and "Configuring the Registry".

### Adding Maven Dependencies

First, you need to add the Maven dependency of `spring-cloud-starter-netflix-eureka-client` to your project's `pom.xml` file. It is recommended to use Seata `1.4.0+`. For the version relationship between `spring-cloud-starter-alibaba-seata` and the corresponding microservice version, please refer to the [Version Description](https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E).

```xml
<!-- seata dependency -->
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
    <version>latest version</version>
</dependency>
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
    <version>2.1.2.RELEASE and above</version>
    <exclusions>
        <exclusion>
            <groupId>io.seata</groupId>
            <artifactId>seata-spring-boot-starter</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!-- eureka client dependency -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    <version>2.0.0.RELEASE and above</version>
</dependency>
```

### Configuring the Registry on the Client Side

Add the corresponding configuration to [**application.yml**](https://github.com/apache/incubator-seata/blob/2.x/script/client/spring/application.yml), and refer to the [Configuration Reference](https://github.com/apache/incubator-seata/tree/2.x/script/client) for other configurations.

```yaml
seata:
  tx-service-group: default_tx_group
  service:
    vgroup-mapping:
      default_tx_group: seata-server # Configure the corresponding value of registry.eureka.application on the Server side here
  registry:
    type: eureka
    eureka:
      service-url: http://localhost:8761/eureka
```

### Server-side configuration of the registry center

Add the corresponding configuration center in [conf/application.yml](https://github.com/apache/incubator-seata/blob/2.x/server/src/main/resources/application.yml), and refer to the [configuration](https://github.com/apache/incubator-seata/blob/2.x/server/src/main/resources/application.example.yml) for the rest.

```yaml
seata:
  registry:
    type: eureka
    eureka:
      service-url: http://localhost:8761/eureka
      application: seata-server 
      weight: 1
```

After that, when Seata-Server is started, the Server-side service will appear in the registry center list in the Eureka console. After configuring the Client, you can start the application to experience the Seata service.