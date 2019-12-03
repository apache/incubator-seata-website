---
title: Docker部署Seata与Nacos整合
keywords: Seata,Nacos,分布式事务
description: 本文讲述如何使用Seata整合Nacos配置的Docker部署
author: FUNKYE
date: 2019/12/03
---

# Docker部署Seata与Nacos整合

运行所使用的demo[项目地址](https://gitee.com/itCjb/springboot-dubbo-mybatisplus-seata )

本文作者：FUNKYE(陈健斌),杭州某互联网公司主程。

# 前言

直连方式的Seata配置[博客](http://seata.io/zh-cn/blog/springboot-dubbo-mybatisplus-seata.html)

Seata整合Nacos配置[博客](http://seata.io/zh-cn/blog/seata-nacos-analysis.html)

我们接着前几篇篇的基础上去配置nacos做配置中心跟dubbo注册中心.

## 准备工作

​	1.安装docker

```shell
yum -y install docker
```

​	2.拉取nacos以及seata镜像并运行

```shell
docker run -d --name nacos -p 8848:8848 -e MODE=standalone -e MYSQL_MASTER_SERVICE_HOST=你的mysql所在ip -e MYSQL_MASTER_SERVICE_DB_NAME=nacos -e MYSQL_MASTER_SERVICE_USER=root -e MYSQL_MASTER_SERVICE_PASSWORD=mysql密码 -e MYSQL_SLAVE_SERVICE_HOST=你的mysql所在ip -e SPRING_DATASOURCE_PLATFORM=mysql -e MYSQL_DATABASE_NUM=1 nacos/nacos-server:latest
```

```shell
docker run -d --name seata -p 8091:8091 -e SEATA_IP=你想指定的ip -e SEATA_PORT=8091 seataio/seata-server:latest
```

## Seata配置

​	1.由于seata容器内没有内置vim,我们可以直接将要文件夹cp到宿主机外来编辑好了,再cp回去

```
docker cp 容器id:seata-server/resources 你想放置的目录
```

​	2.使用如下代码获取两个容器的ip地址

```
docker inspect --format='{{.NetworkSettings.IPAddress}}' ID/NAMES
```

​	3.nacos-config.txt编辑为如下内容

```
transport.type=TCP
transport.server=NIO
transport.heartbeat=true
transport.thread-factory.boss-thread-prefix=NettyBoss
transport.thread-factory.worker-thread-prefix=NettyServerNIOWorker
transport.thread-factory.server-executor-thread-prefix=NettyServerBizHandler
transport.thread-factory.share-boss-worker=false
transport.thread-factory.client-selector-thread-prefix=NettyClientSelector
transport.thread-factory.client-selector-thread-size=1
transport.thread-factory.client-worker-thread-prefix=NettyClientWorkerThread
transport.thread-factory.boss-thread-size=1
transport.thread-factory.worker-thread-size=8
transport.shutdown.wait=3
service.vgroup_mapping.你的事务组名=default
service.enableDegrade=false
service.disable=false
client.rm.async.commit.buffer.limit=10000
client.rm.lock.retry.internal=10
client.rm.lock.retry.times=30
client.rm.report.retry.count=5
client.rm.lock.retry.policy.branch-rollback-on-conflict=true
client.rm.table.meta.check.enable=true
client.rm.report.success.enable=true
client.tm.commit.retry.count=5
client.tm.rollback.retry.count=5
store.mode=file
store.file.dir=file_store/data
store.file.max-branch-session-size=16384
store.file.max-global-session-size=512
store.file.file-write-buffer-cache-size=16384
store.file.flush-disk-mode=async
store.file.session.reload.read_size=100
store.db.datasource=dbcp
store.db.db-type=mysql
store.db.driver-class-name=com.mysql.jdbc.Driver
store.db.url=jdbc:mysql://你的mysql所在ip:3306/seata?useUnicode=true
store.db.user=mysql帐号
store.db.password=mysql密码
store.db.min-conn=1
store.db.max-conn=3
store.db.global.table=global_table
store.db.branch.table=branch_table
store.db.query-limit=100
store.db.lock-table=lock_table
server.recovery.committing-retry-period=1000
server.recovery.asyn-committing-retry-period=1000
server.recovery.rollbacking-retry-period=1000
server.recovery.timeout-retry-period=1000
server.max.commit.retry.timeout=-1
server.max.rollback.retry.timeout=-1
client.undo.data.validation=true
client.undo.log.serialization=jackson
server.undo.log.save.days=7
server.undo.log.delete.period=86400000
client.undo.log.table=undo_log
transport.serialization=seata
transport.compressor=none
metrics.enabled=false
metrics.registry-type=compact
metrics.exporter-list=prometheus
metrics.exporter-prometheus-port=9898
client.support.spring.datasource.autoproxy=false
```

详细参数配置请点[此处](http://seata.io/zh-cn/docs/user/configurations.html)

​	4.registry.conf编辑为如下内容

```
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "nacos"

  nacos {
    serverAddr = "nacos容器ip:8848"
    namespace = ""
    cluster = "default"
  }
  eureka {
    serviceUrl = "http://localhost:8761/eureka"
    application = "default"
    weight = "1"
  }
  redis {
    serverAddr = "localhost:6379"
    db = "0"
  }
  zk {
    cluster = "default"
    serverAddr = "127.0.0.1:2181"
    session.timeout = 6000
    connect.timeout = 2000
  }
  consul {
    cluster = "default"
    serverAddr = "127.0.0.1:8500"
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
  type = "nacos"

  nacos {
    serverAddr = "nacos容器ip:8848"
    namespace = ""
  }
  consul {
    serverAddr = "127.0.0.1:8500"
  }
  apollo {
    app.id = "seata-server"
    apollo.meta = "http://192.168.1.204:8801"
  }
  zk {
    serverAddr = "127.0.0.1:2181"
    session.timeout = 6000
    connect.timeout = 2000
  }
  etcd3 {
    serverAddr = "http://localhost:2379"
  }
  file {
    name = "file.conf"
  }
}
```

​	5.配置完成后使用如下命令,把修改完成的registry.conf复制到容器中,并重启查看日志运行

```shell
docker cp /home/seata/resources/registry.conf seata:seata-server/resources/
docker restart seata
docker logs -f seata
```

​	6.修改nacos-config.sh

```
for line in $(cat nacos-config.txt)

do

key=${line%%=*}
value=${line#*=}
echo "\r\n set "${key}" = "${value}

result=`curl -X POST "http://nacos容器的ip:8848/nacos/v1/cs/configs?dataId=$key&group=SEATA_GROUP&content=$value"`

if [ "$result"x == "true"x ]; then

  echo "\033[42;37m $result \033[0m"

else

  echo "\033[41;37 $result \033[0m"
  let error++

fi

done


if [ $error -eq 0 ]; then

echo  "\r\n\033[42;37m init nacos config finished, please start seata-server. \033[0m"

else

echo  "\r\n\033[41;33m init nacos config fail. \033[0m"

fi
```

​	7.运行nacos-config.sh将配置上传的nacos中,登录nacos控制中心查看

![20191202205912](/img/blog/20191202205912.png)

​	如图所示便是成功了.

# 进行调试

​	1.拉取博文中所示的项目,修改test-service的application.yml与registry.conf

```
registry {
  type = "nacos"
  file {
    name = "file.conf"
  }
  nacos {
    serverAddr = "宿主机ip:8848"
    namespace = ""
    cluster = "default"
  }
}
config {
  type = "nacos"
  file {
    name = "file.conf"
  }
  zk {
    serverAddr = "127.0.0.1:2181"
    session.timeout = 6000
    connect.timeout = 2000
  }
  nacos {
    serverAddr = "宿主机ip:8848"
    namespace = ""
    cluster = "default"
  }
}

```

```
server:
  port: 38888
spring:
  application: 
      name: test-service
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    url: jdbc:mysql://mysqlip:3306/test?useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: 123456
dubbo:
  protocol:
    threadpool: cached
  scan:
    base-packages: com.example
  application:
    qos-enable: false
    name: testserver
  registry:
    id: my-registry
    address:  nacos://宿主机ip:8848
mybatis-plus:
  mapper-locations: classpath:/mapper/*Mapper.xml
  typeAliasesPackage: org.test.entity
  global-config:
    db-config:
      field-strategy: not-empty
      id-type: auto
      db-type: mysql
  configuration:
    map-underscore-to-camel-case: true
    cache-enabled: true
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    auto-mapping-unknown-column-behavior: none
```

​	2.把修改完成的registry.conf复制到test-client-resources中,并修改application

```
spring:
  application:
     name: test
  datasource:
     driver-class-name: com.mysql.cj.jdbc.Driver
     url: jdbc:mysql://mysqlIp:3306/test?userSSL=true&useUnicode=true&characterEncoding=UTF8&serverTimezone=Asia/Shanghai
     username: root
     password: 123456
  mvc:
    servlet:
      load-on-startup: 1
  http:
    encoding:
            force: true
            charset: utf-8
            enabled: true
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB
dubbo:
  registry:
    id: my-registry
    address:  nacos://宿主机ip:8848
  application:
    name: dubbo-demo-client
    qos-enable: false
server:
  port: 28888
  max-http-header-size: 8192
  address: 0.0.0.0
  tomcat:
    max-http-post-size: 104857600
```

​	4.依次运行test-service,test-client.

​	5.查看nacos中服务列表是否如下图所示

![20191203132351](/img/blog/20191203132351.png)

# 总结

关于nacos与seata的docker部署已经完成了,更详细的内容希望希望大家访问以下地址阅读详细文档

[nacos官网](https://nacos.io/zh-cn/index.html)

[dubbo官网](http://dubbo.apache.org/en-us/)

[seata官网](http://seata.io/zh-cn/)

[docker官网](https://www.docker.com/)