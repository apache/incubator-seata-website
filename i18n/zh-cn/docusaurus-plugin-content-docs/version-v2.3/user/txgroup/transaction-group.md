---
title: 事务分组介绍
keywords: [Seata]
description: Seata 事务分组。
---

# 事务分组专题

### 事务分组是什么？
- 事务分组：seata的资源逻辑，可以按微服务的需要，在应用程序（客户端）对自行定义事务分组，每组取一个名字。
- 集群：seata-server服务端一个或多个节点组成的集群cluster。 应用程序（客户端）使用时需要指定事务逻辑分组与Seata服务端集群的映射关系。
### 事务分组如何找到后端Seata集群？
1. 首先应用程序（客户端）中配置了事务分组（GlobalTransactionScanner 构造方法的txServiceGroup参数）。若应用程序是SpringBoot则通过seata.tx-service-group 配置
2. 应用程序（客户端）会通过用户配置的配置中心去寻找service.vgroupMapping
.[*事务分组配置项*]，取得配置项的值就是TC集群的名称。若应用程序是SpringBoot则通过seata.service.vgroup-mapping.事务分组名=集群名称 配置
3. 拿到集群名称程序通过一定的前后缀+集群名称去构造服务名，各配置中心的服务名实现不同（前提是Seata-Server已经完成服务注册，且Seata-Server向注册中心报告cluster名与应用程序（客户端）配置的集群名称一致）
4. 拿到服务名去相应的注册中心去拉取相应服务名的服务列表，获得后端真实的TC服务列表（即Seata-Server集群节点列表）

### 为什么这么设计，不直接取服务名？
这里多了一层获取事务分组到映射集群的配置。这样设计后，事务分组可以作为资源的逻辑隔离单位，出现某集群故障时可以快速failover，只切换对应分组，可以把故障缩减到服务级别，但前提也是你有足够server集群。

## 事务分组使用案例
seata注册、配置中心类型分为两大类：
- 内置File
- 第三方注册（配置）中心。如nacos等等，注册中心和配置中心之间没有约束，可各自使用不同具体选型。

### 第一类：内置File
#### Seata Server端
registry.conf
```
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "file"                ---------------> 使用file作为注册中心
}
config {
  # file、nacos 、apollo、zk、consul、etcd3
  type = "file"                ---------------> 使用file作为配置中心
  file {
    name = "file.conf"
  }
}
```
- file、db模式启动Seata Server，见文章上方节点：启动Seata Server
#### Client端
registry.conf
```
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "file"                ---------------> 使用file作为注册中心
}
config {
  # file、nacos 、apollo、zk、consul、etcd3
  type = "file"                ---------------> 使用file作为配置中心
  file {
    name = "file.conf"         ---------------> 配置参数存储文件
  }
}
```
file.conf
```
    service {
      vgroupMapping.my_test_tx_group = "default"
      default.grouplist = "127.0.0.1:8091"
    }
```
application.properties
```
seata.tx-service-group=my_test_tx_group ---------------> 事务分组配置（在v1.5之后默认值为default_tx_group）
```
- 读取配置
 通过FileConfiguration本地加载file.conf的配置参数
- 获取事务分组(服务启动时加载配置)
 spring/springboot可配置在yml、properties中，对应值"my_test_tx_group"即为事务分组名，若不配置则默认以：spring.application.name值+"-seata-service-group"拼接后的字符串作为分组名
- 查找TC集群名
 拿到事务分组名"my_test_tx_group"拼接成"service.vgroupMapping.my_test_tx_group"查找TC集群名clusterName为"default"
- 查询TC服务
 拼接"service."+clusterName+".grouplist"找到真实TC服务地址127.0.0.1:8091

