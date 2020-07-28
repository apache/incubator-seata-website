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

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200726213919467.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTE0NTg0OA==,size_16,color_FFFFFF,t_70)


#### 1. 启动类Server
seata-server的入口类在Server类中，源码如下：
```java
public static void main(String[] args) throws IOException {
    // 从环境变量或运行时参数中获取监听端口，默认端口8091
    int port = PortHelper.getPort(args);
    
    // 把监听端口设置到SystemProperty中，Logback的LoggerContextListener实现类
    // SystemPropertyLoggerContextListener会把Port写入到Logback的Context中，
    // 在logback.xml文件中会使用Port变量来构建日志文件名称。
    System.setProperty(ConfigurationKeys.SERVER_PORT, Integer.toString(port));

    // 创建Logger
    final Logger logger = LoggerFactory.getLogger(Server.class);
    if (ContainerHelper.isRunningInContainer()) {
        logger.info("The server is running in container.");
    }

    // 解析启动以及配置文件的各种配置参数
    ParameterParser parameterParser = new ParameterParser(args);

    // metrics相关，这里是使用SPI机制获取Registry实例对象
    MetricsManager.get().init();
    
	// 把从配置文件中读取到的storeMode写入SystemProperty中，方便其他类使用。
    System.setProperty(ConfigurationKeys.STORE_MODE, parameterParser.getStoreMode());
    
	// 创建NettyRemotingServer实例，NettyRemotingServer是一个基于Netty实现的Rpc框架，
	// 此时并没有初始化，NettyRemotingServer负责与客户端SDK中的TM、RM进行网络通信。
     nettyRemotingServer = new NettyRemotingServer(WORKING_THREADS);
    
    // 设置监听端口
    nettyRemotingServer.setListenPort(parameterParser.getPort());
    
	// UUIDGenerator初始化，UUIDGenerator基于雪花算法实现，
	// 用于生成全局事务、分支事务的id。
	// 多个Server实例配置不同的ServerNode，保证id的唯一性
    UUIDGenerator.init(parameterParser.getServerNode());
    
	// SessionHodler负责事务日志（状态）的持久化存储，
	// 当前支持file、db、redis三种存储模式，集群部署模式要使用db或redis模式
    SessionHolder.init(parameterParser.getStoreMode());
    
  	// 创建初始化DefaultCoordinator实例，DefaultCoordinator是TC的核心事务逻辑处理类，
  	// 底层包含了AT、TCC、SAGA等不同事务类型的逻辑处理。
    DefaultCoordinator coordinator = new DefaultCoordinator(nettyRemotingServer);
    coordinator.init();
    nettyRemotingServer.setHandler(coordinator);
    // register ShutdownHook
    ShutdownHook.getInstance().addDisposable(coordinator);
    ShutdownHook.getInstance().addDisposable(nettyRemotingServer);

    // 127.0.0.1 and 0.0.0.0 are not valid here.
    if (NetUtil.isValidIp(parameterParser.getHost(), false)) {
        XID.setIpAddress(parameterParser.getHost());
    } else {
        XID.setIpAddress(NetUtil.getLocalIp());
    }
    XID.setPort(nettyRemotingServer.getListenPort());

    try {
        // 初始化Netty，开始监听端口并阻塞在这里，等待程序关闭
        nettyRemotingServer.init();
    } catch (Throwable e) {
        logger.error("nettyServer init error:{}", e.getMessage(), e);
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
   	   // 判断是否运行在容器中，如果运行在容器中则配置从环境变量中获取
       if (ContainerHelper.isRunningInContainer()) {
           this.seataEnv = ContainerHelper.getEnv();
           this.host = ContainerHelper.getHost();
           this.port = ContainerHelper.getPort();
           this.serverNode = ContainerHelper.getServerNode();
           this.storeMode = ContainerHelper.getStoreMode();
       } else {
           // 基于JCommander获取启动应用程序时配置的参数，
           // JCommander通过注解、反射的方式把参数赋值到当前类的字段上。
           JCommander jCommander = JCommander.newBuilder().addObject(this).build();
           jCommander.parse(args);
           if (help) {
               jCommander.setProgramName(PROGRAM_NAME);
               jCommander.usage();
               System.exit(0);
           }
       }
       // serverNode用于雪花算中的实例的唯一标识，需要保证唯一。
       // 如果没有指定基于当前服务器的I随机生成一个
       if (this.serverNode == null) {
           this.serverNode = IdWorker.initWorkerId();
       }
       if (StringUtils.isNotBlank(seataEnv)) {
           System.setProperty(ENV_PROPERTY_KEY, seataEnv);
       }
       if (StringUtils.isBlank(storeMode)) {
           // 这里牵扯到一个重要的Configuration类，ParameterParser只负责获取ip、port、storeMode等核心参数，
           // 其他的参数都是从Configuration中获取的。这里如果没有启动参数没有指定storeMode，
           // 就从Configuration类中获取。
           storeMode = ConfigurationFactory.getInstance().getConfig(ConfigurationKeys.STORE_MODE,
               SERVER_DEFAULT_STORE_MODE);
       }
   } catch (ParameterException e) {
       printError(e);
   }

}
```

