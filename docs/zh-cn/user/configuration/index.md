# 配置中心

- 什么是配置中心?配置中心可以说是一个"大衣柜",内部放置着各种配置文件,你可以通过自己所需进行获取配置加载到对应的客户端.比如Seata Client端(TM,RM),Seata Server(TC),会去读取全局事务开关,事务会话存储模式等信息.
- Seata的配置中心与Spring cloud的配置中心区别是?在广义上来说,并无区别,只不过Spring cloud的配置中心仅是作用于它们自身的组件,而Seata的配置中心也是一样是作用于Seata自身.(注:Spring cloud的配置中心与Seata无关)
- Seata支持哪些配置中心?
  1. consul
  2. apollo
  3. etcd
  4. zookeeper
  5. redis 
  6. file (读本地文件)

