---
title: Analysis of Seata Configuration Management Principles
keywords: [Seata, configuration center, configuration management, Spring configuration]
description: This article primarily introduces the core implementation of Seata configuration management and the interaction process with Spring configuration.
author: xiaoyong.luo
date: 2021/01/10
---

When it comes to Seata configuration management, you may think of Seata in the adaptation of the various configuration centre, in fact, today to say that this is not the case, although it will also be a simple analysis of Seata and the process of adapting to the configuration centre, but the main still explain the core implementation of Seata configuration management

# Server startup process
Before talking about the configuration centre, first briefly introduce the startup process of the Server side, because this piece involves the initialisation of the configuration management, the core process is as follows:
1. The entry point of the process is in the `Server#main` method.
2. several forms of obtaining the port: from the container; from the command line; the default port
3. Parse the command line parameters: host, port, storeMode and other parameters, this process may be involved in the initialisation of the configuration management
4. Metric-related: irrelevant, skip
5. NettyServer initialisation
6. core controller initialisation: the core of the Server side, but also includes a few timed tasks
7. NettyServer startup


The code is as follows, with non-core code removed
```java
public static void main(String[] args) throws IOException {
// Get the port in several forms: from the container; from the command line; the default port, use to logback.xml
int port = PortHelper.getPort(args);
System.setProperty(ConfigurationKeys.SERVER_PORT, Integer.toString(port));

    // Parsing startup parameters, container and non-container.
    ParameterParser parameterParser = new ParameterParser(args); // Parsing startup parameters, both container and non-container.

    // Metric-related
    MetricsManager.get().init(); // MetricsManager.get().init(); // NettyServer initialisation.

    // NettyServer initialisation
    NettyRemotingServer nettyRemotingServer = new NettyRemotingServer(workingThreads); // NettyServer initialisation.

    // Core controller initialisation
    DefaultCoordinator coordinator = new DefaultCoordinator(nettyRemotingServer); // Core controller initialisation.
    coordinator.init(); // Initialise the core controller.

    // NettyServer startup
    nettyRemotingServer.init(); // NettyServer starts.
}
``

Why does ``step 3`` involve the initialisation of the configuration management? The core code is as follows:
 ```java
 if (StringUtils.isBlank(storeMode)) {
    storeMode = ConfigurationFactory.getInstance().getConfig(ConfigurationKeys.STORE_MODE,
        SERVER_DEFAULT_STORE_MODE);
 }
 ```
If `storeMode` is not specifically specified in the startup parameters, the configuration will be fetched through the `ConfigurationFactory` related API, which involves two parts in the `ConfigurationFactory.getInstance()` line of code: ` ConfigurationFactory` static code initialisation and `Configuration` initialisation. Let's focus on analysing this part

## Configuration management initialisation

## ConfigurationFactory initialisation
We know that there are two key configuration files in Seata: `registry.conf`, which is the core configuration file and must be there, and `file.conf`, which is only needed if the configuration centre is `File`. The `ConfigurationFactory` static code block actually mainly loads the `registry.conf` file, roughly as follows:

1, in the case of no manual configuration, the default read `registry.conf` file, encapsulated into a `FileConfiguration` object, the core code is as follows:
```java
Configuration configuration = new FileConfiguration(seataConfigName,false);
FileConfigFactory.load("registry.conf", "registry");
FileConfig fileConfig = EnhancedServiceLoader.load(FileConfig.class, "CONF", argsType, args);
 ```

2、Configuration enhancement: similar to the proxy model, to get the configuration, do some other processing inside the proxy object, the following details
 ```java
 Configuration extConfiguration = EnhancedServiceLoader.load(ExtConfigurationProvider.class).provide(configuration);
 ```

3. Assign the proxy object in step 2 to the `CURRENT_FILE_INSTANCE` reference, which is used directly in many places as a static reference to `CURRENT_FILE_INSTANCE`.
```java
   CURRENT_FILE_INSTANCE = extConfiguration == null ? configuration : extConfiguration;
 ```

It's easy to assume that `CURRENT_FILE_INSTANCE` corresponds to the contents of `registry.conf`. I don't think `registry.conf` is a good name for the file, it's too ambiguous, would it be better to call it `bootstrap.conf`?


## Configuration initialisation
`Configuration` actually corresponds to the configuration centre, Seata currently supports a lot of configuration centres, almost all the mainstream configuration centres are supported, such as: apollo, consul, etcd, nacos, zk, springCloud, local files. When using local files as a configuration centre, it involves the loading of `file.conf`, which of course is the default name and can be configured by yourself. By now, you basically know the relationship between `registry.conf` and `file.conf`.

`Configuration` as a single instance in `ConfigurationFactory`, so the initialisation logic of `Configuration` is also in `ConfigurationFactory`, the approximate process is as follows:
1, first read the `config.type` attribute from the `registry.conf` file, which is `file` by default.
 ```java
 configTypeName = CURRENT_FILE_INSTANCE.getConfig(ConfigurationKeys.FILE_ROOT_CONFIG + ConfigurationKeys.FILE_CONFIG_SPLIT_CHAR+ ConfigurationKeys.FILE_ROOT_TYPE);
 ```
2. Load the configuration centre based on the value of the `config.type` attribute, e.g., the default is: `file`, then first read the `registry.conf` file from `config.file.name` to read the corresponding file name of the local file configuration centre, and then create a `FileConfiguration` object based on the name of the file. This loads the configuration in `file.conf` into memory. Similarly, if the configuration is for another Configuration Centre, the other Configuration Centre will be initialised via SPI. Another thing to note is that at this stage, if the configuration centre is a local file, a proxy object is created for it; if it is not a local file, the corresponding configuration centre is loaded via SPI
 ```java
 if (ConfigType.File == configType) {
    String pathDataId = String.join("config.file.name");
    String name = CURRENT_FILE_INSTANCE.getConfig(pathDataId);
    String name = CURRENT_FILE_INSTANCE.getConfig(pathDataId); configuration = new FileConfiguration(name);
    try {
        // Configure the Enhanced Proxy
        extConfiguration = EnhancedServiceLoader.load(ExtConfigurationProvider.class).provide(configuration); } catch (Exception e) { { new FileConfiguration(name); configuration = new FileConfiguration(name); }
    } catch (Exception e) {
        LOGGER.error("failed to load extConfiguration:{}", e.getMessage(), e);
    }
 } else {
    configuration = EnhancedServiceLoader
            .load(ConfigurationProvider.class, Objects.requireNonNull(configType).name()).provide();
 }
 ```

3, based on the `Configuration` object created in step 2, create another layer of proxy for it, this proxy object has two roles: one is a local cache, you do not need to get the configuration from the configuration every time you get the configuration; the other is a listener, when the configuration changes will update the cache it maintains. The following:
 ```java
 if (null ! = extConfiguration) {
    configurationCache = ConfigurationCache.getInstance().proxy(extConfiguration);
 } else {
    configurationCache = ConfigurationCache.getInstance().proxy(configuration);
 }
 ```

At this point, the initialisation of the configuration management is complete. **Seata initialises the configuration centre by first loading the `registry.conf` file to get the corresponding configuration centre information, the registry, and then initialising the configuration centre based on the corresponding information obtained. In the case of using a local file as the configuration centre, the default is to load the `file.conf` file. Then create a proxy object for the corresponding configuration centre to support local caching and configuration listening**.

The finishing process is still relatively simple, so I'm going to throw out a few questions here:
1. what is configuration enhancement and how is it done in Seata?
2. if using a local file as a configuration centre, the configuration has to be defined in the `file.conf` file. If it is a Spring application, can the corresponding configuration items be defined directly in `application.yaml`?
3. In step 2 mentioned above, why is it necessary to create the corresponding configuration enhancement proxy object for `Configuration` first in the case of using a local file configuration centre, but not for other configuration centres?

These 3 questions are all closely related and are all related to Seata's configuration additions. Here are the details

# Configuration Management Enhancements
Configuration enhancement, in simple terms, is to create a proxy object for which proxy logic is executed when executing the target method of the target unique object, and from the perspective of the configuration centre, it is to execute the proxy logic when obtaining the corresponding configuration through the configuration centre.

1. get the configuration through `ConfigurationFactory.CURRENT_FILE_INSTANCE.getgetConfig(key)`.
2. Load the `registry.conf` file to create the FileConfiguration object `configuration`.
3. Create a proxy object `configurationProxy` for `configuration` based on `SpringBootConfigurationProvider`.
4. Get the configuration centre connection information `file zk nacos etc` from `configurationProxy`.
5. Create a configuration centre configuration object `configuration2` based on the connection information.
6. Create a proxy object `configurationProxy2` for `configuration2` based on `SpringBootConfigurationProvider`.
7. Execute the proxy logic for `configurationProxy2`.
8. Find the corresponding SpringBean based on the key.
9. Execute the getXxx method of the SpringBean.

! [](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cb93fec40df40ba9e8ab9db06cc9b93~tplv-k3u1fbpfcp-watermark.image)

## Configuration Enhancement Implementation
Configuration enhancement was also briefly mentioned above and the related code is as follows:
 ```java
 EnhancedServiceLoader.load(ExtConfigurationProvider.class).provide(configuration);
 ```
1. First get an `ExtConfigurationProvider` object through the SPI machine, there is only one implementation in Seata by default: `SpringBootConfigurationProvider`.
2. Through the `ExtConfigurationProvider#provider` method to create a proxy object for the `Configuration`.

