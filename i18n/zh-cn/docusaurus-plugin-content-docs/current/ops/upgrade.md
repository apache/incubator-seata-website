---
title: 版本升级指南
keywords: [Seata]
description: Seata upgrade.
---

# 版本升级指南

<a href="#9" target="_self">9. 升级到 seata 2.1 有哪些兼容性事项是需要注意的？</a>
<br/>

<a href="#8" target="_self">8. 升级到 seata 2.0 有哪些兼容性事项是需要注意的？</a>
<br/>

<a href="#7" target="_self">7. 升级到 seata 1.6.x 有哪些兼容性事项是需要注意的？</a>
<br/>

<a href="#6" target="_self">6. 升级到 seata 1.5.0 有哪些兼容性事项是需要注意的？</a>
<br/>

<a href="#5" target="_self">5. 升级到 seata 1.4.0 有哪些兼容性事项是需要注意的？</a>
<br/>

<a href="#4" target="_self">4. 升级到 seata 1.3.0 有哪些兼容性事项是需要注意的？</a>
<br/>

<a href="#3" target="_self">3. 升级到 seata 1.2.0 有哪些兼容性事项是需要注意的？</a> 
<br/>

<a href="#2" target="_self">2. 升级到 seata 1.1.0 有哪些兼容性事项是需要注意的？</a>
<br/>

<a href="#1" target="_self">1. 0.8、0.9版本如何升级到1.0版本？</a>     
<br/>

------

<h3 id='9'>9. 升级到 seata 2.1 有哪些兼容性事项是需要注意的？</h3>
<details>
  <summary><mark>注意事项</mark></summary>
  
  1. 使用seata2.0 raft 存储模式后，升级2.1需要登录后获取token，携带token请求/metadata/v1/cluster?group=在application.yml中的seata.server.raft.group的值，查询到集群元数据后。将follower节点先行升级，再升级leader节点。注：该升级完成后，raft存储模式下是不允许降级至2.0，请在线下环境得到充分验证后再进行生产环境升级。
  2. 用户在升级到seata2.1时需要配置seata raft的鉴权信息，首先在seata server端的`ignore.url`中增加`/metadata/v1/**`用以暂时关闭鉴权功能，然后在seata client端`application.yaml`或`registry.conf`中的`seata.registry.raft`中配置好`username`和`password`以及`tokenValidityInMilliseconds`（需要注意的是client端的username和password应当与server端所配置的保持一致，client端的tokenValidityInMilliseconds应当略小于你在server端配置的tokenValidityInMilliseconds），最后在server端移除`ignore.url`中的`/metadata/v1/**`用以开启raft元数据鉴权能力。
</details>

------

<h3 id='8'>8. 升级到 seata 2.0 有哪些兼容性事项是需要注意的？</h3>
<details>
  <summary><mark>注意事项</mark></summary>
  从1.8.x 版本升级2.0.x 版本，如果undolog或通信编解码的配置为fst都需要先提前在client修改为fst以外的序列化方式,server侧才可进行升级。
  注: 2.0.0的server 存在at模式下资源重入,比如一个全局事务中,非同一个本地事务进行了多次相同的数据修改,注册了多个分支后会导致二阶段下发顺序异常,故如果有此类场景请勿升级到2.0.0版本,建议升级到最新snapshot或更高版本。
</details>

------

<h3 id='7'>7. 升级到 seata 1.6.x 有哪些兼容性事项是需要注意的？</h3>
<details>
  <summary><mark>注意事项</mark></summary>
  从1.5.x 版本升级1.6.x 版本，无论 client SDK 还是 seata-server 都是完全平滑兼容的，无需除升级版本外的其他改动。
</details>

------

<h3 id='6'>6. 升级到 seata 1.5.0 有哪些兼容性事项是需要注意的？</h3>
<details>
  <summary><mark>注意事项</mark></summary>

