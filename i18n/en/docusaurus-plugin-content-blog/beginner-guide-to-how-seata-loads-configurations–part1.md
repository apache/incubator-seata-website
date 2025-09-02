---
title: Understanding How Seata Loads Configuration Information Part One
keywords: [Seata, Config]
description: In distributed systems, configuration management is crucial. This article will guide you step by step from scratch to understand how Seata loads and manages configuration information. This is the first part of a series, focusing on the most basic configuration loading process to lay a foundation for further in-depth source code analysis.
author: Yu Zhang
date: 2025-08-24
---

## Introduction
In internet applications, system configuration information is the cornerstone of software operation and the core on which upper-layer business logic relies. Therefore, configuration information is often loaded at an early stage of the project startup lifecycle to ensure smooth operation of subsequent business processes.
Seata, as a distributed transaction coordinator, follows this same principle. Seata's configuration loading process can be roughly divided into two stages:

1. **Local configuration file loading**
2. **Loading remote configuration from a configuration center based on the local configuration**

This article focuses on the first stage—how Seata reads and initializes relevant configuration content from local configuration files. As for the second stage, which involves connecting to a configuration center and implementing dynamic configuration refresh, we will cover it in detail in the next article. Key topics in this article include:

+ At **which stage** Seata loads configuration;
+ The **complete process** of configuration loading;
+ The **dynamic update mechanism** of configuration.

---

## I. Loading Steps

### 1.1 Entry Point
In Seata, both the `TC` side and the `Client` side depend on the `autoconfigure-core` module, which defines a core class `SeataPropertiesLoader` implementing the `ApplicationContextInitializer<ConfigurableApplicationContext>` interface.
Classes implementing this interface are executed **before Spring loads bean definitions**, making it ideal for adjusting the `Environment`, registering additional `PropertySources`, or modifying configurations at this stage.
Seata leverages this feature to complete its initial configuration loading early in the project startup process.
Here’s the core implementation of `SeataPropertiesLoader`:

```java
// Specified in spring.factories with the highest loading priority
@Order(Ordered.HIGHEST_PRECEDENCE)
public class SeataPropertiesLoader implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    List<String> prefixList = Arrays.asList(FILE_ROOT_PREFIX_CONFIG, FILE_ROOT_PREFIX_REGISTRY, SERVER_PREFIX,
        STORE_PREFIX, METRICS_PREFIX, TRANSPORT_PREFIX);

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        // ConfigurableEnvironment is a subinterface of Environment. It allows injecting configurations dynamically during application context initialization.
        ConfigurableEnvironment environment = applicationContext.getEnvironment();

    	// Use the configuration factory to obtain the instance object corresponding to the initial registry configuration file.
        // Additionally, before executing this line for the first time, the static block initialization logic will be triggered. The core configuration initialization logic is here and will be explained in detail below.
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
                // Only keep configurations starting with fixed prefixes
                if (prefixList.stream().anyMatch(k::startsWith)) {
                    properties.put(SEATA_FILE_PREFIX_ROOT_CONFIG + k, v);
                }
            });
            // Wrap as a PropertiesPropertySource and dynamically add it to Spring Boot's Environment.
            environment.getPropertySources().addLast(new PropertiesPropertySource("seataOldConfig", properties));
        }
        // Load by priority
        System.setProperty("sessionMode", StoreConfig.getSessionMode().getName());
        System.setProperty("lockMode", StoreConfig.getLockMode().getName());
    }

}
````

Summary:

* `SeataPropertiesLoader` executes before Spring Bean loading;
* Retrieves initial configuration via `ConfigurationFactory`;
* Converts matching configurations into a `PropertiesPropertySource` and dynamically injects them into `Spring Environment`;
* Sets some global system properties (`sessionMode`, `lockMode`).

---

### 1.2 `ConfigurationFactory` Initialization Logic

`ConfigurationFactory` is the core factory class for loading Seata configurations. Its static block defines three key steps:

```java
static {
    initOriginConfiguration();
    load();
    maybeNeedOriginFileInstance();
}
```

These three methods are interconnected, forming the complete Seata configuration loading process. Let's analyze them one by one.

---

#### 1.2.1 `initOriginConfiguration()`

> This code is the **key logic of Seata configuration system initialization**. It primarily locates and loads the `registry.conf` (or environment-specific `registry-{env}.conf`) configuration file and constructs a `FileConfiguration` instance.

```java
private static void initOriginConfiguration() {
	// First, get seata.config.name (SEATA_CONFIG_NAME) from startup parameters or environment variables
	String seataConfigName = System.getProperty(SYSTEM_PROPERTY_SEATA_CONFIG_NAME);
	if (seataConfigName == null) {
		seataConfigName = System.getenv(ENV_SEATA_CONFIG_NAME);
	}
	// If neither is set, default to "registry"
	if (seataConfigName == null) {
		seataConfigName = REGISTRY_CONF_DEFAULT;
	}

	// If "env" is explicitly specified, append in the format registry-{env}
	String envValue = System.getProperty(ENV_PROPERTY_KEY);
	if (envValue == null) {
		envValue = System.getenv(ENV_SYSTEM_KEY);
	}
	seataConfigName = envValue == null ? seataConfigName : seataConfigName + "-" + envValue;
	// Assign the FileConfiguration instance to the ORIGIN_FILE_INSTANCE_REGISTRY property of the factory
	ORIGIN_FILE_INSTANCE_REGISTRY = new FileConfiguration(seataConfigName, false);
}
```

Internal logic of `FileConfiguration`:

```java
public FileConfiguration(String name, boolean allowDynamicRefresh) {
	// Try to find a configuration file starting with "registry" in .conf, .properties, or .yml format locally. If found, construct the corresponding File object.
	// The latest version of Seata supports application.yml(properties) style files, so if not explicitly specified, this will hit file == null.
	File file = getConfigFile(name);
	if (file == null) {
		targetFilePath = null;
		// Load a default SimpleFileConfig instance via SPI, which internally relies on the Typesafe library to initialize system properties
		fileConfig = FileConfigFactory.load();
		this.allowDynamicRefresh = false;
	} else {
		targetFilePath = file.getPath();
		// Load the configuration file based on its type. The Typesafe library loads both custom config files and system environment variables, JVM properties, etc.
		fileConfig = FileConfigFactory.load(file, name);
		targetFileLastModified = new File(targetFilePath).lastModified();
		this.allowDynamicRefresh = allowDynamicRefresh;
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("The file name of the operation is {}", name);
		}
	}
	this.name = name;
	// Create a thread pool for configuration operations
	configOperateExecutor = new ThreadPoolExecutor(
		CORE_CONFIG_OPERATE_THREAD,
		MAX_CONFIG_OPERATE_THREAD,
		Integer.MAX_VALUE,
		TimeUnit.MILLISECONDS,
		new LinkedBlockingQueue<>(),
		new NamedThreadFactory("configOperate", MAX_CONFIG_OPERATE_THREAD));
}
```

1. Look for `registry.conf`, `registry.properties`, `registry.yml`, etc. locally;
2. If found, parse it using `Typesafe Config`;
3. If not found, use `SimpleFileConfig` to load JVM system properties, environment variables, etc.;
4. Initialize a thread pool for configuration refresh operations.

Conclusion:

`ORIGIN_FILE_INSTANCE_REGISTRY` acts as Seata’s “original configuration center” at startup, storing the initially loaded configuration data.

---

#### 1.2.2 `load()`

On top of the original configuration, `load()` enhances configuration retrieval via SPI, supporting additional fallback logic:

```java
private static void load() {
    // Get the base configuration object from ORIGIN_FILE_INSTANCE_REGISTRY (default from local file, e.g., registry.conf)
    Configuration configuration = ORIGIN_FILE_INSTANCE_REGISTRY;
    Configuration extConfiguration = null;
    try {
        // Attempt to load an ExtConfigurationProvider implementation via Seata's SPI mechanism and obtain an enhanced configuration
        // This step is critical and will be explained below
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
    // If no extension is loaded, use the original configuration. Assign result to CURRENT_FILE_INSTANCE for all future configuration access.
    CURRENT_FILE_INSTANCE = extConfiguration == null ? configuration : extConfiguration;
}
```

Log output shows that `extConfiguration` is a proxy object:

```latex
load Configuration from :FileConfiguration$$EnhancerByCGLIB$$6e15d955
```

---

Now, let’s examine the `provide` method in `ExtConfigurationProvider`:

This method essentially acts as a configuration enhancement layer. It uses CGLIB to proxy the original configuration object, intercepting configuration reads to implement multi-level fallback: **System > Spring > Method default > Property default > Original proxied object**.

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

                // 1. Get from system properties
                result = originalConfiguration.getConfigFromSys(rawDataId);

                if (result == null) {
                    String dataId = convertDataId(rawDataId);

                    // 2. Get from Spring Boot Environment
                    result = getConfigFromEnvironment(dataId, dataType);
                    if (result != null) {
                        return result;
                    }

                    // 3. Use default value passed during method call
                    if (args.length > 1) {
                        result = args[1];
                        if (result != null && dataType.isAssignableFrom(result.getClass())) {
                            return result;
                        }
                        result = null;
                    }

                    // 4. Get default value from Properties object, corresponding to configuration classes initialized by SeataServerEnvironmentPostProcessor in auto-config module
                    try {
                        result = getDefaultValueFromPropertyObject(dataId);
                    } catch (Throwable t) {
                        LOGGER.error("Get config '{}' default value from the property object failed:", dataId, t);
                    }
                }

                // Type conversion
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

In summary, every time a configuration value is read, the system dynamically checks multiple sources in priority order. At this point, two key `ConfigurationFactory` variables are fully initialized:

```java
public static volatile Configuration CURRENT_FILE_INSTANCE;

public static volatile FileConfiguration ORIGIN_FILE_INSTANCE_REGISTRY;
```

Finally:

`CURRENT_FILE_INSTANCE` becomes the unified entry point for all subsequent configuration access.

---

#### 1.2.3 `maybeNeedOriginFileInstance()`

This method initializes `file.conf` configuration dynamically based on the configuration type.

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

Here, `getConfigType()` uses `CURRENT_FILE_INSTANCE` to read `config.type`, determining the configuration source (e.g., `file`, `nacos`, `apollo`, etc.).

Summary:

This is a lazy-loading or on-demand initialization logic. Only if the configuration type is `file` will it load `file.conf` as additional configuration. (The `file.conf` file is often used to specify basic properties when using file mode as a configuration center, and this is heavily used in Seata’s internal integration tests.)

Let's briefly examine `getConfigType`. At this point, `CURRENT_FILE_INSTANCE` handles the logic, so fetching `config.type` will follow the proxy logic above. `config.type` must be specified in local configuration to determine which configuration center to use.

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

---

## II. Conclusion

Through this analysis, we have sorted out the **first stage of Seata configuration loading—local configuration loading process**:

* `SeataPropertiesLoader` acts as the entry point, intervening before Spring Bean initialization to dynamically inject configurations;
* `ConfigurationFactory`, as the core factory, completes three key steps during static initialization:

  1. Load local configuration files and construct `ORIGIN_FILE_INSTANCE_REGISTRY`;
  2. Enhance configuration retrieval via SPI and produce a unified entry `CURRENT_FILE_INSTANCE`;
  3. Determine whether to load additional configs like `file.conf` based on `config.type`.
* This stage ensures that Seata can obtain complete local configuration at startup, laying the foundation for initializing subsequent components.

However, Seata's configuration system is not limited to this. In production environments, most users integrate with configuration centers (such as Nacos, Apollo, ZooKeeper, etc.) for centralized configuration management and dynamic refresh. The **loading and dynamic refresh mechanism of configuration centers** is the second important stage of Seata's configuration system.

Due to space limitations, this article only focuses on the “local configuration loading” logic. In the next article, we will delve into the second stage, including:

* How Seata connects to a remote configuration center based on local configuration;
* The principles and thread model of dynamic refresh mechanism;
* How to gracefully implement real-time configuration changes.

Stay tuned for the next article: **"Detailed Analysis of Seata Configuration Center Loading and Dynamic Refresh Mechanism"**.