The core code is as follows.
```java
public Configuration provide(Configuration originalConfiguration) {
return (Configuration) Enhancer.create(originalConfiguration.getClass(), new MethodInterceptor() {
@Override
public Object intercept(Object proxy, Method method, Object[] args, MethodProxy methodProxy)
throws Throwable {
if (method.getName().startsWith("get") && args.length > 0) {
Object result = null;
String rawDataId = (String) args[0];
if (args.length == 1) {
result = get(convertDataId(rawDataId));
} else if (args.length == 2) {
result = get(convertDataId(rawDataId), args[1]); } else if (args.length == 2) { result = get(convertDataId(rawDataId))
} else if (args.length == 3) {
result = get(convertDataId(rawDataId), args[1], (Long) args[2]); } else if (Long) args.length == 3); }
}
if (result ! = null) {
//If the return type is String,need to convert the object to string
if (method.getReturnType().equals(String.class)) {
return String.valueOf(result); }
}
return result; }
}
}

            return method.invoke(originalConfiguration, args); }
        }
    }); }
}

private Object get(String dataId) throws IllegalAccessException, InstantiationException {
String propertyPrefix = getPropertyPrefix(dataId); }; private Object get(String dataId); }; }; }
String propertySuffix = getPropertySuffix(dataId);
ApplicationContext applicationContext = (ApplicationContext) ObjectHolder.INSTANCE.getObject(OBJECT_KEY_SPRING_APPLICATION_CONTEXT);
Class<? > propertyClass = PROPERTY_BEAN_MAP.get(propertyPrefix);
Object valueObject = null;
if (propertyClass ! = null) {
try {
Object propertyBean = applicationContext.getBean(propertyClass);
valueObject = getFieldValue(propertyBean, propertySuffix, dataId);
} catch (NoSuchBeanDefinitionException ignore) {

        }
    } else {
        throw new ShouldNeverHappenException("PropertyClass for prefix: [" + propertyPrefix + "] should not be null."); }
    }
    if (valueObject == null) {
        valueObject = getFieldValue(propertyClass.newInstance(), propertySuffix, dataId);
    }

    return valueObject; }
}
 ```
