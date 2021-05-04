---
layout:     post
comments: true
title:      Seata应用侧启动过程剖析——RM & TM如何与TC建立连接
date:       2021-02-28 21:08:00
author:     "booogu"
catalog: true
tags:
    - Seata
---

> “刚上手Seata，对其各个模块了解还不够深入？ <br>
想深入研究Seata源码，却还未付诸实践？<br>
想探究下在集成Seata后，自己的应用在启动过程中“偷偷”干了些啥？<br>
想学习Seata作为一款优秀开源框架蕴含的设计理念和最佳实践？<br>
如果你有上述任何想法之一，那么今天这篇文章，就是为你量身打造的~

## 前言
看过官网README的第一张图片的同学都应该清楚，Seata协调分布式事务的原理便在于通过其**协调器侧**的TC，来与**应用侧**的TM、RM进行各种通信与交互，来保证分布式事务中，多个事务参与者的数据一致性。那么Seata的协调器侧与应用侧之间，是如何建立连接并进行通信的呢？

没错，答案就是Netty，Netty作为一款高性能的RPC通信框架，保证了TC与RM之间的高效通信，关于Netty的详细介绍，本文不再展开，今天我们探究的重点，在于**应用侧在启动过程中，如何通过一系列Seata关键模块之间的协作（如RPC、Config/Registry Center等），来建立与协调器侧之间的通信**

## 从GlobalTransactionScanner说起
我们知道Seata提供了多个开发期注解，比如用于开启分布式事务的@GlobalTransactional、用于声明TCC两阶段服务的@TwoPhraseBusinessAction等，它们都是基于Spring AOP机制，对使用了注解的Bean方法分配对应的拦截器进行增强，来完成对应的处理逻辑。而GlobalTransactionScanner这个Spring Bean，就承载着为各个注解分配对应的拦截器的职责，从其Scanner的命名，我们也不难推断出，它是为了在Spring应用启动过程中，对与全局事务（GlobalTransactionScanner）相关的Bean进行扫描、处理的。

除此之外，应用侧RPC客户端（TMClient、RMClient）初始化、与TC建立连接的流程，也是在GlobalTransactionScanner#afterPropertiesSet()中发起的：

````js
    /**
     * package：io.seata.spring.annotation
     * class：GlobalTransactionScanner
     */
    @Override
    public void afterPropertiesSet() {
        if (disableGlobalTransaction) {
            if (LOGGER.isInfoEnabled()) {
                LOGGER.info("Global transaction is disabled.");
            }
            return;
        }
        //在Bean属性初始化之后，执行TM、RM的初始化
        initClient();

    }
````

## RM & TM 的初始化与连接过程
这里，我们以RMClient.init()为例说明，TMClient的初始化过程亦同理。
### 类关系的设计
查看RMClient#init()的源码，我们发现，RMClient先**构造**了一个RmNettyRemotingClient，然后执行其**初始化**init()方法。而RmNettyRemotingClient的**构造器**和**初始化**方法，都会逐层调用父类的构造器与初始化方法