在ParameterParser的init方法中第一次调用了ConfigurationFactory.getInstance()，初始化了一个单例的Configuration对象，Configuration负责初始化所有的其他配置参数信息。从Seata Server端的源码中我们能看到两个配置文件file.conf、registry.conf。那么这两个配置文件的区别是什么，两个文件都是必须的吗？我们继续看代码。

ConfigurationFactory.getInstance方法其实就是获取一个单例对象，核心在buildConfiguration方法中，不过在buidlConfiguration方法前，ConfigurationFactory类有一段static代码块会先执行。
```java
// 获取Configuration的单例对象
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

// ConfigurationFactory的static代码块
static {
    // 获取配置文件的名称，默认为registry.conf
    String seataConfigName = System.getProperty(SYSTEM_PROPERTY_SEATA_CONFIG_NAME);
    if (seataConfigName == null) {
        seataConfigName = System.getenv(ENV_SEATA_CONFIG_NAME);
    }
    if (seataConfigName == null) {
        seataConfigName = REGISTRY_CONF_PREFIX;
    }
    String envValue = System.getProperty(ENV_PROPERTY_KEY);
    if (envValue == null) {
        envValue = System.getenv(ENV_SYSTEM_KEY);
    }
    
    // 读取registry.conf文件的配置，构建基础的Configuration对象
    Configuration configuration = (envValue == null) ? new FileConfiguration(seataConfigName + REGISTRY_CONF_SUFFIX,
        false) : new FileConfiguration(seataConfigName + "-" + envValue + REGISTRY_CONF_SUFFIX, false);
    Configuration extConfiguration = null;
    try {
        // ExtConfigurationProvider当前只有一个SpringBootConfigurationProvider实现类
        // 用于支持客户端SDK SpringBoot的配置文件方式，对于Server端来说这段逻辑可以忽略。
        extConfiguration = EnhancedServiceLoader.load(ExtConfigurationProvider.class).provide(configuration);
        if (LOGGER.isInfoEnabled()) {
            LOGGER.info("load Configuration:{}", extConfiguration == null ? configuration.getClass().getSimpleName()
                : extConfiguration.getClass().getSimpleName());
        }
    } catch (EnhancedServiceNotFoundException ignore) {

    } catch (Exception e) {
        LOGGER.error("failed to load extConfiguration:{}", e.getMessage(), e);
    }
    CURRENT_FILE_INSTANCE = extConfiguration == null ? configuration : extConfiguration;
}
```

ConfigurationFactory中的static代码块是从registry.conf中读取配置信息。registry.conf中主有两个配置信息，**注册中心**和**配置源**，**配置源**用来指定其他更详细的配置项是file.conf或者是apollo等其他配置源。所以registry.conf配置文件时必须的，registry.conf配置文件中指定其他详细配置的配置源，当前配置源支持file、zk、apollo、nacos、etcd3等。所以file.conf不是必须的，只有当设置配置源为file类型时才会读取file.conf文件中的内容。

接下来ConfigurationFactory中的buildConfiguration就是根据registry.conf中设置的配置源来加载更多的配置项。

