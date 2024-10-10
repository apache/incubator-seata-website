---
title: Seata's RPC Communication Source Code Analysis 01(Transport)
author: Xie Minghua
keywords: [Seata, RPC Module, Protocol ]
date: 2024/08/15
---
# Seata's RPC Communication Source Code Analysis 01(Transport)

## Overview

In a distributed system, the design of the communication protocol directly affects the reliability and scalability of the system. apache Seata's RPC communication protocol provides the basis for data transfer between components, and source code analysis in this regard is another good way to gain a deeper understanding of seata. In the recent version 2.2.0, I refactored Seata's communication mechanism to support multi-version protocol compatibility, now that the transformation is complete, I will analyze the source code in the new version from the two aspects of the transport mechanism and communication protocol.
This article is the first one to introduce the Seata transport mechanism.

The main characters of RPC communication in seata are `TC`, `TM` and `RM`, of course, the process may also involve other network interactions such as the registration center and even the configuration center, but these relative contents of the communication mechanism is relatively independent, and will not be discussed in this article.

I will take you on an exploration following a few intuitive questions I asked when I first learned about the source code.

## Netty in Seata (who's transmitting)
First question: what is the underlying layer of seata communication responsible for the sending of request messages and receiving of request messages? The answer is Netty, and how does Netty work inside Seata? We will explore the core package org.apache.seata.core.rpc.netty to find out.

<img src="/img/blog/rpc_multi-protocol/01-netty-class.jpg" width="700px" />

From this inheritance hierarchy we can see that `AbstractNettyRemoting` acts as the parent class of the core, which is implemented by RM and TM and Server(TC), and in fact the core send and receive are already implemented inside this class.

The synchronous sending logic is implemented in `sendSync`, the logic for asynchronous sending `sendAsync` is similar and simpler, so I won't repeat it here, just get the channel and send it.
```java
protected Object sendSync(Channel channel, RpcMessage rpcMessage, long timeoutMillis) throws TimeoutException {
        // Non-critical code omitted here

        MessageFuture messageFuture = new MessageFuture();
        messageFuture.setRequestMessage(rpcMessage);
        messageFuture.setTimeout(timeoutMillis);
        futures.put(rpcMessage.getId(), messageFuture);

        channelWritableCheck(channel, rpcMessage.getBody());

        String remoteAddr = ChannelUtil.getAddressFromChannel(channel);
        doBeforeRpcHooks(remoteAddr, rpcMessage);

        // (netty write)
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
            // Non-critical code omitted here
        }
    }
```
And the way messages are received is mainly in the processMessage method, which is called by the classes `AbstractNettyRemotingClient.ClientHandler` and `AbstractNettyRemotingServer.ServerHandler`. ChannelRead, both of which are subclasses of `ChannelDuplexHandler`, are each registered in the client and server bootstrap (why register to the bootstrap to be able to do the receiving?). You have to move to the netty principle for this one)

<img src="/img/blog/rpc_multi-protocol/03-netty-handler.jpg" width="700px" />

Once the message is received it is called into the `processMessage` method of the parent class, let's take a look at the source code
```java
protected void processMessage(ChannelHandlerContext ctx, RpcMessage rpcMessage) throws Exception {
        // Non-critical code
        Object body = rpcMessage.getBody();
        if (body instanceof MessageTypeAware) {
            MessageTypeAware messageTypeAware = (MessageTypeAware) body;
            final Pair<RemotingProcessor, ExecutorService> pair = this.processorTable.get((int) messageTypeAware.getTypeCode());
            if (pair != null) {
                // FIRST is Processor for normal processing, and SECOND is Thread Pool for pooled processing.
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
                        // Non-critical code
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
These processors and executors are actually processors registered by the client and server: here are some of the processors, which correspond to different MessageTypes, and here is an example of the registration of some of them (they are registered in the NettyRemotingServer# registerProcessor)
```java
        super.registerProcessor(MessageType.TYPE_GLOBAL_ROLLBACK, onRequestProcessor, messageExecutor);
        super.registerProcessor(MessageType.TYPE_GLOBAL_STATUS, onRequestProcessor, messageExecutor);
        super.registerProcessor(MessageType.TYPE_SEATA_MERGE, onRequestProcessor, messageExecutor);
        super.registerProcessor(MessageType.TYPE_BRANCH_COMMIT_RESULT, onResponseProcessor, branchResultMessageExecutor);
        super.registerProcessor(MessageType.TYPE_BRANCH_ROLLBACK_RESULT, onResponseProcessor, branchResultMessageExecutor);
        super.registerProcessor(MessageType.TYPE_REG_RM, regRmProcessor, messageExecutor);
        super.registerProcessor(MessageType.TYPE_REG_CLT, regTmProcessor, null);
