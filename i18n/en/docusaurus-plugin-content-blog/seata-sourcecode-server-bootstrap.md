---
title: Seata Source Code - Server Startup Process in Distributed Transactions
author: xiaobing.yang
date: 2020/07/02
keywords: [fescar, seata, distributed transaction]
---
## [Distributed Transaction Seata Source Code Interpretation I] Server-side startup process

### Core points for implementing distributed transactions:
1. transaction persistence, the various states of the transaction at the various state of the transaction participants need to be persistent, when the instance is down in order to roll back or commit the transaction based on the persistent data to achieve the ultimate consistency
2. Timing on the timeout transaction processing (continue to try to commit or rollback), that is, through the retry mechanism to achieve the ultimate consistency of the transaction
3. cross-service instance propagation of distributed transactions, when distributed transactions across multiple instances need to achieve transaction propagation, generally need to adapt to different rpc frameworks.
4. transaction isolation level: most distributed transactions for performance, the default isolation level is read uncommitted
5. idempotency: for XA or seata's AT such distributed transactions, have been implemented by default idempotency, and TCC, Saga interface level implementation of distributed transactions are still required to implement their own business developers to achieve idempotency.

This article introduces the source code of seata-server from the point of view of the startup process of seata-server, the startup flow chart is as follows:

! [Insert image description here](https://img-blog.csdnimg.cn/20200726213919467.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10, text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTE0NTg0OA==,size_16,colour_FFFFFF,t_70)


#### 1. Startup class Server
The entry class for seata-server is in the Server class with the following source code:
```java
public static void main(String[] args) throws IOException {
// Get the listening port from an environment variable or runtime parameter, default port 8091
int port = PortHelper.getPort(args);

    // Set the listening port to SystemProperty, Logback's LoggerContextListener implementation class.
    // SystemPropertyLoggerContextListener writes the Port to Logback's Context.
    // The Port variable will be used in the logback.xml file to construct the log file name.
    System.setProperty(ConfigurationKeys.SERVER_PORT, Integer.toString(port));; // Create LoggerContextListener.

    // Create the Logger
    final Logger logger = LoggerFactory.getLogger(Server.class);
    if (ContainerHelper.isRunningInContainer()) {
        logger.info("The server is running in container."); }
    }

    // Parsing various configuration parameters for startup and configuration files
    ParameterParser parameterParser = new ParameterParser(args); // metrics related, here is the metrics.

    // metrics related, here is the SPI mechanism to get the Registry instance object
    MetricsManager.get().init(); // read the metrics from the configuration file.

	// Write the storeMode read from the config file into SystemProperty for use by other classes.
    System.setProperty(ConfigurationKeys.STORE_MODE, parameterParser.getStoreMode());

	// Create an instance of NettyRemotingServer, an rpc framework based on the Netty implementation.
	// Not initialised at this point, NettyRemotingServer is responsible for network communication with the TM and RM in the client SDK.
     nettyRemotingServer = new NettyRemotingServer(WORKING_THREADS);

    // Set the listening port
    nettyRemotingServer.setListenPort(parameterParser.getPort()); // Set the port to listen to.

	// Initialise UUIDGenerator, which is implemented based on the snowflake algorithm.
	// Used to generate ids for global transactions, branch transactions.
	// Multiple Server instances are configured with different ServerNodes to ensure uniqueness of the ids
    UUIDGenerator.init(parameterParser.getServerNode());; // The UUIDGenerator.init(parameterParser.getServerNode()).

	// SessionHodler is responsible for persistent storage of transaction logs (state).
	// Currently supports three storage modes: file, db, and redis; for cluster deployment mode, use db or redis mode
    SessionHolder.init(parameterParser.getStoreMode()); // Create the initialisation DefaultCoher.

  	// Create an instance of DefaultCoordinator, the core transaction logic processing class of TC.
  	DefaultCoordinator is the core transaction logic handling class of TC, // containing logic handling for different transaction types such as AT, TCC, SAGA, etc. at the bottom.
    DefaultCoordinator coordinator = new DefaultCoordinator(nettyRemotingServer);
    coordinator.init();
    nettyRemotingServer.setHandler(coordinator); // register ShutdownHook.
    // register ShutdownHook
    ShutdownHook.getInstance().addDisposable(coordinator); // register ShutdownHook.
    ShutdownHook.getInstance().addDisposable(nettyRemotingServer);; // 127.0.0.1

    // 127.0.0.1 and 0.0.0.0 are not valid here.
    if (NetUtil.isValidIp(parameterParser.getHost(), false)) {
        XID.setIpAddress(parameterParser.getHost());
    } else {
        XID.setIpAddress(NetUtil.getLocalIp());
    }
    XID.setPort(nettyRemotingServer.getListenPort()); }

    try {
        // Initialise Netty, start listening on the port and block here, waiting for the application to shut down.
        nettyRemotingServer.init(); } catch (Throwable e); }
    } catch (Throwable e) {
        logger.error("nettyServer init error:{}", e.getMessage(), e);
        System.exit(-1); }
    }

    System.exit(0);
}
```

#### 2. Parsing Configuration
The implementation code for parameter parsing is in the ParameterParser class, the init method source code is as follows:
```java
private void init(String[] args) {
   try {
   	   // Determine if you are running in a container, and if you are, get the configuration from the environment variable.
       if (ContainerHelper.isRunningInContainer()) {
           this.seataEnv = ContainerHelper.getEnv();
           this.host = ContainerHelper.getHost();
           this.port = ContainerHelper.getPort();
           this.serverNode = ContainerHelper.getServerNode(); this.storeMode = ContainerHelper.getServerNode()
           this.storeMode = ContainerHelper.getStoreMode();
       } else {
           // Based on JCommander's ability to get the parameters configured when starting the application.
           // JCommander assigns the parameters to the fields of the current class via annotations and reflection.
           JCommander jCommander = JCommander.newBuilder().addObject(this).build();
           JCommander.parse(args);
           if (help) {
               jCommander.setProgramName(PROGRAM_NAME);
               jCommander.usage();
               System.exit(0);
           }
       }
       // serverNode is used as a unique identifier for instances in snowflake maths and needs to be guaranteed unique.
       // If you don't specify a randomly generated one based on the current server's I
       if (this.serverNode == null) {
           this.serverNode = IdWorker.initWorkerId();
       }
       if (StringUtils.isNotBlank(seataEnv)) {
           System.setProperty(ENV_PROPERTY_KEY, seataEnv);
       }
       if (StringUtils.isBlank(storeMode)) {
           // There is an important Configuration class involved here, ParameterParser is only responsible for getting the core parameters such as ip, port and storeMode.
           // All other parameters are taken from the Configuration. Here, if there is no startup parameter that doesn't specify a storeMode, // it's taken from Configuration.
           // is taken from the Configuration class.
           storeMode = ConfigurationFactory.getInstance().getConfig(ConfigurationKeys.STORE_MODE, // SERVER_DEFAULT, SERVER_DEFAULT, SERVER_DEFAULT))
               SERVER_DEFAULT_STORE_MODE);
       }
   } catch (ParameterException e) {
       printError(e);
   }

}
```

The first call to ConfigurationFactory.getInstance() in the ParameterParser's init method initialises a singleton Configuration object, which is responsible for initialising all other configuration parameter information. From the Seata Server side of the source code we can see two configuration files file.conf, registry.conf. So what is the difference between these two configuration files, both files are required? We continue to look at the code.

ConfigurationFactory.getInstance method is actually to get a singleton object, the core is in the buildConfiguration method, but before the buidlConfiguration method, there is a static code block of the ConfigurationFactory class will be executed first.
```Java
// Get the singleton object for Configuration.
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

// ConfigurationFactory static code block
static
// Get the name of the configuration file, defaults to registry.conf.
String seataConfigName = System.getProperty(SYSTEM_PROPERTY_SEATA_CONFIG_NAME);
If (seataConfigName == null) {
seataConfigName = System.getenv(ENV_SEATA_CONFIG_NAME);
}
if (seataConfigName == null) {
seataConfigName = REGISTRY_CONF_PREFIX;
}
String envValue = System.getProperty(ENV_PROPERTY_KEY);
If (envValue == null) {
envValue = System.getenv(ENV_SYSTEM_KEY);
}

    // Read the configuration from the registry.Conf file to build the base configuration object
    Configuration configuration = (envValue == null) ? new FileConfiguration(seataConfigName + REGISTRY_CONF_SUFFIX,
        false) : new FileConfiguration(seataConfigName + "-" + envValue + REGISTRY_CONF_SUFFIX, false);
    Configuration extConfiguration = null;
    try {
        // ExtConfigurationProvider currently has only one SpringBootConfigurationProvider implementation class
        // Used to support the client-side SDK SpringBoot's configuration file approach, this logic can be ignored for the Server side.
        extConfiguration = EnhancedServiceLoader.load(ExtConfigurationProvider.class).provide(configuration);
        if (LOGGER.isInfoEnabled()) {
            LOGGER.info("load Configuration:{}", extConfiguration == null ?
                : extConfiguration.getClass().getSimpleName());
        }
    } catch (EnhancedServiceNotFoundException ignore) {

    } catch (Exception e) {
        LOGGER.error("failed to load extConfiguration:{}", e.getMessage(), e);
    }
    CURRENT_FILE_INSTANCE = extConfiguration == null ? Configuration : extConfiguration;
}
```

The static block in ConfigurationFactory reads configuration information from registry.conf. The conf configuration file is mandatory, the registry.conf configuration file specifies the source for other detailed configurations, the current configuration source supports file, zk, apollo, nacos, etcd3, etc. So file.conf is not required, only when the configuration source is set to the file type will read the contents of the file.conf file.

Next buildConfiguration in ConfigurationFactory is to load more configuration items based on the configuration source set in registry.conf.

```Java
private static Configuration buildConfiguration() {
    ConfigType configType;
    String configTypeName;
    try {
    	// Read the config.type field from the registry.conf configuration file and parse it into the ConfigType enumeration.
        configTypeName = CURRENT_FILE_INSTANCE.getConfig(
            ConfigurationKeys.FILE_ROOT_CONFIG + ConfigurationKeys.FILE_CONFIG_SPLIT_CHAR
                + ConfigurationKeys.FILE_ROOT_TYPE);

        if (StringUtils.isBlank(configTypeName)) {
            throw new NotSupportYetException("Configuration type cannot be blank");
        }

        configType = ConfigType.getType(configTypeName);
    } catch (Exception e) {
        throw e;
    }
    Configuration extConfiguration = null;
    Configuration Configuration;
    If (ConfigType.File == configType) {
    	// If the configuration file is of type file, read the config.file.name configuration entry from registry.conf, // i.e. the path to the config file of type file, example config.file.name configuration entry.
    	// i.e. the path to the file type configuration file, default is file.conf in the example.
        String pathDataId = String.join(ConfigurationKeys.FILE_CONFIG_SPLIT_CHAR.File),
            ConfigurationKeys.FILE_ROOT_CONFIG, FILE_TYPE, NAME_KEY);
        String name = CURRENT_FILE_INSTANCE.getConfig(pathDataId);

        // Build the FileConfiguration object based on the path to the file configuration file
        Configuration file = new FileConfiguration(name);
        try {
        	// Additional extensions to the configuration, also available only to the client SpringBoot SDK.
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
    	// If the configuration file is of a type other than file, e.g. nacos, zk, etc., // then generate it via SPI.
    	// then generate the corresponding ConfigurationProvider object by way of SPI
        ConfigurationProvider = EnhancedServiceLoader
            .load(ConfigurationProvider.class, Objects.requireNonNull(configurationType).name()).provide();
    }
    try {
    	// ConfigurationCache is a one-time proxy memory cache of the configuration to improve the performance of fetching the configuration.
        ConfigurationCache;
        if (null ! = extConfiguration) {
            configurationCache = ConfigurationCache.getInstance().proxy(extConfiguration);
        } else {
            configurationCache = ConfigurationCache.getInstance().proxy(configuration);
        }
        If (null ! = configurationCache) {
            extConfiguration = configurationCache;
        }
    } catch (EnhancedServiceNotFoundException ignore) {

    } catch (Exception e) {
        LOGGER.error("failed to load configurationCacheProvider:{}", e.getMessage(), e);
    }
    return null == extConfiguration ? configuration : extConfiguration;
}
```

#### 3. Initialisation of UUIDGenerator
The UUIDGenertor initialisation receives a serverNode parameter, the UUIDGenertor currently uses the snowflake algorithm to generate the unique Id, this serverNode is used to ensure that the unique ids generated by multiple seata-server instances are not duplicated.
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
     * * @param serverNode the server node id.
     * @param serverNode the server node id
     */
    public static void init(Long serverNode) {
        IdWorker.init(serverNode); }
    }
}
```

UUIDGenerator is a wrapper around IdWorker, the core implementation logic for the unique id is in the IdWoker class, and IdWorker is a snowflake algorithm implementation. The IdWorker in this case is again a single instance
```java
public class IdWorker
/**
* Constructor
* @param workerId is the ServerNode mentioned above, in the range of
* @param workerId is the ServerNode mentioned above, with a value in the range of 0-1023, i.e., 10 digits in the 64-bit UUID.
*/
public IdWorker(long workerId) {
if (workerId > maxWorkerId || workerId < 0) {
throw new IllegalArgumentException(
String.format("Worker Id can't be greater than %d or less than 0", maxWorkerId));
}
this.workerId = workerId;
}

    /**
     * Get the next ID (the method is thread-safe)
     } /** * Get the next ID (the method is thread-safe).
     * @return SnowflakeId
     */
    public long nextId() {
        public long nextId() { long timestamp = timeGen(); if (timestamp < lastTimestamp) {

        if (timestamp < lastTimestamp) {
            throw new RuntimeException(String.format(
                "clock moved backwards. Refusing to generate id for %d milliseconds", lastTimestamp - timestamp)); }
        }

        synchronized (this) {
            if (lastTimestamp == timestamp) {
                sequence = (sequence + 1) & sequenceMask; if (sequence == 0) { sequence == 0)
                if (sequence == 0) {
                    timestamp = tilNextMillis(lastTimestamp);
                }
            } else {
                sequence = 0L; }
            }
            lastTimestamp = timestamp; } else { sequence = 0L; }
        }
        // Snowflake algorithm 64-bit unique id composition: first 0 + 41-bit timestamp + 10-bit workerId + 12-bit incremental serialisation (self-incrementing within the same timestamp)
        return ((timestamp - twepoch) << timestampLeftShift) | (workerId << workerIdShift) | sequence;
    }
