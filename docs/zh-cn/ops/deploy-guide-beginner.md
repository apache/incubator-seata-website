---
title: Seata部署指南
keywords: Seata
description: Seata分TC、TM和RM三个角色，TC（Server端）为单独服务端部署，TM和RM（Client端）由业务系统集成。
---

# 部署指南
## Seata新手部署指南(1.0.0版本)
Seata分TC、TM和RM三个角色，TC（Server端）为单独服务端部署，TM和RM（Client端）由业务系统集成。

### 资源目录介绍
#### <a href="https://github.com/seata/seata/tree/develop/script" target="_blank">script</a>
- client
> 存放client端sql脚本，参数配置
- config-center
> 各个配置中心参数导入脚本，config.txt(包含server和client，原名nacos-config.txt)为通用参数文件
- server
> server端数据库脚本及各个容器配置


### 注意事项
- seata-spring-boot-starter
> 1.0.0可用于替换seata-all，GlobalTransactionScanner自动初始化（依赖SpringUtils）  
若其他途径实现GlobalTransactionScanner初始化，请保证io.seata.spring.boot.autoconfigure.util.SpringUtils先初始化；  
starter默认开启数据源自动代理，用户若再手动配置DataSourceProxy将会导致异常
- spring-cloud-alibaba-seata
> 2.1.0内嵌seata-all 0.7.1，2.1.1内嵌seata-all 0.9.0。  
> 截止20191222日，现有版本不能与seata-spring-boot-starter兼容，后续sca会提供新的seata集成版本；  
```
    临时兼容解决方案(单选即可): 
    a.@SpringBootApplication注解内exclude掉spring-cloud-alibaba-seata内的com.alibaba.cloud.seata.GlobalTransactionAutoConfiguration
    b.让SpringUtils先初始化
```  

### 启动Server
Server端存储模式（store.mode）现有file、db两种（后续将引入raft），file模式无需改动，直接启动即可，下面专门讲下db启动步骤。  
注：file模式为单机模式，全局事务会话信息内存中读写并持久化本地文件root.data，性能较高;  
    db模式为高可用模式，全局事务会话信息通过db共享，相应性能差些。
#### 步骤一：启动包
- <a href="https://github.com/seata/seata/releases" target="_blank">点击下载</a>
- 官方钉钉群（群号：23171167，1群5000人已满，<a href="http://seata.io/zh-cn/community/index.html" target="_blank">2群</a>），qq群（群号：254657148）群文件共享下载
- 其它途径

#### 步骤二：建表
全局事务会话信息由3块内容构成，全局事务-->分支事务-->全局锁，对应表global_table、branch_table、lock_table

#### 步骤三：修改store.mode
启动包: seata-->conf-->file.conf，修改store.mode="db"  
源码:   根目录-->seata-server-->resources-->file.conf，修改store.mode="db"

#### 步骤四：修改数据库连接
启动包: seata-->conf-->file.conf，修改store.db相关属性。  
源码:   根目录-->seata-server-->resources-->file.conf，修改store.db相关属性。

#### 步骤五：启动
- 源码启动: 执行Server.java的main方法  
- 命令启动: seata-server.sh -h 127.0.0.1 -p 8091 -m db -n 1 -e test
```
    -h: 注册到注册中心的ip
    -p: Server rpc 监听端口
    -m: 全局事务会话信息存储模式，file、db，优先读取启动参数
    -n: Server node，多个Server时，需区分各自节点，用于生成不同区间的transactionId，以免冲突
    -e: 多环境配置参考 http://seata.io/en-us/docs/ops/multi-configuration-isolation.html
```  
- <a href="https://seata.io/zh-cn/docs/ops/deploy-by-docker.html" target="_blank">点击查看docker部署</a>

注: 堆内存建议分配2G，堆外内存1G

### 业务系统集成Client
#### 步骤一：添加seata依赖（建议单选）
- 依赖seata-all
- 依赖seata-spring-boot-starter，支持yml配置
- 依赖spring-cloud-alibaba-seata，内部集成了seata，并实现了xid传递
#### 步骤二：undo_log建表、配置参数
- <a href="https://seata.io/zh-cn/docs/user/configurations.html" target="_blank">点击查看参数配置介绍</a>

#### 步骤三：数据源代理
- 0.9.0版本开始seata支持自动代理数据源
```
    1.0.0: client.support.spring.datasource.autoproxy=true  
    0.9.0: support.spring.datasource.autoproxy=true
```
- 手动配置可参考下方的例子
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

<a href="https://seata.io/zh-cn/docs/user/transaction-group.html">查看事务分组介绍</a>