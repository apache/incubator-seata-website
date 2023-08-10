---
title: 事务分组与高可用
keywords: [Seata 事务分组]
description: Seata 事务分组与高可用的最佳实践
---

# 事务分组与高可用

## 最佳实践1：TC的异地多机房容灾

- 假定TC集群部署在两个机房：guangzhou机房（主）和shanghai机房（备）各两个实例
- 一整套微服务架构项目：projectA
- projectA内有微服务：serviceA、serviceB、serviceC 和 serviceD

其中，projectA所有微服务的事务分组tx-service-group设置为：projectA，projectA正常情况下使用guangzhou的TC集群（主）

那么正常情况下，client端的配置如下所示：

```
seata.tx-service-group=projectA
seata.service.vgroup-mapping.projectA=Guangzhou
```

![异地多机房容灾正常图](/img/txgroup/txgroup-normal.png)

假如此时guangzhou集群分组整个down掉，或者因为网络原因projectA暂时无法与Guangzhou机房通讯，那么我们将配置中心中的Guangzhou集群分组改为Shanghai，如下：

```
seata.service.vgroup-mapping.projectA=Shanghai
```

并推送到各个微服务，便完成了对整个projectA项目的TC集群动态切换。

![异地多机房容灾备用集群](/img/txgroup/txgroup-switch-to-sh.png)

## 最佳实践2：单一环境多应用接入

- 假设现在开发环境（或预发/生产）中存在一整套seata集群
- seata集群要服务于不同的微服务架构项目projectA、projectB、projectC
- projectA、projectB、projectC之间相对独立

我们将seata集群中的六个实例两两分组，使其分别服务于projectA、projectB与projectC，那么此时seata-server端的配置如下（以nacos注册中心为例）：

```
registry {
  type = "nacos"
  loadBalance = "RandomLoadBalance"
  loadBalanceVirtualNodes = 10

  nacos {
    application = "seata-server"
    serverAddr = "127.0.0.1:8848"
    group = "DEFAULT_GROUP"
    namespace = "8f11aeb1-5042-461b-b88b-d47a7f7e01c0"
    #同理在其他几个分组seata-server实例配置 project-b-group / project-c-group
    cluster = "project-a-group"
    username = "username"
    password = "password"
  }
}
```

client端的配置如下：

```
seata.tx-service-group=projectA
#同理，projectB与projectC配置 project-b-group / project-c-group
seata.service.vgroup-mapping.projectA=project-a-group
```

完成配置启动后，对应事务分组的TC单独为其应用服务，整体部署图如下：

![单环境多应用接入](/img/txgroup/txgroup-multiApplication.png)


## 最佳实践3：client的精细化控制

- 假定现在存在seata集群，Guangzhou机房实例运行在性能较高的机器上，Shanghai集群运行在性能较差的机器上
- 现存微服务架构项目projectA、projectA中有微服务ServiceA、ServiceB、ServiceC与ServiceD
- 其中ServiceD的流量较小，其余微服务流量较大

那么此时，我们可以将ServiceD微服务引流到Shanghai集群中去，将高性能的服务器让给其余流量较大的微服务（反之亦然，若存在某一个微服务流量特别大，我们也可以单独为此微服务开辟一个更高性能的集群，并将该client的virtual group指向该集群，其最终目的都是保证在流量洪峰时服务的可用）

![client精细化控制](/img/txgroup/txgroup-client-controll.png)


## 最佳实践4：Seata的预发与生产隔离

- 大多数情况下，预发环境与生产环境会使用同一套数据库。基于这个条件，预发TC集群与生产TC集群必须使用同一个数据库保证全局事务的生效（即生产TC集群与预发TC集群使用同一个lock表，并使用不同的branch_table与global_table的情况）
- 我们记生产使用的branch表与global表分别为：global_table与branch_table；预发为global_table_pre，branch_table_pre
- 预发与生产共用lock_table

此时，seata-server的 file.conf 配置如下

```
store {
  mode = "db"

  db {
    datasource = "druid"
    dbType = "mysql"
    driverClassName = "com.mysql.jdbc.Driver"
    url = "jdbc:mysql://127.0.0.1:3306/seata"
    user = "username"
    password = "password"
    minConn = 5
    maxConn = 100
    globalTable = "global_table"  ----> 预发为 "global_table_pre"
    branchTable = "branch_table"  ----> 预发为 "branch_table_pre"
    lockTable = "lock_table"
    queryLimit = 100
    maxWait = 5000
  }
}
```

seata-server的 registry.conf 配置如下（以nacos为例）

```
registry {
  type = "nacos"
  loadBalance = "RandomLoadBalance"
  loadBalanceVirtualNodes = 10

  nacos {
    application = "seata-server"
    serverAddr = "127.0.0.1:8848"
    group = "DEFAULT_GROUP"
    namespace = "8f11aeb1-5042-461b-b88b-d47a7f7e01c0"
    cluster = "pre-product"  -->同理生产为 "product"
    username = "username"
    password = "password"
  }
}
```

其部署图如下所示：

![预发生产隔离](/img/txgroup/txgroup-segregation-of-pre-and-product.png)

不仅如此，你还可以将以上四个最佳实践依据你的实际生产情况组合搭配使用。