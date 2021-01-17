---
title: Seata配置管理原理解析
keywords: Seata、配置中心、配置管理、Spring配置
description: 本文主要介绍Seata配置管理的核心实现以及和Spring配置的交互过程
author: 罗小勇
date: 2021/01/10
---


说到Seata中的配置管理，大家可能会想到Seata中适配的各种配置中心，其实今天要说的不是这个，虽然也会简单分析Seata和各配置中心的适配过程，但主要还是讲解Seata配置管理的核心实现

# Server启动流程
在讲配置中心之前，先简单介绍一下Server端的启动流程，因为这一块就涉及到配置管理的初始化，核心流程如下：
1. 程序入口在`Server#main`方法中
2. 获取port的几种形式：从容器中获取；从命令行获取；默认端口
3. 解析命令行参数：host、port、storeMode等参数，这个过程可能涉及到配置管理的初始化
4. Metric相关：无关紧要，跳过
5. NettyServer初始化
6. 核心控制器初始化：Server端的核心，还包括几个定时任务
7. NettyServer启动


代码如下，删除了非核心代码
```java
public static void main(String[] args) throws IOException {
    // 获取port的几种形式：从容器中获取；从命令行获取；默认端口, use to logback.xml
    int port = PortHelper.getPort(args);
    System.setProperty(ConfigurationKeys.SERVER_PORT, Integer.toString(port));

    // 解析启动参数，分容器和非容器两种情况
    ParameterParser parameterParser = new ParameterParser(args);

    // Metric相关
    MetricsManager.get().init();

    // NettyServer初始化
    NettyRemotingServer nettyRemotingServer = new NettyRemotingServer(workingThreads);

    // 核心控制器初始化
    DefaultCoordinator coordinator = new DefaultCoordinator(nettyRemotingServer);
    coordinator.init();
    
    // NettyServer启动
    nettyRemotingServer.init();
}
```

为社么说`步骤3`中肯能涉及到配置管理的初始化呢？核心代码如下：
```java
if (StringUtils.isBlank(storeMode)) {
    storeMode = ConfigurationFactory.getInstance().getConfig(ConfigurationKeys.STORE_MODE,
        SERVER_DEFAULT_STORE_MODE);
}
```
如果在启动参数中没有特别指定`storeMode`，就会通过`ConfigurationFactory`相关API去获取该配置，在`ConfigurationFactory.getInstance()`这行代码中，涉及到两部分内容：`ConfigurationFactory`静态代码初始化和`Configuration`初始化。接下来我们重点分析这部分内容

# 配置管理初始化

## ConfigurationFactory初始化
我们知道在Seata中有两个关键配置文件：一个是`registry.conf`，这是核心配置文件，必须要有；另一个是`file.conf`，只有在配置中心是`File`的情况下才需要用到。`ConfigurationFactory`静态代码块中，其实主要就是加载`registry.conf`文件，大概如下：

1、在没有手动配置的情况，默认读取`registry.conf`文件，封装成一个`FileConfiguration`对象，核心代码如下：
```java
Configuration configuration = new FileConfiguration(seataConfigName,false);
FileConfigFactory.load("registry.conf", "registry");
FileConfig fileConfig = EnhancedServiceLoader.load(FileConfig.class, "CONF", argsType, args);
```

2、配置增强：类似代理模式，获取配置时，在代理对象里面做一些其他处理，下面详细介绍
```java
Configuration extConfiguration = EnhancedServiceLoader.load(ExtConfigurationProvider.class).provide(configuration);
```

3、将步骤2中的代理对象赋值给`CURRENT_FILE_INSTANCE`引用，在很多地方都直接用到了`CURRENT_FILE_INSTANCE`这个静态引用
```java
CURRENT_FILE_INSTANCE = extConfiguration == null ? configuration : extConfiguration;
```

可以简单的认为：`CURRENT_FILE_INSTANCE`对应的就是`registry.conf`里面的内容。我认为`registry.conf`这个文件名取的不太好，歧义太大，叫做`bootstrap.conf`是不是更好一些？


## Configuration初始化
`Configuration`其实就是对应配置中心，Seata目前支持的配置中心很多，几乎主流的配置中心都支持，如：apollo、consul、etcd、nacos、zk、springCloud、本地文件。当使用本地文件作为配置中心的时候，涉及到`file.conf`的加载，当然这是默认的名字，可以自己配置。到这里，大家也基本上知道了`registry.conf`和`file.conf`的关系了。