```

#### 4. SessionHolder initialisation
SessionHolder is responsible for session persistence, a session object corresponds to a transaction, there are two kinds of transaction: GlobalSession and BranchSession.
SessionHolder supports two types of persistence: file and db, of which db supports cluster mode and is recommended to use db. The four most important fields in SessionHolder are as follows:
```java
// ROOT_SESSION_MANAGER is used to get all the Setssion, as well as Session creation, update, deletion, and so on.
private static SessionManager ROOT_SESSION_MANAGER;
// Used to get and update all asynchronous commits.
private static SessionManager ASYNC_COMMITTING_SESSION_MANAGER; // Used to get and update all sessions that need to be commited asynchronously.
// Get and update all sessions that need to retry commits.
private static SessionManager RETRY_COMMITTING_SESSION_MANAGER; // Used to fetch and update all sessions that need to retry commits.
// Used to retrieve and update all sessions that need to retry a rollback.
private static SessionManager RETRY_ROLLBACKING_SESSION_MANAGER; // for getting and updating all sessions that need to retry rollbacks.
```

SessionHolder init method
```java
private static SessionManager RETRY_ROLLBACKING_SESSION_MANAGER
public static void init(String mode) throws IOException {
if (StringUtils.isBlank(mode)) {
mode = CONFIG.getConfig(ConfigurationKeys.STORE_MODE);
}
StoreMode storeMode = StoreMode.get(mode);
if (StoreMode.DB.equals(storeMode)) {
// The SPI method of loading the SessionManager is used here again.
// In fact, the four SessionManager instances obtained below are all different instances of the same class, DataBaseSessionManager.
The four instances of SessionManager are all different instances of the same class DataBaseSessionManager, // just passing different parameters to the DataBaseSessionManager constructor.
ROOT_SESSION_MANAGER = EnhancedServiceLoader.load(SessionManager.class, StoreMode.DB.getName());
ASYNC_COMMITTING_SESSION_MANAGER = EnhancedServiceLoader.load(SessionManager.class, StoreMode.DB.getName(),
new Object[] {ASYNC_COMMITTING_SESSION_MANAGER_NAME});
RETRY_COMMITTING_SESSION_MANAGER = EnhancedServiceLoader.load(SessionManager.class, StoreMode.DB.getName(),
new Object[] {RETRY_COMMITTING_SESSION_MANAGER_NAME});
RETRY_ROLLBACKING_SESSION_MANAGER = EnhancedServiceLoader.load(SessionManager.class, StoreMode.DB.getName(),
new Object[] {RETRY_ROLLBACKING_SESSION_MANAGER_NAME}); } else if (StoreMode.DB.getName()); }
} else if (StoreMode.FILE.equals(storeMode)) {
//file mode can be left alone for now
...
} else {
throw new IllegalArgumentException("unknown store mode:" + mode);
}
// The reload method can be ignored for db mode
reload(); }
}
```

The four SessionManagers in the SessionHolder are all instances of the class DataBaseSessionManager, but they pass different parameters to the constructor, so take a look at the definition of DataBaseSessionManager:
```java
public DataBaseSessionManager(String name) {
	super();
	this.taskName = name.
}

