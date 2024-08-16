---
title: Apollo Configuration Center
keywords: [Seata, Apollo]
description: Apollo Configuration Center.
---

# Apollo Configuration Center

## Prerequisites

Before integrating `apollo-client` into your Seata project, make sure that the Apollo service has been started on the backend. If you are not familiar with the basic usage of Apollo, you can refer to the [Apollo Quick Start](https://www.apolloconfig.com/) for preliminary understanding. It is recommended to use Apollo version `1.6.0` or above.

## Quick Start

The steps to integrate Seata with the Apollo Configuration Center are very simple and can be roughly divided into "Adding Maven Dependencies" and "Configuring the Apollo Configuration Center" and "submitting the configuration to Apollo-Server".

### Adding Maven Dependencies

First, you need to add the Maven dependency of `apollo-client` to your project's `pom.xml` file. It is recommended to use Seata `1.4.0+`:

```java
           <dependency>
                <groupId>io.seata</groupId>
                <artifactId>seata-spring-boot-starter</artifactId>
                <version>latest version</version>
            </dependency>
            <dependency>
                <groupId>com.ctrip.framework.apollo</groupId>
                <artifactId>apollo-client</artifactId>
                <version>${apollo-client.version}</version>
            </dependency>
```

### Client-side Configuration Center

Add the corresponding configuration center in [**application.yml**](https://github.com/apache/incubator-seata/blob/develop/script/client/spring/application.yml), and refer to the rest of the [configuration](https://github.com/apache/incubator-seata/tree/develop/script/client):

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

### Server-side Configuration Center

Add the corresponding configuration center in [registry.conf](https://github.com/apache/incubator-seata/blob/develop/script/server/config/registry.conf), and refer to the rest of the [configuration](https://github.com/apache/incubator-seata/tree/develop/script/server):

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

### Upload Configuration to Apollo Configuration Center

Refer to [config.txt](https://github.com/apache/incubator-seata/tree/develop/script/config-center) in https://github.com/apache/incubator-seata/tree/develop/script/config-center and make modifications. Then run the provided Apollo script in the repository to submit the information to the Apollo console. If there is a need for changes, they can be directly made through the console.

eg: sh $\{SEATAPATH}/script/config-center/apollo/apollo-config.sh -h localhost -p 8070 -e DEV -a seata-server -c default -n application -d apollo -r apollo -t 3aa026fc8435d0fc4505b345b8fa4578fb646a2c

For detailed analysis, refer to the [Readme document](https://github.com/apache/incubator-seata/blob/develop/script/config-center/README.md)

Then, start the Seata-Server and Client (business side) applications. If the Seata-Server and Client (business side) applications were already started before importing the configuration to Apollo, they need to be restarted.
