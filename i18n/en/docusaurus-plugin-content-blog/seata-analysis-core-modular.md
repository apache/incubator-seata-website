---
title: Seata Core Module Source Code Analysis
author: runze.zhao
keywords: [Seata, distributed transaction]
date: 2019/12/23
---

## 1. Introduction

The core module defines the types and states of transactions, common behaviors, protocols, and message models for communication between clients and servers, as well as exception handling methods, compilation, compression types, configuration information names, environment context, etc. It also encapsulates RPC based on Netty for use by both clients and servers.

Let's analyze the main functional classes of the core module according to the package order:

![Image Description](https://img-blog.csdnimg.cn/20191223162313317.png)

codec: Defines a codec factory class, which provides a method to find the corresponding processing class based on the serialization type. It also provides an interface class Codec with two abstract methods:

```java
<T> byte[] encode(T t);
```

```java
<T> T decode(byte[] bytes);
```

## 1. codec Module

In version 1.0, the codec module has three serialization implementations: SEATA, PROTOBUF, and KRYO.

compressor: Similar to classes under the codec package, there are three classes here: a compression type class, a factory class, and an abstract class for compression and decompression operations. In version 1.0, there is only one compression method: Gzip.

constants: Consists of two classes, ClientTableColumnsName and ServerTableColumnsName, representing the models for transaction tables stored on the client and server sides respectively. It also includes classes defining supported database types and prefixes for configuration information attributes.

context: The environment class RootContext holds a ThreadLocalContextCore to store transaction identification information. For example, TX_XID uniquely identifies a transaction, and TX_LOCK indicates the need for global lock control for local transactions on update/delete/insert/selectForUpdate SQL operations.

event: Utilizes the Guava EventBus event bus for registration and notification, implementing the listener pattern. In the server module's metrics package, MetricsManager registers monitoring events for changes in GlobalStatus, which represents several states of transaction processing in the server module. When the server processes transactions, the callback methods registered for monitoring events are invoked, primarily for statistical purposes.

lock: When the server receives a registerBranch message for branch registration, it acquires a lock. In version 1.0, there are two lock implementations: DataBaseLocker and MemoryLocker, representing database locks and in-memory locks respectively. Database locks are acquired based on the rowKey = resourceId + tableName + pk, while memory locks are based directly on the primary key.

model: BranchStatus, GlobalStatus, and BranchType are used to define transaction types and global/branch states. Additionally, TransactionManager and ResourceManager are abstract classes representing resource managers (RMs) and transaction managers (TMs) respectively. Specific implementations of RMs and TMs are not provided here due to variations in transaction types.

protocol: Defines entity classes used for transmission in the RPC module, representing models for requests and responses under different transaction status scenarios.

store: Defines data models for interacting with databases and the SQL statements used for database interactions.

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

## 2. Analysis of Exception Handling in the exception Package

This is the UML diagram of AbstractExceptionHandler. Callback and AbstractCallback are internal interfaces and classes of AbstractExceptionHandler. AbstractCallback implements three methods of the Callback interface but leaves the execute() method unimplemented. AbstractExceptionHandler uses AbstractCallback as a parameter for the template method and utilizes its implemented methods. However, the execute() method is left to be implemented by subclasses.

![Image Description](https://img-blog.csdnimg.cn/20191211165628768.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3ODA0NzM3,size_16,color_FFFFFF,t_70)

From an external perspective, AbstractExceptionHandler defines a template method with exception handling. The template includes four behaviors, three of which are already implemented, and the behavior execution is delegated to subclasses.

## 3. Analysis of the rpc Package

When it comes to the encapsulation of RPC by Seata, one need not delve into the details. However, it's worth studying how transaction business is handled.

The client-side RPC class is AbstractRpcRemotingClient:

![Image Description](https://img-blog.csdnimg.cn/20191211180129741.png)

The important attributes and methods are depicted in the class diagram. The methods for message sending and initialization are not shown in the diagram. Let's analyze the class diagram in detail:

clientBootstrap: This is a wrapper class for the netty startup class Bootstrap. It holds an instance of Bootstrap and customizes the properties as desired.

clientChannelManager: Manages the correspondence between server addresses and channels using a ConcurrentHashMap\<serverAddress,channel> container.

clientMessageListener: Handles messages. Depending on the message type, there are three specific processing methods.

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

## 4. Analysis of the rpc Package (Continued)

Within the message class, the TransactionMessageHandler is responsible for handling messages of different types. Eventually, based on the different transaction types (AT, TCC, SAGE), specific handling classes, as mentioned in the second part, exceptionHandleTemplate(), are invoked.

mergeSendExecutorService: This is a thread pool with only one thread responsible for merging and sending messages from different addresses. In the sendAsyncRequest() method, messages are offered to the queue LinkedBlockingQueue of the thread pool. The thread is then responsible for polling and processing messages.

channelRead(): Handles server-side HeartbeatMessage.PONG heartbeat messages. Additionally, it processes MergeResultMessage, which are response messages for asynchronous messages. It retrieves the corresponding MessageFuture based on the msgId and sets the result of the asynchronous message.

dispatch(): Invokes the clientMessageListener to handle messages sent by the server. Different types of requests have different handling classes.

In summary, when looking at Netty, one should focus on serialization methods and message handling handler classes. Seata's RPC serialization method is processed by finding the Codec implementation class through the factory class, and the handler is the TransactionMessageHandler mentioned earlier.

## 5. Conclusion

The core module covers a wide range of functionalities, with most classes serving as abstract classes for other modules. Business models are abstracted out, and specific implementations are distributed across different modules. The code in the core module is of high quality, with many classic design patterns such as the template pattern discussed earlier. It is very practical and well-crafted, deserving careful study.

## 6. Seata Source Code Analysis Series Links

[Series Links](https://blog.csdn.net/qq_37804737/category_9530078.html)
