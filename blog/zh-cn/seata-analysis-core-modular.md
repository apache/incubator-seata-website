---
title: Seata core 模块源码分析
author: 赵润泽
keywords: Seata、分布式事务
date: 2019/12/23
---

## 一  . 导读
core 模块定义了事务的类型、状态，通用的行为，client 和 server 通信时的协议和消息模型，还有异常处理方式，编译、压缩类型方式，配置信息名称，环境context等，还基于 netty 封装了 rpc ，供客户端和服务端使用。

按包顺序来分析一下 core 模块主要功能类：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191223162313317.png)

codec：定义了一个 codec 的工厂类，提供了一个方法，根据序列化类型来找对应的处理类。还提供了一个接口类 Codec ，有两个抽象方法：

```java
<T> byte[] encode(T t);
```

```java
<T> T decode(byte[] bytes);
```
目前1.0版本在 codec 模块，有三种序列化的实现：SEATA、PROTOBUF、KRYO。

compressor：和codec包下面类一样，都是三个类，一个压缩类型类，一个工厂类，一个压缩和解压缩操作的抽象类。1.0版本就只有一种压缩方式：Gzip

constants：两个ClientTableColumnsName、ServerTableColumnsName类，分别是 client 端存储事务的表和 server 端存储事务表对应的model类。还有定义支持的数据库类型类和一些定义配置信息属性的前缀的类。

context：环境类 RootContext 持有一个 ThreadLocalContextCore 用来存储事务的标识信息。比如 TX_XID 用来唯一的表示一个事务。TX_LOCK  如果存在，则表示本地事务对于 update/delete/insert/selectForUpdate SQL 需要用全局锁控制。

event：这里用到了 guava 中 EventBus 事件总线来进行注册和通知，监听器模式。在 server 模块的 metrics 包中，MetricsManager 在初始化的时候，对 GlobalStatus 即 server 模块处理事务的几个状态变化时，注册了监挺事件，当 server 处理事务时，会回调监听的方法，主要是为了进行统计各种状态事务的数量。

lock：	server 在收到 registerBranch 消息进行分支注册的时候，会加锁。1.0版本有两种锁的实现，DataBaseLocker 和 MemoryLocker，分别是数据库锁和内存锁，数据库锁根据 rowKey = resourceId + tableName + pk 进行加锁，内存锁直接就是根据 primary key。

model：BranchStatus、GlobalStatus、BranchType 用来定义事务的类型和全局、分支状态。还有TransactionManager和ResourceManager，是 rm 和 tm 的抽象类。具体的 rm 和 tm 的实现，因为各种事务类型都不同，所以这里没有具体的实现类。

protocol：定义了 rpc 模块传输用的实体类，即每个事务状态场景下 request 和 response 的model。

store：定了与数据库打交道的数据模型，和与数据库交互的语句。

## 二  . exception 包中 handler 类分析
这是 AbstractExceptionHandler 的 UML 图，Callback 、AbstractCallback 是 AbstractExceptionHandler 的内部接口和内部类，AbstractCallback 抽象类实现了接口 Callback 的三个方法，还有一个 execute() 未实现。AbstractExceptionHandler 使用了 AbstractCallback 作为模板方法的参数，并使用了其实现的三个方法，但是 execute() 方法仍留给子类实现。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191211165628768.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3ODA0NzM3,size_16,color_FFFFFF,t_70)
从对外暴露的角度看 AbstractExceptionHandler 定义了一个带有异常处理的模板方法，模板中有四个行为，在不同的情况下执行，其中三种行为已经实现，执行的行为交由子类自行实现，详解：

1.使用模板方法模式，在 exceptionHandlerTemplate() 中，定义好了执行的模板

