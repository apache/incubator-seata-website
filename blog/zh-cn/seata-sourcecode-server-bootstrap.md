---
title: 分布式事务Seata源码-Server端启动流程
author: 杨晓兵|中原银行
date: 2020/07/02
keywords: fescar、seata、分布式事务
---

## 【分布式事务Seata源码解读一】Server端启动流程

### 实现分布式事务的核心要点：

1. 事务的持久化，事务所处的各种状态事务参与方的各种状态都需要持久化，当实例宕机时才能基于持久化的数据对事务回滚或提交，实现最终一致性
2. 定时对超时未完成事务的处理（继续尝试提交或回滚），即通过重试机制实现事务的最终一致性
3. 分布式事务的跨服务实例传播，当分布式事务跨多个实例时需要实现事务的传播，一般需要适配不同的rpc框架
4. 事务的隔离级别：大多数分布式事务为了性能，默认的隔离级别是读未提交
5. 幂等性：对于XA或者seata的AT这样的分布式事务来说，都已经默认实现了幂等性，而TCC、Saga这种接口级别实现的分布式事务都还需要业务开发者自己实现幂等性。

本片文章主要从seata-server的启动流程的角度介绍一下seata-server的源码，启动流程图如下：
![Seata启动流程.png](https://upload-images.jianshu.io/upload_images/18099266-b186bb38d34bae96.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 1. 启动类Server
seata-server的入口类在Server类中，源码如下：
```java
public static void main(String[] args) throws IOException {
    //解析启动以及配置文件的各种配置参数
    ParameterParser parameterParser = new ParameterParser(args);

    //metrics相关，暂时不关心
    MetricsManager.get().init();
    // 把从配置文件中读取到的storeMode重新写入SystemProperty中
    System.setProperty(ConfigurationKeys.STORE_MODE, parameterParser.getStoreMode());

    //创建RpcServer实例，此时并没有初始化，RpcServer负责与客户端SDK中的TM、RM进行网络通信
    RpcServer rpcServer = new RpcServer(WORKING_THREADS);
    //server port
    rpcServer.setListenPort(parameterParser.getPort());

    //UUIDGenerator初始化，UUIDGenerator用于生成全局事务、分支事务的id，多个Server实例配置不同的ServerNode，保证id的唯一性
    UUIDGenerator.init(parameterParser.getServerNode());

    // SessionHodler负责事务日志（状态）的持久化存储，当前支持file和db的存储，集群部署模式要使用db模式
    SessionHolder.init(parameterParser.getStoreMode());

    // 创建初始化DefaultCoordinator实例，DefaultCoordinator是TC的核心事务逻辑处理类，底层包含了AT、TCC、SAGA等不同事务类型的逻辑处理。
    DefaultCoordinator coordinator = new DefaultCoordinator(rpcServer);
    coordinator.init();
    rpcServer.setHandler(coordinator);
    // register ShutdownHook
    ShutdownHook.getInstance().addDisposable(coordinator);
    ShutdownHook.getInstance().addDisposable(rpcServer);

    //127.0.0.1 and 0.0.0.0 are not valid here.
    if (NetUtil.isValidIp(parameterParser.getHost(), false)) {
        XID.setIpAddress(parameterParser.getHost());
    } else {
        XID.setIpAddress(NetUtil.getLocalIp());
    }
    XID.setPort(rpcServer.getListenPort());

    try {
        rpcServer.init();
    } catch (Throwable e) {
        LOGGER.error("rpcServer init error:{}", e.getMessage(), e);
        System.exit(-1);
    }

    System.exit(0);
}
```

#### 2. 解析配置
参数解析的实现代码在ParameterParser类中，init方法源码如下：
```java
private void init(String[] args) {
    try {
        // 判断是否运行在容器中
        boolean inContainer = this.isRunningInContainer();

        if (inContainer) {
            if (LOGGER.isInfoEnabled()) {
                LOGGER.info("The server is running in container.");
            }
            // 如果是运行在容器中，则从环境变量中获取启动配置参数
            this.seataEnv = StringUtils.trimToNull(System.getenv(ENV_SYSTEM_KEY));
            this.host = StringUtils.trimToNull(System.getenv(ENV_SEATA_IP_KEY));
            this.serverNode = NumberUtils.toLong(System.getenv(ENV_SERVER_NODE_KEY), SERVER_DEFAULT_NODE);
            this.port = NumberUtils.toInt(System.getenv(ENV_SEATA_PORT_KEY), SERVER_DEFAULT_PORT);
            this.storeMode = StringUtils.trimToNull(System.getenv(ENV_STORE_MODE_KEY));
        } else {
            // 基于JCommander获取启动应用程序时配置的参数，JCommande通过注解、反射的方式把参数赋值到当前类的字段上。
            JCommander jCommander = JCommander.newBuilder().addObject(this).build();
            jCommander.parse(args);
            if (help) {
                jCommander.setProgramName(PROGRAM_NAME);
                jCommander.usage();
                System.exit(0);
            }
        }
        if (StringUtils.isNotBlank(seataEnv)) {
            System.setProperty(ENV_PROPERTY_KEY, seataEnv);
        }
        if (StringUtils.isBlank(storeMode)) {
            //这里牵扯到一个重要的Configuration类，ParameterParser只负责获取ip、port、storeMode等核心参数，其他的参数都是从Configuration中获取的。这里如果没有启动参数没有指定storeMode，就从Configuration类中获取。
            storeMode = ConfigurationFactory.getInstance().getConfig(ConfigurationKeys.STORE_MODE,SERVER_DEFAULT_STORE_MODE);
        }
    } catch (ParameterException e) {
        printError(e);
    }
}
```

在ParameterParser的init方法中第一次调用了ConfigurationFactory.getInstance()，初始化了一个单例的Configuration对象，Configuration负责初始化所有的其他配置参数数据信息。配置文件中的file.conf、registry.conf都是在这里被处理的。
ConfigurationFactory.getInstance方法其实就是获取一个单例对象，核心在buildConfiguration方法中，不过在buidlConfiguration方法前，ConfigurationFactory类有一段static代码块会先执行。
```java
public static Configuration getInstance() {
    if (instance == null) {
        synchronized (Configuration.class) {
            if (instance == null) {
                instance = buildConfiguration();
            }
        }
    }
    return instance;
}
```

ConfigurationFactory有static代码块，下面的代码看起来很多，其实只是从registry.conf中读取配置信息。registry.conf中有两个配置信息，注册中心和配置源。registry.conf中指定其他配置项是file.conf或者是apollo等其他配置源）
```java
static {
  String seataConfigName = System.getProperty(SYSTEM_PROPERTY_SEATA_CONFIG_NAME);
  if (null == seataConfigName) {
        seataConfigName = System.getenv(ENV_SEATA_CONFIG_NAME);
  }
  if (null == seataConfigName) {
        seataConfigName = REGISTRY_CONF_PREFIX;
  }
  String envValue = System.getProperty(ENV_PROPERTY_KEY);
  if (null == envValue) {
        envValue = System.getenv(ENV_SYSTEM_KEY);
  }
    // 从registry.conf配置文件中读取数据构建Configuration对象
  Configuration configuration = (null == envValue) ? new FileConfiguration(seataConfigName + REGISTRY_CONF_SUFFIX,
      false) : new FileConfiguration(seataConfigName + "-" + envValue + REGISTRY_CONF_SUFFIX, false);
  Configuration extConfiguration = null;
  try {
        extConfiguration = EnhancedServiceLoader.load(ExtConfigurationProvider.class).provide(configuration);
        if (LOGGER.isInfoEnabled()) {
            LOGGER.info("load Configuration:{}", extConfiguration == null ? configuration.getClass().getSimpleName()
                        : extConfiguration.getClass().getSimpleName());
        }
  } catch (EnhancedServiceNotFoundException ignore) {

  } catch (Exception e) {
        LOGGER.error("failed to load extConfiguration:{}", e.getMessage(), e);
  }
  CURRENT_FILE_INSTANCE = null == extConfiguration ? configuration : extConfiguration;
}
```

ConfigurationFactory.buildConfiguration。buildConfiguration方法主要是根据registry.conf文件中配置的其他配置项的配置源来加载更多的配置项。当前的配置源已经支持：file、zk、apollo、nacos、etcd3等。
```java
private static Configuration buildConfiguration() {
    // 从registry中读取其他配置项的配置源类型
    ConfigType configType;
    String configTypeName = null;
    try {
        configTypeName = CURRENT_FILE_INSTANCE.getConfig(
            ConfigurationKeys.FILE_ROOT_CONFIG + ConfigurationKeys.FILE_CONFIG_SPLIT_CHAR
            + ConfigurationKeys.FILE_ROOT_TYPE);

        if (StringUtils.isBlank(configTypeName)) {
            throw new NotSupportYetException("config type can not be null");
        }

        configType = ConfigType.getType(configTypeName);
    } catch (Exception e) {
        throw e;
    }
    // 文件的配置源方式，默认读取file.conf文件
    if (ConfigType.File == configType) {
        String pathDataId = String.join(ConfigurationKeys.FILE_CONFIG_SPLIT_CHAR, ConfigurationKeys.FILE_ROOT_CONFIG, FILE_TYPE, NAME_KEY);
        String name = CURRENT_FILE_INSTANCE.getConfig(pathDataId);
        Configuration configuration = new FileConfiguration(name);
        Configuration extConfiguration = null;
        try {
            extConfiguration = EnhancedServiceLoader.load(ExtConfigurationProvider.class).provide(configuration);
            if (LOGGER.isInfoEnabled()) {
                LOGGER.info("load Configuration:{}",
                            extConfiguration == null ? configuration.getClass().getSimpleName()
                            : extConfiguration.getClass().getSimpleName());
            }
        } catch (EnhancedServiceNotFoundException ignore) {

        } catch (Exception e) {
            LOGGER.error("failed to load extConfiguration:{}", e.getMessage(), e);
        }
        return null == extConfiguration ? configuration : extConfiguration;
    } else {
        //通过SPI的方式加载其他配置源的实现类。在seata-server源代码中可以看到很多这样通过单例和SPI的方式来获取对象的场景。
        return EnhancedServiceLoader.load(ConfigurationProvider.class, Objects.requireNonNull(configType).name())
            .provide();
    }
}
```

#### 3. 初始化UUIDGenerator
UUIDGenertor初始化接收一个serverNode参数，UUIDGenertor当前是使用了雪花算法来生成唯一Id，该serverNode用来保证多个seata-server实例生成的唯一id不重复。
```java
public class UUIDGenerator {

    /**
     * Generate uuid long.
     *
     * @return the long
     */
    public static long generateUUID() {
        return IdWorker.getInstance().nextId();
    }

    /**
     * Init.
     *
     * @param serverNode the server node id
     */
    public static void init(Long serverNode) {
        IdWorker.init(serverNode);
    }
}
```

UUIDGenerator是对IdWorker做了封装，唯一id的核心实现逻辑在IdWoker类中，IdWorker是一个雪花算法实现的。此处的IdWorker又是一个单例
```java
public class IdWorker
  /**
     * Constructor
     *
     * @param workerId就是上面提到的ServerNode, 取值范围在0·1023，也就是在64位的UUID中占10位
     */
    public IdWorker(long workerId) {
        if (workerId > maxWorkerId || workerId < 0) {
            throw new IllegalArgumentException(
                String.format("worker Id can't be greater than %d or less than 0", maxWorkerId));
        }
        this.workerId = workerId;
  }

  /**
     * Get the next ID (the method is thread-safe)
     *
     * @return SnowflakeId
     */
    public long nextId() {
        long timestamp = timeGen();

        if (timestamp < lastTimestamp) {
            throw new RuntimeException(String.format(
                "clock moved backwards.  Refusing to generate id for %d milliseconds", lastTimestamp - timestamp));
        }

        synchronized (this) {
            if (lastTimestamp == timestamp) {
                sequence = (sequence + 1) & sequenceMask;
                if (sequence == 0) {
                    timestamp = tilNextMillis(lastTimestamp);
                }
            } else {
                sequence = 0L;
            }
            lastTimestamp = timestamp;
        }
        //雪花算法64位唯一id组成：第一位0 + 41位时间戳 + 10位workerId + 12位自增序列化（同一时间戳内自增）
        return ((timestamp - twepoch) << timestampLeftShift) | (workerId << workerIdShift) | sequence;
    }
}
```

#### 4. SessionHolder初始化
SessionHolder负责Session的持久化，一个Session对象对应一个事务，事务分为两种：全局事务（GlobalSession）和分支事务（BranchSession）。
SessionHolder支持file和db两种持久化方式，其中db支持集群模式，推荐使用db。SessionHolder中最主要的四个字段如下：
```java
// ROOT_SESSION_MANAGER用于获取所有的Setssion，以及Session的创建、更新、删除等。
private static SessionManager ROOT_SESSION_MANAGER;
// 用于获取、更新所有的异步commit的Session
private static SessionManager ASYNC_COMMITTING_SESSION_MANAGER;
// 用于获取、更新所有需要重试commit的Session
private static SessionManager RETRY_COMMITTING_SESSION_MANAGER;
// 用于获取、更新所有需要重试rollback的Session
private static SessionManager RETRY_ROLLBACKING_SESSION_MANAGER;
```

SessionHolder的init方法
```java
public static void init(String mode) throws IOException {
    if (StringUtils.isBlank(mode)) {
        mode = CONFIG.getConfig(ConfigurationKeys.STORE_MODE);
    }
    StoreMode storeMode = StoreMode.get(mode);
    if (StoreMode.DB.equals(storeMode)) {
        // 这里又用到了SPI的方式加载SessionManager，其实下面获取的四个SessionManager实例都是同一个类DataBaseSessionManager的不同实例，只是给DataBaseSessionManager的构造函数传参不同。
        ROOT_SESSION_MANAGER = EnhancedServiceLoader.load(SessionManager.class, StoreMode.DB.getName());
        ASYNC_COMMITTING_SESSION_MANAGER = EnhancedServiceLoader.load(SessionManager.class, StoreMode.DB.getName(),
                                                                      new Object[] {ASYNC_COMMITTING_SESSION_MANAGER_NAME});
        RETRY_COMMITTING_SESSION_MANAGER = EnhancedServiceLoader.load(SessionManager.class, StoreMode.DB.getName(),
                                                                      new Object[] {RETRY_COMMITTING_SESSION_MANAGER_NAME});
        RETRY_ROLLBACKING_SESSION_MANAGER = EnhancedServiceLoader.load(SessionManager.class, StoreMode.DB.getName(),
                                                                       new Object[] {RETRY_ROLLBACKING_SESSION_MANAGER_NAME});
    } else if (StoreMode.FILE.equals(storeMode)) {
        //file模式可以先不关心
        ...
    } else {
        throw new IllegalArgumentException("unknown store mode:" + mode);
    }
    // reload方法对于db模式可以忽略
    reload();
}
```

上面看到SessionHolder中的四个SessionManager本质都是类DataBaseSessionManager的实例，只是给构造函数传参不同，看下DataBaseSessionManager的定义：
```java
public DataBaseSessionManager(String name) {
    super();
    this.taskName = name;
}
// 根据实例的taskName来决定allSessions返回的事务列表，如taskName等于ASYNC_COMMITTING_SESSION_MANAGER_NAME的就返回所有状态为AsyncCommitting的事务。
public Collection<GlobalSession> allSessions() {
  // get by taskName
  if (SessionHolder.ASYNC_COMMITTING_SESSION_MANAGER_NAME.equalsIgnoreCase(taskName)) {
        return findGlobalSessions(new SessionCondition(GlobalStatus.AsyncCommitting));
  } else if (SessionHolder.RETRY_COMMITTING_SESSION_MANAGER_NAME.equalsIgnoreCase(taskName)) {
        return findGlobalSessions(new SessionCondition(new GlobalStatus[] {GlobalStatus.CommitRetrying}));
  } else if (SessionHolder.RETRY_ROLLBACKING_SESSION_MANAGER_NAME.equalsIgnoreCase(taskName)) {
        return findGlobalSessions(new SessionCondition(new GlobalStatus[] {GlobalStatus.RollbackRetrying,
          GlobalStatus.Rollbacking, GlobalStatus.TimeoutRollbacking, GlobalStatus.TimeoutRollbackRetrying}));
  } else {
        // taskName为null，则对应ROOT_SESSION_MANAGER，即获取所有状态的事务
        return findGlobalSessions(new SessionCondition(new GlobalStatus[] {
            GlobalStatus.UnKnown, GlobalStatus.Begin,
            GlobalStatus.Committing, GlobalStatus.CommitRetrying, GlobalStatus.Rollbacking,
            GlobalStatus.RollbackRetrying,
            GlobalStatus.TimeoutRollbacking, GlobalStatus.TimeoutRollbackRetrying, GlobalStatus.AsyncCommitting}));
  }
}
```

#### 5. 初始化DefaultCoordinator
DefaultCoordinator是事务协调器的核心，如：开启、提交、回滚全局事务，注册、提交、回滚分支事务都是由DefaultCoordinator负责协调处理的。DefaultCoordinato通过RpcServer与远程的TM、RM通信来实现分支事务的提交、回滚等。
```java
public DefaultCoordinator(ServerMessageSender messageSender) {
    // 接口messageSender的实现类就是上文提到的RpcServer
    this.messageSender = messageSender;
    // DefaultCore封装了AT、TCC、Saga等分布式事务模式的具体实现类
    this.core = new DefaultCore(messageSender);
}

//init方法初始化了5个定时器，主要用于分布式事务的重试机制，因为分布式环境的不稳定性会造成事务处于中间状态，所以要通过不断的重试机制来实现事务的最终一致性。
//下面的定时器除了undoLogDelete之外，其他的定时任务默认都是1秒执行一次。
public void init() {
    //处理处于回滚状态可重试的事务
    retryRollbacking.scheduleAtFixedRate(() -> {
        try {
            handleRetryRollbacking();
        } catch (Exception e) {
            LOGGER.info("Exception retry rollbacking ... ", e);
        }
    }, 0, ROLLBACKING_RETRY_PERIOD, TimeUnit.MILLISECONDS);
    
    //处理二阶段可以重试提交的状态可重试的事务
    retryCommitting.scheduleAtFixedRate(() -> {
        try {
            handleRetryCommitting();
        } catch (Exception e) {
            LOGGER.info("Exception retry committing ... ", e);
        }
    }, 0, COMMITTING_RETRY_PERIOD, TimeUnit.MILLISECONDS);

    //处理异步提交的事务
    asyncCommitting.scheduleAtFixedRate(() -> {
        try {
            handleAsyncCommitting();
        } catch (Exception e) {
            LOGGER.info("Exception async committing ... ", e);
        }
    }, 0, ASYNC_COMMITTING_RETRY_PERIOD, TimeUnit.MILLISECONDS);
    
    //检查事务的第一阶段已经超时的事务，设置为TimeoutRollbacking，由其他定时任务执行回滚操作
    timeoutCheck.scheduleAtFixedRate(() -> {
        try {
            timeoutCheck();
        } catch (Exception e) {
            LOGGER.info("Exception timeout checking ... ", e);
        }
    }, 0, TIMEOUT_RETRY_PERIOD, TimeUnit.MILLISECONDS);
    
    // 根据unlog的保存天数调用RM删除unlog
    undoLogDelete.scheduleAtFixedRate(() -> {
        try {
            undoLogDelete();
        } catch (Exception e) {
            LOGGER.info("Exception undoLog deleting ... ", e);
        }
    }, UNDO_LOG_DELAY_DELETE_PERIOD, UNDO_LOG_DELETE_PERIOD, TimeUnit.MILLISECONDS);
}
```

#### 6. 初始化RpcServer
RpcServer是基于Netty实现的简化版的Rpc服务端，RpcServer初始化时主要做了两件事：
1. 初始化Netty，设置ChannelHandler，启动Netty
2. 把当前实例的IP端口注册到注册中心中（根据registry中的注册中心类型以及地址配置注册）

```java
public void init() {
    // 响应Rpc客户端的逻辑处理
    DefaultServerMessageListenerImpl defaultServerMessageListenerImpl =
        new DefaultServerMessageListenerImpl(getTransactionMessageHandler());
    defaultServerMessageListenerImpl.init();
    defaultServerMessageListenerImpl.setServerMessageSender(this);
    super.setServerMessageListener(defaultServerMessageListenerImpl);
    super.setChannelHandlers(new ServerHandler());
    super.init();
}

@Override
public void init() {
    super.init();
    // 调用Netty初始化逻辑
    serverBootstrap.start();
}

// Netty初始化逻辑
public void start() {
    //netty初始化逻辑
    this.serverBootstrap.group(this.eventLoopGroupBoss, this.eventLoopGroupWorker)
        .channel(NettyServerConfig.SERVER_CHANNEL_CLAZZ)
        .option(ChannelOption.SO_BACKLOG, nettyServerConfig.getSoBackLogSize())
        .option(ChannelOption.SO_REUSEADDR, true)
        .childOption(ChannelOption.SO_KEEPALIVE, true)
        .childOption(ChannelOption.TCP_NODELAY, true)
        .childOption(ChannelOption.SO_SNDBUF, nettyServerConfig.getServerSocketSendBufSize())
        .childOption(ChannelOption.SO_RCVBUF, nettyServerConfig.getServerSocketResvBufSize())
        .childOption(ChannelOption.WRITE_BUFFER_WATER_MARK,
                     new WriteBufferWaterMark(nettyServerConfig.getWriteBufferLowWaterMark(),
                                              nettyServerConfig.getWriteBufferHighWaterMark()))
        .localAddress(new InetSocketAddress(listenPort))
        .childHandler(new ChannelInitializer<SocketChannel>() {
            @Override
            public void initChannel(SocketChannel ch) {
                ch.pipeline().addLast(new IdleStateHandler(nettyServerConfig.getChannelMaxReadIdleSeconds(), 0, 0))
                    .addLast(new ProtocolV1Decoder())
                    .addLast(new ProtocolV1Encoder());
                if (null != channelHandlers) {
                    addChannelPipelineLast(ch, channelHandlers);
                }

            }
        });

    try {
        ChannelFuture future = this.serverBootstrap.bind(listenPort).sync();
        LOGGER.info("Server started ... ");
        //向注册中心注册当前实例
        RegistryFactory.getInstance().register(new InetSocketAddress(XID.getIpAddress(), XID.getPort()));
        initialized.set(true);
        future.channel().closeFuture().sync();
    } catch (Exception exx) {
        throw new RuntimeException(exx);
    }
}
```


