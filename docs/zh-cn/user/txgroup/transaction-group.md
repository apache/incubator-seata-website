---
title: Seata 事务分组
keywords: Seata
description: Seata 事务分组。
---

# 事务分组专题

### 事务分组是什么？
- 事务分组：seata的资源逻辑，可以按微服务的需要对事务进行逻辑上分组，每组取一个名字。可以在应用程序（客户端）中通过属性tx-service-group定义事务分组。
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
seata注册、配置中心分为两大类：
- 内置file
- 第三方注册（配置）中心。如nacos等等，注册中心和配置中心之间没有约束，可各自使用不同类型。

### 第一类：file注册中心和配置中心
#### Server端
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
- file、db模式启动server，见文章上方节点：启动Server
#### Client端
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
seata.tx-service-group=my_test_tx_group ---------------> 事务分组配置
file.conf: 
    service {
      vgroupMapping.my_test_tx_group = "default"
      default.grouplist = "127.0.0.1:8091"
    }
```
- 读取配置
> 通过FileConfiguration本地加载file.conf的配置参数
- 获取事务分组
> spring配置，springboot可配置在yml、properties中，服务启动时加载配置，对应的值"my_test_tx_group"即为一个事务分组名，若不配置，默认获取属性spring.application.name的值+"-seata-service-group"  
- 查找TC集群名
> 拿到事务分组名"my_test_tx_group"拼接成"service.vgroupMapping.my_test_tx_group"查找TC集群名clusterName为"default"
- 查询TC服务
> 拼接"service."+clusterName+".grouplist"找到真实TC服务地址127.0.0.1:8091


### 第二类：注册中心和配置中心(以nacos为例)
#### Server端
```
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "nacos"                ---------------> 使用nacos作为注册中心
  nacos {
    serverAddr = "localhost"    ---------------> nacos注册中心所在ip
    namespace = ""              ---------------> nacos命名空间id，""为nacos保留public空间控件，用户勿配置namespace = "public"
    cluster = "default"         ---------------> seata-server在nacos的集群名
  }
}
config {
  # file、nacos 、apollo、zk、consul、etcd3
  type = "nacos"                ---------------> 使用nacos作为配置中心
  nacos {
    serverAddr = "localhost"
    namespace = ""
    cluster = "default"
  }
}

```
- 脚本
> script-->config-center下的3个文件nacos-config.py、nacos-config.sh、config.txt  
txt为参数明细（包含Server和Client），sh为linux脚本，windows可下载git来操作，py为python脚本。  
- 导入配置
> 用命令执行脚本导入seata配置参数至nacos，在nacos控制台查看配置确认是否成功  
- 注册TC
> 启动seata-server注册至nacos，查看nacos控制台服务列表确认是否成功  

#### Client端
```
spring.cloud.alibaba.seata.tx-service-group=my_test_tx_group ---------------> 事务分组配置
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
```
spring.cloud.alibaba.seata.tx-service-group=my_test_tx_group ---------------> 事务分组配置
seata.service.vgroup-mapping.my_test_tx_group=cluster_beijing  ---------------> 指定事务分组至集群映射关系（等号右侧的集群名需要与Seata服务端配置的cluster保持一致）

# 设置vgroup-mapping（即服务端的cluster）中各个seata-server服务端节点的IP和端口信息
# 仅在客户端（微服务）配置的seata.registry.type=file才需要使用，不推荐在正式环境使用file类型
# seata.registry.type=nacos或其他类型时（微服务客户端和seata-server服务端应同时指定为nacos），则无需此参数
seata.registry.type=file
seata.service.grouplist.cluster_beijing=127.0.0.1:8091
```


- 读取配置
> 通过NacosConfiguration远程读取seata配置参数
- 获取事务分组
> springboot可配置在yml、properties中，服务启动时加载配置，对应的值"my_test_tx_group"即为一个事务分组名，若不配置，默认获取属性spring.application.name的值+"-seata-service-group"
- 查找TC集群名
> 拿到事务分组名"my_test_tx_group"拼接成"service.vgroupMapping.my_test_tx_group"从配置中心查找到TC集群名clusterName为"default"
- 查找TC服务
> 根据serverAddr和namespace以及clusterName在注册中心找到真实TC服务列表

注：serverAddr和namespace与Server端一致，clusterName与Server端cluster一致