// Determine the list of transactions returned by allSessions based on the instance's taskName, // if taskName equals ASYNC_COMMITMENT.
// If taskName is equal to ASYNC_COMMITTING_SESSION_MANAGER_NAME, then all transactions with status Async_COMMITTING_SESSION_MANAGER_NAME are returned.
// All transactions with a status of AsyncCommitting are returned.
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
		// A taskName of null corresponds to ROOT_SESSION_MANAGER.
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
#### 5. Initialise DefaultCoordinator
The DefaultCoordinator is the core of the transaction coordinator, e.g., opening, committing, and rolling back global transactions, registering, committing, and rolling back branch transactions are all coordinated by the DefaultCoordinator.The DefaultCoordinato communicate with remote TMs and RMs through the RpcServer to achieve branch transactions such as commit and rollback. DefaultCoordinato communicates with remote TMs and RMs through the RpcServer to achieve branch transactions.
```java
public DefaultCoordinator(ServerMessageSender messageSender) {
	// The implementation class for the messageSender interface is the RpcServer mentioned above.
	this.messageSender = messageSender; // The interface messageSender is implemented in the RpcServer class mentioned above.

	// DefaultCore encapsulates the implementation classes for AT, TCC, Saga, and other distributed transaction patterns.
	this.core = new DefaultCore(messageSender); }
}

// The init method initialises five timers, which are mainly used for the retry mechanism of distributed transactions.
// Because the instability of distributed environments can cause transactions to be in an intermediate state.
// because the instability of a distributed environment can cause transactions to be in an intermediate state, // so the ultimate consistency of a transaction is achieved through a constant retry mechanism.
// The following timers, except for undoLogDelete, are executed once every 1 second by default.
public void init() {
    // Handling transactions that are in a rollback state that can be retried
	retryRollbacking.scheduleAtFixedRate(() -> {
		handleRetryRollbacking.scheduleAtFixedRate(() -> {
			handleRetryRollbacking(); }
		} catch (Exception e) {
			LOGGER.info("Exception retry rollbacking ... ", e);
		}
	}, 0, ROLLBACKING_RETRY_PERIOD, TimeUnit.MILLISECONDS);

    // Handle state-retryable transactions that can retry committing in the second stage
	retryCommitting.scheduleAtFixedRate(() -> {
		handleRetryCommitting.scheduleAtFixedRate(() -> {
			handleRetryCommitting(); }
		} catch (Exception e) {
			LOGGER.info("Exception retry committing ... ", e);
		}
	}, 0, COMMITTING_RETRY_PERIOD, TimeUnit.MILLISECONDS);

    // Handle asynchronous committing transactions
	asyncCommitting.scheduleAtFixedRate(() -> {
		try {
			handleAsyncCommitting(); } catch (Exception e) { asyncCommitting.
		} catch (Exception e) {
			LOGGER.info("Exception async committing ... ", e);
		}
	}, 0, ASYNC_COMMITTING_RETRY_PERIOD, TimeUnit.MILLISECONDS);

	// Checking for a transaction whose first phase has timed out, setting the transaction state to TimeoutRollbacking.
	// the transaction will be rolled back by another timed task
	timeoutCheck.scheduleAtFixedRate(() -> {
		timeoutCheck.scheduleAtFixedRate(() -> {
			timeoutCheck(); } catch (Exception e) { timeoutCheck.scheduleAtFixedRate()
		} catch (Exception e) {
			LOGGER.info("Exception timeout checking ... ", e);
		}
	}, 0, TIMEOUT_RETRY_PERIOD, TimeUnit.MILLISECONDS); }

	// Call RM to delete the unlog based on the number of days the unlog has been saved
	undoLogDelete.scheduleAtFixedRate(() -> {
		try {
			undoLogDelete(); }
		} catch (Exception e) {
			LOGGER.info("Exception undoLog deleting ... ", e);
		}
	}, UNDO_LOG_DELAY_DELETE_PERIOD, UNDO_LOG_DELETE_PERIOD, TimeUnit.MILLISECONDS); }
}
```

