# Seata的RPC通信源码分析01：传输篇

## 引言和概述

在分布式系统中，通信协议的设计直接影响系统的可靠性和可扩展性。Apache Seata的RPC通信协议为各组件间的数据传输提供了基础，对这方面的源码分析是深入理解seata的又一个好方式。在最近的2.2.0版本里，我为Seata的通信机制进行了重构，以支持多版本协议的兼容性，现在改造完成了，我将从传输机制和通信协议两个方面去分析新版本里源码。
本文是第一篇，介绍Seata传输机制。

seata里的RPC通信主角是`TC`、`TM`、`RM`三者，当然过程中还可能会涉及注册中心甚至配置中心等其他网络交互，但这些相对内容所使用的通信机制是相对独立的，本文不作讨论。
 
接下来我将按照我最早了解源码时的几个直觉提问，带大家进行探索。

## Seata中的Netty（谁在传输）
第一个问题：seata通信的底层是什么在进行发送请求报文和接收请求报文？答案是netty，而netty在seata里面是如何工作的呢？我们将去到core包的org.apache.seata.core.rpc.netty去探索

<img src="/img/blog/rpc_multi-protocol/01-netty-class.jpg" width="700px" />

从这个继承关系我们可以看到，`AbstractNettyRemoting`作为核心的父类，RM和TM和Server(TC)都实现了他，实际上这个类里面已经实现了核心的发送和接收