```js
    /**
     * RMClient的初始化逻辑
     * package：io.seata.rm
     * class：RMClient
     */
    public static void init(String applicationId, String transactionServiceGroup) {
        //① 首先从RmNettyRemotingClient类开始，依次调用父类的构造器        
        RmNettyRemotingClient rmNettyRemotingClient = RmNettyRemotingClient.getInstance(applicationId, transactionServiceGroup);
        rmNettyRemotingClient.setResourceManager(DefaultResourceManager.get());
        rmNettyRemotingClient.setTransactionMessageHandler(DefaultRMHandler.get());
        //② 然后从RmNettyRemotingClient类开始，依次调用父类的init()
        rmNettyRemotingClient.init();
    }
```
上述RMClient系列各类之间的关系以及调用构造器和init()初始化方法的过程如下图示意：
![RMClient.init简化版流程与主要类之间的关系](http://booogu.top/img/in-post/rmclient_relation.jpg)


那么为何要将RMClient设计成这样较为复杂的继承关系呢？其实是为了将各层的职责、边界划分清楚，使得各层可以专注于特定逻辑处理，实现更好的扩展性，这部分的详细设计思路，可参考Seata RPC模块重构PR的操刀者乘辉兄的文章[Seata-RPC重构之路](https://mp.weixin.qq.com/s/PCSZ4a8cgmyZNhbUrO-BZQ)）

### 初始化的完整流程
各类的构造器与初始化方法中的主要逻辑，大家可以借助下面这个能表意的序列图来梳理下，此图大家也可先跳过不看，在下面我们分析过几个重点类后，再回头来看这些类是何时登场、如何交互的协作的。
![RMClient的初始化流程](http://booogu.top/img/in-post/rmclient_initialization.png)

### 抓住核心——Channel的创建
首先我们需要知道，应用侧与协调器侧的通信是借助Netty的Channel（网络通道）来完成的，因此**通信过程的关键在于Channel的创建**，在Seata中，通过池化的方式（借助了common-pool中的对象池）方式来创建、管理Channel。

这里我们有必要简要介绍下对象池的简单概念及其在Seata中的实现：
涉及到的common-pool中的主要类：
* **GenericKeydObjectPool<K, V>**：KV泛型对象池，提供对所有对象的存取管理，而对象的创建由其内部的工厂类来完成
* **KeyedPoolableObjectFactory<K, V>**：KV泛型对象工厂，负责池化对象的创建，被对象池持有

涉及到的Seata中对象池实现相关的主要类：
* 首先，被池化管理的对象就是**Channel**，对应common-pool中的泛型V
* **NettyPoolKey**：Channel对应的Key，对应common-pool中的泛型K，NettyPoolKey主要包含两个信息：
    - *address*:创建Channel时，对应的TC Server地址
    - *message*:创建Channel时，向TC Server发送的RPC消息体
* **GenericKeydObjectPool<NettyPoolKey,Channel>**：Channel对象池
* **NettyPoolableFactory**：创建Channel的工厂类


认识了上述对象池相关的主要类之后，我们再来看看Seata中涉及Channel管理以及与RPC相关的几个主要类：

* NettyClientChannelManager：
  - 持有Channel对象池
  - 与Channel对象池交互，对应用侧Channel进行管理（获取、释放、销毁、缓存等）
* RpcClientBootstrap：RPC客户端核心引导类，持有Netty框架的Bootstrap对象，具备启停能力；具有根据连接地址来获取新Channel的能力，供Channel工厂类调用
* AbstractNettyRemotingClient：
  - 初始化并持有RpcClientBootstrap
  - 应用侧Netty客户端的顶层抽象，抽象了应用侧RM/TM取得各自Channel对应的NettyPoolKey的能力，供NettyClientChannelManager调用
  - 初始化NettyPoolableFactory

了解上述概念后，我们可以把Seata中创建Channel的过程简化如下：
![创建Channel对象过程](http://booogu.top/img/in-post/create_channel.jpg)

看到这里，大家可以回过头再看看上面的**RMClient的初始化序列图**，应该会对图中各类的职责、关系，以及整个初始化过程的意图有一个比较清晰的理解了。

### 建立连接的时机与流程
那么，RMClient是何时与Server建立连接的呢？

在RMClient初始化的过程中，大家会发现，很多init()方法都设定了一些定时任务，而Seata应用侧与协调器的重连（连接）机制，就是通过定时任务来实现的：

```js
    /**
     * package：io.seata.core.rpcn.netty
     * class：AbstractNettyRemotingClient
     */
    public void init() {
        //设置定时器，定时重连TC Server
        timerExecutor.scheduleAtFixedRate(new Runnable() {
            @Override
            public void run() {
                clientChannelManager.reconnect(getTransactionServiceGroup());
            }
        }, SCHEDULE_DELAY_MILLS, SCHEDULE_INTERVAL_MILLS, TimeUnit.MILLISECONDS);
        if (NettyClientConfig.isEnableClientBatchSendRequest()) {
            mergeSendExecutorService = new ThreadPoolExecutor(MAX_MERGE_SEND_THREAD,
                MAX_MERGE_SEND_THREAD,
                KEEP_ALIVE_TIME, TimeUnit.MILLISECONDS,
                new LinkedBlockingQueue<>(),
                new NamedThreadFactory(getThreadPrefix(), MAX_MERGE_SEND_THREAD));
            mergeSendExecutorService.submit(new MergedSendRunnable());
        }
        super.init();
        clientBootstrap.start();
    }
```


我们通过跟踪一次reconnect的执行，看看上面探究的几个类之间是如何协作，完成RMClient与TC的连接的（实际上首次连接可能发生在registerResource的过程中，但流程一致）
![RMClient与TC Server连接过程](http://booogu.top/img/in-post/rmclient_connect_tcserver.png)

这个图中，大家可以重点关注这几个点：
* NettyClientChannelManager执行具体AbstractNettyRemotingClient中，获取NettyPoolKey的回调函数（getPoolKeyFunction()）：应用侧的不同Client（RMClient与TMClient），在创建Channel时使用的Key不同，使**两者在重连TC Server时，发送的注册消息不同**，这也是由两者在Seata中扮演的角色不同而决定的：
  - TMClient：扮演事务管理器角色，创建Channel时，仅向TC发送TM注册请求（RegisterTMRequest）即可
  - RMClient：扮演资源管理器角色，需要管理应用侧所有的事务资源，因此在创建Channel时，需要在发送RM注册请求（RegesterRMRequest）前，获取应用侧所有事务资源（Resource）信息，注册至TC Server
* 在Channel对象工厂NettyPoolableFactory的makeObject（制造Channel）方法中，使用NettyPoolKey中的两项信息，完成了两项任务：
    - 使用NettyPoolKey的address创建新的Channel
    - 使用NettyPoolKey的message以及新的Channel向TC Server发送注册请求，这就是Client向TC Server的连接（首次执行）或重连（非首次，由定时任务驱动执行）请求

以上内容，就是关于Seata应用侧的初始化及其与TC Server协调器侧建立连接的全过程分析。

更深层次的细节，建议大家再根据本文梳理的脉络和提到的几个重点，细致地阅读下源码，相信定会有更深层次的理解和全新的收获！

> 后记：考虑到篇幅以及保持一篇源码分析文章较为合适的信息量，本文前言中所说的**配置、注册等模块协作配合**并没有在文章中展开和体现。<br>
在下篇源码剖析中，我会以**配置中心**和**注册中心**为重点，为大家分析，在RMClient/TM Client与TC Server建立连接之前，Seata应用侧是**如何通过服务发现**找到TC Server、如何**从配置模块获取各种信息**的。