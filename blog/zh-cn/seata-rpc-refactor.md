---
title: Seata RPC 模块的重构之路 author: 张乘辉 keywords: Seata、RPC模块、重构 description:
date: 2020/07/13
---

# 前言

RPC 模块是我最初研究 Seata 源码开始的地方，因此我对 Seata 的 RPC 模块有过一些深刻研究，在我研究了一番后，发现 RPC 模块中的代码需要进行优化，使得代码更加优雅，交互逻辑更加清晰易懂，本着 “**让天下没有难懂的
RPC 通信代码**” 的初衷，我开始了 RPC 模块的重构之路。

这里建议想要深入了解 Seata 交互细节的，不妨从 RPC 模块的源码入手，RPC 模块相当于 Seata 的中枢，Seata 所有的交互逻辑在 RPC 模块中表现得淋漓尽致。

这次 RPC 模块的重构将会使得 Seata 的中枢变得更加健壮和易于解读。

# 重构继承关系

在 Seata 的旧版本中，RPC 模块的整体结构有点混乱，尤其是在各个类的继承关系上，主要体现在：

1. 直接在 Remoting 类继承 Netty Handler，使得 Remoting 类与 Netty Handler 处理逻辑耦合在一起；
2. 客户端和服务端的 Reomting 类继承关系不统一；
3. RemotingClient 被 RpcClientBootstrap 实现，而 RemotingServer 却被 RpcServer 实现，没有一个独立的 ServerBootstrap，这个看起来关系非常混乱；
4. 有些接口没必要抽取出来，比如 ClientMessageSender、ClientMessageListener、ServerMessageSender 等接口，因这些接口会增加整体结构继承关系的复杂性。

针对上面发现的问题，在重构过程中我大致做了如下事情：

1. 将 Netty Handler 抽象成一个内部类放在 Remoting 类中；
2. 将 RemotingClient 为客户端顶级接口，定义客户端与服务端交互的基本方法，抽象一层 AbstractNettyRemotingClient，下面分别有
   RmNettyRemotingClient、TmNettyRemotingClient；将 RemotingServer 为服务端顶级接口，定义服务端与客户端交互的基本方法，实现类 NettyRemotingServer；
3. 同时将 ClientMessageSender、ClientMessageListener、ServerMessageSender 等接口方法归入到 RemotingClient、RemotingServer 中，由 Reomting
   类实现 RemotingClient、RemotingServer，统一 Remoting 类继承关系；
4. 新建 RemotingBootstrap 接口，客户端和服务端分别实现 NettyClientBootstrap、NettyServerBootstrap，将引导类逻辑从 Reomting 类抽离出来。

在最新的 RPC 模块中的继承关系简单清晰，用如下类关系图表示：

