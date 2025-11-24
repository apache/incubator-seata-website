---
title: 从0到1了解Seata是如何加载配置信息的-01
keywords: [Seata, Config]
description: 在分布式系统中，配置管理至关重要。本文将带你从零开始，逐步了解 Seata 是如何加载和管理配置信息的。本篇是系列文章的第一部分，聚焦最基础的配置加载流程，为后续深入源码分析打下基础。
author: 张宇|波克科技集团
date: 2025-08-24
---

## 引言
在互联网应用中，系统配置信息是软件运行的基石，也是上层业务逻辑赖以运行的核心。因此，项目启动生命周期的早期阶段往往就会加载配置信息，以便后续的业务流程顺利运行。
Seata 作为一款分布式事务协调器，同样遵循这一规律。在 Seata 的配置加载流程中，可以大致分为两个阶段：

1. **本地配置文件加载**
2. **基于本地配置，加载配置中心的远程配置**

本文主要聚焦第一阶段—：也就是 Seata 如何从本地配置文件中读取和初始化相关配置内容。至于第二阶段，也就是对接配置中心和实现配置动态刷新这一块，我们会在下一篇文章中详细展开。重点讲解：

+ Seata 在**哪个阶段**加载配置；
+ 配置加载的**完整流程**；
+ 配置的**动态更新机制**。

## 一、加载步骤
### 1.1 加载入口
在Seata中，无论是 `TC` 端还是`Client`端，都依赖了`autoconfigure-core`模块，该模块中定义了一个核心类 `SeataPropertiesLoader`，它实现了 `ApplicationContextInitializer<ConfigurableApplicationContext>` 接口。

实现这个接口的类会在 **Spring 加载 Bean 定义之前**执行，非常适合在此阶段对 `Environment` 进行调整、注册额外的 `PropertySource` 或修改配置。
Seata 正是利用这一特性，在项目启动早期完成了配置的初始加载。

来看 `SeataPropertiesLoader` 的核心实现：

```java
// 在spring.factories中指明了当前实现类，且加载优先级为最高
@Order(Ordered.HIGHEST_PRECEDENCE)
public class SeataPropertiesLoader implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    List<String> prefixList = Arrays.asList(FILE_ROOT_PREFIX_CONFIG, FILE_ROOT_PREFIX_REGISTRY, SERVER_PREFIX,
        STORE_PREFIX, METRICS_PREFIX, TRANSPORT_PREFIX);

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        // ConfigurableEnvironment是Environment的子接口,可以在应用上下文初始化的时候，动态注入配置。
        ConfigurableEnvironment environment = applicationContext.getEnvironment();

    ˙	// 通过配置工厂类，获取初始registry配置文件的对应的实例对象。
        // 除此之外，这行代码第一次执行前会触发静态代码块内相关逻辑的初始化,核心配置逻辑的初始化都在里面，下文会详细介绍
        FileConfiguration configuration = ConfigurationFactory.getOriginFileInstanceRegistry();
        FileConfig fileConfig = configuration.getFileConfig();
        Map<String, Object> configs = fileConfig.getAllConfig();
        if (CollectionUtils.isNotEmpty(configs)) {
            Optional<FileConfiguration> originFileInstance = ConfigurationFactory.getOriginFileInstance();
            originFileInstance
                .ifPresent(fileConfiguration -> configs.putAll(fileConfiguration.getFileConfig().getAllConfig()));
            Properties properties = new Properties();
            configs.forEach((k, v) -> {
                if (v instanceof String) {
                    if (StringUtils.isEmpty((String)v)) {
                        return;
                    }
                }
                // 此处仅保留以固定前缀开头的配置
                if (prefixList.stream().anyMatch(k::startsWith)) {
                    properties.put(SEATA_FILE_PREFIX_ROOT_CONFIG + k, v);
                }
            });
            // 封装成一个 PropertiesPropertySource，然后动态加到 Spring Boot 的 Environment 里。
            environment.getPropertySources().addLast(new PropertiesPropertySource("seataOldConfig", properties));
        }
        // Load by priority
        System.setProperty("sessionMode", StoreConfig.getSessionMode().getName());
        System.setProperty("lockMode", StoreConfig.getLockMode().getName());
    }

}
```