在`sendSync`实现了同步发送逻辑，异步发送`sendAsync`的逻辑相似且更简单这里不再重复，只要拿到channel进行发送即可
```java
protected Object sendSync(Channel channel, RpcMessage rpcMessage, long timeoutMillis) throws TimeoutException {
        // 此处省略非关键代码

        MessageFuture messageFuture = new MessageFuture();
        messageFuture.setRequestMessage(rpcMessage);
        messageFuture.setTimeout(timeoutMillis);
        futures.put(rpcMessage.getId(), messageFuture);

        channelWritableCheck(channel, rpcMessage.getBody());

        String remoteAddr = ChannelUtil.getAddressFromChannel(channel);
        doBeforeRpcHooks(remoteAddr, rpcMessage);

        // netty的写方法(netty write)
        channel.writeAndFlush(rpcMessage).addListener((ChannelFutureListener) future -> {
            if (!future.isSuccess()) {
                MessageFuture messageFuture1 = futures.remove(rpcMessage.getId());
                if (messageFuture1 != null) {
                    messageFuture1.setResultMessage(future.cause());
                }
                destroyChannel(future.channel());
            }
        });

        try {
            Object result = messageFuture.get(timeoutMillis, TimeUnit.MILLISECONDS);
            doAfterRpcHooks(remoteAddr, rpcMessage, result);
            return result;
        } catch (Exception exx) {
            // 此处省略非关键代码
        }
    }
```
而接收报文的方式，主要在processMessage方法里，这个方法被`AbstractNettyRemotingClient.ClientHandler`和`AbstractNettyRemotingServer.ServerHandler`这两个类的channelRead调用，这两个内部类都是`ChannelDuplexHandler`的子类，他们各自注册在client和server的Bootstrap里（为什么注册到bootstrap就能进行接收操作？这个要移步netty的原理 [Netty data model, threading, and gotchas](https://medium.com/@akhaku/netty-data-model-threading-and-gotchas-cab820e4815a#:~:text=A%20Netty%20Channel%20is%20a,datagrams%20on%20a%20local%20port.)）

<img src="/img/blog/rpc_multi-protocol/03-netty-handler.jpg" width="700px" />

收到信息后就会调进父类的`processMessage`方法里，我们来看看源码
```java
protected void processMessage(ChannelHandlerContext ctx, RpcMessage rpcMessage) throws Exception {
        // 此处省略非关键代码
        Object body = rpcMessage.getBody();
        if (body instanceof MessageTypeAware) {
            MessageTypeAware messageTypeAware = (MessageTypeAware) body;
            final Pair<RemotingProcessor, ExecutorService> pair = this.processorTable.get((int) messageTypeAware.getTypeCode());
            if (pair != null) {
                // 这里可读性稍微差点，first是Processor，表示普通处理，而second是线程池，表示池化处理。
                if (pair.getSecond() != null) {
                    try {
                        pair.getSecond().execute(() -> {
                            try {
                                pair.getFirst().process(ctx, rpcMessage);
                            } catch (Throwable th) {
                                LOGGER.error(FrameworkErrorCode.NetDispatch.getErrCode(), th.getMessage(), th);
                            } finally {
                                MDC.clear();
                            }
                        });
                    } catch (RejectedExecutionException e) {
                        // 此处省略非关键代码
                    }
                } else {
                    try {
                        pair.getFirst().process(ctx, rpcMessage);
                    } catch (Throwable th) {
                        LOGGER.error(FrameworkErrorCode.NetDispatch.getErrCode(), th.getMessage(), th);
                    }
                }
            } else {
                LOGGER.error("This message type [{}] has no processor.", messageTypeAware.getTypeCode());
            }
        } else {
            LOGGER.error("This rpcMessage body[{}] is not MessageTypeAware type.", body);
        }
    }
```
实际上这些processor和executor是client和server注册进来的处理器：下面是一部分的处理器，他们对应着不同的MessageType，以下是部分处理器的注册举例（他们在NettyRemotingServer#registerProcessor）
```java
        super.registerProcessor(MessageType.TYPE_GLOBAL_ROLLBACK, onRequestProcessor, messageExecutor);
        super.registerProcessor(MessageType.TYPE_GLOBAL_STATUS, onRequestProcessor, messageExecutor);
        super.registerProcessor(MessageType.TYPE_SEATA_MERGE, onRequestProcessor, messageExecutor);
        super.registerProcessor(MessageType.TYPE_BRANCH_COMMIT_RESULT, onResponseProcessor, branchResultMessageExecutor);
        super.registerProcessor(MessageType.TYPE_BRANCH_ROLLBACK_RESULT, onResponseProcessor, branchResultMessageExecutor);
        super.registerProcessor(MessageType.TYPE_REG_RM, regRmProcessor, messageExecutor);
        super.registerProcessor(MessageType.TYPE_REG_CLT, regTmProcessor, null);
```
可以看到这些processor实际上就是seata各种提交回滚等等的处理器

## Seata中的NettyChannel（channel怎么管理）
那第二个问题，既然上面是netty依靠着channel在进行着收发，那这个channel怎么来呢？会一直持有吗？如果断了怎么重连？答案在`ChannelManager`和上面的两个reg的`processor`。

当RM/TM取得了server的地址，进行注册的时候（第一次通信），如果server能成功解析报文并发现是REG信息，就会进入`regRmProcessor`/`regTmProcessor`，这里以TM为例子
```java
// server接收 RegTmProcessor
    private void onRegTmMessage(ChannelHandlerContext ctx, RpcMessage rpcMessage) {
        RegisterTMRequest message = (RegisterTMRequest) rpcMessage.getBody();
        String ipAndPort = NetUtil.toStringAddress(ctx.channel().remoteAddress());
        Version.putChannelVersion(ctx.channel(), message.getVersion());
        boolean isSuccess = false;
        String errorInfo = StringUtils.EMPTY;
        try {
            if (null == checkAuthHandler || checkAuthHandler.regTransactionManagerCheckAuth(message)) {
                // 在ChannelManager中注册channel，这里可以预见到注册之后，server进行sendSync(channel,xxx)的时候就可以拿到这个channel了
                ChannelManager.registerTMChannel(message, ctx.channel());
                Version.putChannelVersion(ctx.channel(), message.getVersion());
                isSuccess = true;
            }
        } catch (Exception exx) {
            isSuccess = false;
            errorInfo = exx.getMessage();
            LOGGER.error("TM register fail, error message:{}", errorInfo);
        }
        RegisterTMResponse response = new RegisterTMResponse(isSuccess);
        // 异步回复
        remotingServer.sendAsyncResponse(rpcMessage, ctx.channel(), response);
        // 此处省略非关键代码
    }

//    ChannelManager
    public static void registerTMChannel(RegisterTMRequest request, Channel channel)
        throws IncompatibleVersionException {
        RpcContext rpcContext = buildChannelHolder(NettyPoolKey.TransactionRole.TMROLE, request.getVersion(),
            request.getApplicationId(),
            request.getTransactionServiceGroup(),
            null, channel);
        rpcContext.holdInIdentifiedChannels(IDENTIFIED_CHANNELS);
        String clientIdentified = rpcContext.getApplicationId() + Constants.CLIENT_ID_SPLIT_CHAR + ChannelUtil.getClientIpFromChannel(channel);
        ConcurrentMap<Integer, RpcContext> clientIdentifiedMap = CollectionUtils.computeIfAbsent(TM_CHANNELS, clientIdentified, key -> new ConcurrentHashMap<>());
        rpcContext.holdInClientChannels(clientIdentifiedMap);
    }
```
在ChannelManager里管理着`RM_CHANNELS`和`RM_CHANNELS`两个比较复杂的map，特别是RM_CHANNELS里面有4层（resourceId -> applicationId -> ip -> port -> RpcContext）

说完了server对channel的管理，那client呢？这个map管理更简单一些，就是注册成功后在onRegisterMsgSuccess里面也用一个`NettyClientChannelManager`里registerChannel，后续跟server交互尽量都用这个channel。

那么第三个问题又来了，client的channel不可用了可以自行新建，可是server接收后发现这是新channel怎么办？或者server在异步回复的时候发现channel不可用了怎么办？
答案依然在`NettyClientChannelManager`，这里面相对复杂的是，client方面需要用到channel的时候，实际上由一个对象池`nettyClientKeyPool`管理着，这是个apache的objectPool，所以当channel不可用时也会由这个池子去新增并在使用完后入池。这个对象池实际上是一直持有着`RegisterTMRequest`，跟第一次进来时一样，每次创建需要创建channel的时候，实际上都发生了一次注册
```java
// NettyClientChannelManager
    public Channel makeObject(NettyPoolKey key) {
        InetSocketAddress address = NetUtil.toInetSocketAddress(key.getAddress());
        if (LOGGER.isInfoEnabled()) {
            LOGGER.info("NettyPool create channel to " + key);
        }
        Channel tmpChannel = clientBootstrap.getNewChannel(address);
        Object response;
        Channel channelToServer = null;
        // key持有RegisterTMRequest
        if (key.getMessage() == null) {
            throw new FrameworkException("register msg is null, role:" + key.getTransactionRole().name());
        }
        try {
            // 实际上是在进行reg操作
            response = rpcRemotingClient.sendSyncRequest(tmpChannel, key.getMessage());
            if (!isRegisterSuccess(response, key.getTransactionRole())) {
                rpcRemotingClient.onRegisterMsgFail(key.getAddress(), tmpChannel, response, key.getMessage());
            } else {
                channelToServer = tmpChannel;
                // 成功后会入池
                rpcRemotingClient.onRegisterMsgSuccess(key.getAddress(), tmpChannel, response, key.getMessage());
            }
        }
        // 此处省略非关键代码

        return channelToServer;
    }
```

## 最后
这一篇我们了解了seata是怎样借助netty来传输数据的，为了更好的看懂netty处理的全貌，我画了个层级图

<img src="/img/blog/rpc_multi-protocol/00-netty-layer.png" width="700px" />

上面已经讲了请求发送时，serverHandler/clientHandler和NettyRemoting(包括RM、TM、TC)的处理，知道了从外部到netty处理器再到内部的DefaultCoodinator的过程，但我们还缺Decoder/Encoder没讲，这里面会进行协议的解析/封装，也会进行序列化和反序列化，请看 [Seata的RPC通信源码分析02：协议篇](seata-rpc-multi-protocol02.md)