`Configuration`作为单例放在`ConfigurationFactory`中，所以`Configuration`的初始化逻辑也是在`ConfigurationFactory`中，大概流程如下：
1、先从`registry.conf`文件中读取`config.type`属性，默认就是`file`
```java
configTypeName = CURRENT_FILE_INSTANCE.getConfig(ConfigurationKeys.FILE_ROOT_CONFIG + ConfigurationKeys.FILE_CONFIG_SPLIT_CHAR+ ConfigurationKeys.FILE_ROOT_TYPE);
```
2、基于`config.type`属性值加载配置中心，比如默认是:`file`，则先从`registry.conf`文件中读取`config.file.name`读取本地文件配置中心对应的文件名，然后基于该文件名创建`FileConfiguration`对象，这样就将`file.conf`中的配置加载到内存中了。同理，如果配置的是其他配置中心，则会通过SPI初始化其他配置中心。还有一点需要注意的是，在这阶段，如果配置中心是本地文件，则会为其创建代理对象；如果不是本地文件，则通过SPI加载对应的配置中心
```java
if (ConfigType.File == configType) {
    String pathDataId = String.join("config.file.name");
    String name = CURRENT_FILE_INSTANCE.getConfig(pathDataId);
    configuration = new FileConfiguration(name);
    try {
        // 配置增强 代理
        extConfiguration = EnhancedServiceLoader.load(ExtConfigurationProvider.class).provide(configuration);
    } catch (Exception e) {
        LOGGER.error("failed to load extConfiguration:{}", e.getMessage(), e);
    }
} else {
    configuration = EnhancedServiceLoader
            .load(ConfigurationProvider.class, Objects.requireNonNull(configType).name()).provide();
}
```

3、基于步骤2创建的`Configuration`对象，为其再创建一层代理，这个代理对象有两个作用：一个是本地缓存，不需要每次获取配置的时候都从配置中获取；另一个是监听，当配置发生变更会更新它维护的缓存。如下：
```java
if (null != extConfiguration) {
    configurationCache = ConfigurationCache.getInstance().proxy(extConfiguration);
} else {
    configurationCache = ConfigurationCache.getInstance().proxy(configuration);
}
```

到这里，配置管理的初始化就完成了。**Seata通过先先加载`registry.conf`文件获取对应的配置中心信息、注册中心，然后再根据获取到的的对应信息初始化配置中心。在使用本地文件作为配置中心的情况下，默认是加载`file.conf`文件。然后再为对应的配置中心创建对应的代理对象，使其支持本地缓存和配置监听**

整理流程还是比较简单，在这里我要抛出几个问题：
1. 什么是配置增强？Seata中的配置增强是怎么做的？
2. 如果使用本地文件作为配置中心，就必须要将配置定义在`file.conf`文件中。如果是Spring应用，能不能直接将对应的配置项定义在`application.yaml`中？
3. 在上面说的步骤2中，为什么在使用本地文件配置中心的情况下，要先为`Configuration`创建对应配置增强代理对象，而其他配置中心不用？

这3个问题都是紧密联系的，都和Seata的配置增加相关。下面详细介绍

# 配置管理增强
配置增强，简单来说就是为其创建一个代理对象，在执行目标独对象的目标方法时候，执行代理逻辑，从配置中心的角度来讲，就是在通过配置中心获取对应配置的时候，执行代理逻辑。

1. 通过`ConfigurationFactory.CURRENT_FILE_INSTANCE.getgetConfig(key)`获取配置
2. 加载`registry.conf`文件创建FileConfiguration对象`configuration`
3. 基于`SpringBootConfigurationProvider`为`configuration`创建代理对象`configurationProxy`
4. 从`configurationProxy`中获取配置中心的连接信息`file zk nacos 等`
5. 基于连接信息创建配中心Configuration对象`configuration2`
6. 基于`SpringBootConfigurationProvider`为`configuration2`创建代理对象`configurationProxy2`
7. 执行`configurationProxy2`的代理逻辑
8. 基于key找到对应的SpringBean
9. 执行SpringBean的getXxx方法

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cb93fec40df40ba9e8ab9db06cc9b93~tplv-k3u1fbpfcp-watermark.image)

## 配置增强实现
上面也简单提到过配置增强，相关代码如下：
```java
EnhancedServiceLoader.load(ExtConfigurationProvider.class).provide(configuration);
```
1. 首先通过SPI机获取一个`ExtConfigurationProvider`对象，在Seata中默认只有一个实现：`SpringBootConfigurationProvider`
2. 通过`ExtConfigurationProvider#provider`方法为`Configuration`创建代理对象