```java
private static Configuration buildConfiguration() {
    ConfigType configType;
    String configTypeName;
    try {
    	// 从registry.conf配置文件中读取config.type字段值，并解析为枚举ConfigType
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
    Configuration extConfiguration = null;
    Configuration configuration;
    if (ConfigType.File == configType) {
    	// 如果配置文件为file类型，则从registry.conf中读取config.file.name配置项，
    	// 即file类型配置文件的路径，示例中默认为file.conf
        String pathDataId = String.join(ConfigurationKeys.FILE_CONFIG_SPLIT_CHAR,
            ConfigurationKeys.FILE_ROOT_CONFIG, FILE_TYPE, NAME_KEY);
        String name = CURRENT_FILE_INSTANCE.getConfig(pathDataId);
        
        // 根据file配置文件的路径构建FileConfuguration对象
        configuration = new FileConfiguration(name);
        try {
        	// configuration的额外扩展，也是只对客户端SpringBoot的SDK才生效
            extConfiguration = EnhancedServiceLoader.load(ExtConfigurationProvider.class).provide(configuration);
            if (LOGGER.isInfoEnabled()) {
                LOGGER.info("load Configuration:{}", extConfiguration == null
                    ? configuration.getClass().getSimpleName() : extConfiguration.getClass().getSimpleName());
            }
        } catch (EnhancedServiceNotFoundException ignore) {

        } catch (Exception e) {
            LOGGER.error("failed to load extConfiguration:{}", e.getMessage(), e);
        }
    } else {
    	// 如果配置文件的类型不是file，如：nacos、zk等，
    	// 则通过SPI的方式生成对应的ConfigurationProvider对象
        configuration = EnhancedServiceLoader
            .load(ConfigurationProvider.class, Objects.requireNonNull(configType).name()).provide();
    }
    try {
    	// ConfigurationCache是对Configuration做了一次层代理内存缓存，提升获取配置的性能
        Configuration configurationCache;
        if (null != extConfiguration) {
            configurationCache = ConfigurationCache.getInstance().proxy(extConfiguration);
        } else {
            configurationCache = ConfigurationCache.getInstance().proxy(configuration);
        }
        if (null != configurationCache) {
            extConfiguration = configurationCache;
        }
    } catch (EnhancedServiceNotFoundException ignore) {

    } catch (Exception e) {
        LOGGER.error("failed to load configurationCacheProvider:{}", e.getMessage(), e);
    }
    return null == extConfiguration ? configuration : extConfiguration;
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
        // 这里又用到了SPI的方式加载SessionManager，
        // 其实下面获取的四个SessionManager实例都是同一个类DataBaseSessionManager的不同实例，
        // 只是给DataBaseSessionManager的构造函数传参不同。
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

// 根据实例的taskName来决定allSessions返回的事务列表，
// 如taskName等于ASYNC_COMMITTING_SESSION_MANAGER_NAME的
// 就返回所有状态为AsyncCommitting的事务。
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
				GlobalStatus.TimeoutRollbacking, 
				GlobalStatus.TimeoutRollbackRetrying,
				GlobalStatus.AsyncCommitting}));
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

// init方法初始化了5个定时器，主要用于分布式事务的重试机制，
// 因为分布式环境的不稳定性会造成事务处于中间状态，
// 所以要通过不断的重试机制来实现事务的最终一致性。
// 下面的定时器除了undoLogDelete之外，其他的定时任务默认都是1秒执行一次。
public void init() {
    // 处理处于回滚状态可重试的事务
	retryRollbacking.scheduleAtFixedRate(() -> {
		try {
			handleRetryRollbacking();
		} catch (Exception e) {
			LOGGER.info("Exception retry rollbacking ... ", e);
		}
	}, 0, ROLLBACKING_RETRY_PERIOD, TimeUnit.MILLISECONDS);
		
    // 处理二阶段可以重试提交的状态可重试的事务
	retryCommitting.scheduleAtFixedRate(() -> {
		try {
			handleRetryCommitting();
		} catch (Exception e) {
			LOGGER.info("Exception retry committing ... ", e);
		}
	}, 0, COMMITTING_RETRY_PERIOD, TimeUnit.MILLISECONDS);

    // 处理异步提交的事务
	asyncCommitting.scheduleAtFixedRate(() -> {
		try {
			handleAsyncCommitting();
		} catch (Exception e) {
			LOGGER.info("Exception async committing ... ", e);
		}
	}, 0, ASYNC_COMMITTING_RETRY_PERIOD, TimeUnit.MILLISECONDS);
    
	// 检查事务的第一阶段已经超时的事务，设置事务状态为TimeoutRollbacking，
	// 该事务会由其他定时任务执行回滚操作
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

#### 6. 初始化NettyRemotingServer
NettyRemotingServer是基于Netty实现的简化版的Rpc服务端，NettyRemotingServer初始化时主要做了两件事：
1. **registerProcessor**：注册与Client通信的Processor。
2. **super.init()**：super.init()方法中负责初始化Netty，并把当前实例的IP端口注册到注册中心中

```java
public void init() {
    // registry processor
    registerProcessor();
    if (initialized.compareAndSet(false, true)) {
        super.init();
    }
}

