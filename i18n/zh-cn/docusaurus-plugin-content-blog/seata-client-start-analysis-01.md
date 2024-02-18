---
layout: post
comments: true
title: Seata应用侧启动过程剖析——RM & TM如何与TC建立连接
date: 2021-02-28 21:08:00
author: 'booogu'
catalog: true
tags:
  - Seata
---

> “刚上手 Seata，对其各个模块了解还不够深入？ <br />
> 想深入研究 Seata 源码，却还未付诸实践？<br />
> 想探究下在集成 Seata 后，自己的应用在启动过程中“偷偷”干了些啥？<br />
> 想学习 Seata 作为一款优秀开源框架蕴含的设计理念和最佳实践？<br />
> 如果你有上述任何想法之一，那么今天这篇文章，就是为你量身打造的~

## 前言

看过官网 README 的第一张图片的同学都应该清楚，Seata 协调分布式事务的原理便在于通过其**协调器侧**的 TC，来与**应用侧**的 TM、RM 进行各种通信与交互，来保证分布式事务中，多个事务参与者的数据一致性。那么 Seata 的协调器侧与应用侧之间，是如何建立连接并进行通信的呢？

没错，答案就是 Netty，Netty 作为一款高性能的 RPC 通信框架，保证了 TC 与 RM 之间的高效通信，关于 Netty 的详细介绍，本文不再展开，今天我们探究的重点，在于**应用侧在启动过程中，如何通过一系列 Seata 关键模块之间的协作（如 RPC、Config/Registry Center 等），来建立与协调器侧之间的通信**

## 从 GlobalTransactionScanner 说起

我们知道 Seata 提供了多个开发期注解，比如用于开启分布式事务的@GlobalTransactional、用于声明 TCC 两阶段服务的@TwoPhraseBusinessAction 等，它们都是基于 Spring AOP 机制，对使用了注解的 Bean 方法分配对应的拦截器进行增强，来完成对应的处理逻辑。而 GlobalTransactionScanner 这个 Spring Bean，就承载着为各个注解分配对应的拦截器的职责，从其 Scanner 的命名，我们也不难推断出，它是为了在 Spring 应用启动过程中，对与全局事务（GlobalTransactionScanner）相关的 Bean 进行扫描、处理的。

除此之外，应用侧 RPC 客户端（TMClient、RMClient）初始化、与 TC 建立连接的流程，也是在 GlobalTransactionScanner#afterPropertiesSet()中发起的：

```js
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
```

## RM & TM 的初始化与连接过程

这里，我们以 RMClient.init()为例说明，TMClient 的初始化过程亦同理。

### 类关系的设计

查看 RMClient#init()的源码，我们发现，RMClient 先**构造**了一个 RmNettyRemotingClient，然后执行其**初始化**init()方法。而 RmNettyRemotingClient 的**构造器**和**初始化**方法，都会逐层调用父类的构造器与初始化方法

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

