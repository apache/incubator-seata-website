---
title: The Refactoring Journey of Seata RPC Module
author: chenghui.zhang
keywords: [Seata, RPC module, refactoring]
date: 2020/07/13
---

# Preface

RPC module is where I initially started to study Seata source code, so I have had some deep research on Seata's RPC module. After I did some research, I found that the code in the RPC module needs to be optimised to make the code more elegant and the interaction logic more clear and easy to understand, and in line with the original intention of "**Let the world have no difficult to understand
In the spirit of "**Let there be no difficult RPC communication code**", I started the refactoring of the RPC module.

Here I suggest that if you want to know more about Seata interaction details, you may want to start from the source code of RPC module, RPC module is equivalent to Seata's hub, Seata all the interaction logic in the RPC module to show the most.

This refactoring of the RPC module will make the Seata hub more robust and easier to interpret.

# Refactoring Inheritance

In the old version of Seata, the overall structure of the RPC module was a bit confusing, especially in terms of the inheritance relationships between classes:

1. directly inheriting Netty Handler in Remoting class, which makes Remoting class coupled with Netty Handler processing logic;
2. The inheritance relationship between the Reomting class on the client side and the Reomting class on the server side is not unified;
3. RemotingClient is implemented by RpcClientBootstrap, while RemotingServer is implemented by RpcServer without an independent ServerBootstrap, which seems to be a very confusing relationship. 4. Some interfaces are not necessary to be extracted;
4. Some interfaces are not necessary to extract, such as ClientMessageSender, ClientMessageListener, ServerMessageSender and so on, because these interfaces will increase the complexity of the overall structure of the inheritance relationship.

In response to the problems identified above, I did the following during the refactoring process:

1) Abstract Netty Handler as an inner class and put it in Remoting class. 2) Put RemotingClient as an inner class and put it in RemotingClass;
2. put RemotingClient as the top-level client interface, define the basic methods of client-server interaction, abstract a layer of AbstractNettyRemotingClient, and the following are respectively
   RmNettyRemotingClient, TmNettyRemotingClient; RemotingServer is the top-level interface of server, defining the basic methods of interaction between the server and the client, and the implementation of NettyRemotingServer;
3. At the same time, ClientMessageSender, ClientMessageListener, ServerMessageSender and other interface methods are grouped into RemotingClient, RemotingServer, and implemented by Reomting.
   class to implement RemotingClient and RemotingServer and unify the inheritance relationship of Remoting class;
4. Create a new RemotingBootstrap interface and implement NettyClientBootstrap and NettyServerBootstrap on the client and server side respectively, so as to extract the bootstrap logic from the Reomting class.

The inheritance relationship in the latest RPC module is simple and clear, represented by the following class relationship diagram:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20200711111637.png)

1. AbstractNettyRemoting: the top level abstraction of Remoting class, contains common member variables and common methods for both client and server, has common request methods (we will talk about it later in the article), and Processor processor invocation logic (we will talk about it later in the article);
2. RemotingClient: the client's top-level interface, defining the basic methods of client-server interaction;
3. RemotingServer: the top-level interface of the server side, defining the basic methods of interaction between the server side and the client side;
4. AbstractNettyRemotingClient: client-side abstract class, inherits AbstractNettyRemoting class and implements RemotingClient interface;
5. NettyRemotingServer: server implementation class, inherits AbstractNettyRemoting class and implements RemotingServer interface;
6. RmNettyRemotingClient: Rm client implementation class, inherits AbstractNettyRemotingClient class;
7. TmNettyRemotingClient: Tm client implementation class, inherits AbstractNettyRemotingClient class.

At the same time, the client-side and server-side bootstrap class logic is abstracted out, as shown in the following class relationship diagram:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20200510225359.png)

1. RemotingBootstrap: bootstrap class interface with two abstract methods: start and stop. 2;
2. NettyClientBootstrap: client-side bootstrap implementation class. 3;
3. NettyServerBootstrap: server-side bootstrap implementation class.

# Decoupled processing logic

Decoupled processing logic is the processing logic of RPC interactions from the Netty Handler abstracted out, and processing logic into a Processor abstraction, why do this? I'm going to talk about some of the problems that exist right now:

1. Netty Handler and Processing Logic are blended together, since both client and server share a set of Processing Logic, in order to be compatible with more interactions, in the Processing Logic you can see a lot of difficult to understand judgement logic. 2. in Seata interactions, the Netty Handler is not a Processor;
2. In Seata's interaction, some requests are processed asynchronously and some requests are processed synchronously, but the expression of synchronous and asynchronous processing in the old processing code logic is very obscure and difficult to understand;
3. It is not possible to clearly express the relationship between the type of request message and the corresponding processing logic in the code logic;
4. In the later iterations of Seata, it will be very difficult to add new interaction logic to this part of the code if the processing logic is not extracted from it.

Before extracting the processing logic from the Netty Handler, let's take a look at Seata's existing interaction logic:

- RM client-server interaction logic:

RM client request server interaction logic: ![](https://gitee.com/objcoding/md-picture/raw/master/img/Xnip2020-05-12_21-41-45.png)

- TM client-server interaction logic:

RM Client Request Server Interaction Logic: ![](https://gitee.com/objcoding/md-picture/raw/master/img/Xnip2020-05-12_21-44-04.png)

- Interaction logic for a server requesting an RM client:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20200513000620.png)

The interaction logic of Seata can be clearly seen in the above interaction diagram.

The client receives messages from the server side in total:

1) Server-side request messages

1. BranchCommitRequest, BranchRollbackRequest, UndoLogDeleteRequest