```java
    public void exceptionHandleTemplate(Callback callback, AbstractTransactionRequest request,
        AbstractTransactionResponse response) {
        try {
            callback.execute(request, response); //执行事务业务的方法
            callback.onSuccess(request, response); //设置response返回码
        } catch (TransactionException tex) {
            LOGGER.error("Catch TransactionException while do RPC, request: {}", request, tex);
            callback.onTransactionException(request, response, tex); //设置response返回码并设置msg
        } catch (RuntimeException rex) {
            LOGGER.error("Catch RuntimeException while do RPC, request: {}", request, rex);
            callback.onException(request, response, rex);  //设置response返回码并设置msg
        }
    }
```
onSuccess、onTransactionException、onException 在 AbstarctCallback 中已经被实现，execute 则由AbstractExceptionHandler 子类即负责不同事务模式的 handler 类进行实现。
AbstractExceptionHandler 目前有两个子类：AbstractTCInboundHandler 负责处理全局事务的业务，AbstractRMHandler 负责处理分支事务的业务。

2.使用回调机制，优点是：允许 AbstractExceptionHandler 把需要调用的类 Callback 作为参数传递进来，handler 不需要知道 callback 的具体执行逻辑，只要知道 callback 的特性原型和限制条件(参数、返回值)，就可以使用了。

先使用模板方法，把事务业务流程定下来，再通过回调，把具体执行事务业务的方法，留给子类实现。设计的非常巧妙。

这个 exceptionHandlerTemplate() 应该翻译成带有异常处理的模板方法。异常处理已经被抽象类实现，具体的不同模式下 commit 、rollback 的业务处理则交给子类实现。

## 三  . rpc 包分析
seata 对于 rpc 的封装，细节不需要纠结，可以研究一下一下对于事务业务的处理。

client 端的 rpc 类是 AbstractRpcRemotingClient：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191211180129741.png)

重要的属性和方法都在类图中，消息发送和初始化方法没画在类图中，详细分析一下类图：

clientBootstrap：是 netty 启动类 Bootstrap 的封装类，持有了 Bootstrap 的实例，并自定义自己想要的属性。

clientChannelManager：使用 ConcurrentHashMap<serverAddress,channel> 容器维护地址和 channel 的对应关系。

clientMessageListener： 消息的处理类，根据消息的类型的不同有三种具体的处理方法

```java
public void onMessage(RpcMessage request, String serverAddress, ClientMessageSender sender) {
        Object msg = request.getBody();
        if (LOGGER.isInfoEnabled()) {
            LOGGER.info("onMessage:" + msg);
        }
        if (msg instanceof BranchCommitRequest) {
            handleBranchCommit(request, serverAddress, (BranchCommitRequest)msg, sender);
        } else if (msg instanceof BranchRollbackRequest) {
            handleBranchRollback(request, serverAddress, (BranchRollbackRequest)msg, sender);
        } else if (msg instanceof UndoLogDeleteRequest) {
            handleUndoLogDelete((UndoLogDeleteRequest)msg);
        }
    }
```
消息类中，持有 TransactionMessageHandler 对不同类型消息进行处理，最终会根据事务类型的不同（AT、TCC、SAGE）调用具体的处理类，即第二部分说的 exceptionHandleTemplate() 的实现类。

mergeSendExecutorService：是一个线程池，只有一个线程，负责对不同地址下的消息进行和并发送。在 sendAsyncRequest() 中，会给线程池的队列LinkedBlockingQueue<>  offer 消息，然后这个线程负责 poll 和处理消息。

channelRead()：处理服务端的 HeartbeatMessage.PONG 心跳消息。还有消息类型是 MergeResultMessage 即异步消息的响应消息，根据 msgId 找到对应 MessageFuture ，并设置异步消息的 result 结果。

dispatch()：调用 clientMessageListener 处理 server 发送过来的消息，不同类型 request 有不同的处理类。

简单点看 netty，只需要关注序列化方式和消息处理handler类。seata 的 rpc 序列化方式通过工厂类找 Codec 实现类进行处理，handler 即上文说的 TransactionMessageHandler 。

## 四  . 总结
core 模块涉及的功能很多，其中的类大多都是其他模块的抽象类。抽象出业务模型，具体的实现分布在不同的模块。core 模块的代码非常的优秀，很多设计都是经典，比如上文分析的基于模板模式改造的，非常实用也非常美，值得仔细研究。

## 五  . seata源码分析系列地址
[系列地址](https://blog.csdn.net/qq_37804737/category_9530078.html)
