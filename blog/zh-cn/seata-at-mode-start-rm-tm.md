---
title: Seata 客户端需要同时启动 RM 和 TM 吗？
author: 张乘辉
keywords: Seata、分布式事务、AT模式、RM、TM
description: 关于 Seata 后续优化的一个讨论点
date: 2019/11/28
---


在分析启动部分源码时，我发现 GlobalTransactionScanner 会同时启动 RM 和 TM client，但根据 Seata 的设计来看，TM 负责全局事务的操作，如果一个服务中不需要开启全局事务，此时是不需要启动 TM client的，也就是说项目中如果没有全局事务注解，此时是不是就不需要初始化 TM client 了，因为不是每个微服务，都需要 GlobalTransactional，它此时仅仅作为一个 RM client 而已。


于是我着手将 GlobalTransactionScanner 稍微更改了初始化的规则，由于之前 GlobalTransactionScanner 调用 初始化方法是在 InitializingBean 中的 afterPropertiesSet() 方法中进行，afterPropertySet() 仅仅是当前 bean 初始化后被调用，此时无法得知当前 Spring 容器是否有全局事务注解。

因此我去掉了 InitializingBean，改成了是实现 ApplicationListener，在实例化 bean 的过程中检查是否有 GlobalTransactional 注解的存在，最后在 Spring 容器初始化完成之后再调用 RM 和 TM client 初始化方法，这时候就可以根据项目是否有用到全局事务注解来决定是否启动 TM client 了。

这里附上 PR 地址：[https://github.com/seata/seata/pull/1936](https://github.com/seata/seata/pull/1936)

随后在 pr 中讨论中得知，目前 Seata 的设计是只有在发起方的 TM 才可以发起 GlobalRollbackRequest，RM 只能发送 BranchReport(false) 上报分支状态个 TC 服务端，无法直接发送 GlobalRollbackRequest 进行全局回滚操作。具体的交互逻辑如下：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191128094250.png)

那么根据上面的设计模型，自然可以按需启动 TM client 了。

但是 Seata 后面的优化迭代中，还需要考虑的一点是：

当参与方出现异常时，是否可以直接由参与方的 TM client 发起全局回滚？这也就意味着可以缩短分布式事务的周期时间，尽快释放全局锁让其他数据冲突的事务尽早的获取到锁执行。

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191127202606.png)


也就是说在一个全局事务当中，只要有一个 RM client 执行本地事务失败了，直接当前服务的 TM client 发起全局事务回滚，不必要等待发起方的 TM 发起的决议回滚通知了。如果要实现这个优化，那么就需要每个服务都需要同时启动 TM client 和 RM client。

# 作者简介：

张乘辉，目前就职于中通科技信息中心技术平台部，担任 Java 工程师，主要负责中通消息平台与全链路压测项目的研发，热爱分享技术，微信公众号「后端进阶」作者，技术博客（[https://objcoding.com/](https://objcoding.com/)）博主，Seata Contributor，GitHub ID：objcoding。