private void registerProcessor() {
	// 1. 注册核心的ServerOnRequestProcessor，即与事务处理相关的Processor，
	// 如：全局事务开始、提交，分支事务注册、反馈当前状态等。
	// ServerOnRequestProcessor的构造函数中传入getHandler()返回的示例，这个handler
	// 就是前面提到的DefaultCoordinator，DefaultCoordinator是分布式事务的核心处理类
	ServerOnRequestProcessor onRequestProcessor =
	    new ServerOnRequestProcessor(this, getHandler());
	super.registerProcessor(MessageType.TYPE_BRANCH_REGISTER, onRequestProcessor, messageExecutor);
	super.registerProcessor(MessageType.TYPE_BRANCH_STATUS_REPORT, onRequestProcessor, messageExecutor);
	super.registerProcessor(MessageType.TYPE_GLOBAL_BEGIN, onRequestProcessor, messageExecutor);
	super.registerProcessor(MessageType.TYPE_GLOBAL_COMMIT, onRequestProcessor, messageExecutor);
	super.registerProcessor(MessageType.TYPE_GLOBAL_LOCK_QUERY, onRequestProcessor, messageExecutor);
	super.registerProcessor(MessageType.TYPE_GLOBAL_REPORT, onRequestProcessor, messageExecutor);
	super.registerProcessor(MessageType.TYPE_GLOBAL_ROLLBACK, onRequestProcessor, messageExecutor);
	super.registerProcessor(MessageType.TYPE_GLOBAL_STATUS, onRequestProcessor, messageExecutor);
	super.registerProcessor(MessageType.TYPE_SEATA_MERGE, onRequestProcessor, messageExecutor);
	
	// 2.注册ResponseProcessor，ResponseProcessor用于处理当Server端主动发起请求时，
	// Client端回复的消息，即Response。如：Server向Client端发送分支事务提交或者回滚的请求时，
	// Client返回提交/回滚的结果
	ServerOnResponseProcessor onResponseProcessor =
	    new ServerOnResponseProcessor(getHandler(), getFutures());
	super.registerProcessor(MessageType.TYPE_BRANCH_COMMIT_RESULT, onResponseProcessor, messageExecutor);
	super.registerProcessor(MessageType.TYPE_BRANCH_ROLLBACK_RESULT, onResponseProcessor, messageExecutor);
	
	// 3. Client端发起RM注册请求时对应的Processor
	RegRmProcessor regRmProcessor = new RegRmProcessor(this);
	super.registerProcessor(MessageType.TYPE_REG_RM, regRmProcessor, messageExecutor);
	
	// 4. Client端发起TM注册请求时对应的Processor
	RegTmProcessor regTmProcessor = new RegTmProcessor(this);
	super.registerProcessor(MessageType.TYPE_REG_CLT, regTmProcessor, null);
	
	// 5. Client端发送心跳请求时对应的Processor
	ServerHeartbeatProcessor heartbeatMessageProcessor = new ServerHeartbeatProcessor(this);
	super.registerProcessor(MessageType.TYPE_HEARTBEAT_MSG, heartbeatMessageProcessor, null);
}
```

在NettyRemotingServer中有调用基类AbstractNettyRemotingServer的init方法，代码如下：
```java
public void init() {
	// super.init()方法中启动了一个定时清理超时Rpc请求的定时任务，3S执行一次。
    super.init();
	// 配置Netty Server端，开始监听端口。
    serverBootstrap.start();
}

// serverBootstrap.start();
public void start() {
	// Netty server端的常规配置，其中添加了两个ChannelHandler：
	// ProtocolV1Decoder、ProtocolV1Encoder，
	// 分别对应Seata自定义RPC协议的解码器和编码器
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
                if (channelHandlers != null) {
                    addChannelPipelineLast(ch, channelHandlers);
                }

            }
        });

    try {
		// 开始监听配置的端口
        ChannelFuture future = this.serverBootstrap.bind(listenPort).sync();
        LOGGER.info("Server started, listen port: {}", listenPort);
		// Netty启动成功之后把当前实例注册到registry.conf配置文件配置的注册中心上
        RegistryFactory.getInstance().register(new InetSocketAddress(XID.getIpAddress(), XID.getPort()));
        initialized.set(true);
        future.channel().closeFuture().sync();
    } catch (Exception exx) {
        throw new RuntimeException(exx);
    }
}
```