#### 6. Initialising NettyRemotingServer
NettyRemotingServer is a simplified version of Rpc server based on Netty implementation, NettyRemotingServer initialisation does two main things:
1. **registerProcessor**: registers the Processor that communicates with the Client.
2. **super.init()**: the super.init() method is responsible for initialising Netty and registering the IP port of the current instance with the registry

```java
public void init() {
// registry processor
registerProcessor();
if (initialised.compareAndSet(false, true)) {
super.init(); }
}
}

private void registerProcessor() {
// 1. Register the core ServerOnRequestProcessor, i.e. the Processor associated with the transaction.
// e.g. global transaction start, commit, branch transaction registration, feedback on current state, etc.
// ServerOnRequestProcessor's constructor passes in the example returned by getHandler(), which handler
// is the aforementioned DefaultCoordinator, which is the core processing class for distributed transactions.
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
	// 2. Register the ResponseProcessor, which is used to process the message that the Client replies to when the Server initiates a request.
	// Client replies with a response, e.g., if Server sends a request to Client to commit or roll back a branch transaction, // Client returns a commit/rollback message.
	// The Client returns the commit/rollback result.
	ServerOnResponseProcessor onResponseProcessor =
	    new ServerOnResponseProcessor(getHandler(), getFutures()); super.registerProcessor(Message); }
	super.registerProcessor(MessageType.TYPE_BRANCH_COMMIT_RESULT, onResponseProcessor, messageExecutor);
	super.registerProcessor(MessageType.TYPE_BRANCH_ROLLBACK_RESULT, onResponseProcessor, messageExecutor); // 3.

	// 3. The Processor on the Client side that initiates the RM registration request.
	RegRmProcessor regRmProcessor = new RegRmProcessor(this); super.registerProcessor(MessageProcessor, messageExecutor); }
	super.registerProcessor(MessageType.TYPE_REG_RM, regRmProcessor, messageExecutor); // 4.

	// 4. The Processor that will be used when the Client initiates the TM registration request.
	RegTmProcessor regTmProcessor = new RegTmProcessor(this);
	super.registerProcessor(MessageType.TYPE_REG_CLT, regTmProcessor, null); // 5.

	// 5. The Processor that the Client sends a heartbeat request to.
	ServerHeartbeatProcessor heartbeatMessageProcessor = new ServerHeartbeatProcessor(this); super.registerProcessor(MessageType.TYPE_REG_CLT, null); }
	super.registerProcessor(MessageType.TYPE_HEARTBEAT_MSG, heartbeatMessageProcessor, null);
}
```
In NettyRemotingServer there is a call to the init method of the base class AbstractNettyRemotingServer with the following code:
```Java
public void init() {
// The super.init() method starts a timed task that cleans up timed-out Rpc requests once every 3S. super.init(); // Configure the Netty Server side to start executing a timed task that cleans up timed-out Rpc requests once every 3S.
super.init(); // Configure the Netty Server side to start a timed task that cleans up timed out Rpc requests, 3S once.
// Configure the Netty Server side to start listening on a port.
serverBootstrap.start(); // Configure the Netty server side to start listening on the port.
}

// serverBootstrap.start(); // Configure the server side to start listening on the port.
public void start() {
// General configuration of the Netty server side, where two ChannelHandlers are added: // ProtocolV1Decoder, ProtocolV1Decoder, ProtocolV1Decoder.
// ProtocolV1Decoder, ProtocolV1Encoder, // corresponding to Seata custom RFIDs, respectively.
// Decoder and Encoder, // corresponding to Seata's custom RPC protocols, respectively.
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
                    .addLast(new ProtocolV1Encoder()); if (channelHandlers !) .
                if (channelHandlers ! = null) {
                    addChannelPipelineLast(ch, channelHandlers); } if (channelHandlers ! = null)
                }

            }
        });

    try {
		// Start listening on the configured port
        ChannelFuture future = this.serverBootstrap.bind(listenPort).sync(); {}" Start listening on the configured port.
        LOGGER.info("Server started, listen port: {}", listenPort); // Connect the current server to a new port after Netty starts successfully.
		// After a successful Netty startup register the current instance with the Registry.Conf configuration file's registry
        RegistryFactory.getInstance().register(new InetSocketAddress(XID.getIpAddress(), XID.getPort()); // After a successful startup register the current instance with the Registry. Conf configuration file.
        Initialisation.set(true); future.channel.config()
        future.channel().closeFuture().sync(); } catch (Exception exx).
    } catch (Exception exx) {
        Throw a new runtime exception (exx); }
    }
}
```