2) Server-side response messages

1. RegisterRMResponse, BranchRegisterResponse, BranchReportResponse, GlobalLockQueryResponse
2.
RegisterTMResponse, GlobalBeginResponse, GlobalCommitResponse, GlobalRollbackResponse, GlobalStatusResponse, GlobalReportResponse
3. HeartbeatMessage(PONG)

The server receives messages from the client in total:

1) Client request messages:

1. RegisterRMRequest, BranchRegisterRequest, BranchReportRequest, GlobalLockQueryRequest
2.
RegisterTMRequest, GlobalBeginRequest, GlobalCommitRequest, GlobalRollbackRequest, GlobalStatusRequest, GlobalReportRequest
3. HeartbeatMessage(PING)

2) Client response message:

1. BranchCommitResponse, BranchRollbackResponse

Based on the above analysis of the interaction logic, we can abstract the logic of processing messages into a number of Processor, a Processor can handle one or more message types of messages, only in Seata startup registration will be registered to the message type ProcessorTable
A Processor can process messages of one or more message types, just register the message types into the ProcessorTable when Seata starts up, forming a mapping relationship, so that the corresponding Processor can be called to process the message according to the message type, as shown in the following diagram:

![](https://gitee.com/objcoding/md-picture/raw/master/img/Xnip2020-05-12_22-09-17.png)

In the abstract Remoting class, there is a processMessage method, the logic of the method is to get the corresponding Processor from the ProcessorTable according to the message type.

In this way, the processing logic is completely removed from the Netty Handler, and the Handler#channelRead method only needs to call the processMessage method, and it can dynamically register Processors into the ProcessorTable according to the message type.
ProcessorTable, the scalability of the processing logic has been greatly improved.

The following is the invocation flow of Processor:

1) Client

![](https://gitee.com/objcoding/md-picture/raw/master/img/20200510234047.png)

1. RmBranchCommitProcessor: process the server-side global commit request;
2. RmBranchRollbackProcessor: process server-side global rollback request;
3. RmUndoLogProcessor: handles server-side undo log deletion requests;
4. ClientOnResponseProcessor: client-side processing of server-side response requests, such as: BranchRegisterResponse, GlobalBeginResponse, GlobalCommitResponse and so on;
5. ClientHeartbeatProcessor: processing server-side heartbeat response.

2) Server-side

![](https://gitee.com/objcoding/md-picture/raw/master/img/20200510234016.png)

1. RegRmProcessor: Handle RM client registration request. 2;
2. RegTmProcessor: handle TM client registration request;
3. ServerOnRequestProcessor: handle client related requests, such as: BranchRegisterRequest, GlobalBeginRequest, GlobalLockQueryRequest, etc. 4;
4. ServerOnResponseProcessor: handle client-related responses, such as: BranchCommitResponse, BranchRollbackResponse and so on;
5. ServerHeartbeatProcessor: handle client heartbeat response.

Below is an example of a TM initiating a global transaction commit request to give you a sense of where the Processor sits in the entire interaction:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20200514191842.png)

# Refactoring the request method

In older versions of Seata, the request methods for RPC also lacked elegance:

1. request methods are too cluttered and not hierarchical;
2. sendAsyncRequest method is coupled with too much code, the logic is too confusing, the client and server both share a set of request logic, the method to decide whether to send bulk is based on the parameter address is null or not to decide, to decide whether to synchronise the request is based on whether the timeout is greater than 0, it is extremely unreasonable, and it is not reasonable.
   The method to decide whether to send bulk is based on whether the address is null, and to decide whether to make a synchronous request is based on whether the timeout is greater than 0, which is extremely unreasonable;
3. request method name style is not uniform, for example, the client sendMsgWithResponse, but the server is called sendSyncRequest;

To address the above shortcomings of the old RPC request methods, I have made the following changes. 1:

1. put the request method into the RemotingClient and RemotingServer interfaces as the top-level interface. 2. separate the client-side and server-side request methods;
2. Separate the client-side and server-side request logic, and separate the batch request logic into the client-side request method, so that the decision of whether or not to send a batch of requests is no longer based on whether or not the parameter address is null;
3. due to Seata's
   Due to Seata's own logic characteristics, the parameters of client-server request methods cannot be unified, so we can extract common synchronous/asynchronous request methods, the client and server implement their own synchronous/asynchronous request logic according to their own request logic characteristics, and then finally call the common synchronous/asynchronous request methods, so that synchronous/asynchronous requests have a clear method, and are no longer decided according to whether or not the
   timeout is greater than 0. 4;
4. Unify the request name style.

Finally, Seata RPC request methods look more elegant and hierarchical.

Synchronous requests:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20200513103838.png)

Asynchronous request:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20200513103904.png)

# Other

1. Class Catalogue Adjustment: There is also a netty catalogue in the RPC module catalogue, and it can be found from the catalogue structure that Seata's original intention is to be compatible with multiple RPC frameworks, and only netty is implemented at present, but it is found that some of the classes in the netty module are not "netty" and the classes in the RPC
   classes in the netty module are not "netty", and the RPC classes in the catalogue are not common, so the location of the relevant classes needs to be adjusted;
2. some classes are renamed, e.g. netty related classes contain "netty";

The final RPC module looks like this:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20200711213204.png)

# Author Bio

Zhang Chenghui, currently working in Ant Group, loves to share technology, author of WeChat public number "Backend Advanced", technical blog ([https://objcoding.com/](https://objcoding.com/)) blogger, Seata Contributor, GitHub
ID: objcoding.
