# 部署指南
## Seata新手部署指南(1.0版本)
Seata分TC、TM和RM三个角色，TC（Server端）为单独服务端部署，TM和RM（Client端）由业务系统集成。
### 启动Server
Server端存储模式（store.mode）现有file、db两种（后续将引入raft），file模式无需改动，直接启动即可，下面专门讲下db启动步骤。  
注：file模式为单机模式，全局事务会话信息内存中读写并持久化本地文件root.data，性能较高;  
    db模式为高可用模式，全局事务会话信息通过db共享，相应性能差些。
#### 步骤一：启动包
a.https://github.com/seata/seata/releases 下载  
b.官方钉钉群（群号：23171167），qq群（群号：254657148）群文件共享下载  
c.其它途径

#### 步骤二：建表
全局事务会话信息由3块内容构成，全局事务-->分支事务-->全局锁，对应表global_table、branch_table、lock_table，  
mysql建表脚本存放于module seata-server-->resources-->db_store.sql  
oracle脚本（可参考 https://github.com/seata/seata/pull/1640 ）暂未合并。

#### 步骤三：修改store.mode
打开seata-server-->resources-->file.conf，修改store.mode="db";也可以在启动时加命令参数-m db指定。

#### 步骤四：修改数据库连接
打开seata-server-->resources-->file.conf，修改store.db相关属性

#### 步骤五：启动
a.源码启动: 执行Server.java的main方法  
b.命令启动: seata-server.sh -h 127.0.0.1 -p 8091 -m db -n 1 -DSEATA_ENV=test
```
    -h: 注册到注册中心的ip
    -p: Server rpc 监听端口
    -m: 全局事务会话信息存储模式，file、db，优先读取启动参数
    -n: Server node，多个Server时，需区分各自节点，用于生成不同的transactionId范围，以免冲突
    SEATA_ENV: 多环境配置参考 https://github.com/seata/seata/wiki/Multi-configuration-Isolation
```  
c.docker部署请看 https://seata.io/zh-cn/docs/ops/deploy-by-docker.html  

注: 堆内存建议分配4G

### 业务系统集成Client
#### 步骤一：添加seata依赖
a.依赖seata-all  
b.依赖seata-spring-boot-starter，支持yml配置  
c.依赖spring-cloud-alibaba-seata，内部集成了seata，并实现了xid传递
#### 步骤二：undo_log建表、配置参数
统一放置在源码script文件夹下，也可以看module seata-server resources的db_undo_log.sql和file.conf.example。  
oracle暂时参考 https://github.com/seata/seata/pull/1640  
参数配置介绍请看 https://seata.io/zh-cn/docs/user/configurations.html

#### 步骤三：数据源代理
a.0.9.0版本开始可通过配置client.support.spring.datasource.autoproxy=true由seata自动实现数据源代理  
b.手动配置可参考下方mybatis的例子
```
 @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource druidDataSource() {
        DruidDataSource druidDataSource = new DruidDataSource();
        return druidDataSource;
    }
    @Primary
    @Bean("dataSource")
    public DataSourceProxy dataSource(DataSource druidDataSource) {
        return new DataSourceProxy(druidDataSource);
    }
    @Bean
    public MybatisSqlSessionFactoryBean mybatisSqlSessionFactoryBean(DataSourceProxy druidDataSource, ResourcePatternResolver resourcePatternResolver) throws IOException {
        MybatisSqlSessionFactoryBean mybatisSqlSessionFactoryBean = new MybatisSqlSessionFactoryBean();
        mybatisSqlSessionFactoryBean.setDataSource(druidDataSource);
        mybatisSqlSessionFactoryBean.setMapperLocations(resourcePatternResolver.getResources("classpath:mapper/*.xml"));
        return mybatisSqlSessionFactoryBean;
    }
```  
#### 步骤四：初始化GlobalTransactionScanner  
a.手动
```  @Bean
       public GlobalTransactionScanner globalTransactionScanner() {
           String applicationName = this.applicationContext.getEnvironment().getProperty("spring.application.name");
           String txServiceGroup = this.seataProperties.getTxServiceGroup();
           if (StringUtils.isEmpty(txServiceGroup)) {
               txServiceGroup = applicationName + "-fescar-service-group";
               this.seataProperties.setTxServiceGroup(txServiceGroup);
           }
   
           return new GlobalTransactionScanner(applicationName, txServiceGroup);
       }
```
b.自动，依赖seata-spring-boot-starter、spring-cloud-alibaba-seata等jar
#### 步骤五：实现xid跨服务传递
a.手动  
参考源码integration文件夹下的各种rpc实现 module  
b.自动  
springCloud用户可以引入spring-cloud-alibaba-seata，内部已经实现xid传递