总结：

+ `SeataPropertiesLoader` 在 Spring Bean 加载前执行；
+ 通过 `ConfigurationFactory` 获取初始配置；
+ 将符合条件的配置转为 `PropertiesPropertySource`，动态注入 `Spring Environment`；
+ 同时设置一些全局系统属性（`sessionMode`、`lockMode`）。

### 1.2 `ConfigurationFactory` 初始化逻辑
`ConfigurationFactory` 是 Seata 配置加载的核心工厂类，它的静态代码块定义了三大步骤：

```java
static {
    initOriginConfiguration();
    load();
    maybeNeedOriginFileInstance();
}
```

这三个方法互相关联，串起了 Seata 配置加载的完整流程,接下来让我们逐一对其进行分析

#### 1.2.1 `initOriginConfiguration()`
> 这段代码是 **Seata 配置系统初始化的关键逻辑**，主要负责找到并加载 `registry.conf`（或者带环境后缀的 `registry-{env}.conf`）配置文件，并用它构造一个 `FileConfiguration` 实例。
>

```java
private static void initOriginConfiguration() {
	// 这里会先从启动参数或者环境变量里面去取seata.config.name（SEATA_CONFIG_NAME）
	String seataConfigName = System.getProperty(SYSTEM_PROPERTY_SEATA_CONFIG_NAME);
	if (seataConfigName == null) {
		seataConfigName = System.getenv(ENV_SEATA_CONFIG_NAME);
	}
	// 前者没有配置属性则取默认值registry
	if (seataConfigName == null) {
		seataConfigName = REGISTRY_CONF_DEFAULT;
	}

	// 这里如果特地指定了env的话，那么下一步会拼接registry-{env}这种格式
	String envValue = System.getProperty(ENV_PROPERTY_KEY);
	if (envValue == null) {
		envValue = System.getenv(ENV_SYSTEM_KEY);
	}
	seataConfigName = envValue == null ? seataConfigName : seataConfigName + "-" + envValue;
	// 最终将FileConfuration的对象实例赋值给工厂类下面的ORIGIN_FILE_INSTANCE_REGISTRY属性
	ORIGIN_FILE_INSTANCE_REGISTRY = new FileConfiguration(seataConfigName, false);
}
```

`FileConfiguration` 内部逻辑：

```java

public FileConfiguration(String name, boolean allowDynamicRefresh) {
	// 会在本地尝试获取以registry开头的.conf、.properties、.yml格式的配置文件，如果存在则会构建对应的File对象并返回
	// 目前新版本的seata,已经支持application.yml(proeprties)风格的配置文件，所以对于新版本来说(如果没有显式配置registry开头的配置文件)，命中的是file == null的逻辑
	File file = getConfigFile(name);
	if (file == null) {
		targetFilePath = null;
		// 会通过SPI底层加载一个默认的SimpleFileConfig对象，该对象内部依赖了Typesafe三方库用于初始化一些系统属性
		fileConfig = FileConfigFactory.load();
		this.allowDynamicRefresh = false;
	} else {
		targetFilePath = file.getPath();
		// 会根据registry文件的类型加载对应的文件配置对象 Typesafe三方库不仅会加载我们自定义的配置文件还会去加载系统环境变量、jvm级别的属性等等
		fileConfig = FileConfigFactory.load(file, name);
		targetFileLastModified = new File(targetFilePath).lastModified();
		this.allowDynamicRefresh = allowDynamicRefresh;
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("The file name of the operation is {}", name);
		}
	}
	this.name = name;
	// 创建配置操作线程池
	configOperateExecutor = new ThreadPoolExecutor(
		CORE_CONFIG_OPERATE_THREAD,
		MAX_CONFIG_OPERATE_THREAD,
		Integer.MAX_VALUE,
		TimeUnit.MILLISECONDS,
		new LinkedBlockingQueue<>(),
		new NamedThreadFactory("configOperate", MAX_CONFIG_OPERATE_THREAD));
}
```

