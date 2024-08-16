---
title: Detailed Explanation of seata-golang Communication Model
keywords: [seata, seata-golang, seata-go, getty, distributed transaction]
description: This article provides a detailed explanation of the underlying RPC communication implementation in seata-golang.
author: xiaomin.liu
date: 2021/01/04
---

# The getty-based seata-golang communication model



Author | Liu Xiaomin Yu Yu

## I. Introduction


In the Java world, netty is a widely used high-performance network communication framework, and many RPC frameworks are based on netty. In the golang world, [getty](https://github.com/AlexStocks/getty) is also a high-performance network communication library similar to netty. getty was originally developed by Yu Yu, the leader of the dubbogo project, and is available in [dubbo-go](https://) as an underlying communication library. github.com/apache/dubbo-go). With the donation of dubbo-go to the apache foundation, getty eventually made its way into the apache family and was renamed [dubbo-getty](https://github.com/apache/dubbo-getty), thanks to the efforts of the community.


In '18, I was practicing microservices in my company, and the biggest problem I encountered at that time was distributed transactions. In the same year, Ali open-sourced their distributed transaction solution in the community, and I quickly noticed this project, which was initially called fescar, but later renamed seata. Since I was very interested in open source technology, I added a lot of community groups, and at that time, I also paid attention to the dubbo-go project, and silently dived in it. As I learnt more about seata, the idea of making a go version of a distributed transaction framework gradually emerged.


To make a golang version of distributed transaction framework, one of the first problems is how to achieve RPC communication. dubbo-go is a very good example in front of us, so we started to study the underlying getty of dubbo-go.


## How to implement RPC communication based on getty?


The overall model of the getty framework is as follows:


! [image.png]( https://img.alicdn.com/imgextra/i1/O1CN011TIcL01jY4JaweOfV_! !6000000004559-2-tps-954-853.png)


The following is a detailed description of the RPC communication process of seata-golang with related code.


### 1. Establish Connection


To implement RPC communication, we need to establish a network connection first, let's start from [client.go](https://github.com/apache/dubbo-getty/blob/master/client.go).


 ```go
 func (c *client) connect() {
  var (
   err error
   ss Session
  )

  for {
        // Create a session connection
   ss = c.dial()
   if ss == nil {
    if ss == nil { // client has been closed
    if ss == nil { // client has been closed
   }
   err = c.newSession(ss)
   if err == nil {
            // send and receive messages
    ss.(*session).run()
    // Omit some code here

    break
   }
   // don't distinguish between tcp connection and websocket connection. because
   // gorilla/websocket/conn.go:(Conn)Close also invoke net.Conn.Close()
   ss.Conn().Close()
  Close()
 }
 ```


 The `connect()` method gets a session connection via the `dial()` method into the dial() method:


 ```
func (c *client) dial() Session {
switch c.endPointType {
case TCP_CLIENT.
return c.dialTCP()
case UDP_CLIENT: return c.dialUDP()
return c.dialUDP()
case WS_CLIENT: return c.dialWS()
return c.dialWS()
case WSS_CLIENT: return c.dialWSS()
return c.dialWSS()
}

return nil
}
```


We're concerned with TCP connections, so we continue into the `c.dialTCP()` method:


 ```go
 func (c *client) dialTCP() Session {
  var (
   err error
   conn net.
  )

  for {
   if c.IsClosed() {
    return nil
   }
   if c.sslEnabled {
    if sslConfig, err := c.tlsConfigBuilder.BuildTlsConfig(); err == nil && sslConfig ! = nil {
     d := &net.Dialer{Timeout: connectTimeout}
     // Establish an encrypted connection
     conn, err = tls.DialWithDialer(d, "tcp", c.addr, sslConfig)
    }
   } else {
            // Establish a tcp connection
    conn, err = net.DialTimeout("tcp", c.addr, connectTimeout)
   }
   if err == nil && gxnet.IsSameAddr(conn.RemoteAddr(), conn.LocalAddr()) {
    conn.Close()
    err = errSelfConnect
   }
   if err == nil {
            // Return a TCPSession
    return newTCPSession(conn, c)
   }

   log.Infof("net.DialTimeout(addr:%s, timeout:%v) = error:%+v", c.addr, connectTimeout, perrors.WithStack(err))
   <-wheel.After(connectInterval)
  }
 }
 ```


At this point, we know how getty establishes a TCP connection and returns a TCPSession.


### 2. Sending and Receiving Messages


How does it send and receive messages? Let's go back to the connection method and look at the next line, which is `ss.(*session).run()`. After this line of code, the code is a very simple operation, so we guess that the logic of this line of code must include sending and receiving messages, and then go to the `run()` method:


```go
func (s *session) run() {
// Omit some of the code

go s.handleLoop()
go s.handlePackage()
}
 ```


 There are two goroutines up here, `handleLoop` and `handlePackage`, which literally match our guesses into the `handleLoop()` method:


 ```go
 func (s *session) handleLoop() {
    // Omit some of the code

  for {
   // A select blocks until one of its cases is ready to run.
   // It choose one at random if multiple are ready. Otherwise it choose default branch if none is ready.
   It choose one at random if multiple are ready.
   // Otherwise it choose default branch if none is ready.

   case outPkg, ok = <-s.wQ.
    // Omit some of the code

    iovec = iovec[:0]
    for idx := 0; idx < maxIovecNum; idx++ {
        // Encode interface{} type outPkg into binary bits via s.writer
     pkgBytes, err = s.writer.Write(s, outPkg)
     // Omit some of the code

     iovec = append(iovec, pkgBytes)

                // omit some code
    }
            // Send these binary bits out
    err = s.WriteBytesArray(iovec[:]...)
    if err ! = nil {
     log.Errorf("%s, [session.handleLoop]s.WriteBytesArray(iovec len:%d) = error:%+v",
      s.sessionToken(), len(iovec), perrors.WithStack(err))
     s.stop()
     // break LOOP
     flag = false
    }

   case <-wheel.After(s.period).
    if flag {
     if wsFlag {
      err := wsConn.writePing()
      if err ! = nil {
       log.Warnf("wsConn.writePing() = error:%+v", perrors.WithStack(err))
      }
     }
                // Logic for timed execution, heartbeat, etc.
     s.listener.OnCron(s)
    }
   }
  }
 }
 ```


With the above code, it is easy to see that the `handleLoop()` method handles the logic of sending the message, which is encoded into binary bits by `s.writer` and then sent over the established TCP connection. This `s.writer` corresponds to the Writer interface, which is an interface that must be implemented by the RPC framework.


Moving on to the `handlePackage()` method:


```go
func (s *session) handlePackage() {
// Omit some of the code

if _, ok := s.Connection.(*gettyTCPConn); ok {
if s.reader == nil {
errStr := fmt.Sprintf("session{name:%s, conn:%#v, reader:%#v}", s.name, s.Connection, s.reader)
log.Error(errStr)
panic(errStr)
}

err = s.handleTCPPackage()
} else if _, ok := s.Connection.(*gettyWSConn); ok {
err = s.handleWSPackage()
} else if _, ok := s.Connection.(*gettyUDPConn); ok {
err = s.handleUDPPackage()
} else {
panic(fmt.Sprintf("unknown type session{%#v}", s))
}
}
```


Go to the `handleTCPPackage()` method:


 ```go
 func (s *session) handleTCPPackage() error {
    // Omit some of the code

  conn = s.Connection.(*gettyTCPConn)
  for {
   // omit some code

   bufLen = 0
   for {
    // for clause for the network timeout condition check
    // s.conn.SetReadTimeout(time.Now().Add(s.rTimeout))
            // Receive a message from the TCP connection
    bufLen, err = conn.recv(buf)
    // Omit some of the code

    break
   }
   // Omit part of the code

        // Write the binary bits of the received message to pkgBuf
   pktBuf.Write(buf[:bufLen])
   for {
    if pktBuf.Len() <= 0 {
     Write(buf[:bufLen]) for { if pktBuf.
    }
            // Decode the received message into an RPC message via s.reader
    pkg, pkgLen, err = s.reader.Read(s, pktBuf.Bytes())
    // Omit some of the code

      s.UpdateActive()
            // Put the received message into a TaskQueue for consumption by the RPC consumer.
    s.addTask(pkg)
    pktBuf.Next(pkgLen)
    // continue to handle case 5
   If exit { pktBuf.Next(pkgLen) // continue to handle case 5
   if exit {
    pktBuf.Next(pkgLen) // continue to handle case 5 } if exit {
   }
  }

  return perrors.WithStack(err)
 }
 ```


From the above code logic, we analyse that the RPC consumer needs to decode the binary bits received from the TCP connection into messages that can be consumed by RPC, and this work is implemented by s.reader, so we need to implement the Reader interface corresponding to s.reader in order to build the RPC communication layer.


### 3. How to decouple the underlying network message processing logic from the business logic


We all know that netty decouples the underlying network logic from the business logic through the boss thread and the worker thread. So how does getty do it?


At the end of the `handlePackage()` method, we see that the incoming message is put into the `s.addTask(pkg)` method, so let's move on:


```go
func (s *session) addTask(pkg interface{}) {
f := func() {
s.listener.OnMessage(s, pkg)
s.incReadPkgNum()
}
if taskPool := s.EndPoint().GetTaskPool(); taskPool ! = nil {
taskPool.AddTaskAlways(f)
return
}
f()
}
 ```


 The `pkg` argument is passed to an anonymous method that ends up in `taskPool`. This method is critical, and I ran into a pitfall later on when I wrote the seata-golang code, which is analysed later.


 Next we look at the definition of [taskPool](https://github.com/dubbogo/gost/blob/master/sync/task_pool.go):


 ```go
 // NewTaskPoolSimple builds a simple task pool.
 func NewTaskPoolSimple(size int) GenericTaskPool {
  if size < 1 {
   size = runtime.NumCPU() * 100
  NumCPU() * 100 }
  return &taskPoolSimple{
   work: make(chan task), sem: make(chan struct{task
   sem:  make(chan struct{}, size),
   done: make(chan struct{}),
  }
 }
 ```


Builds a channel `sem` with a buffer size of size (defaults to `runtime.NumCPU() * 100`). Then look at the method ``AddTaskAlways(t task)``:


```go
func (p *taskPoolSimple) AddTaskAlways(t task) {
select {
case <-p.done.
return
default.
}

select {
case p.work <- t.
return
default: }
}
select {
case p.work <- t: return default: }
case p.sem <- struct{}{}.
p.wg.Add(1)
go p.worker(t)
default.
goSafely(t)
}
}
 ```


 When a task is added, it is consumed by len(p.sem) goroutines, and if no goroutine is free, a temporary goroutine is started to run t(). This is equivalent to having len(p.sem) goroutines to form a goroutine pool, and the goroutines in the pool process business logic instead of the goroutines that process network messages to run business logic, thus achieving decoupling. One of the pitfalls I encountered when writing seata-golang was that I forgot to set the taskPool, which resulted in the same goroutine handling the business logic and the underlying network message logic. When I blocked the business logic and waited for a task to complete, I blocked the entire goroutine, and I couldn't receive any messages during the blocking period.


 ### 4. Implementation


 The following code is available at [getty.go](https://github.com/apache/dubbo-getty/blob/master/getty.go):


 ```go
 // Reader is used to unmarshal a complete pkg from buffer
 type Reader interface {
  Read(Session, []byte) (interface{}, int, error)
 }

 // Writer is used to marshal a pkg and write to session.
 type Writer interface {
  // If @Session is udpGettySession, the second parameter is UDPContext.
  Write(Session, interface{}) ([]byte, error)
 Write(Session, interface{}) ([]byte, error) }

 // ReadWriter interface use for handle application packages.
 type ReadWriter interface {
  Writer
  Writer
 }
 ```


 ```go
 // EventListener is used to process pkg that received from remote session
 type EventListener interface {
  // invoked when session opened
  // If the return error is not nil, @Session will be closed.
  OnOpen(Session) error

  OnOpen(Session) error // invoked when session closed.
  EventListener { // invoked when session opened // If the return error is not nil, @Session will be closed.)

  OnOpen(Session) error // invoked when session closed.
  OnError(Session, error)

  // invoked periodically, its period can be set by (Session)SetCronPeriod
  OnCron(Session)

  // invoked when getty received a package. Pls attention that do not handle long time
  // logic processing in this func. You'd better set the package's maximum length.
  // If the message's length is greater than it, u should should return err in
  If the message's length is greater than it, u should should return err in // Reader{Read} and getty will close this connection soon.
  // If ur logic processing in this func
  // If ur logic processing in this func will take a long time, u should start a goroutine
  // If ur logic processing in this func will take a long time, u should start a goroutine pool (like working thread pool in cpp) to handle the processing asynchronously.
  // can do the logic processing in other asynchronous way.
  Or u // can do the logic processing in other asynchronous way. !In short, ur OnMessage callback func should return asap.
  // In short, ur OnMessage callback func should return asap.
  // If this is a udp event listener, the second parameter type is UDPContext.
  OnMessage(Session, interface{})
 }
 ```


By analysing the entire getty code, we only need to implement `ReadWriter` to encode and decode RPC messages, and then implement `EventListener` to handle the corresponding specific logic of RPC messages, and then inject the `ReadWriter` implementation and the `EventLister` implementation into the Client and Server sides of RPC, then we can implement RPC communication. Inject the `ReadWriter` implementation and `EventLister` implementation into the Client and Server side of RPC to achieve RPC communication.


#### 4.1 Codec Protocol Implementation


The following is the definition of the seata protocol:
! [image-20201205214556457.png](https://cdn.nlark.com/yuque/0/2020/png/737378/1607180799872-5f96afb6-680d-4e69-8c95-b8fd1ac4c3a7.png #align=left&display=inline&height=209&margin=%5Bobject%20Object%5D&name=image-20201205214556457.png& originHeight=209&originWidth=690&size=18407&status=done&style=none&width=690)


In the ReadWriter interface implementation [`RpcPackageHandler`](https://github.com/opentrx/seata-golang), call the Codec method to codec the message body in the above format:


```go
// Encode the message into binary bits
func MessageEncoder(codecType byte, in interface{}) []byte {
switch codecType {
case SEATA.
return SeataEncoder(in)
default.
log.Errorf("not support codecType, %s", codecType)
return nil
}
}

// Decode the binary bits into the message body
func MessageDecoder(codecType byte, in []byte) (interface{}, int) {
switch codecType {
case SEATA.
return SeataDecoder(in)
default.
log.Errorf("not support codecType, %s", codecType)
return nil, 0
}
}
 ```


 #### 4.2 Client Side Implementation


 Let's look at the client-side implementation of `EventListener` [`RpcRemotingClient`](https://github.com/opentrx/seata-golang/blob/dev/pkg/client/rpc_remoting_client. go):


 ```go
 func (client *RpcRemoteClient) OnOpen(session getty.Session) error {
  go func()
   request := protocal.RegisterTMRequest{AbstractIdentifyRequest: protocal.
    ApplicationId: client.conf.
    TransactionServiceGroup: client.conf.
   }}
    // Once the connection is established, make a request to the Transaction Coordinator to register the TransactionManager.
   _, err := client.sendAsyncRequestWithResponse(session, request, RPC_REQUEST_TIMEOUT)
   if err == nil {
      // Save the connection to the Transaction Coordinator in the connection pool for future use.
    clientSessionManager.RegisterGettySession(session)
    client.GettySessionOnOpenChannel <- session.RemoteAddr()
   }
  }()

  return nil
 }

 // OnError ...
 func (client *RpcRemoteClient) OnError(session getty.Session, err error) {
  clientSessionManager.ReleaseGettySession(session)
 }

 // OnClose ...
 func (client *RpcRemoteClient) OnClose(session getty.Session) {
  clientSessionManager.ReleaseGettySession(session)
 }

 // OnMessage ...
 func (client *RpcRemoteClient) OnMessage(session getty.Session, pkg interface{}) {
  log.Info("received message:{%v}", pkg)
  rpcMessage, ok := pkg.(clientRpcRemoteClient.Session, pkg interface{}) { log.Info("received message:{%v}", pkg)
  if ok {
   heartBeat, isHeartBeat := rpcMessage.Body.(protocal.HeartBeatMessage)
   if isHeartBeat && heartBeat == protocal.HeartBeatMessagePong {
    log.Debugf("received PONG from %s", session.RemoteAddr())
   }
  }

  if rpcMessage.MessageType == protocal.MSGTYPE_RESQUEST ||
   rpcMessage.MessageType == protocal.MSGTYPE_RESQUEST_ONEWAY {
   log.Debugf("msgId:%s, body:%v", rpcMessage.Id, rpcMessage.Body)

   // Process the transaction message, commit or rollback
   client.onMessage(rpcMessage, session.RemoteAddr())
  } else {
   resp, loaded := client.futures.Load(rpcMessage.Id)
   if loaded {
    response := resp.(*getty2.MessageFuture)
    response.Response = rpcMessage.Body
    response.Done <- true
    client.futures.Delete(rpcMessage.Id)
   }
  }
 }

 // OnCron ...
 func (client *RpcRemoteClient) OnCron(session getty.Session) {
  // Send a heartbeat
  client.defaultSendRequest(session, protocal.HeartBeatMessagePing)
 }
 ```


 The logic of `clientSessionManager.RegisterGettySession(session)` is analysed in subsection 4.4.


 #### 4.3 Server-side Transaction Coordinator Implementation


 See [``DefaultCoordinator``](https://github.com/opentrx/seata-golang/blob/dev/tc/server/default_coordinator_event_listener.go) for code:


 ```go
 func (coordinator *DefaultCoordinator) OnOpen(session getty.Session) error {
  log.Infof("got getty_session:%s", session.Stat())
  error { log.Infof("got getty_session:%s", session.Stat())
 }

 func (coordinator *DefaultCoordinator) OnError(session getty.Session, err error) {
  // Release the TCP connection
  SessionManager.ReleaseGettySession(session)
  session.Close()
  log.Errorf("getty_session{%s} got error{%v}, will be closed.", session.Stat(), err)
 }

 func (coordinator *DefaultCoordinator) OnClose(session getty.Session) {
  log.Info("getty_session{%s} is closing......" , session.Stat())
 }

 func (coordinator *DefaultCoordinator) OnMessage(session getty.Session, pkg interface{}) {
  log.Debugf("received message:{%v}", pkg)
  rpcMessage, ok := pkg.(protocal.)
  RpcMessage) if ok {
   _, isRegTM := rpcMessage.Body.(protocal.RegisterTMRequest)
   if isRegTM {
      // Map the TransactionManager information to the TCP connection.
    coordinator.OnRegTmMessage(rpcMessage, session)
    OnRegTmMessage(rpcMessage, session)
   }

   heartBeat, isHeartBeat := rpcMessage.Body.(protocal.HeartBeatMessage)
   if isHeartBeat && heartBeat == protocal.HeartBeatMessagePing {
    coordinator.OnCheckMessage(rpcMessage, session)
    OnCheckMessage(rpcMessage, session)
   }

   if rpcMessage.MessageType == protocal.MSGTYPE_RESQUEST ||
    rpcMessage.MessageType == protocal.MSGTYPE_RESQUEST_ONEWAY {
    log.Debugf("msgId:%s, body:%v", rpcMessage.Id, rpcMessage.Body)
    _, isRegRM := rpcMessage.Body.(protocal.RegisterRMRequest)
    if isRegRM {
        // Map the ResourceManager information to the TCP connection.
     coordinator.OnRegRmMessage(rpcMessage, session)
    } else {
     if SessionManager.IsRegistered(session) {
      if err := recover(); } else { if SessionManager.IsRegistered(session) {
       if err := recover(); err ! = nil { log.Errorf(); err !
        log.Errorf("Catch Exception while do RPC, request: %v,err: %w", rpcMessage, err)
       }
      }()
          // Handle transaction messages, global transaction registration, branch transaction registration, branch transaction commit, global transaction rollback, etc.
      coordinator.OnTrxMessage(rpcMessage, session)
     } else {
      session.Close()
      log.Infof("Close an unhandled connection! [%v]", session)
     }
    }
   } else {
    resp, loaded := coordinator.futures.Load(rpcMessage.Id)
    if loaded {
     response := resp.(*getty2.MessageFuture)
     response.Response = rpcMessage.Body
     response.Done <- true
     coordinator.futures.Delete(rpcMessage.Id)
    }
   }
  }
 }

 func (coordinator *DefaultCoordinator) OnCron(session getty.Session) {

 }
 ```


`coordinator.OnRegTmMessage(rpcMessage, session)` registers the Transaction Manager, `coordinator.OnRegRmMessage(rpcMessage, session)` registers the Resource The logic is analysed in Section 4.4.
The message enters the `coordinator.OnTrxMessage(rpcMessage, session)` method and is routed to the specific logic according to the message type code:


```go
switch msg.GetTypeCode() {
case protocal.TypeGlobalBegin:
req := msg.(protocal.GlobalBeginRequest)
resp := coordinator.doGlobalBegin(req, ctx)
return resp
case protocal.TypeGlobalStatus.
TypeGlobalStatus. req := msg.(protocal.GlobalStatusRequest)
resp := coordinator.doGlobalStatus(req, ctx)
return resp
case protocal.TypeGlobalReport.
req := msg.(protocal.GlobalReportRequest)
resp := coordinator.doGlobalReport(req, ctx)
return resp
case protocal.TypeGlobalCommit.
req := msg.(protocal.GlobalCommitRequest)
resp := coordinator.doGlobalCommit(req, ctx)
return resp
case protocal.TypeGlobalRollback.
req := msg.(protocal.GlobalRollbackRequest)
resp := coordinator.doGlobalRollback(req, ctx)
return resp
case protocal.TypeBranchRegister.
TypeBranchRegister. req := msg.(protocal.BranchRegisterRequest)
resp := coordinator.doBranchRegister(req, ctx)
return resp
case protocal.TypeBranchStatusReport.
TypeBranchStatusReport: req := msg.(protocal.BranchReportRequest)
resp := coordinator.doBranchReport(req, ctx)
return resp
default.
return nil
}
 ```


 #### 4.4 Session Manager Analysis
 After the Client establishes a connection with the Transaction Coordinator, it saves the connection in the map `serverSessions = sync.Map{}` by using `clientSessionManager.RegisterGettySession(session)`. The key of the map is the RemoteAddress of the Transaction Coordinator obtained from the session, and the value is the session. This allows the Client to register the Transaction Manager and Resource Manager with the Transaction Coordinator through a session in the map. See [`getty_client_session_manager.go`]. (https://github.com/opentrx/seata-golang/blob/dev/pkg/client/getty_client_session_manager.go)
 After the Transaction Manager and Resource Manager are registered with the Transaction Coordinator, a connection can be used to send either TM messages or RM messages. We identify a connection with an RpcContext:
 ```go
 type RpcContext struct {
  Version string
  TransactionServiceGroup string
  ClientRole meta.TransactionRole
  ApplicationId string
  ClientId string
  ResourceSets *model.
  Session getty.
 Session }
 ```
When a transaction message is received, we need to construct such an RpcContext to be used by the subsequent transaction logic. So, we will construct the following map to cache the mapping relationships:
 ```go
 var (
  // session -> transactionRole
  // TM will register before RM, if a session is not the TM registered, // it will be the RM registered.
  // it will be the RM registered
  session_transactionroles = sync.Map{}

  // session -> applicationId
  identified_sessions = sync.Map{}

  // applicationId -> ip -> port -> session
  client_sessions = sync.Map{}

  // applicationId -> resourceIds
  client_resources = sync.Map{}
 )
 ```
In this way, the Transaction Manager and Resource Manager are registered to the Transaction Coordinator via `coordinator.OnRegTmMessage(rpcMessage, session)` and `coordinator.OnRegRmMessage(rpcMessage, session)` respectively. session)` are registered with the Transaction Coordinator, the relationship between applicationId, ip, port and session is cached in the above client_sessions map, and the relationship between applicationId, ip, port and resourceIds (an application may be able to register with the Transaction Coordinator) is cached in the client_resources map. and resourceIds (there may be multiple Resource Managers for an application) in the client_resources map. When needed, we can construct an RpcContext from these mappings, which is very different from the java version of seata, so if you're interested, you can dig a little deeper. See [`getty_session_manager.go`]. (https://github.com/opentrx/seata-golang/blob/dev/tc/server/getty_session_manager.go)
At this point, we have analysed [seata-golang](https://github.com/opentrx/seata-golang) the entire mechanism of the RPC communication model.

## III. The Future of seata-golang

The development of [seata-golang](https://github.com/opentrx/seata-golang) started in April this year, and in August it basically realised the interoperability with the java version of [seata 1.2](https://github.com/apache/incubator-) protocol. seata) protocol, implemented AT mode for mysql database (automatically coordinating the commit rollback of distributed transactions), implemented TCC mode, and used mysql to store data on the TC side, which turned TC into a stateless application to support high-availability deployment. The following figure shows the principle of AT mode: ! [image20201205-232516.png]( https://img.alicdn.com/imgextra/i3/O1CN01alqsQS1G2oQecFYIs_! !6000000000565-2-tps-1025-573.png)


There is still a lot of work to be done, such as support for the registry, support for the configuration centre, protocol interoperability with the java version of seata 1.4, support for other databases, implementation of the craft transaction coordinator, etc. We hope that developers interested in the distributed transaction problem can join in to build a perfect golang's distributed transaction framework.

If you have any questions, please feel free to join the group [group number 33069364]:
<img src="https://img.alicdn.com/imgextra/i2/O1CN01IjOVG425erjuzqcOi_! !6000000007552-2-tps-600-621.png" width="200px" />

### **Author Bio**

Xiaomin Liu (GitHubID dk-lockdown), currently working at h3c Chengdu, is good at using Java/Go language, and has dabbled in cloud-native and microservices related technologies, currently specialising in distributed transactions.
Yu Yu (github @AlexStocks), dubbo-go project and community leader, a programmer with more than 10 years of frontline experience in server-side infrastructure R&D, has participated in the improvement of Muduo/Pika/Dubbo/Sentinel-go and other well-known projects, and is currently engaged in container orchestration and service mesh work in the Trusted Native Department of ants. Currently, he is working on container orchestration and service mesh in the Trusted Native Department of AntGold.

#### References


seata official: [https://seata.apache.org](https://seata.apache.org)


java version seata：[https://github.com/apache/incubator-seata](https://github.com/apache/incubator-seata)


seata-golang project address: [https://github.com/apache/incubator-seata-go](https://github.com/apache/incubator-seata-go)


seata-golang go night reading b站分享：[https://www.bilibili.com/video/BV1oz411e72T](https://www.bilibili.com/video/BV1oz411e72T)