1. seata-server 存储模式为 db 时，需要注意表结构变更，在升级1.5.0 前需先变更表结构：

 - 表结构字符集统一从 utf8 调整为 utf8mb4
 - global_table 调整索引从 idx_gmt_modified_status 调整为 idx_status_gmt_modified
 - lock_table 增加 status 字段,增加 idx_status，idx_xid_and_branch_id 索引
 - 增加 distributed_lock 表用于 seata-server 异步任务调度
  升级1.5.0前，请注意表结构变更，表结构详情请[点击此处](https://github.com/apache/incubator-seata/tree/1.5.0/script/server/db)
   
2. TCC事务模式在1.5.0 增加防悬挂功能,如需由 Seata 框架开启防悬挂,需要提前在客户端业务库中增加[此表](https://github.com/apache/incubator-seata/tree/1.5.0/script/client/tcc/db)
   
3. TCC模式一阶段方法进行了优化，不再需要在一阶段的接口入参定义`BusinessActionContext`，若一阶段需要使用到`BusinessActionContext`，可以通过`BusinessActionContextUtil.getContext()`取得

4. redis注册中心内部结构调整,不再向下兼容,如使用redis作为seata的注册中心,请将客户端依赖的 seata-all(seata-spring-boot-starter) 和 seata-server 一并升级。

5. 事务分组配置支持了默认值，为了避免歧义和降低学习成本，默认事务分组的由`my_test_tx_group` 修改为 `default_tx_group`。在1.5.X的版本中会向下进行兼容。

</details>  

------

<h3 id='5'>5. 升级到 seata 1.4.0 有哪些兼容性事项是需要注意的？</h3>
<details>
  <summary><mark>注意事项</mark></summary>


1. 1.3与1.4的Redis数据无法兼容,因Redis模式重构数据存储结构为hash,1.3升级的用户需等待事务全部运行完毕后再做迭代.
       

</details>  

------

<h3 id='4'>4. 升级到 seata 1.3.0 有哪些兼容性事项是需要注意的？</h3>
<details>
  <summary><mark>注意事项</mark></summary>

1. nacos注册中心新增group的属性配置seata.registry.nacos.group，如果无配置,则默认为DEFAULT_GROUP，Server和Client端需保持一致。
2. mysql undolog表去除id字段,与branch_table一并加强时间戳精度,防止undolog回滚时顺序错误导致出现脏数据无法回滚.(注:需要mysql5.6版本以上)

</details>  

********

<h3 id='3'>3. 升级到 seata 1.2.0 有哪些兼容性事项是需要注意的？</h3>
<details>
  <summary><mark>注意事项</mark></summary>

1. nacos注册中心新增服务名的属性配置registry.nacos.application = "seata-server"，原固定名为serverAddr，现默认为seata-server，Server和Client端需保持一致。
       

</details>  

********

<h3 id='2'>2. 升级到 seata 1.1.0 有哪些兼容性事项是需要注意的？</h3>
<details>
  <summary><mark>注意事项</mark></summary>

1. 需要注意配置项的兼容性，1.1.0 版本对于配置项的风格进行了统一。
若程序中依赖的是 seata-all，对应于 *.conf 文件，conf文件中配置项的命名风格统一为 点号+驼峰式组合，[1.1.0 配置项说明](/docs/user/configurations/)， [1.1.0 配置参考](https://github.com/apache/incubator-seata/tree/1.1.0/script/client/conf); 
若程序中依赖的是seata-spring-boot-starter，对应于 *.properties 或 *.yml。propertie、 yml文件命名风格统一为 点号+中划线组合 
[1.1.0 配置参考](https://github.com/apache/incubator-seata/tree/1.1.0/script/client/spring) 需要特别注意的是1.0.0 版本配置项 seata.service
.vgroup-mapping=default 1.1.0 更改为: seata.service.vgroup-mapping
.my_test_tx_group=default,其中my_test_tx_group代表程序所使用的事务分组； 1.0.0 版本配置项seata.service.grouplist=127.0.0.1:8091， 1.1.0 
更改为：seata.service.grouplist.default=127.0.0.1:8091 其中 default 代表 seata注册服务名。

2. seata-all 默认不开启数据源自动代理。原 seata-all中 conf 文件配置项
client.support.spring.datasource.autoproxy 配置项失效，由注解 @EnableAutoDataSourceProxy 
注解代替，注解参数可选择使用jdk代理或者cglib代理，当使用HikariDataSource 时推荐使用 cglib 代理模式。
seata-spring-boot-starter 默认开启数据源代理，对应数据源自动代理配置项与1.0.0 版本保持不变。

3. 使用spring cloud框架时需要使用[Spring Cloud Alibaba](https://github.com/alibaba/spring-cloud-alibaba)来进行seata 
事务上下文的传递，与Spring Cloud Alibaba 版本集成依赖关系，参考 [版本说明](https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E)     
spring-cloud-alibaba-seata 在 2.2.0.RELEASE 版本前 依赖的是seata-all 若继续使用低版本的 spring-cloud-alibaba-seata 可以使用高版本的 seata-all 取代内置的 seata-all 版本；   
从spring-cloud-alibaba-seata 在 2.2.0.RELEASE 开始后（含）内部开始依赖seata-spring-boot-starter,2.2.0.RELEASE 内部集成 seata-spring-boot-starter 1.0.0 可以升级为 seata-spring-boot-starter 1.1.0，seata-spring-boot-starter 集成了seata-all，seata-spring-boot-starter 包装了对于properties或yml 配置的autoconfig 功能，在spring-cloud-alibaba-seata 2.2.0.RELEASE 前 
autoconfig 功能由其本身支持，在其后去掉 spring-cloud-alibaba-seata 中关于 seata 本身的autoconfig 由seata-spring-boot-starter 支持，因此低版本spring-cloud-alibaba-seata 只能配合 seata-all使用，高版本spring-cloud-alibaba-seata 只能配合seata-spring-boot-starter 使用，以2.2.0.RELEASE为分界点。

4. TC端采用 db 存储模式时 branch_table 中增加 gmt_create，gmt_modified 字段的精度，用于精确确认回滚的顺序，
[各数据库脚本参考](https://github.com/apache/incubator-seata/tree/1.1.0/script/server/db)

</details>

********

<h3 id='1'>1. 0.8、0.9版本如何升级到1.0版本？</h3>   
<details>
  <summary><mark>注意事项</mark></summary>

   1. （可选）1.0支持yml、properties，需用seata-spring-boot-starter替换掉 seata-all   
   2.  （必选）TC端表lock_table字段branch_id增加普通索引   
   3. （可选）部分参数命名改动，<a href="/docs/user/configurations100" target="_blank">点击查看参数配置</a>   
   4. （可选） client.report.success.enable可以置为false，提升性能   
      

</details>   

********