1. 在本地查找 `registry.conf`、`registry.properties`、`registry.yml` 等文件；
2. 如果找到文件，则用 `Typesafe Config` 解析；
3. 如果找不到文件，则使用 `SimpleFileConfig`，加载 JVM 系统属性、环境变量等；
4. 初始化一个线程池，用于后续配置刷新。

结论：

`ORIGIN_FILE_INSTANCE_REGISTRY` 是 Seata 启动时的“原始配置中心”，保存了最初加载的配置数据。

#### 1.2.2 `load()`
在原始配置基础上，`load()` 会通过 SPI 机制增强配置获取能力，支持更多兜底逻辑：

```java
private static void load() {
    // 从 ORIGIN_FILE_INSTANCE_REGISTRY 拿到基础配置对象（默认基于本地文件，如 registry.conf）
    Configuration configuration = ORIGIN_FILE_INSTANCE_REGISTRY;
    Configuration extConfiguration = null;
    try {
        // 尝试通过 EnhancedServiceLoader（Seata 的 SPI 机制）去加载一个 ExtConfigurationProvider 扩展实现并获得一个增强后的configuration
        // 这一步非常的关键，下文会详细介绍
        extConfiguration =
        EnhancedServiceLoader.load(ExtConfigurationProvider.class).provide(configuration);
        if (LOGGER.isInfoEnabled()) {
            LOGGER.info(
                "load Configuration from :{}",
                extConfiguration == null
                ? configuration.getClass().getSimpleName()
                : extConfiguration.getClass().getSimpleName());
        }
    } catch (EnhancedServiceNotFoundException e) {
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("failed to load extConfiguration: {}", e.getMessage(), e);
        }
    } catch (Exception e) {
        LOGGER.error("failed to load extConfiguration: {}", e.getMessage(), e);
    }
    // 如果加载不到扩展，就继续用原始的 configuration,最终把结果赋值给 CURRENT_FILE_INSTANCE，后续配置读取都会走它。
    CURRENT_FILE_INSTANCE = extConfiguration == null ? configuration : extConfiguration;
}
```

通过日志可以看到：extConfiguration是一个代理对象

```latex
load Configuration from :FileConfiguration$$EnhancerByCGLIB$$6e15d955

```



接下来我们再细看ExtConfigurationProvider的provide方法：

这段方法本质上是一个配置增强层，通过cglib代理了原始的configuration对象，拦截配置读取调用，实现 优先查系统 -> Spring -> 方法默认 -> Property 默认 -> 原始被代理对象 的多层兜底逻辑。

```java
@Override
public Configuration provide(Configuration originalConfiguration) {
    return (Configuration) Enhancer.create(
        originalConfiguration.getClass(),
        (MethodInterceptor) (proxy, method, args, methodProxy) -> {
            if (method.getName().startsWith(INTERCEPT_METHOD_PREFIX) && args.length > 0) {
                Object result;
                String rawDataId = (String) args[0];
                Class<?> dataType = ReflectionUtil.getWrappedClass(method.getReturnType());

                // 1. 从系统属性获取
                result = originalConfiguration.getConfigFromSys(rawDataId);

                if (result == null) {
                    String dataId = convertDataId(rawDataId);

                    // 2. 从 Spring Boot Environment 获取
                    result = getConfigFromEnvironment(dataId, dataType);
                    if (result != null) {
                        return result;
                    }

                    // 3. 方法调用时传入的默认值
                    if (args.length > 1) {
                        result = args[1];
                        if (result != null && dataType.isAssignableFrom(result.getClass())) {
                            return result;
                        }
                        result = null;
                    }

                    // 4. 从 Properties 对象里拿默认值。这里对应的是在auto-config模块中，SeataServerEnvironmentPostProcessor初始化的一些配置类
                    try {
                        result = getDefaultValueFromPropertyObject(dataId);
                    } catch (Throwable t) {
                        LOGGER.error("Get config '{}' default value from the property object failed:", dataId, t);
                    }
                }

                // 类型转换
                if (result != null) {
                    if (dataType.isAssignableFrom(result.getClass())) {
                        return result;
                    }
                    return this.convertType(result, dataType);
                }
            }

            return method.invoke(originalConfiguration, args);
        });
}

```

