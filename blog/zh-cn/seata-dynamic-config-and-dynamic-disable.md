---
title: Seata 动态配置订阅与降级实现原理
author: 张乘辉
keywords: Seata、Dynamic、Config
description: 讲述了 Seata 支持的多个配置中心是如何适配不同的动态配置订阅以及如何实现降级功能。
date: 2019/12/17
---


# 前言
Seata 的动态降级需要结合配置中心的动态配置订阅功能。动态配置订阅，即通过配置中心监听订阅，根据需要读取已更新的缓存值，ZK、Apollo、Nacos 等第三方配置中心都有现成的监听器可实现动态刷新配置；动态降级，即通过动态更新指定配置参数值，使得 Seata 能够在运行过程中动态控制全局事务失效（目前只有 AT 模式有这个功能）。

那么 Seata 支持的多个配置中心是如何适配不同的动态配置订阅以及如何实现降级的呢？下面从源码的层面详细给大家讲解一番。



# 动态配置订阅

Seata 配置中心有一个监听器基准接口，它主要有一个抽象方法和 default 方法，如下：

io.seata.config.ConfigurationChangeListener

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191216212442.png)

该监听器基准接口主要有两个实现类型：

1. 实现注册配置订阅事件监听器：用于实现各种功能的动态配置订阅，比如 GlobalTransactionalInterceptor 实现了 ConfigurationChangeListener，根据动态配置订阅实现的动态降级功能；
2. 实现配置中心动态订阅功能与适配：对于目前还没有动态订阅功能的 file 类型默认配置中心，可以实现该基准接口来实现动态配置订阅功能；对于阻塞订阅需要另起一个线程去执行，这时候可以实现该基准接口进行适配，还可以复用该基准接口的线程池；以及还有异步订阅，有订阅单个 key，有订阅多个 key 等等，我们都可以实现该基准接口以适配各个配置中心。

## Nacos 动态订阅实现

Nacos 有自己内部实现的监听器，因此直接直接继承它内部抽象监听器 AbstractSharedListener，实现如下：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191223212237.png)

如上，

- dataId：为订阅的配置属性；
- listener：配置订阅事件监听器，用于将外部传入的 listener 作为一个 wrapper，执行真正的变更逻辑。

值得一提的是，nacos 并没有使用 ConfigurationChangeListener 实现自己的监听配置，一方面是因为 Nacos 本身已有监听订阅功能，不需要自己再去实现；另一方面因为 nacos 属于非阻塞式订阅，不需要复用 ConfigurationChangeListener 的线程池，即无需进行适配。

添加订阅：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191223213347.png)

Nacos 配置中心为某个 dataId 添加订阅的逻辑很简单，用 dataId 和 listener 创建一个 NacosListener 调用 configService#addListener 方法，把 NacosListener 作为 dataId 的监听器，dataId 就实现了动态配置订阅功能。

## file 动态订阅实现

以它的实现类 FileListener 举例子，它的实现逻辑如下：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191215151642.png)

如上，

- dataId：为订阅的配置属性；

- listener：配置订阅事件监听器，用于将外部传入的 listener 作为一个 wrapper，执行真正的变更逻辑，这里特别需要注意的是，**该监听器与 FileListener 同样实现了 ConfigurationChangeListener 接口，只不过 FileListener 是用于给 file 提供动态配置订阅功能，而 listener 用于执行配置订阅事件**；

- executor：用于处理配置变更逻辑的线程池，在 ConfigurationChangeListener#onProcessEvent 方法中用到。

**FileListener#onChangeEvent 方法的实现让 file 具备了动态配置订阅的功能**，它的逻辑如下：

无限循环获取订阅的配置属性当前的值，从缓存中获取旧的值，判断是否有变更，如果有变更就执行外部传入 listener 的逻辑。

ConfigurationChangeEvent 用于保存配置变更的事件类，它的成员属性如下：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191215175232.png)



这里的 getConfig 方法是如何感知 file 配置的变更呢？我们点进去，发现它最终的逻辑如下：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191215162713.png)

发现它是创建一个 future 类，然后包装成一个 Runnable 放入线程池中异步执行，最后调用 get 方法阻塞获取值，那么我们继续往下看：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191215170908.png)

allowDynamicRefresh：动态刷新配置开关；

targetFileLastModified：file 最后更改的时间缓存。

以上逻辑：

获取 file 最后更新的时间值 tempLastModified，然后对比对比缓存值 targetFileLastModified，如果 tempLastModified > targetFileLastModified，说明期间配置有更改过，这时就重新加载 file 实例，替换掉旧的 fileConfig，使得后面的操作能够获取到最新的配置值。

添加一个配置属性监听器的逻辑如下：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191215161103.png)

configListenersMap 为 FileConfiguration 的配置监听器缓存，它的数据结构如下：

```java
ConcurrentMap<String/*dataId*/, Set<ConfigurationChangeListener>> configListenersMap
```

从数据结构上可看出，每个配置属性可关联多个事件监听器。

最终执行 onProcessEvent 方法，这个是监听器基准接口里面的 default 方法，它会调用 onChangeEvent 方法，即最终会调用 FileListener 中的实现。



# 动态降级

有了以上的动态配置订阅功能，我们只需要实现 ConfigurationChangeListener 监听器，就可以做各种各种的功能，目前 Seata 只有动态降级有用到动态配置订阅的功能。

在「[Seata AT 模式启动源码分析](https://mp.weixin.qq.com/s/n9MHk47zSsFQmV-gBq_P1A)」这篇文章中讲到，Spring 集成 Seata 的项目中，在 AT 模式启动时，会用 用GlobalTransactionalInterceptor 代替了被 GlobalTransactional 和 GlobalLock 注解的方法，GlobalTransactionalInterceptor 实现了 MethodInterceptor，最终会执行 invoker 方法，那么想要实现动态降级，就可以在这里做手脚。

- 在 GlobalTransactionalInterceptor 中加入一个成员变量：

```java
private volatile boolean disable; 
```

在构造函数中进行初始化赋值：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191215173221.png)

ConfigurationKeys.DISABLE_GLOBAL_TRANSACTION（service.disableGlobalTransaction）这个参数目前有两个功能：

1. 在启动时决定是否开启全局事务；
2. 在开启全局事务后，决定是否降级。

- 实现 ConfigurationChangeListener：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191215173358.png)

这里的逻辑简单，就是判断监听事件是否属于 ConfigurationKeys.DISABLE_GLOBAL_TRANSACTION 配置属性，如果是，直接更新 disable 值。

- 接下来在 GlobalTransactionalInterceptor#invoke 中做点手脚

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191215174155.png)

如上，disable = true 时，不执行全局事务与全局锁。

- 配置中心订阅降级监听器

io.seata.spring.annotation.GlobalTransactionScanner#wrapIfNecessary

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191215174409.png)

在 Spring AOP 进行 wrap 逻辑过程中，当前配置中心将订阅降级事件监听器。

# 作者简介

张乘辉，目前就职于中通科技信息中心技术平台部，担任 Java 工程师，主要负责中通消息平台与全链路压测项目的研发，热爱分享技术，微信公众号「后端进阶」作者，技术博客（[https://objcoding.com/](https://objcoding.com/)）博主，Seata Contributor，GitHub ID：objcoding。