核心代码如下:
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
                    result = get(convertDataId(rawDataId), args[1]);
                } else if (args.length == 3) {
                    result = get(convertDataId(rawDataId), args[1], (Long) args[2]);
                }
                if (result != null) {
                    //If the return type is String,need to convert the object to string
                    if (method.getReturnType().equals(String.class)) {
                        return String.valueOf(result);
                    }
                    return result;
                }
            }

            return method.invoke(originalConfiguration, args);
        }
    });
}

private Object get(String dataId) throws IllegalAccessException, InstantiationException {
    String propertyPrefix = getPropertyPrefix(dataId);
    String propertySuffix = getPropertySuffix(dataId);
    ApplicationContext applicationContext = (ApplicationContext) ObjectHolder.INSTANCE.getObject(OBJECT_KEY_SPRING_APPLICATION_CONTEXT);
    Class<?> propertyClass = PROPERTY_BEAN_MAP.get(propertyPrefix);
    Object valueObject = null;
    if (propertyClass != null) {
        try {
            Object propertyBean = applicationContext.getBean(propertyClass);
            valueObject = getFieldValue(propertyBean, propertySuffix, dataId);
        } catch (NoSuchBeanDefinitionException ignore) {

        }
    } else {
        throw new ShouldNeverHappenException("PropertyClass for prefix: [" + propertyPrefix + "] should not be null.");
    }
    if (valueObject == null) {
        valueObject = getFieldValue(propertyClass.newInstance(), propertySuffix, dataId);
    }

    return valueObject;
}
```
1、如果方法是以`get`开头，并且参数个数为1/2/3，则执行其他的获取配置的逻辑，否则执行原生`Configuration`对象的逻辑
2、我们没必要纠结为啥是这样的规则，这就是Seata的一个约定
3、`其他获取配置的逻辑`，就是指通过Spring的方式获取对应配置值

到这里已经清楚了配置增强的原理，同时，也可以猜测得出唯一的`ExtConfigurationProvider`实现`SpringBootConfigurationProvider`，肯定是和Spring相关


## 配置增强与Spring
在介绍这块内容之前，我们先简单介绍一下Seata的使用方式：
1. 非Starter方式：引入依赖 `seata-all`, 然后手动配置几个核心的Bean
2. Starter方式： 引入依赖`seata-spring-boot-starter`，全自动准配，不需要自动注入核心Bean

`SpringBootConfigurationProvider`就在`seata-spring-boot-starter`模块中，也就是说，当我们通过引入`seata-all`的方式来使用Seata时，配置增强其实没有什么作用，因为此时根本找不到`ExtConfigurationProvider`实现类，自然就不会增强。

那`seata-spring-boot-starter`是如何将这些东西串联起来的？

1、首先，在`seata-spring-boot-starter`模块的`resources/META-INF/services`目录下，存在一个`spring.factories`文件，内容分如下
```
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
io.seata.spring.boot.autoconfigure.SeataAutoConfiguration,\

# 暂时不管
io.seata.spring.boot.autoconfigure.HttpAutoConfiguration
```

2、在`SeataAutoConfiguration`文件中，会创建以下Bean： GlobalTransactionScanner 、SeataDataSourceBeanPostProcessor、SeataAutoDataSourceProxyCreator、SpringApplicationContextProvider。前3个和我们本文要讲的内容不相关，主要关注`SpringApplicationContextProvider`，核心代码非常简单，就是将`ApplicationContext`保存下来：
```java
public class SpringApplicationContextProvider implements ApplicationContextAware {
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        ObjectHolder.INSTANCE.setObject(OBJECT_KEY_SPRING_APPLICATION_CONTEXT, applicationContext);
    }
}
```
3、然后，在`SeataAutoConfiguration`文件中，还会将一些`xxxProperties.Class`和对应的Key前缀缓存到`PROPERTY_BEAN_MAP`中。``xxxProperties`就简单理解成`application.yaml`中的各种配置项：
```java
static {
    PROPERTY_BEAN_MAP.put(SEATA_PREFIX, SeataProperties.class);
    PROPERTY_BEAN_MAP.put(CLIENT_RM_PREFIX, RmProperties.class);
    PROPERTY_BEAN_MAP.put(SHUTDOWN_PREFIX, ShutdownProperties.class);
    ...省略...
}
```

至此，整个流程其实已经很清晰，在有`SpringBootConfigurationProvider`配置增强的时候，我们获取一个配置项的流程如下：
1. 先根据`p配置项Key`获取对应的`xxxProperties`对象
2. 通过`ObjectHolder`中的`ApplicationContext`获取对应`xxxProperties`的SpringBean
3. 基于`xxxProperties`的SpringBean获取对应配置的值
4. 至此，通过配置增强，我们成功的获取到`application.yaml`中的值