----
### 第二类：注册中心和配置中心(以nacos为例)
#### Seata Server端
registry.conf
```
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "nacos"                  ---------------> 使用nacos作为注册中心
  nacos {
    application = "seata-server"  ---------------> 指定注册至nacos注册中心的服务名
    group = "SEATA_GROUP"         ---------------> 指定注册至nacos注册中心的分组名
    serverAddr = "localhost"      ---------------> nacos注册中心IP:端口
    namespace = ""                ---------------> nacos命名空间id，""为nacos保留public空间控件，用户勿配置namespace = "public"
    cluster = "default"           ---------------> 指定注册至nacos注册中心的集群名
  }
}
config {
  # file、nacos 、apollo、zk、consul、etcd3
  type = "nacos"                  ------------> 使用nacos作为配置中心
  nacos {
    serverAddr = "localhost"      ---------------> nacos注册中心IP:端口
    namespace = ""
    group = "SEATA_GROUP"         ---------------> nacos配置中心的分组名
    dataId = "seataServer.properties"  ---------------> nacos配置中心的配置ID
  }
}

```
- 配置中心配置项


  在Seata Server的安装目录conf下`README-zh.md`或`README.md`文件中介绍了Seata需要的常见脚本URL链接，包括三类：客户端的配置和SQL、SeataServer端部署所需SQL和脚本、配置中心配置项模板和脚本。
  其中在script/config-center下有文件和目录如下:
     - README.md     使用帮助
     - config.txt    配置项模板（包含Server和Client）
     - nacos/        推至nacos的python和shell脚本 
     - apollo/       推至apollo的shell脚本
     - consul/       推至consul的shell脚本
     - etcd3/        推至etcd3的shell脚本
     - zk/           推至zookeeper的shell脚本
  
  config.txt模板中的配置项，需要根据实际情况筛选和修改。
  然后配置到配置中心：即可参照README.md使用帮助通过脚本推送至配置中心。也将config.txt中的内容人工拷贝至配置中心（例如通过nacos配置中心的Web页面）。  配置完毕后需要检查结果是否正确。

- 注册至注册中心
 启动seata-server注册至nacos注册中心，查看nacos控制台服务列表确认是否成功  

#### Client端
```
seata.tx-service-group=my_test_tx_group ---------------> 事务分组配置（在v1.5之后默认值为default_tx_group）
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "nacos"                ---------------> 从nacos获取TC服务
  nacos {
    serverAddr = "localhost"
    namespace = ""
  }
}
config {
  # file、nacos 、apollo、zk、consul、etcd3
  type = "nacos"                ---------------> 使用nacos作为配置中心
  nacos {
    serverAddr = "localhost"
    namespace = ""
  }
}
```

#### Client端(SpringBoot)
application.properties
```
seata.tx-service-group=my_test_tx_group ---------------> 事务分组配置（在v1.5之后默认值为default_tx_group）
seata.service.vgroup-mapping.my_test_tx_group=default  ---------------> 指定事务分组至集群映射关系（等号右侧的集群名需要与Seata-server注册到Nacos的cluster保持一致）
seata.registry.type=nacos      ---------------> 使用nacos作为注册中心
seata.registry.nacos.server-addr=nacos注册中心IP:端口
seata.registry.nacos.application=seata-server     ---------------> Seata服务名（应与seata-server实际注册的服务名一致）
seata.registry.nacos.group=SEATA_GROUP            ---------------> Seata分组名（应与seata-server实际注册的分组名一致）
```
> 另外：若Client不通过Nacos获取seata-server服务信息，而是直接指定seata-server服务端节点的IP和端口信息，则可将以上application.properties中涉及nacos几个配置改为如两个配置：
> 
> seata.registry.type=file       ----> 不推荐在正式环境使用
> 
> seata.service.grouplist.cluster_beijing=127.0.0.1:8091    ----> vgroup-mapping（服务端cluster）各个seata-server节点信息



- 读取配置
 通过NacosConfiguration远程读取seata配置参数
- 获取事务分组(服务启动时加载配置)
 spring/springboot可配置在yml、properties中，对应值"my_test_tx_group"即为事务分组名，若不配置则默认以：spring.application.name值+"-seata-service-group"拼接后的字符串作为分组名
- 查找TC集群名
 拿到事务分组名"my_test_tx_group"拼接成"service.vgroupMapping.my_test_tx_group"从配置中心查找到TC集群名clusterName为"default"
- 查找TC服务
 根据serverAddr和namespace以及clusterName在注册中心找到真实TC服务列表

注：serverAddr和namespace与Server端一致，clusterName与Server端cluster一致