![](https://gitee.com/objcoding/md-picture/raw/master/img/20200711111637.png)

1. AbstractNettyRemoting：Remoting 类的最顶层抽象，包含了客户端和服务端公用的成员变量与公用方法，拥有通用的请求方法（文章后面会讲到），Processor 处理器调用逻辑（文章后面会讲到）；
2. RemotingClient：客户端最顶级接口，定义客户端与服务端交互的基本方法；
3. RemotingServer：服务端最顶级接口，定义服务端与客户端交互的基本方法；
4. AbstractNettyRemotingClient：客户端抽象类，继承 AbstractNettyRemoting 类并实现了 RemotingClient 接口；
5. NettyRemotingServer：服务端实现类，继承 AbstractNettyRemoting 类并实现了 RemotingServer 接口；
6. RmNettyRemotingClient：Rm 客户端实现类，继承 AbstractNettyRemotingClient 类；
7. TmNettyRemotingClient：Tm 客户端实现类，继承 AbstractNettyRemotingClient 类。

同时将客户端和服务端的引导类逻辑抽象出来，如下类关系图表示：

![](https://gitee.com/objcoding/md-picture/raw/master/img/20200510225359.png)

1. RemotingBootstrap：引导类接口，有 start 和 stop 两个抽象方法；
2. NettyClientBootstrap：客户端引导实现类；
3. NettyServerBootstrap：服务端引导实现类。

# 解耦处理逻辑

解耦处理逻辑即是将 RPC 交互的处理逻辑从 Netty Handler 中抽离出来，并将处理逻辑抽象成一个个 Processor，为什么要这么做呢？我大致讲下现在存在的一些问题：

1. Netty Handler 与 处理逻辑是糅合在一起的，由于客户端与服务端都共用了一套处理逻辑，因此为了兼容更多的交互，在处理逻辑中你可以看到非常多难以理解的判断逻辑；
2. 在 Seata 的交互中有些请求是异步处理的，也有一些请求是同步处理的，但是在旧的处理代码逻辑中对同步异步处理的表达非常隐晦，而且难以看明白；
3. 无法从代码逻辑当中清晰地表达出请求消息类型与对应的处理逻辑关系；
4. 在 Seata 后面的更新迭代中，如果不将处理处理逻辑抽离出来，这部分代码想要增加新的交互逻辑，将会非常困难。

在将处理逻辑从 Netty Handler 进行抽离之前，我们先梳理一下 Seata 现有的交互逻辑：

- RM 客户端请求服务端的交互逻辑：

![](https://gitee.com/objcoding/md-picture/raw/master/img/Xnip2020-05-12_21-41-45.png)

- TM 客户端请求服务端的交互逻辑：

![](https://gitee.com/objcoding/md-picture/raw/master/img/Xnip2020-05-12_21-44-04.png)

- 服务端请求 RM 客户端的交互逻辑：

![](https://gitee.com/objcoding/md-picture/raw/master/img/20200513000620.png)

从以上的交互图中可以清晰地看到了 Seata 的交互逻辑。

客户端总共接收服务端的消息：

1）服务端请求消息

1. BranchCommitRequest、BranchRollbackRequest、UndoLogDeleteRequest

2）服务端响应消息

1. RegisterRMResponse、BranchRegisterResponse、BranchReportResponse、GlobalLockQueryResponse
2.
RegisterTMResponse、GlobalBeginResponse、GlobalCommitResponse、GlobalRollbackResponse、GlobalStatusResponse、GlobalReportResponse
3. HeartbeatMessage(PONG)

服务端总共接收客户端的消息：

1）客户端请求消息：

1. RegisterRMRequest、BranchRegisterRequest、BranchReportRequest、GlobalLockQueryRequest
2.
RegisterTMRequest、GlobalBeginRequest、GlobalCommitRequest、GlobalRollbackRequest、GlobalStatusRequest、GlobalReportRequest
3. HeartbeatMessage(PING)

2）客户端响应消息：

1. BranchCommitResponse、BranchRollbackResponse

基于以上的交互逻辑分析，我们可以将处理消息的逻辑抽象成若干个 Processor，一个 Processor 可以处理一个或者多个消息类型的消息，只需在 Seata 启动时注册将消息类型注册到 ProcessorTable
中即可，形成一个映射关系，这样就可以根据消息类型调用对应的 Processor 对消息进行处理，用如下图表示：

![](https://gitee.com/objcoding/md-picture/raw/master/img/Xnip2020-05-12_22-09-17.png)

在抽象 Remoting 类中定一个 processMessage 方法，方法逻辑是根据消息类型从 ProcessorTable 中拿到消息类型对应的 Processor。

这样就成功将处理逻辑从 Netty Handler 中彻底抽离出来了，Handler#channelRead 方法只需要调用 processMessage 方法即可，且还可以灵活根据消息类型动态注册 Processor 到
ProcessorTable 中，处理逻辑的可扩展性得到了极大的提升。

以下是 Processor 的调用流程：

1）客户端

![](https://gitee.com/objcoding/md-picture/raw/master/img/20200510234047.png)

1. RmBranchCommitProcessor：处理服务端全局提交请求；
2. RmBranchRollbackProcessor：处理服务端全局回滚请求；
3. RmUndoLogProcessor：处理服务端 undo log 删除请求；
4. ClientOnResponseProcessor：客户端处理服务端响应请求，如：BranchRegisterResponse、GlobalBeginResponse、GlobalCommitResponse 等；
5. ClientHeartbeatProcessor：处理服务端心跳响应。

2）服务端

![](https://gitee.com/objcoding/md-picture/raw/master/img/20200510234016.png)

1. RegRmProcessor：处理 RM 客户端注册请求；
2. RegTmProcessor：处理 TM 客户端注册请求；
3. ServerOnRequestProcessor：处理客户端相关请求，如：BranchRegisterRequest、GlobalBeginRequest、GlobalLockQueryRequest 等；
4. ServerOnResponseProcessor：处理客户端相关响应，如：BranchCommitResponse、BranchRollbackResponse 等；
5. ServerHeartbeatProcessor：处理客户端心跳响应。

下面我以 TM 发起全局事务提交请求为例子，让大家感受下 Processor 在整个交互中所处的位置：

![](https://gitee.com/objcoding/md-picture/raw/master/img/20200514191842.png)

# 重构请求方法

在 Seata 的旧版本当中，RPC 的请求方法也是欠缺优雅，主要体现在：

1. 请求方法过于杂乱无章，没有层次感；
2. sendAsyncRequest 方法耦合的代码太多，逻辑过于混乱，客户端与服务端都共用了一套请求逻辑，方法中决定是否批量发送是根据参数 address 是否为 null 决定，决定是否同步请求是根据 timeout 是否大于 0
   决定，显得极为不合理，且批量请求只有客户端有用到，服务端并没有批量请求，共用一套请求逻辑还会导致服务端异步请求也会创建 MessageFuture 放入 futures 中；
3. 请求方法名称风格不统一，比如客户端 sendMsgWithResponse，服务端却叫 sendSyncRequest；

针对以上旧版本 RPC 请求方法的各种缺点，我作了以下改动：

1. 将请求方法统一放入 RemotingClient、RemotingServer 接口当中，并作为顶级接口；
2. 分离客户端与服务端请求逻辑，将批量请求逻辑单独抽到客户端相关请求方法中，使得是否批量发送不再根据参数 address 是否为 null 决定；
3. 由于 Seata
   自身的逻辑特点，客户端服务端请求方法的参数无法统一，可通过抽取通用的同步/异步请求方法，客户端和服务端根据自身请求逻辑特点实现自身的同步/异步请求逻辑，最后再调用通用的同步/异步请求方法，使得同步/异步请求都有明确的方法，不再根据
   timeout 是否大于 0 决定；
4. 统一请求名称风格。

最终，Seata RPC 的请求方法终于看起来更加优雅且有层次感了。

同步请求：

![](https://gitee.com/objcoding/md-picture/raw/master/img/20200513103838.png)

异步请求：

![](https://gitee.com/objcoding/md-picture/raw/master/img/20200513103904.png)

# 其它

1. 类目录调整：RPC 模块目录中还有一个 netty 目录，也可以从目录结构中发现 Seata 的初衷是兼容多个 RPC 框架，目前只实现了 netty，但发现 netty 模块中有些类并不 ”netty“，且 RPC
   跟目录的类也并不通用，因此需要将相关类的位置进行调整；
2. 某些类重新命名，比如 netty 相关类包含 「netty」；

最终 RPC 模块看起来是这样的：

![](https://gitee.com/objcoding/md-picture/raw/master/img/20200711213204.png)

# 作者简介

张乘辉，目前就职于蚂蚁集团，热爱分享技术，微信公众号「后端进阶」作者，技术博客（[https://objcoding.com/](https://objcoding.com/)）博主，Seata Contributor，GitHub
ID：objcoding。