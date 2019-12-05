# 部署指南
## Seata新手部署指南(1.0.0版本)
Seata分TC、TM和RM三个角色，TC（Server端）为单独服务端部署，TM和RM（Client端）由业务系统集成。

### 资源目录介绍
- script
> seata根目录-->script，存放client所需脚本、配置，各个注册中心配置参数脚本（Server和Client并存）
- server
> seata根目录-->seata-server，存放db模式所需建表脚本，server端配置参数在script。
### 注意事项
- seata-spring-boot-starter
> 1.0.0可用于替换seata-all，starter默认开启数据源自动代理，GlobalTransactionScanner自动初始化（依赖SpringUtils）  
若其他途径实现GlobalTransactionScanner初始化，请保证io.seata.spring.boot.autoconfigure.util.SpringUtils先初始化

### 启动Server
Server端存储模式（store.mode）现有file、db两种（后续将引入raft），file模式无需改动，直接启动即可，下面专门讲下db启动步骤。  
注：file模式为单机模式，全局事务会话信息内存中读写并持久化本地文件root.data，性能较高;  
    db模式为高可用模式，全局事务会话信息通过db共享，相应性能差些。
#### 步骤一：启动包
- https://github.com/seata/seata/releases 下载
- 官方钉钉群（群号：23171167），qq群（群号：254657148）群文件共享下载
- 其它途径

#### 步骤二：建表
全局事务会话信息由3块内容构成，全局事务-->分支事务-->全局锁，对应表global_table、branch_table、lock_table，  
- mysql建表脚本存放于module seata-server-->resources-->db_store.sql  
- oracle脚本（可参考 https://github.com/seata/seata/pull/1640 ）暂未合并。

#### 步骤三：修改store.mode
打开seata-server-->resources-->file.conf，修改store.mode="db";也可以在启动时加命令参数-m db指定。

#### 步骤四：修改数据库连接
打开seata-server-->resources-->file.conf，修改store.db相关属性

#### 步骤五：启动
- 源码启动: 执行Server.java的main方法  
- 命令启动: seata-server.sh -h 127.0.0.1 -p 8091 -m db -n 1 -DSEATA_ENV=test
```
    -h: 注册到注册中心的ip
    -p: Server rpc 监听端口
    -m: 全局事务会话信息存储模式，file、db，优先读取启动参数
    -n: Server node，多个Server时，需区分各自节点，用于生成不同的transactionId范围，以免冲突
    SEATA_ENV: 多环境配置参考 https://github.com/seata/seata/wiki/Multi-configuration-Isolation
```  
- docker部署请看 https://seata.io/zh-cn/docs/ops/deploy-by-docker.html  

注: 堆内存建议分配4G，堆外内存1-2G

### 业务系统集成Client
#### 步骤一：添加seata依赖
- 依赖seata-all
- 依赖seata-spring-boot-starter，支持yml配置
- 依赖spring-cloud-alibaba-seata，内部集成了seata，并实现了xid传递
#### 步骤二：undo_log建表、配置参数  
- oracle暂时参考 https://github.com/seata/seata/pull/1640  
- 参数配置介绍 https://seata.io/zh-cn/docs/user/configurations.html

#### 步骤三：数据源代理
- 0.9.0版本开始seata支持自动代理数据源
```
    1.0.0: client.support.spring.datasource.autoproxy=true  
    0.9.0: support.spring.datasource.autoproxy=true
```
- 手动配置可参考下方mybatis的例子
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
- 手动
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
- 自动，引入seata-spring-boot-starter、spring-cloud-alibaba-seata等jar
#### 步骤五：实现xid跨服务传递
- 手动
参考源码integration文件夹下的各种rpc实现 module
- 自动
springCloud用户可以引入spring-cloud-alibaba-seata，内部已经实现xid传递

### 事务分组专题简介
事务分组可以作为资源的逻辑隔离单位，去注册中心获得相应的TC服务列表。  
seata注册、配置中心分为两类，内置file、第三方注册（配置）中心如nacos等等，注册中心和配置中心之间没有约束，可各自使用不同类型。
### file注册中心和配置中心
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
spring.cloud.alibaba.seata.tx-service-group=my_test_tx_group   ---------------> 事务分组配置
file.conf: 
    service {
      vgroup_mapping.my_test_tx_group = "default"
      default.grouplist = "127.0.0.1:8091"
    }
```
- 读取配置
> 通过FileConfiguration本地加载file.conf的配置参数
- 获取事务分组
> spring配置，springboot可配置在yml、properties中，服务启动时加载配置，对应的值"my_test_tx_group"即为一个事务分组名，若不配置，默认获取属性spring.application.name的值+"-fescar-service-group"  
- 查找TC集群名
> 拿到事务分组名"my_test_tx_group"拼接成"service.vgroup_mapping.my_test_tx_group"查找TC集群名clusterName为"default"
- 查询TC服务
> 拼接"service."+clusterName+".grouplist"找到真实TC服务地址127.0.0.1:8091
### nacos注册中心和配置中心
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
> scrpit-->config-center下的3个nacos文件nacos-config.py、nacos-config.sh、nacos-config.txt  
txt为参数明细（包含Server和Client），sh为linux脚本，windows可下载git来操作，py为python脚本。  
- 导入配置
> 用命令执行脚本导入seata配置参数至nacos，在nacos控制台查看配置确认是否成功  
- 注册TC
> 启动seata-server注册至nacos，查看nacos控制台服务列表确认是否成功  

#### Client端
```
spring.cloud.alibaba.seata.tx-service-group=my_test_tx_group   ---------------> 事务分组配置
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
- 读取配置
> 通过NacosConfiguration远程读取seata配置参数
- 获取事务分组
> springboot可配置在yml、properties中，服务启动时加载配置，对应的值"my_test_tx_group"即为一个事务分组名，若不配置，默认获取属性spring.application.name的值+"-fescar-service-group"
- 查找TC集群名
> 拿到事务分组名"my_test_tx_group"拼接成"service.vgroup_mapping.my_test_tx_group"从配置中心查找到TC集群名clusterName为"default"
- 查找TC服务
> 根据serverAddr和namespace以及clusterName在注册中心找到真实TC服务列表

注：serverAddr和namespace与Server端一致，clusterName与Server端cluster一致
