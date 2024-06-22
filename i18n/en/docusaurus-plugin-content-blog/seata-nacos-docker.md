---
title: Docker Deployment of Seata Integration with Nacos
keywords: [Seata, Nacos, distributed transaction]
description: This article explains how to deploy Seata integrated with Nacos configuration using Docker.
author: FUNKYE
date: 2019/12/03
---

# Docker Deployment Seata with Nacos Integration

Running the demo used [project address](https://gitee.com/itCjb/springboot-dubbo-mybatisplus-seata)

Author: FUNKYE (Chen Jianbin), Hangzhou, an Internet company main program.

# Preface

Seata configuration for direct connection [blog](/blog/springboot-dubbo-mybatisplus-seata/)

Seata Integration with Nacos Configuration [blog](/blog/seata-nacos-analysis/)

Let's go back to the basics of the previous posts to configure nacos as a configuration centre and dubbo registry.

## Preparation

1. Install docker

 ```shell
 yum -y install docker
 ```

 2. Create the nacos and seata databases.

 ```mysql
 /******************************************/
 /* Full database name = nacos */
 /* Table name = config_info */
 /******************************************/
 CREATE TABLE `config_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id', `data_id` v
  `data_id` varchar(255) NOT NULL COMMENT 'data_id', `group_id` varchar(255) AUTO_INCREMENT COMMENT
  `group_id` varchar(255) DEFAULT NULL, `content` longtext NOT NULL
  `content` longtext NOT NULL COMMENT 'content', `md5` varchar(255)
  `md5` varchar(32) DEFAULT NULL COMMENT 'md5', `gmt_create` longtext NOT NULL COMMENT
  `gmt_create` datetime NOT NULL DEFAULT '2010-05-05 00:00:00' COMMENT 'Creation time',
  `gmt_modified` datetime NOT NULL DEFAULT '2010-05-05 00:00:00' COMMENT 'Modified', `src_user` datetime NOT NULL
  `src_user` text COMMENT 'source user',
  `src_ip` varchar(20) DEFAULT NULL COMMENT 'source ip', `app_name` varchar(20) DEFAULT NULL COMMENT '2010-05-05 00:00:00' COMMENT
  `app_name` varchar(128) DEFAULT NULL, `tenant_id` varchar(20)
  `tenant_id` varchar(128) DEFAULT '' COMMENT 'tenant field',
  `c_desc` varchar(256) DEFAULT NULL,
  `c_use` varchar(64) DEFAULT NULL, `c_desc` varchar(256) DEFAULT
  `effect` varchar(64) DEFAULT NULL,
  `type` varchar(64) DEFAULT NULL,
  `c_schema` text, `c_schema` text, `c_schema` text
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_configinfo_datagrouptenant` (`data_id`,`group_id`,`tenant_id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_info';

 /******************************************/
 /* Full database name = nacos_config */
 /* Table name = config_info_aggr */
 /******************************************/
 CREATE TABLE `config_info_aggr` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `data_id` varchar(255) NOT NULL COMMENT 'data_id', `group_id` varchar(255) AUTO_INCREMENT COMMENT
  `group_id` varchar(255) NOT NULL COMMENT 'group_id', `datum_id` varchar(255) NOT NULL COMMENT
  `datum_id` varchar(255) NOT NULL COMMENT 'datum_id', `content` longtext NOT NULL COMMENT 'data_id', `group_id` varchar(255)
  `content` longtext NOT NULL COMMENT '内容',
  `gmt_modified` datetime NOT NULL COMMENT 'modification time', `app_name` varchar(255) NOT NULL COMMENT
  `app_name` varchar(128) DEFAULT NULL, `tenant_id` varchar(128) COMMENT
  `tenant_id` varchar(128) DEFAULT '' COMMENT 'Tenant field',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_configinfoaggr_datagrouptenantdatum` (`data_id`,`group_id`,`tenant_id`,`datum_id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Add tenant field';


 /******************************************/
 /* Full database name = nacos_config */
 /* Table name = config_info_beta */
 /******************************************/
 CREATE TABLE `config_info_beta` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `data_id` varchar(255) NOT NULL COMMENT 'data_id', `group_id` varchar(255) AUTO_INCREMENT COMMENT
  `group_id` varchar(128) NOT NULL COMMENT 'group_id', `app_name` varchar(255) NOT NULL COMMENT
  `app_name` varchar(128) DEFAULT NULL COMMENT 'app_name', `content` longtext NOT NULL
  `content` longtext NOT NULL COMMENT 'content', `beta_ips` varchar(128)
  `beta_ips` varchar(1024) DEFAULT NULL COMMENT 'betaIps', `md5` varchar(1024) DEFAULT NULL COMMENT
  `md5` varchar(32) DEFAULT NULL COMMENT 'md5', `gmt_create` varchar(1024) DEFAULT NULL COMMENT
  `gmt_create` datetime NOT NULL DEFAULT '2010-05-05 00:00:00' COMMENT 'Creation Time',
  `gmt_modified` datetime NOT NULL DEFAULT '2010-05-05 00:00:00' COMMENT 'Modified', `src_user` datetime NOT NULL
  `src_user` text COMMENT 'source user',
  `src_ip` varchar(20) DEFAULT NULL COMMENT 'source ip', `tenant_id` varchar(20) DEFAULT NULL COMMENT '2010-05-05 00:00:00' COMMENT
  `tenant_id` varchar(128) DEFAULT '' COMMENT 'tenant field',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_configinfobeta_datagrouptenant` (`data_id`,`group_id`,`tenant_id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_info_beta';

 /******************************************/
 /* Full database name = nacos_config */
 /* Table name = config_info_tag */
 /******************************************/
 CREATE TABLE `config_info_tag` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `data_id` varchar(255) NOT NULL COMMENT 'data_id', `group_id` varchar(255) AUTO_INCREMENT COMMENT
  `group_id` varchar(128) NOT NULL COMMENT 'group_id', `tenant_id` varchar(255) NOT NULL COMMENT
  `tenant_id` varchar(128) DEFAULT '' COMMENT 'tenant_id', `tag_id` varchar(128) DEFAULT
  `tag_id` varchar(128) NOT NULL COMMENT 'tag_id', `app_name` varchar(128) DEFAULT '' COMMENT
  `app_name` varchar(128) DEFAULT NULL COMMENT 'app_name',
  `content` longtext NOT NULL COMMENT 'content', `md5` varchar(128) DEFAULT NULL COMMENT
  `md5` varchar(32) DEFAULT NULL COMMENT 'md5', `gmt_create
  `gmt_create` datetime NOT NULL DEFAULT '2010-05-05 00:00:00' COMMENT 'Creation time',
  `gmt_modified` datetime NOT NULL DEFAULT '2010-05-05 00:00:00' COMMENT 'Modified', `src_user` datetime NOT NULL
  `src_user` text COMMENT 'source user',
  `src_ip` varchar(20) DEFAULT NULL COMMENT 'source ip', `src_user` text COMMENT
  PRIMARY KEY (`id`), UNIQUE KEY `src_ip` varchar(20)
  UNIQUE KEY `uk_configinfotag_datagrouptenanttag` (`data_id`,`group_id`,`tenant_id`,`tag_id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_info_tag';

 /******************************************/
 /* Full database name = nacos_config */
 /* Table name = config_tags_relation */
 /******************************************/
 CREATE TABLE `config_tags_relation` (
  `id` bigint(20) NOT NULL COMMENT 'id', `tag_name` v
  `tag_name` varchar(128) NOT NULL COMMENT 'tag_name', `tag_type` varchar(20) NOT NULL COMMENT
  `tag_type` varchar(64) DEFAULT NULL COMMENT 'tag_type',
  `data_id` varchar(255) NOT NULL COMMENT 'data_id', `group_id` varchar(255) DEFAULT COMMENT
  `group_id` varchar(128) NOT NULL COMMENT 'group_id', `tenant_id` varchar(255) NOT NULL COMMENT
  `tenant_id` varchar(128) DEFAULT '' COMMENT 'tenant_id', `nid` bigint(128) NOT NULL COMMENT
  `nid` bigint(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`nid`),
  UNIQUE KEY `uk_configtagrelation_configidtag` (`id`,`tag_name`,`tag_type`),
  KEY `idx_tenant_id` (`tenant_id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_tag_relation';

 /******************************************/
 /* Full database name = nacos_config */
 /* Table name = group_capacity */
 /******************************************/
 CREATE TABLE `group_capacity` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key ID',
  `group_id` varchar(128) NOT NULL DEFAULT '' COMMENT 'Group ID, null character indicates entire cluster', `quota` int(10)
  `quota` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Quota, a 0 indicates that the default value is being used',
  `usage` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Usage',
  `max_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Individual configuration size limit in bytes, 0 means use the default',
  `max_aggr_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Maximum number of aggregate subconfigurations,, 0 means use default',, `max_aggr_count` int(10) unsigned NOT NULL DEFAULT '0'
  `max_aggr_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Maximum subconfiguration size in bytes for a single aggregated data,, 0 means use default',, `max_history_size` int(10) unsigned NOT NULL DEFAULT '0'
  `max_history_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Maximum number of change history counts',
  `gmt_create` datetime NOT NULL DEFAULT '2010-05-05 00:00:00' COMMENT 'Creation Time',
  `gmt_modified` datetime NOT NULL DEFAULT '2010-05-05 00:00:00' COMMENT 'Modified time',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_group_id` (`group_id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Cluster, Capacity Information Table by Group';

 /******************************************/
 /* Full database name = nacos_config */
 /* Table name = his_config_info */
 /******************************************/
 CREATE TABLE `his_config_info` (
  `id` bigint(64) unsigned NOT NULL, `nid` bigint(64) unsigned NOT NULL, `his_config_info
  `nid` bigint(20) unsigned NOT NULL AUTO_INCREMENT, `data_id` v
  `data_id` varchar(255) NOT NULL, `group_id` varchar(255) NOT NULL, `group_id` varchar(255) NOT NULL, `group_id` varchar(255) NOT NULL
  `group_id` varchar(128) NOT NULL, `app_name` varchar(255)
  `app_name` varchar(128) DEFAULT NULL COMMENT 'app_name',
  `content` longtext NOT NULL, `md5` varchar(128) DEFAULT NULL
  `md5` varchar(32) DEFAULT NULL, `gmt_create
  `gmt_create` datetime NOT NULL DEFAULT '2010-05-05 00:00:00',
  `gmt_modified` datetime NOT NULL DEFAULT '2010-05-05 00:00:00', `src_user` datetime NOT NULL
  `src_user` text, `src_ip` datetime NOT NULL
  `src_ip` varchar(20) DEFAULT NULL, `op_type` char(20) DEFAULT
  `op_type` char(10) DEFAULT NULL, `tenant_id` varchar(20)
  `tenant_id` varchar(128) DEFAULT '' COMMENT 'Tenant field',
  PRIMARY KEY (`nid`),
  KEY `idx_gmt_create` (`gmt_create`),
  KEY `idx_gmt_modified` (`gmt_modified`),
  KEY `idx_did` (`data_id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Multi-Tenant Transformation';


 /******************************************/
 /* Full database name = nacos_config */
 /* Table name = tenant_capacity */
 /******************************************/
 CREATE TABLE `tenant_capacity` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key ID', `tenant_id` v
  `tenant_id` varchar(128) NOT NULL DEFAULT '' COMMENT 'Tenant ID',
  `quota` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Quota, 0 means use the default value',
  `usage` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Usage',
  `max_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Individual configuration size limit in bytes, 0 means use the default',
  `max_aggr_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Maximum number of aggregated sub-configurations',
  `max_aggr_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Maximum subconfiguration size in bytes for a single aggregation data, 0 means use default',
  `max_history_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Maximum number of change history counts',
  `gmt_create` datetime NOT NULL DEFAULT '2010-05-05 00:00:00' COMMENT 'Creation time',
  `gmt_modified` datetime NOT NULL DEFAULT '2010-05-05 00:00:00' COMMENT 'Modified time',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_tenant_id` (`tenant_id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tenant capacity information table';


 CREATE TABLE `tenant_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `kp` varchar(128) NOT NULL COMMENT 'kp', `tenant_id` varchar(20) AUTO_INCREMENT COMMENT
  `tenant_id` varchar(128) default '' COMMENT 'tenant_id',
  `tenant_name` varchar(128) default '' COMMENT 'tenant_name',
  `tenant_desc` varchar(256) DEFAULT NULL COMMENT 'tenant_desc', `create_source` varchar(256)
  `create_source` varchar(32) DEFAULT NULL COMMENT 'create_source', `gmt_create` varchar(256) DEFAULT NULL COMMENT
  `gmt_create` bigint(20) NOT NULL COMMENT 'create_time', `gmt_modify` varchar(32) DEFAULT NULL COMMENT
  `gmt_modified` bigint(20) NOT NULL COMMENT 'modified_time', `gmt_modified` bigint(20) NOT NULL COMMENT
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_tenant_info_kptenantid` (`kp`,`tenant_id`),
  KEY `idx_tenant_id` (`tenant_id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='tenant_info';

 CREATE TABLE users (
  username varchar(50) NOT NULL PRIMARY KEY, password varchar(500) NOT NULL
  password varchar(500) NOT NULL,
  enabled boolean NOT NULL
 NULL, enabled boolean NOT NULL ); CREATE TABLE users

 CREATE TABLE roles (
  username varchar(50) NOT NULL, role varchar(50) NOT NULL, enabled boolean NOT NULL ); CREATE TABLE
  role varchar(50) NOT NULL
 ); INSERT INTO users (username varchar(50) NOT NULL, role varchar(50) NOT NULL ); CREATE TABLE

 INSERT INTO users (username, password, enabled) VALUES ('nacos', '$2a$10$EuWPZHzz32dJN7jexM34MOeYirDdFAZm2kuWj7VEOJhhZkDrxfvUu', TRUE);; CREATE TABLE roles ( username, role)

 INSERT INTO roles (username, role) VALUES ('nacos', 'ROLE_ADMIN');

 ```

 ```mysql
 -- the table to store GlobalSession data
 CREATE TABLE IF NOT EXISTS `global_table`
 (
    `xid` VARCHAR(128) NOT NULL, `transaction_id` BARCHAR(128)
    `transaction_id` BIGINT, `status` TINYL
    `status`                    TINYINT      NOT NULL,
    `application_id` VARCHAR(32), `transaction_service
    `transaction_service_group` VARCHAR(32),
    `transaction_name` VARCHAR(128),
    `timeout`                   INT,
    `begin_time`                BIGINT,
    `application_data` VARCHAR(2000), `gmt_create
    `gmt_create`                DATETIME,
    `gmt_modified`              DATETIME,
    PRIMARY KEY (`xid`),
    KEY `idx_gmt_modified_status` (`gmt_modified`, `status`),
    KEY `idx_transaction_id` (`transaction_id`)
 ) ENGINE = InnoDB
  DEFAULT CHARSET = utf8.

 -- the table to store BranchSession data
 CREATE TABLE IF NOT EXISTS `branch_table`
 (
    `branch_id` BIGINT NOT NULL, `xid` VARCHARGE
    `xid`               VARCHAR(128) NOT NULL,
    `transaction_id`    BIGINT,
    `resource_group_id` VARCHAR(32), `resource_id` VARCHAR(32), `transaction_id` BIGINT
    `resource_id`       VARCHAR(256),
    `branch_type` VARCHAR(8), `status` TINYINT
    `status`            TINYINT,
    `client_id` VARCHAR(64), `application_data` TINYINT, `client_id` VARCHAR(64), `application_data` TINYINT
    `application_data` VARCHAR(2000), `gmt_create
    `gmt_create`        DATETIME(6),
    `gmt_modified`      DATETIME(6),
    PRIMARY KEY (`branch_id`), `branch_id`, `idx_x
    KEY `idx_xid` (`xid`)
 ) ENGINE = InnoDB
  DEFAULT CHARSET = utf8; -- the table to store lock data.

 -- the table to store lock data
 CREATE TABLE IF NOT EXISTS `lock_table`
 (
    `row_key` VARCHAR(128) NOT NULL, `xid` VARCHAR(128) NOT NULL, -- the table to store lock data
    `xid`            VARCHAR(128),
    `transaction_id` BIGINT, `branch_id` BIGINT, `branch_id` BIGINT
    `branch_id` BIGINT NOT NULL, `resource_id` VARCHAR(128)
    `resource_id`    VARCHAR(256),
    `table_name`     VARCHAR(32),
    `pk` VARCHAR(36), `gmt_create` VARCHAR(256), `gmt_create
    `gmt_create` DATETIME, `gmt_modify` VARCHAR(256), `pk` VARCHAR(36), `gmt_create` DATETIME
    `gmt_modified`   DATETIME,
    PRIMARY KEY (`row_key`),
    KEY `idx_branch_id` (`branch_id`)
 ) ENGINE = InnoDB
  DEFAULT CHARSET = utf8.

 ```

3. Pull the nacos and seata mirrors and run them.

 ```shell
 docker run -d --name nacos -p 8848:8848 -e MODE=standalone -e MYSQL_MASTER_SERVICE_HOST=your mysql ip -e MYSQL_MASTER_SERVICE_DB_NAME=nacos -e MYSQL_MASTER_SERVICE_USER=root -e MYSQL_MASTER_SERVICE_PASSWORD=mysql password -e MYSQL_SLAVE_SERVICE_HOST=your mysql ip -e SPRING_DATASOURCE_PLATFORM=mysql PLATFORM=mysql -e MYSQL_DATABASE_NUM=1 nacos/nacos-server:latest
 ```

 ```shell
 docker run -d --name seata -p 8091:8091 -e SEATA_IP=the ip you want to specify -e SEATA_PORT=8091 seataio/seata-server:1.4.2
 ```

## Seata Configuration

1. Since there is no built-in vim in the seata container, we can directly cp the folder to the host and then cp it to go back.

```
docker cp container id:seata-server/resources The directory you want to place the folder in.
 ```

 2. Get the ip addresses of the two containers using the following code

 ```
docker inspect --format='{{.NetworkSettings.IPAddress}}' ID/NAMES
 ```

 3. nacos-config.txt is edited as follows

 ```
transport.type=TCP
transport.server=NIO
transport.heartbeat=true
transport.enableClientBatchSendRequest=false
transport.threadFactory.bossThreadPrefix=NettyBoss
transport.threadFactory.workerThreadPrefix=NettyServerNIOWorker
transport.threadFactory.serverExecutorThreadPrefix=NettyServerBizHandler
transport.threadFactory.shareBossWorker=false
transport.threadFactory.clientSelectorThreadPrefix=NettyClientSelector
transport.threadFactory.clientSelectorThreadSize=1
transport.threadFactory.clientWorkerThreadPrefix=NettyClientWorkerThread
transport.threadFactory.bossThreadSize=1
transport.threadFactory.workerThreadSize=default
transport.shutdown.wait=3
service.vgroupMapping.Your transaction group name=default
service.default.grouplist=127.0.0.1:8091
service.enableDegrade=false
service.disableGlobalTransaction=false
client.rm.asyncCommitBufferLimit=10000
client.rm.lock.retryInterval=10
client.rm.lock.retryTimes=30
client.rm.lock.retryPolicyBranchRollbackOnConflict=true
client.rm.reportRetryCount=5
client.rm.tableMetaCheckEnable=false
client.rm.tableMetaCheckerInterval=60000
client.rm.sqlParserType=druid
client.rm.reportSuccessEnable=false
client.rm.sagaBranchRegisterEnable=false
client.rm.commitRetryCount=5
client.tm.rollbackRetryCount=5
client.tm.defaultGlobalTransactionTimeout=60000
client.tm.degradeCheck=false
client.tm.degradeCheckAllowTimes=10
client.tm.degradeCheckPeriod=2000
store.mode=file
store.publicKey=
store.file.dir=file_store/data
store.file.maxBranchSessionSize=16384
store.file.maxGlobalSessionSize=512
store.file.fileWriteBufferCacheSize=16384
store.file.flushDiskMode=async
store.file.sessionReloadReadSize=100
store.db.datasource=druid
store.db.dbType=mysql
store.db.driverClassName=com.mysql.jdbc.
store.db.url=jdbc:mysql://your mysql host ip:3306/seata?useUnicode=true&rewriteBatchedStatements=true
store.db.user=mysql account
store.db.password=mysql password
store.db.minConn=5
store.db.maxConn=30
store.db.globalTable=global_table
store.db.branchTable=branch_table
store.db.queryLimit=100
store.db.lockTable=lock_table
store.db.maxWait=5000
server.recovery.committingRetryPeriod=1000
server.recovery.asynCommittingRetryPeriod=1000
server.recovery.rollbackingRetryPeriod=1000
server.recovery.timeoutRetryPeriod=1000
server.maxCommitRetryTimeout=-1
server.maxRollbackRetryTimeout=-1
server.rollbackRetryTimeoutUnlockEnable=false
client.undo.dataValidation=true
client.undo.logSerialisation=jackson
client.undo.onlyCareUpdateColumns=true
server.undo.logSaveDays=7
server.undo.logDeletePeriod=86400000
client.undo.logTable=undo_log
client.undo.compress.enable=true
client.undo.compress.type=zip
client.undo.compress.threshold=64k
log.exceptionRate=100
transport.serialisation=seata
transport.compressor=none
metrics.enabled=false
metrics.registryType=compact
metrics.exporterList=prometheus
metrics.exporterPrometheusPort=9898
 ```

 Click [here](/docs/user/configurations/) for detailed parameter configurations.

 4. registry.conf is edited as follows

 ```
registry {
# file, nacos, eureka, redis, zk, consul, etcd3, sofa
type = "nacos"

nacos {
serverAddr = "nacos container ip:8848"
namespace = ""
cluster = "default"
}
}

config {
# file, nacos, apollo, zk, consul, etcd3
type = "nacos"

nacos {
serverAddr = "nacos container ip:8848"
namespace = ""
}
}
 ```

 5. After the configuration is complete, use the following command to copy the modified registry.conf to the container, and reboot to view the logs running

 ```shell
 docker cp /home/seata/resources/registry.conf seata:seata-server/resources/
 docker restart seata
 docker logs -f seata
 ```

 6. Run nacos-config.sh to import the Nacos configuration.

 eg: sh $\{SEATAPATH}/script/config-center/nacos/nacos-config.sh -h localhost -p 8848 -g SEATA_GROUP -t 5a3c7d6c-f497-4d68-a71a-2e5e3340b3ca - u username -w password u username -w password

 Refer to [Configuration Import Instructions](https://github.com/apache/incubator-seata/blob/1.4.2/script/config-center/README.md) for specific parameter definitions.

 7. Log in to the nacos control centre to see

 ! [20191202205912](/img/blog/20191202205912.png)

 As shown in the picture is successful.

 # Debugging

 1. Pull the project shown in the blog post and modify the application.yml and registry.conf of test-service.

 ```
registry {
type = "nacos"
nacos {
serverAddr = "host ip:8848"
namespace = ""
cluster = "default"
}
}
config {
type = "nacos"
nacos {
serverAddr = "host ip:8848"
namespace = ""
cluster = "default"
}
}

 ```

 ```
server.
port: 38888
spring.
name: test-service
name: test-service
datasource: type: com.alibaba.druid.pool.
type: com.alibaba.druid.pool.
url: jdbc:mysql://mysqlip:3306/test?useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC
driver-class-name: com.mysql.cj.jdbc.
driver-class-name: com.mysql.cj.jdbc.
driver-class-name: com.mysql.cj.jdbc.driver username: root
driver-class-name: com mysql.cj.jdbc.
driver-class-name: com mysql.cj.jdbc.
threadpool: cached
scan.
base-packages: com.example
application: qos-enable: false
qos-enable: false
name: testserver
registry: id: my-registry
id: my-registry
address: nacos://host ip:8848
mybatis-plus.
mapper-locations: classpath:/mapper/*Mapper.xml
typeAliasesPackage: org.test.entity
global-config.
db-config.
field-strategy: not-empty
db-config: field-strategy: not-empty
db-type: mysql
configuration: map-underscore-to-camel-case: true
map-underscore-to-camel-case: true
cache-enabled: true
log-impl: org.apache.ibatis.logging.stdout.
auto-mapping-unknown-column-behavior: none
 ```

 2. Copy the modified registry.conf to test-client-resources, and modify the application

 ```
spring: application.
application: name: test
name: test
datasource: driver-class-name: com.mysql.
driver-class-name: com.mysql.cj.jdbc.
url: jdbc:mysql://mysqlIp:3306/test?userSSL=true&useUnicode=true&characterEncoding=UTF8&serverTimezone=Asia/Shanghai
username: root
password: 123456
mvc.
servlet.
load-on-startup: 1
http.
http: http: encoding: http: encoding: http: force: true
force: true
charset: utf-8
enabled: true
multipart: max-file-size: 10MB
max-file-size: 10MB
max-request-size: 10MB
dubbo.
dubbo: registry: id: my-registry
id: my-registry
address: nacos://host ip:8848
application.
name: dubbo-demo-client
qos-enable: false
server: name: dubbo-demo-client qos-enable: false
port: 28888
max-http-header-size: 8192
address: 0.0.0.0
tomcat: max-http-post-size: 104857600
max-http-post-size: 104857600
 ```

 4. Execute the undo_log script on each db involved.

 ```sql
 CREATE TABLE IF NOT EXISTS `undo_log`
 (
    `branch_id` BIGINT NOT NULL COMMENT 'branch transaction id', `xid` VARCHARCHARCHARCHARCHARCHARCHARCHARCHARGE
    `xid` VARCHAR(128) NOT NULL COMMENT 'global transaction id', `context` VARCHAR(128) NOT NULL COMMENT
    `context` VARCHAR(128) NOT NULL COMMENT 'undo_log context,such as serialisation', `rollback_info` VARCHAR(128) NOT NULL COMMENT
    `rollback_info` LONGBLOB NOT NULL COMMENT 'rollback info', `log_status` INTRODUCTION
    `log_status` INT(11) NOT NULL COMMENT '0:normal status,1:defence status', `log_created` DAT
    `log_created` DATETIME(6) NOT NULL COMMENT 'creation datetime', `log_modified` DATETIME(6) NOT NULL COMMENT
    `log_modified` DATETIME(6) NOT NULL COMMENT 'modify datetime', `log_modified` DATETIME(6) NOT NULL COMMENT
    UNIQUE KEY `ux_undo_log` (`xid`, `branch_id`)
 ) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8 COMMENT ='AT transaction mode undo table';
 ```

 5. Run test-service,test-client in that order.

 6. See if the list of services in nacos is as shown below.

 ! [20191203132351](/img/blog/20191203132351.png)

 # Summary

 The docker deployment of nacos and seata has been completed, for more details I would like you to visit the following address to read the detailed documentation

 [nacos official website](https://nacos.io/zh-cn/index.html)

 [dubbo official website](http://dubbo.apache.org/en-us/)

 [seata website](https://seata.apache.org/zh-cn/)

 [docker official website](https://www.docker.com/)