```
You can see that these processors are actually the processors for seata's various commit rollbacks and so on.

##  NettyChannel in Seata (how channels are managed)
So, the second question, since netty relies on a channel to send and receive, how will this channel come about? Will it always be held? If it breaks, how do we reconnect it? The answer can be found in the `ChannelManager` and the `processor` of the two regs above.

When RM/TM gets the address of the server and registers (the first time it communicates), if the server can successfully parse the message and find it is a REG message, it will enter `regRmProcessor`/`regTmProcessor`, take TM as an example here.

```java
// server RegTmProcessor
    private void onRegTmMessage(ChannelHandlerContext ctx, RpcMessage rpcMessage) {
        RegisterTMRequest message = (RegisterTMRequest) rpcMessage.getBody();
        String ipAndPort = NetUtil.toStringAddress(ctx.channel().remoteAddress());
        Version.putChannelVersion(ctx.channel(), message.getVersion());
        boolean isSuccess = false;
        String errorInfo = StringUtils.EMPTY;
        try {
            if (null == checkAuthHandler || checkAuthHandler.regTransactionManagerCheckAuth(message)) {
                // Register the channel in the ChannelManager, it can be expected that after the registration, the server will be able to get the channel when it sendsSync(channel,xxx).
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
        // async response
        remotingServer.sendAsyncResponse(rpcMessage, ctx.channel(), response);
        // ...
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
The ChannelManager manages `RM_CHANNELS` and `RM_CHANNELS`, two complex maps, especially RM_CHANNELS which has 4 layers (resourceId -> applicationId -> ip -> port -> RpcContext).

Having said that the server manages the channel, what about the client? This map management is a little simpler, that is, after successful registration in the onRegisterMsgSuccess also use a `NettyClientChannelManager` in registerChannel, subsequent interaction with the server as much as possible with this channel.

The third problem is that the client can create a new channel if the channel is not available,
but what if the server receives it and realizes that it is a new channel?
Or what if the server realizes that the channel is not available when it replies asynchronously?
The answer is still in the `NettyClientChannelManager`, which is relatively complex, the client side need to use the channel,
in fact, managed by an object pool `nettyClientKeyPool`, which is an apache object pool,
so when the channel is unavailable, it will also be managed by this pool.
This is an Apache objectPool, Thus, when the channel is unavailable, it will be created with the help of this pool and then returned to the pool after use.
This object pool actually holds the `RegisterTMRequest` at all times, just as it did when it first came in,
so every time a channel is created , a registration occurs.
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
        // key RegisterTMRequest
        if (key.getMessage() == null) {
            throw new FrameworkException("register msg is null, role:" + key.getTransactionRole().name());
        }
        try {
            // a register operation
            response = rpcRemotingClient.sendSyncRequest(tmpChannel, key.getMessage());
            if (!isRegisterSuccess(response, key.getTransactionRole())) {
                rpcRemotingClient.onRegisterMsgFail(key.getAddress(), tmpChannel, response, key.getMessage());
            } else {
                channelToServer = tmpChannel;
                rpcRemotingClient.onRegisterMsgSuccess(key.getAddress(), tmpChannel, response, key.getMessage());
            }
        }
        // ...

        return channelToServer;
    }
```

## Summarize
In this article we learned how seata transfers data with the help of netty, to better see the full picture of netty processing, I created a hierarchical diagram

<img src="/img/blog/rpc_multi-protocol/00-netty-layer.png" width="700px" />

We have already talked about the processing of serverHandler/clientHandler and NettyRemoting (including RM, TM, TC) when the request is sent, and we know the process from the external to the netty processor and then to the internal DefaultCoordinator, but we are still missing Decoder/Encoder. Didn't talk about it, the parsing/encapsulation of the protocol will be done here, serialization and deserialization will also be done, see [Seata's RPC Communication Source Code Analysis 02(Protocol)](seata-rpc-multi-protocol02.md)

