---
hidden: true
title: Deploy Seata Server By Docker Compose
keywords: [docker-compose,ops]
description: Deploy Seata Server By Docker Compose
author: zouwei
date: 2021-12-05
---

# Deploy Seata Server By Docker Compose

## Version Deployment History 

[Version before 1.5.0](/docs/ops/deploy-by-docker-compose-142)

[Version 1.5.0 and above](/docs/ops/deploy-by-docker-compose)

## Precautions 
- Please avoid directly pulling the latest version image. The latest version is not necessarily a stable version. To avoid unnecessary problems, please go to [docker image warehouse](https://hub.docker.com/r/seataio/seata-server/tags) to determine the image version to be pulled.

## Quick Start

* <a href="#file-file">No Registration Center, File Storage</a>
* <a href="#file-db">No Registration Center, db Storage</a>
* <a href="#nacos-db">Nacos Registration Center, db Storage</a>
* <a href="#ha-nacos-db">High Available Usage Deployment</a>

### <a id="file-file">No Registration Center, File Storage</a>

In this mode, there is no need for a registration center or any third-party storage center.

docker-compose.yaml
```yaml
version: "3.1"
services:
  seata-server:
    image: seataio/seata-server:${latest-release-version}
    hostname: seata-server
    ports:
      - "8091:8091"
    environment:
      - SEATA_PORT=8091
      - STORE_MODE=file
```

### <a id="file-db">No Registration Center, db Storage</a>

> The db mode needs to create the corresponding table structure in the database, please refer to <a href="https://github.com/apache/incubator-seata/tree/develop/script/server/db">[table creation script]</a>.

**(1) Prepare configuration file: file.conf**

For more storage mode support, please refer to <a href="https://github.com/apache/incubator-seata/blob/develop/script/config-center/config.txt">More Storage Modes</a>.

```properties
# Storage mode
store.mode=db

store.db.datasource=druid
store.db.dbType=mysql
# Need to adjust driverClassName according to mysql version
# Driver corresponding to mysql8 and above versions is: com.mysql.cj.jdbc.Driver
# Driver for versions below mysql8 is: com.mysql.jdbc.Driver
store.db.driverClassName=com.mysql.cj.jdbc.Driver
# Pay attention to adjusting the parameters host and port according to the actual production situation.
store.db.url=jdbc:mysql://127.0.0.1:3306/seata-server?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false
# database username
store.db.user=
# Username Password
store.db.password=
```

**(2) Prepare file: registry.conf**

For more registration center support, please refer to <a href="/docs/user/registry/">Registration Center</a>

For more configuration center support, please refer to <a href="/docs/user/configuration/">Configuration Center</a>

Direct connection mode (no registration center)

```
registry {
   type = "file"
}

config {
   type = "file"
  
   file {
     name="file:/root/seata-config/file.conf"
   }
}
```

**(3) Prepare file: docker-compose.yaml**
```yaml
version: "3.1"
services:
   seata-server:
     image: seataio/seata-server:${latest-release-version}
     hostname: seata-server
     ports:
       - "8091:8091"
     environment:
       - SEATA_PORT=8091
       - SEATA_CONFIG_NAME=file:/root/seata-config/registry
     volumes:
     # You need to put both file.conf and registry.conf in the ./seata-server/config folder
       - "./seata-server/config:/root/seata-config"
```

### <a id="nacos-db">Nacos Registration Center, db Storage</a>

> The db mode needs to create the corresponding table structure in the database, please refer to <a href="https://github.com/apache/incubator-seata/tree/develop/script/server/db">[table creation script]</a>.

**(1) Prepare file: registry.conf**

Nacos Registration Center.

For more registration center support, please refer to <a href="/docs/user/registry/">Registration Center</a>

For more configuration center support, please refer to <a href="/docs/user/configuration/">Configuration Center</a>

```
registry {
   type = "nacos"
  
   nacos {
   # The alias the seata service is registered on nacos, and the client calls the service through this alias.
     application = "seata-server"
   # Please configure the IP and port of the nacos service according to the actual production environment.
     serverAddr = "127.0.0.1:8848"
   # The namespace specified on nacos
     namespace = ""
     cluster = "default"
     username = "nacos"
     password = "nacos"
   }
}

config {
   type = "nacos"
  
   nacos {
     # Please configure the IP and port of the nacos service according to the actual production environment.
     serverAddr = "127.0.0.1:8848"
     # The namespace specified on nacos
     namespace = ""
     group = "SEATA_GROUP"
     username = "nacos"
     password = "nacos"
   # Starting from v1.4.2, it has been supported to obtain all configuration information from one Nacos dataId. You only need to add an additional dataId configuration item.
     dataId: "seataServer.properties"
   }
}
```

**(2) Prepare nacos configuration center configuration**

For more storage mode support, please refer to <a href="https://github.com/apache/incubator-seata/blob/develop/script/config-center/config.txt">More storage modes</a>.

> You need to create a new configuration in nacos, where the dataId is seataServer.properties

```properties
# Storage mode
store.mode=db

store.db.datasource=druid
store.db.dbType=mysql
# Need to adjust driverClassName according to mysql version
# Driver corresponding to mysql8 and above versions is: com.mysql.cj.jdbc.Driver
# Driver for versions below mysql8 is: com.mysql.jdbc.Driver
store.db.driverClassName=com.mysql.cj.jdbc.Driver
# Pay attention to adjusting the parameters host and port according to the actual production situation.
store.db.url=jdbc:mysql://127.0.0.1:3306/seata-server?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false
# database username
store.db.user= "usernanme"
# Username Password
store.db.password= "password"
```

**(3) Prepare file: docker-compose.yaml**

```yaml
version: "3.1"
services:
   seata-server:
     image: seataio/seata-server:${latest-release-version}
     hostname: seata-server
     ports:
       - "8091:8091"
     environment:
       # Specify the seata service startup port
       - SEATA_PORT=8091
       # Specify the Ip registered to nacos. The client will access the seata service through this IP.
       # Pay attention to the difference between public network IP and internal network IP.
       - SEATA_IP=127.0.0.1
       - SEATA_CONFIG_NAME=file:/root/seata-config/registry
     volumes:
     # Because registry.conf is the nacos configuration center, you only need to put registry.conf in the ./seata-server/config folder
       - "./seata-server/config:/root/seata-config"
```

### <a id="ha-nacos-db">High Available Usage Deployment</a>

> Seata high availability usage deployment relies on the registration center and database, but does not depend on the configuration center.

> The db mode needs to create the corresponding table structure in the database,  please refer to <a href="https://github.com/apache/incubator-seata/tree/develop/script/server/db">[table creation script]</a>.

**(1) Prepare configuration file: file.conf**

For more storage mode support, please refer to <a href="https://github.com/apache/incubator-seata/blob/develop/script/config-center/config.txt">More Storage Modes</a>.

```properties
# Storage mode
store.mode=db

store.db.datasource=druid
store.db.dbType=mysql
# Need to adjust driverClassName according to mysql version
# Driver corresponding to mysql8 and above versions is: com.mysql.cj.jdbc.Driver
# Driver for versions below mysql8 is: com.mysql.jdbc.Driver
store.db.driverClassName=com.mysql.cj.jdbc.Driver
# Pay attention to adjusting the parameters host and port according to the actual production situation.
store.db.url=jdbc:mysql://127.0.0.1:3306/seata-server?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false
# database username
store.db.user=
# Username Password
store.db.password=
```

**(2) Prepare file: registry.conf**

Nacos registration center.

For more registration center support, please refer to <a href="/docs/user/registry/">Registration Center</a>

For more configuration center support, please refer to <a href="/docs/user/configuration/">Configuration Center</a>

```
registry {
   type = "nacos"
  
   nacos {
   # The alias the seata service is registered on nacos, and the client calls the service through this alias.
     application = "seata-server"
   #IP and port of nacos service
     serverAddr = "127.0.0.1:8848"
   # The namespace specified on nacos
     namespace = ""
     cluster = "default"
     username = "nacos"
     password = "nacos"
   }
}

config {
   type = "file"
  
   file {
     name="file:/root/seata-config/file.conf"
   }
}
```

**(3) Prepare file: docker-compose.yaml**

> As long as the configuration is consistent, the seata service can be deployed on multiple instances on one machine or on multiple different hosts at the same time to achieve high service availability. <br />
> [High Availability Usage Deployment](/docs/ops/deploy-ha)

```yaml
version: "3.1"
services:
   #seataservice1
   seata-server-1:
     image: seataio/seata-server:${latest-release-version}
     hostname: seata-server
     ports:
       - "8091:8091"
     environment:
       # Specify the seata service startup port
       - SEATA_PORT=8091
       # Specify the Ip registered to nacos. The client will access the seata service through this IP.
       # Pay attention to the difference between public network IP and internal network IP.
       - SEATA_IP=127.0.0.1
       - SEATA_CONFIG_NAME=file:/root/seata-config/registry
     volumes:
     # You need to put both file.conf and registry.conf in the ./seata-server/config folder
       - "./seata-server/config:/root/seata-config"
   # seataservice2
   seata-server-2:
     image: seataio/seata-server:${latest-release-version}
     hostname: seata-server
     ports:
       - "8092:8092"
     environment:
       # Specify the seata service startup port
       - SEATA_PORT=8092
       # Specify the Ip registered to nacos. The client will access the seata service through this IP.
       # Pay attention to the difference between public network IP and internal network IP.
       - SEATA_IP=127.0.0.1
       - SEATA_CONFIG_NAME=file:/root/seata-config/registry
     volumes:
     # You need to put both file.conf and registry.conf in the ./seata-server/config folder
       - "./seata-server/config:/root/seata-config"
  
   # seata service 3......seata service N
```


## Environment variables

seata-server supports the following environment variables:

- **SEATA_IP**

> Optional. It specifies the IP started by seata-server. This IP is used when registering with the registration center, such as eureka, etc.

- **SEATA_PORT**

> Optional. It is used to specify the port where seata-server starts. The default port is `8091`.

- **STORE_MODE**

> Optional. It is used to specify the transaction log storage method of seata-server, supports `db`, `file`, `redis` (supported by Seata-Server 1.3 and above). The default value is `file`.

- **SERVER_NODE**

> Optional. It is used to specify the seata-server node ID, such as `1`,`2`,`3`... The default value is `generated based on ip`.

- **SEATA_ENV**

> Optional. It is used to specify the seata-server operating environment, such as `dev`, `test`, etc. When the service is started, configurations such as `registry-dev.conf` will be used.

- **SEATA_CONFIG_NAME**

> Optional. It is used to specify the configuration file location, such as `file:/root/registry`, which will load `/root/registry.conf` as the configuration file. If you need to specify the `file.conf` file at the same time, you need to change the value of `config.file.name` in `registry.conf` to something like `file:/root/file.conf`.
