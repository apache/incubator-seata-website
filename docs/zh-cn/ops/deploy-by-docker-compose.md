---
hidden: true
title: 使用 Docker compose 快速部署 Seata Server
keywords: docker-compose,ops
description: 使用 Docker-compose 快速部署 Seata Server
author: zouwei
date: 2021-12-05
---

# 使用 docker-compose 部署 Seata Server

## 注意事项 
- 避免直接拉取latest版本镜像，latest版本并不一定是released版本，为避免不必要的问题，请到[docker镜像仓库](https://hub.docker.com/r/seataio/seata-server/tags)确定要拉取的镜像版本。

## 快速开始 

* <a href="#file-file">【无注册中心，file存储】</a>
* <a href="#file-db">【无注册中心，db存储】</a>
* <a href="#nacos-db">【nacos注册中心，db存储】</a>
* <a href="#ha-nacos-db">【高可用部署】</a>

### <a id="file-file">【无注册中心，file存储】</a>

该模式下，不需要注册中心，也不需要任何第三方存储中心。

docker-compose.yaml
```yaml
version: "3.1"
services:
  seata-server:
    image: seataio/seata-server:1.4.2
    hostname: seata-server
    ports:
      - "8091:8091"
    environment:
      - SEATA_PORT=8091
      - STORE_MODE=file
```

### <a id="file-db">【无注册中心，DB存储】</a>

db模式需要在数据库创建对应的表结构，[建表脚本](https://github.com/seata/seata/tree/develop/script/server/db)。
如无法访问，请点击 <a href="#mysql">【mysql表结构】</a>、<a href="#oracle">【oracle表结构】</a>、<a href="#postgresql">【postgresql表结构】</a>。

**（1）准备file.conf配置文件**

其他存储模式可参考<a href="#file.example.conf">file.example.conf</a>

```properties
# 1.5.0版本后，默认事务分组改成了default_tx_group
# 参考：service.vgroupMapping.default_tx_group=default
service.vgroupMapping.my_test_tx_group=default
# 存储模式
store.mode=db

store.db.datasource=druid
store.db.dbType=mysql
# 需要根据mysql的版本调整driverClassName
# mysql8及以上版本对应的driver：com.mysql.cj.jdbc.Driver
# mysql8以下版本的driver：com.mysql.jdbc.Driver
store.db.driverClassName=com.mysql.cj.jdbc.Driver
# 注意调整host和port
store.db.url=jdbc:mysql://127.0.0.1:3306/seata-server?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false
# 数据库用户名
store.db.user=root
# 用户名密码
store.db.password=123456
```

**（2）准备registry.conf文件**

其他注册中心、配置中心方式可参考<a href="#registry.example.conf">registry.example.conf</a>

直连模式（无注册中心）
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

**（3）准备docker-compose.yaml文件**
```yaml
version: "3.1"
services:
  seata-server:
    image: seataio/seata-server:1.4.2
    hostname: seata-server
    ports:
      - "8091:8091"
    environment:
      - SEATA_PORT=8091
      - SEATA_CONFIG_NAME=file:/root/seata-config/registry
    volumes:
    # 需要把file.conf和registry.conf都放到./seata-server/config文件夹中
      - "./seata-server/config:/root/seata-config"
```
### <a id="nacos-db">【nacos注册中心，db存储】</a>

db模式需要在数据库创建对应的表结构，[建表脚本](https://github.com/seata/seata/tree/develop/script/server/db)。
如无法访问，请点击 <a href="#mysql">【mysql表结构】</a>、<a href="#oracle">【oracle表结构】</a>、<a href="#postgresql">【postgresql表结构】</a>。

**（1）准备file.conf配置文件**

其他存储模式可参考<a href="#file.example.conf">file.example.conf</a>

```properties
# 1.5.0版本后，默认事务分组改成了default_tx_group
# 参考：service.vgroupMapping.default_tx_group=default
service.vgroupMapping.my_test_tx_group=default
# 存储模式
store.mode=db

store.db.datasource=druid
store.db.dbType=mysql
# 需要根据mysql的版本调整driverClassName
# mysql8及以上版本对应的driver：com.mysql.cj.jdbc.Driver
# mysql8以下版本的driver：com.mysql.jdbc.Driver
store.db.driverClassName=com.mysql.cj.jdbc.Driver
# 注意调整host和port
store.db.url=jdbc:mysql://127.0.0.1:3306/seata-server?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false
# 数据库用户名
store.db.user=root
# 用户名密码
store.db.password=123456
```

**（2）准备registry.conf文件**

nacos注册中心。

其他注册中心、配置中心方式可参考<a href="#registry.example.conf">registry.example.conf</a>

```
registry {
  type = "nacos"
  
  nacos {
  # seata服务注册在nacos上的别名，客户端通过该别名调用服务
    application = "seata-server"
  # nacos服务的ip和端口
    serverAddr = "127.0.0.1:8848"
  # nacos上指定的namespace
    namespace = ""
    cluster = "default"
    username = "nacos"
    password = "nacos"
  }
}

#【如果nacos服务是docker运行的话，config.type需要指定为file模式，否则会报错】
config {
  type = "file"
  
  file {
    name="file:/root/seata-config/file.conf"
  }
}
```

**（3）准备docker-compose.yaml文件**
```yaml
version: "3.1"
services:
  seata-server:
    image: seataio/seata-server:1.4.2
    hostname: seata-server
    ports:
      - "8091:8091"
    environment:
      # 指定seata服务启动端口
      - SEATA_PORT=8091
      # 注册到nacos上的ip。客户端将通过该ip访问seata服务。
      # 注意公网ip和内网ip的差异。
      - SEATA_IP=127.0.0.1
      - SEATA_CONFIG_NAME=file:/root/seata-config/registry
    volumes:
    # 需要把file.conf和registry.conf都放到./seata-server/config文件夹中
      - "./seata-server/config:/root/seata-config"
```

### <a id="ha-nacos-db">【高可用部署】</a>

> seata高可用依赖于注册中心、数据库，可不依赖配置中心。

> db模式需要在数据库创建对应的表结构，[建表脚本](https://github.com/seata/seata/tree/develop/script/server/db)。
如无法访问，请点击 <a href="#mysql">【mysql表结构】</a>、<a href="#oracle">【oracle表结构】</a>、<a href="#postgresql">【postgresql表结构】</a>。

**（1）准备file.conf配置文件**

其他存储模式可参考<a href="#file.example.conf">file.example.conf</a>

```properties
# 1.5.0版本后，默认事务分组改成了default_tx_group
# 参考：service.vgroupMapping.default_tx_group=default
service.vgroupMapping.my_test_tx_group=default
# 存储模式
store.mode=db

store.db.datasource=druid
store.db.dbType=mysql
# 需要根据mysql的版本调整driverClassName
# mysql8及以上版本对应的driver：com.mysql.cj.jdbc.Driver
# mysql8以下版本的driver：com.mysql.jdbc.Driver
store.db.driverClassName=com.mysql.cj.jdbc.Driver
# 注意调整host和port
store.db.url=jdbc:mysql://127.0.0.1:3306/seata-server?useUnicode=true&characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false
# 数据库用户名
store.db.user=root
# 用户名密码
store.db.password=123456
```

**（2）准备registry.conf文件**

nacos注册中心。

其他注册中心、配置中心方式可参考<a href="#registry.example.conf">registry.example.conf</a>

```
registry {
  type = "nacos"
  
  nacos {
  # seata服务注册在nacos上的别名，客户端通过该别名调用服务
    application = "seata-server"
  # nacos服务的ip和端口
    serverAddr = "127.0.0.1:8848"
  # nacos上指定的namespace
    namespace = ""
    cluster = "default"
    username = "nacos"
    password = "nacos"
  }
}

#【如果nacos服务是docker运行的话，config.type需要指定为file模式，否则会报错】
config {
  type = "file"
  
  file {
    name="file:/root/seata-config/file.conf"
  }
}
```

**（3）准备docker-compose.yaml文件**

> 只要保持配置一致，seata服务可在一台机器上部署多实例，也可同时部署在多台不同的主机下面实现服务高可用。

```yaml
version: "3.1"
services:
  # seata服务1
  seata-server-1:
    image: seataio/seata-server:1.4.2
    hostname: seata-server
    ports:
      - "8091:8091"
    environment:
      # 指定seata服务启动端口
      - SEATA_PORT=8091
      # 注册到nacos上的ip。客户端将通过该ip访问seata服务。
      # 注意公网ip和内网ip的差异。
      - SEATA_IP=127.0.0.1
      - SEATA_CONFIG_NAME=file:/root/seata-config/registry
    volumes:
    # 需要把file.conf和registry.conf都放到./seata-server/config文件夹中
      - "./seata-server/config:/root/seata-config"
  # seata服务2
  seata-server-2:
    image: seataio/seata-server:1.4.2
    hostname: seata-server
    ports:
      - "8092:8092"
    environment:
      # 指定seata服务启动端口
      - SEATA_PORT=8092
      # 注册到nacos上的ip。客户端将通过该ip访问seata服务。
      # 注意公网ip和内网ip的差异。
      - SEATA_IP=127.0.0.1
      - SEATA_CONFIG_NAME=file:/root/seata-config/registry
    volumes:
    # 需要把file.conf和registry.conf都放到./seata-server/config文件夹中
      - "./seata-server/config:/root/seata-config"
  # seata服务3
  seata-server-3:
    image: seataio/seata-server:1.4.2
    hostname: seata-server
    ports:
      - "8093:8093"
    environment:
      # 指定seata服务启动端口
      - SEATA_PORT=8093
      # 注册到nacos上的ip。客户端将通过该ip访问seata服务。
      # 注意公网ip和内网ip的差异。
      - SEATA_IP=127.0.0.1
      - SEATA_CONFIG_NAME=file:/root/seata-config/registry
    volumes:
    # 需要把file.conf和registry.conf都放到./seata-server/config文件夹中
      - "./seata-server/config:/root/seata-config"
```

## 环境变量

seata-server 支持以下环境变量： 

- **SEATA_IP**

> 可选, 指定seata-server启动的IP, 该IP用于向注册中心注册时使用, 如eureka等

- **SEATA_PORT**

> 可选, 指定seata-server启动的端口, 默认为 `8091`

- **STORE_MODE**

> 可选, 指定seata-server的事务日志存储方式, 支持`db` ,`file`,redis(Seata-Server 1.3及以上版本支持), 默认是 `file`

- **SERVER_NODE**

> 可选, 用于指定seata-server节点ID, 如 `1`,`2`,`3`..., 默认为 `根据ip生成`

- **SEATA_ENV**

> 可选, 指定 seata-server 运行环境, 如 `dev`, `test` 等, 服务启动时会使用 `registry-dev.conf` 这样的配置

- **SEATA_CONFIG_NAME**

> 可选, 指定配置文件位置, 如 `file:/root/registry`, 将会加载 `/root/registry.conf` 作为配置文件，如果需要同时指定 `file.conf`文件，需要将`registry.conf`的`config.file.name`的值改为类似`file:/root/file.conf`：

## 表结构

**<a id="mysql">（1）mysql</a>**

```sql
-- -------------------------------- The script used when storeMode is 'db' --------------------------------
-- the table to store GlobalSession data
CREATE TABLE IF NOT EXISTS `global_table`
(
    `xid`                       VARCHAR(128) NOT NULL,
    `transaction_id`            BIGINT,
    `status`                    TINYINT      NOT NULL,
    `application_id`            VARCHAR(32),
    `transaction_service_group` VARCHAR(32),
    `transaction_name`          VARCHAR(128),
    `timeout`                   INT,
    `begin_time`                BIGINT,
    `application_data`          VARCHAR(2000),
    `gmt_create`                DATETIME,
    `gmt_modified`              DATETIME,
    PRIMARY KEY (`xid`),
    KEY `idx_gmt_modified_status` (`gmt_modified`, `status`),
    KEY `idx_transaction_id` (`transaction_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- the table to store BranchSession data
CREATE TABLE IF NOT EXISTS `branch_table`
(
    `branch_id`         BIGINT       NOT NULL,
    `xid`               VARCHAR(128) NOT NULL,
    `transaction_id`    BIGINT,
    `resource_group_id` VARCHAR(32),
    `resource_id`       VARCHAR(256),
    `branch_type`       VARCHAR(8),
    `status`            TINYINT,
    `client_id`         VARCHAR(64),
    `application_data`  VARCHAR(2000),
    `gmt_create`        DATETIME(6),
    `gmt_modified`      DATETIME(6),
    PRIMARY KEY (`branch_id`),
    KEY `idx_xid` (`xid`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- the table to store lock data
CREATE TABLE IF NOT EXISTS `lock_table`
(
    `row_key`        VARCHAR(128) NOT NULL,
    `xid`            VARCHAR(128),
    `transaction_id` BIGINT,
    `branch_id`      BIGINT       NOT NULL,
    `resource_id`    VARCHAR(256),
    `table_name`     VARCHAR(32),
    `pk`             VARCHAR(36),
    `gmt_create`     DATETIME,
    `gmt_modified`   DATETIME,
    PRIMARY KEY (`row_key`),
    KEY `idx_branch_id` (`branch_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `distributed_lock`
(
    `lock_key`       CHAR(20) NOT NULL,
    `lock_value`     VARCHAR(20) NOT NULL,
    `expire`         BIGINT,
    primary key (`lock_key`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('AsyncCommitting', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('RetryCommitting', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('RetryRollbacking', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('TxTimeoutCheck', ' ', 0);
```

**<a id="oracle">（2）oracle</a>**

```sql
-- -------------------------------- The script used when storeMode is 'db' --------------------------------
-- the table to store GlobalSession data
CREATE TABLE global_table
(
    xid                       VARCHAR2(128) NOT NULL,
    transaction_id            NUMBER(19),
    status                    NUMBER(3)     NOT NULL,
    application_id            VARCHAR2(32),
    transaction_service_group VARCHAR2(32),
    transaction_name          VARCHAR2(128),
    timeout                   NUMBER(10),
    begin_time                NUMBER(19),
    application_data          VARCHAR2(2000),
    gmt_create                TIMESTAMP(0),
    gmt_modified              TIMESTAMP(0),
    PRIMARY KEY (xid)
);

CREATE INDEX idx_gmt_modified_status ON global_table (gmt_modified, status);
CREATE INDEX idx_transaction_id ON global_table (transaction_id);

-- the table to store BranchSession data
CREATE TABLE branch_table
(
    branch_id         NUMBER(19)    NOT NULL,
    xid               VARCHAR2(128) NOT NULL,
    transaction_id    NUMBER(19),
    resource_group_id VARCHAR2(32),
    resource_id       VARCHAR2(256),
    branch_type       VARCHAR2(8),
    status            NUMBER(3),
    client_id         VARCHAR2(64),
    application_data  VARCHAR2(2000),
    gmt_create        TIMESTAMP(6),
    gmt_modified      TIMESTAMP(6),
    PRIMARY KEY (branch_id)
);

CREATE INDEX idx_xid ON branch_table (xid);

-- the table to store lock data
CREATE TABLE lock_table
(
    row_key        VARCHAR2(128) NOT NULL,
    xid            VARCHAR2(128),
    transaction_id NUMBER(19),
    branch_id      NUMBER(19)    NOT NULL,
    resource_id    VARCHAR2(256),
    table_name     VARCHAR2(32),
    pk             VARCHAR2(36),
    gmt_create     TIMESTAMP(0),
    gmt_modified   TIMESTAMP(0),
    PRIMARY KEY (row_key)
);

CREATE INDEX idx_branch_id ON lock_table (branch_id);

CREATE TABLE distributed_lock (
    lock_key     VARCHAR2(20)  NOT NULL,
    lock_value        VARCHAR2(20)  NOT NULL,
    expire       DECIMAL(18)   NOT NULL,
    PRIMARY KEY (lock_key)
);

INSERT INTO distributed_lock (lock_key, lock_value, expire) VALUES ('AsyncCommitting', ' ', 0);
INSERT INTO distributed_lock (lock_key, lock_value, expire) VALUES ('RetryCommitting', ' ', 0);
INSERT INTO distributed_lock (lock_key, lock_value, expire) VALUES ('RetryRollbacking', ' ', 0);
INSERT INTO distributed_lock (lock_key, lock_value, expire) VALUES ('TxTimeoutCheck', ' ', 0);
```

**<a id="postgresql">(3) postgresql</a>**

```sql
-- -------------------------------- The script used when storeMode is 'db' --------------------------------
-- the table to store GlobalSession data
CREATE TABLE IF NOT EXISTS public.global_table
(
    xid                       VARCHAR(128) NOT NULL,
    transaction_id            BIGINT,
    status                    SMALLINT     NOT NULL,
    application_id            VARCHAR(32),
    transaction_service_group VARCHAR(32),
    transaction_name          VARCHAR(128),
    timeout                   INT,
    begin_time                BIGINT,
    application_data          VARCHAR(2000),
    gmt_create                TIMESTAMP(0),
    gmt_modified              TIMESTAMP(0),
    CONSTRAINT pk_global_table PRIMARY KEY (xid)
);

CREATE INDEX idx_gmt_modified_status ON public.global_table (gmt_modified, status);
CREATE INDEX idx_transaction_id ON public.global_table (transaction_id);

-- the table to store BranchSession data
CREATE TABLE IF NOT EXISTS public.branch_table
(
    branch_id         BIGINT       NOT NULL,
    xid               VARCHAR(128) NOT NULL,
    transaction_id    BIGINT,
    resource_group_id VARCHAR(32),
    resource_id       VARCHAR(256),
    branch_type       VARCHAR(8),
    status            SMALLINT,
    client_id         VARCHAR(64),
    application_data  VARCHAR(2000),
    gmt_create        TIMESTAMP(6),
    gmt_modified      TIMESTAMP(6),
    CONSTRAINT pk_branch_table PRIMARY KEY (branch_id)
);

CREATE INDEX idx_xid ON public.branch_table (xid);

-- the table to store lock data
CREATE TABLE IF NOT EXISTS public.lock_table
(
    row_key        VARCHAR(128) NOT NULL,
    xid            VARCHAR(128),
    transaction_id BIGINT,
    branch_id      BIGINT       NOT NULL,
    resource_id    VARCHAR(256),
    table_name     VARCHAR(32),
    pk             VARCHAR(36),
    gmt_create     TIMESTAMP(0),
    gmt_modified   TIMESTAMP(0),
    CONSTRAINT pk_lock_table PRIMARY KEY (row_key)
);

CREATE INDEX idx_branch_id ON public.lock_table (branch_id);

CREATE TABLE distributed_lock (
    lock_key     VARCHAR(20)  NOT NULL,
    lock_value        VARCHAR(20)  NOT NULL,
    expire       BIGINT       NOT NULL,
    CONSTRAINT pk_distributed_lock_table PRIMARY KEY (lock_key)
);

INSERT INTO distributed_lock (lock_key, lock_value, expire) VALUES ('AsyncCommitting', ' ', 0);
INSERT INTO distributed_lock (lock_key, lock_value, expire) VALUES ('RetryCommitting', ' ', 0);
INSERT INTO distributed_lock (lock_key, lock_value, expire) VALUES ('RetryRollbacking', ' ', 0);
INSERT INTO distributed_lock (lock_key, lock_value, expire) VALUES ('TxTimeoutCheck', ' ', 0);
```

## 配置示例

**<a id="registry.example.conf">（1） registry.example.conf</a>**

```
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "file"

  nacos {
    application = "seata-server"
    serverAddr = "127.0.0.1:8848"
    group = "SEATA_GROUP"
    namespace = ""
    cluster = "default"
    username = ""
    password = ""
  }
  eureka {
    serviceUrl = "http://localhost:8761/eureka"
    application = "default"
    weight = "1"
  }
  redis {
    serverAddr = "localhost:6379"
    db = 0
    password = ""
    cluster = "default"
    timeout = 0
  }
  zk {
    cluster = "default"
    serverAddr = "127.0.0.1:2181"
    sessionTimeout = 6000
    connectTimeout = 2000
    username = ""
    password = ""
  }
  consul {
    cluster = "default"
    serverAddr = "127.0.0.1:8500"
    aclToken = ""
  }
  etcd3 {
    cluster = "default"
    serverAddr = "http://localhost:2379"
  }
  sofa {
    serverAddr = "127.0.0.1:9603"
    application = "default"
    region = "DEFAULT_ZONE"
    datacenter = "DefaultDataCenter"
    cluster = "default"
    group = "SEATA_GROUP"
    addressWaitTime = "3000"
  }
  file {
    name = "file.conf"
  }
}

config {
  # file、nacos 、apollo、zk、consul、etcd3
  type = "file"

  nacos {
    serverAddr = "127.0.0.1:8848"
    namespace = ""
    group = "SEATA_GROUP"
    username = ""
    password = ""
    dataId = "seataServer.properties"
  }
  consul {
    serverAddr = "127.0.0.1:8500"
    aclToken = ""
  }
  apollo {
    appId = "seata-server"
    ## apolloConfigService will cover apolloMeta
    apolloMeta = "http://192.168.1.204:8801"
    apolloConfigService = "http://192.168.1.204:8080"
    namespace = "application"
    apolloAccesskeySecret = ""
    cluster = "seata"
  }
  zk {
    serverAddr = "127.0.0.1:2181"
    sessionTimeout = 6000
    connectTimeout = 2000
    username = ""
    password = ""
    nodePath = "/seata/seata.properties"
  }
  etcd3 {
    serverAddr = "http://localhost:2379"
  }
  file {
    name = "file.conf"
  }
}
```

**<a id="file.example.conf">（2）  file.example.conf</a>**

```
store {
  ## 存储模式: file、db、redis，三选一
  mode = "file"
  ## rsa加密公钥，可选
  publicKey = ""
  ## file store property
  file {
    ## 存储路径
    dir = ""
    # branch session size , if exceeded first try compress lockkey, still exceeded throws exceptions
    maxBranchSessionSize = 16384
    # globe session size , if exceeded throws exceptions
    maxGlobalSessionSize = 512
    # file buffer size , if exceeded allocate new buffer
    fileWriteBufferCacheSize = 16384
    # when recover batch read size
    sessionReloadReadSize = 100
    # 刷盘方式：async, sync
    flushDiskMode = async
  }

  ## database store property
  db {
    ## the implement of javax.sql.DataSource, such as DruidDataSource(druid)/BasicDataSource(dbcp)/HikariDataSource(hikari) etc.
    datasource = "druid"
    ## mysql/oracle/postgresql/h2/oceanbase etc.
    dbType = "mysql"
    ## 注意不同mysql版本对应的driver
    driverClassName = "com.mysql.jdbc.Driver"
    ## if using mysql to store the data, recommend add rewriteBatchedStatements=true in jdbc connection param
    url = "jdbc:mysql://127.0.0.1:3306/seata?rewriteBatchedStatements=true"
    user = "mysql"
    password = "mysql"
    minConn = 5
    maxConn = 100
    globalTable = "global_table"
    branchTable = "branch_table"
    lockTable = "lock_table"
    queryLimit = 100
    maxWait = 5000
  }

  ## redis store property
  redis {
    ## redis mode: single、sentinel
    mode = "single"
    ## single mode property
    single {
      host = "127.0.0.1"
      port = "6379"
    }
    ## sentinel mode property
    sentinel {
      masterName = ""
      ## such as "10.28.235.65:26379,10.28.235.65:26380,10.28.235.65:26381"
      sentinelHosts = ""
    }
    password = ""
    database = "0"
    minConn = 1
    maxConn = 10
    maxTotal = 100
    queryLimit = 100
  }
}

# 下面配置为可选，根据业务场景选择使用

transport {
  # tcp, unix-domain-socket
  type = "TCP"
  #NIO, NATIVE
  server = "NIO"
  #enable heartbeat
  heartbeat = true
  # the client batch send request enable
  enableClientBatchSendRequest = false
  #thread factory for netty
  threadFactory {
    bossThreadPrefix = "NettyBoss"
    workerThreadPrefix = "NettyServerNIOWorker"
    serverExecutorThreadPrefix = "NettyServerBizHandler"
    shareBossWorker = false
    clientSelectorThreadPrefix = "NettyClientSelector"
    clientSelectorThreadSize = 1
    clientWorkerThreadPrefix = "NettyClientWorkerThread"
    # netty boss thread size
    bossThreadSize = 1
    #auto default pin or 8
    workerThreadSize = "default"
  }
  shutdown {
    # when destroy server, wait seconds
    wait = 3
  }
  serialization = "seata"
  compressor = "none"
}

## server configuration, only used in server side
server {
  recovery {
    #schedule committing retry period in milliseconds
    committingRetryPeriod = 1000
    #schedule asyn committing retry period in milliseconds
    asynCommittingRetryPeriod = 1000
    #schedule rollbacking retry period in milliseconds
    rollbackingRetryPeriod = 1000
    #schedule timeout retry period in milliseconds
    timeoutRetryPeriod = 1000
  }
  undo {
    logSaveDays = 7
    #schedule delete expired undo_log in milliseconds
    logDeletePeriod = 86400000
  }
  #check auth
  enableCheckAuth = true
  #unit ms,s,m,h,d represents milliseconds, seconds, minutes, hours, days, default permanent
  maxCommitRetryTimeout = "-1"
  maxRollbackRetryTimeout = "-1"
  rollbackRetryTimeoutUnlockEnable = false
  retryDeadThreshold = 130000
}

## metrics configuration, only used in server side
metrics {
  enabled = false
  registryType = "compact"
  # multi exporters use comma divided
  exporterList = "prometheus"
  exporterPrometheusPort = 9898
}
```