总结下来，每次读取配置时，都会动态地按照优先级查找不同来源的配置值。此时对于ConfigurationFactory来说，两个关键的成员变量，我们已经初始化完毕了。

```java
public static volatile Configuration CURRENT_FILE_INSTANCE;

public static volatile FileConfiguration ORIGIN_FILE_INSTANCE_REGISTRY;
```

最终：

`CURRENT_FILE_INSTANCE` 成为后续统一的配置入口。

#### 1.2.3 `maybeNeedOriginFileInstance()`
该方法根据配置类型动态初始化 `file.conf` 配置

```java
private static void maybeNeedOriginFileInstance() {
    if (ConfigType.File.name().equalsIgnoreCase(getConfigType())) {
        String pathDataId = String.join(
            ConfigurationKeys.FILE_CONFIG_SPLIT_CHAR,
            ConfigurationKeys.FILE_ROOT_CONFIG, FILE_TYPE, NAME_KEY
        );
        String name = CURRENT_FILE_INSTANCE.getConfig(pathDataId);
        ORIGIN_FILE_INSTANCE = new FileConfiguration(name);
    }
}
```

这里的 `getConfigType()` 使用了 `CURRENT_FILE_INSTANCE`，读取 `config.type` 判断配置来源（如 `file`、`nacos`、`apollo` 等）。

总结：

这是一个按需初始化逻辑，只有当配置类型是 `file` 时，才会加载 `file.conf` 作为额外配置，在这一步中其实是懒加载或按需，然后再决定是否初始化file.conf的逻辑。（file.conf文件多用于指定file模式为配置中心时的一些基本配置属性，这一点在seata内部的集成测试中大量使用）



我们简单来看下getConfigType的逻辑，此时已经使用的CURRENT_FILE_INSTANCE对象来处理的了，那么对于config.type的获取就会走上一步中代理的逻辑。config.type是需要我们自己在本地配置文件进行指定的，用于决定对接的配置中心的类型。

```java
private static String getConfigType() {
        String configTypeName = CURRENT_FILE_INSTANCE.getConfig(ConfigurationKeys.FILE_ROOT_CONFIG
                + ConfigurationKeys.FILE_CONFIG_SPLIT_CHAR
                + ConfigurationKeys.FILE_ROOT_TYPE);
        if (StringUtils.isBlank(configTypeName)) {
            throw new NotSupportYetException("config type can not be null");
        }
        return configTypeName;
    }
```

## 二、最后
通过本文的分析，我们梳理了 **Seata 配置加载的第一个阶段——本地配置加载流程**：

+ 以 `SeataPropertiesLoader` 为入口，在 Spring Bean 初始化前介入，动态注入配置；
+ `ConfigurationFactory` 作为核心工厂，静态初始化阶段完成了三步关键逻辑：
  1. 加载本地配置文件，构建 `ORIGIN_FILE_INSTANCE_REGISTRY`；
  2. 通过 SPI 增强配置获取能力，生成统一入口 `CURRENT_FILE_INSTANCE`；
  3. 根据 `config.type` 判断是否按需加载 `file.conf` 等附加配置。
+ 这一阶段确保 Seata 启动初期就能拿到完整的本地配置，为后续组件初始化奠定基础。

不过，Seata 的配置体系并不止于此。实际生产环境中，大多数用户会结合配置中心（如 Nacos、Apollo、ZooKeeper 等），实现配置的集中管理与动态刷新。而 **配置中心的加载与动态更新机制** 是 Seata 配置体系的第二个重要阶段。

由于篇幅原因，本文只聚焦“本地配置加载”这部分核心逻辑。关于第二阶段的详细实现，我们会在下一篇文章中深入剖析，包括：

+ Seata 如何基于本地基础配置对接远程配置中心；
+ 动态刷新机制的原理和线程模型；
+ 如何优雅实现配置变更的实时生效。

敬请期待下一篇：**「Seata 配置中心加载与动态刷新机制详解」**。