上述 RMClient 系列各类之间的关系以及调用构造器和 init()初始化方法的过程如下图示意：
![RMClient.init简化版流程与主要类之间的关系](http://booogu.top/img/in-post/rmclient_relation.jpg)

那么为何要将 RMClient 设计成这样较为复杂的继承关系呢？其实是为了将各层的职责、边界划分清楚，使得各层可以专注于特定逻辑处理，实现更好的扩展性，这部分的详细设计思路，可参考 Seata RPC 模块重构 PR 的操刀者乘辉兄的文章[Seata-RPC 重构之路](https://mp.weixin.qq.com/s/PCSZ4a8cgmyZNhbUrO-BZQ)）

### 初始化的完整流程

各类的构造器与初始化方法中的主要逻辑，大家可以借助下面这个能表意的序列图来梳理下，此图大家也可先跳过不看，在下面我们分析过几个重点类后，再回头来看这些类是何时登场、如何交互的协作的。
![RMClient的初始化流程](http://booogu.top/img/in-post/rmclient_initialization.png)

### 抓住核心——Channel 的创建

首先我们需要知道，应用侧与协调器侧的通信是借助 Netty 的 Channel（网络通道）来完成的，因此**通信过程的关键在于 Channel 的创建**，在 Seata 中，通过池化的方式（借助了 common-pool 中的对象池）方式来创建、管理 Channel。

这里我们有必要简要介绍下对象池的简单概念及其在 Seata 中的实现：
涉及到的 common-pool 中的主要类：

- **GenericKeydObjectPool\<K, V>**：KV 泛型对象池，提供对所有对象的存取管理，而对象的创建由其内部的工厂类来完成
- **KeyedPoolableObjectFactory\<K, V>**：KV 泛型对象工厂，负责池化对象的创建，被对象池持有

涉及到的 Seata 中对象池实现相关的主要类：

- 首先，被池化管理的对象就是**Channel**，对应 common-pool 中的泛型 V
- **NettyPoolKey**：Channel 对应的 Key，对应 common-pool 中的泛型 K，NettyPoolKey 主要包含两个信息：
  - _address_:创建 Channel 时，对应的 TC Server 地址
  - _message_:创建 Channel 时，向 TC Server 发送的 RPC 消息体
- **GenericKeydObjectPool\<NettyPoolKey,Channel>**：Channel 对象池
- **NettyPoolableFactory**：创建 Channel 的工厂类

认识了上述对象池相关的主要类之后，我们再来看看 Seata 中涉及 Channel 管理以及与 RPC 相关的几个主要类：

- NettyClientChannelManager：
  - 持有 Channel 对象池
  - 与 Channel 对象池交互，对应用侧 Channel 进行管理（获取、释放、销毁、缓存等）
- RpcClientBootstrap：RPC 客户端核心引导类，持有 Netty 框架的 Bootstrap 对象，具备启停能力；具有根据连接地址来获取新 Channel 的能力，供 Channel 工厂类调用
- AbstractNettyRemotingClient：
  - 初始化并持有 RpcClientBootstrap
  - 应用侧 Netty 客户端的顶层抽象，抽象了应用侧 RM/TM 取得各自 Channel 对应的 NettyPoolKey 的能力，供 NettyClientChannelManager 调用
  - 初始化 NettyPoolableFactory

了解上述概念后，我们可以把 Seata 中创建 Channel 的过程简化如下：
![创建Channel对象过程](http://booogu.top/img/in-post/create_channel.jpg)

看到这里，大家可以回过头再看看上面的**RMClient 的初始化序列图**，应该会对图中各类的职责、关系，以及整个初始化过程的意图有一个比较清晰的理解了。

### 建立连接的时机与流程

那么，RMClient 是何时与 Server 建立连接的呢？

在 RMClient 初始化的过程中，大家会发现，很多 init()方法都设定了一些定时任务，而 Seata 应用侧与协调器的重连（连接）机制，就是通过定时任务来实现的：

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

我们通过跟踪一次 reconnect 的执行，看看上面探究的几个类之间是如何协作，完成 RMClient 与 TC 的连接的（实际上首次连接可能发生在 registerResource 的过程中，但流程一致）
![RMClient与TC Server连接过程](http://booogu.top/img/in-post/rmclient_connect_tcserver.png)

这个图中，大家可以重点关注这几个点：

- NettyClientChannelManager 执行具体 AbstractNettyRemotingClient 中，获取 NettyPoolKey 的回调函数（getPoolKeyFunction()）：应用侧的不同 Client（RMClient 与 TMClient），在创建 Channel 时使用的 Key 不同，使**两者在重连 TC Server 时，发送的注册消息不同**，这也是由两者在 Seata 中扮演的角色不同而决定的：
  - TMClient：扮演事务管理器角色，创建 Channel 时，仅向 TC 发送 TM 注册请求（RegisterTMRequest）即可
  - RMClient：扮演资源管理器角色，需要管理应用侧所有的事务资源，因此在创建 Channel 时，需要在发送 RM 注册请求（RegesterRMRequest）前，获取应用侧所有事务资源（Resource）信息，注册至 TC Server
- 在 Channel 对象工厂 NettyPoolableFactory 的 makeObject（制造 Channel）方法中，使用 NettyPoolKey 中的两项信息，完成了两项任务：
  - 使用 NettyPoolKey 的 address 创建新的 Channel
  - 使用 NettyPoolKey 的 message 以及新的 Channel 向 TC Server 发送注册请求，这就是 Client 向 TC Server 的连接（首次执行）或重连（非首次，由定时任务驱动执行）请求

以上内容，就是关于 Seata 应用侧的初始化及其与 TC Server 协调器侧建立连接的全过程分析。

更深层次的细节，建议大家再根据本文梳理的脉络和提到的几个重点，细致地阅读下源码，相信定会有更深层次的理解和全新的收获！

> 后记：考虑到篇幅以及保持一篇源码分析文章较为合适的信息量，本文前言中所说的**配置、注册等模块协作配合**并没有在文章中展开和体现。<br />
> 在下篇源码剖析中，我会以**配置中心**和**注册中心**为重点，为大家分析，在 RMClient/TM Client 与 TC Server 建立连接之前，Seata 应用侧是**如何通过服务发现**找到 TC Server、如何**从配置模块获取各种信息**的。
