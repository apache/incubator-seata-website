# 注册中心

- 什么是注册中心?注册中心可以说是微服务架构中的”通讯录“，它记录了服务和服务地址的映射关系。在分布式架构中，服务会注册到这里，当服务需要调用其它服务时，就到这里找到服务的地址，进行调用.比如Seata Client端(TM,RM),发现Seata Server(TC)集群的地址,彼此通信.
- Seata的注册中心与Dubbo,Spring cloud的注册中心区别是?在广义上来说,并无区别,只不过Dubbo与Spring cloud的注册中心仅是作用于它们自身的组件,而Seata的注册中心也是一样是作用于Seata自身.(注:Dubbo与Spring cloud的注册中心与Seata无关)
- Seata支持哪些注册中心?
  1. eureka
  2. consul
  3. apollo
  4. etcd
  5. zookeeper
  6. sofa 
  7. redis 
  8. file (直连)