### 事务分组专题简介
事务分组可以作为资源的逻辑隔离单位，去注册中心获得相应的TC服务列表。  
seata注册、配置中心分为两类，内置file、第三方注册（配置）中心如nacos等等，注册中心和配置中心之间没有约束，可使用不同类型。
### file注册中心和file配置中心（file注册中心也可以搭配nacos、zk等其他配置中心）
#### Server端
```
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "file"                                ---------------> 该行简称RT
}
config {
  # file、nacos 、apollo、zk、consul、etcd3
  type = "file"
  file {
    name = "file.conf"
  }
}
```
1.RT配置为file  
2.file、db模式启动server，见文章上方节点：启动Server  
#### Client端
```
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "file"                                ---------------> 该行简称RT2
}
config {
  # file、nacos 、apollo、zk、consul、etcd3
  type = "file"                                 ---------------> CF
  file {
    name = "file.conf"                          ---------------> CFN
  }
}
spring.cloud.alibaba.seata.tx-service-group=my_test_tx_group   ---------------> TG
service {
  vgroup_mapping.my_test_tx_group = "default"   ---------------> VM
  default.grouplist = "127.0.0.1:8091"          ---------------> DG
}
```
1.配置CF为file，CNF为file.conf，通过FileConfiguration本地加载seata配置参数  
2.TG为spring配置，springboot可配置在yml、properties中，服务启动时加载配置，对应的值"my_test_tx_group"即为一个事务分组名，若不配置，默认获取属性spring.application.name的值+"-fescar-service-group"  
3.以VM为例，拿到事务分组名"my_test_tx_group"拼接成"service.vgroup_mapping.my_test_tx_group"查找TC集群名clusterName为"default"  
4.再拼接"service."+clusterName+".grouplist"找到真实TC服务列表127.0.0.1:8091  
### nacos注册中心和配置中心
#### Server端
```
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "nacos"                                ---------------> 该行简称RT
  nacos {
    serverAddr = "localhost"                    ---------------> RNS
    namespace = ""                              ---------------> RNN
    cluster = "default"                         ---------------> RNC
  }
}
config {
  # file、nacos 、apollo、zk、consul、etcd3
  type = "nacos"
  nacos {
    serverAddr = "localhost"
    namespace = ""
    cluster = "default"
  }
}

```
1.获取源码scrpit-->config-center下的3个nacos文件nacos-config.py、nacos-config.sh、nacos-config.txt  
txt为参数明细（包含Server和Client），sh为linux脚本，windows可下载git来操作，py为python脚本。  
2.用命令执行脚本导入seata配置参数至nacos，在nacos控制台查看配置确认是否成功  
3.RT配置为nacos,启动seata-server注册至nacos，查看nacos控制台服务列表确认是否成功  
```
RNS：nacos注册中心ip
RNN：nacos命名空间id，""为nacos保留public空间控件，用户勿配置namespace = "public"
RNC：seata-server在nacos的集群名
```  
#### Client端
```
spring.cloud.alibaba.seata.tx-service-group=my_test_tx_group   ---------------> TG
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "nacos"                                ---------------> RT2
  nacos {
    serverAddr = "localhost"                    ---------------> RNS2
    namespace = ""                              ---------------> RNN2
  }
}
config {
  # file、nacos 、apollo、zk、consul、etcd3
  type = "nacos"                                 ---------------> CF
  nacos {
    serverAddr = "localhost"
    namespace = ""
  }
}
```
1.配置CF为nacos，通过NacosConfiguration远程读取seata配置参数  
2.TG为spring配置，springboot可配置在yml、properties中，服务启动时加载配置，对应的值"my_test_tx_group"即为一个事务分组名，若不配置，默认获取属性spring.application.name的值+"-fescar-service-group"  
4.拿到事务分组名"my_test_tx_group"拼接成"service.vgroup_mapping.my_test_tx_group"查找TC集群名clusterName为"default"  
5.再根据serverAddr和namespace以及clusterName找到真实TC服务列表  
注：serverAddr和namespace与Server端一致，clusterName与Server端cluster一致