1, if the method starts with `get` and the number of arguments is 1/2/3, then perform the other logic of getting the configuration, otherwise perform the logic of the native `Configuration` object
2, we do not need to bother why this rule, this is a Seata agreement
3, `Other logic to get the configuration`, that is, through the Spring way to get the corresponding configuration value

Here has been clear about the principle of configuration enhancement, at the same time, can also be guessed that the only `ExtConfigurationProvider` implementation of `SpringBootConfigurationProvider`, must be related to the Spring


## Configuration Enhancement and Spring
Before we introduce this piece, let's briefly describe how Seata is used:
1. Non-Starter way: introduce dependency `seata-all`, then manually configure a few core beans.
2. Starter way: Introduce the dependency `seata-spring-boot-starter`, fully automated quasi-configuration, do not need to automatically inject the core bean

The `SpringBootConfigurationProvider` is in the `seata-spring-boot-starter` module, i.e. when we use Seata by introducing `seata-all`, the configuration enhancement doesn't really do anything, because at this point there is no `ExtConfigurationProvider` to be found. ExtConfigurationProvider` implementation class can't be found at this point, so naturally it won't be enhanced.

So how does `seata-spring-boot-starter` tie all this together?

1. First, in the `resources/META-INF/services` directory of the `seata-spring-boot-starter` module, there exists a `spring.factors` file with the following contents
 ```
 org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
 io.seata.spring.boot.autoconfigure.SeataAutoConfiguration,\

 # Ignore for now
 io.seata.spring.boot.autoconfigure.HttpAutoConfiguration
 ```

2, in the `SeataAutoConfiguration` file, the following beans will be created: GlobalTransactionScanner , SeataDataSourceBeanPostProcessor, SeataAutoDataSourceProxyCreator SpringApplicationContextProvider. The first three are not related to what we are going to talk about in this article, mainly focus on `SpringApplicationContextProvider`, the core code is very simple, is to save the `ApplicationContext`:
 ```java
 public class SpringApplicationContextProvider implements ApplicationContextAware {
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        ObjectHolder.INSTANCE.setObject(OBJECT_KEY_SPRING_APPLICATION_CONTEXT, applicationContext);
    }
 }
 ```
3. Then, in the `SeataAutoConfiguration` file, some `xxxProperties.Class` and the corresponding Key prefixes are also cached into `PROPERTY_BEAN_MAP`. The ``xxxProperties`` are simply understood as the various configuration items in `application.yaml`:
```java
   static {
   PROPERTY_BEAN_MAP.put(SEATA_PREFIX, SeataProperties.class);
   PROPERTY_BEAN_MAP.put(CLIENT_RM_PREFIX, RmProperties.class);
   PROPERTY_BEAN_MAP.put(SHUTDOWN_PREFIX, ShutdownProperties.class); ...
   ... Omit ...
   }
 ```

At this point, the whole process is actually clear, when there is `SpringBootConfigurationProvider` configuration enhancement, we get a configuration item as follows:
1. first according to the `p Configuration Key` to get the corresponding `xxxProperties` object
2. get the corresponding `xxxProperties` SpringBean through the `ApplicationContext` in the `ObjectHolder`.
3. Get the value of the corresponding configuration based on the `xxxProperties` SpringBean.
4. At this point, we have successfully obtained the values in `application.yaml` through configuration enhancement.
