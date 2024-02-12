---
title: Seata Config Module Source Code Analysis
author: runze.zhao
keywords: [Seata, distributed transaction]
date: 2020/1/11
---
## 1. Introduction
According to the classification defined by [experts](https://www.iteye.com/blog/javatar-949527), configurations can be categorized into three types: environment configuration, descriptive configuration, and extension configuration.

- Environment configuration: Typically consists of discrete simple values like parameters for component startup, often in key-value pair format.
- Descriptive configuration: Pertains to business logic, such as transaction initiators and participants, and is usually embedded within the lifecycle management of the business. Descriptive configuration contains more information, sometimes with hierarchical relationships.
- Extension configuration: Products need to discover third-party implementations, requiring high aggregation of configurations. Examples include various configuration centers and registration centers. The common practice is to place the fully qualified class name files under the META-INF/services directory of the JAR file, with each line representing an implementation class name.

## 2. Environment Configuration

When the Seata server is loaded, it uses `resources/registry.conf` to determine the types of configuration centers and registration centers. Starting from version 1.0, Seata client not only loads configurations using the `conf` file but also allows configuration through YAML files in Spring Boot using `seata.config.{type}` for choosing the configuration center, similar to selecting the registration center. The source code for loading configurations via YAML is located in the `io.seata.spring.boot.autoconfigure.properties.registry` package.

If the user of the Seata client places both a `conf` configuration file under `resources` and configures via YAML files, the configuration in the YAML file will take precedence. Code example:


```java
CURRENT_FILE_INSTANCE = null == extConfiguration ? configuration : extConfiguration;
```

Here, `extConfiguration` is an instance of external configuration provided by the `ExtConfigurationProvider#provide()` external configuration provider class, while `configuration` is provided by another configuration provider class, `ConfigurationProvider#provide()`. These two configuration provider classes are loaded through SPI in the static block of the `ConfigurationFactory` in the config module.


```java
EnhancedServiceLoader.load(ExtConfigurationProvider.class).provide(configuration);
```

The selection of configuration center types discussed above is related to determining the configuration environment. Once the type of configuration center to be used is determined, the environment configuration is loaded through the corresponding configuration center. File-based configuration, represented by `File`, is also considered a type of configuration center.

Both the client and server obtain configuration parameters by using `ConfigurationFactory#getInstance()` to get an instance of the configuration class, and then retrieve configuration parameters using the instance. The constants defining configuration keys are mainly found in the `config` file under the `core` module.

The meanings of some important environment configuration properties are documented on the [official website](/docs/user/configurations/).

During instantiation, the configuration parameters obtained through `ConfigurationFactory` and injected into constructors require a restart to take effect. However, parameters obtained in real-time using `ConfigurationFactory` become effective immediately when the configuration changes.

The `config` module provides the `ConfigurationChangeListener#onChangeEvent` interface method to modify internal attributes of instances. In this method, dynamic changes to properties are monitored, and if the properties used by the instance are found to have changed from the initial injection, the attributes stored in the instance are modified to align with the configuration center. This enables dynamic configuration updates.


```java
public class GlobalTransactionalInterceptor implements ConfigurationChangeListener {
private volatile boolean disable = ConfigurationFactory.getInstance().getBoolean(ConfigurationKeys.DISABLE_GLOBAL_TRANSACTION,false);
@Override public Object invoke(Param param) {
   if(disable){//Transaction business processing}
}
@Override public void onChangeEvent(Param param) {
   disable = param;
}}
```

The code snippet above pertains to the pseudo-code related to the `GlobalTransactionalInterceptor` and its degradation properties under the Spring module. When the `GlobalTransactionalScanner` instantiates the interceptor class mentioned above, it registers the interceptor into the list of configuration change listeners. When a configuration change occurs, the listener is invoked:


```java
ConfigurationFactory.getInstance().addConfigListener(ConfigurationKeys.DISABLE_GLOBAL_TRANSACTION,(ConfigurationChangeListener)interceptor);
```

The term "degradation" refers to the scenario where a particular functionality of a service becomes unavailable. By dynamically configuring properties, this functionality can be turned off to avoid continuous attempts and failures. The `interceptor#invoke()` method executes Seata transaction-related business only when the `disable` attribute is set to true.

## 3. Descriptive Configuration
Descriptive configurations in general frameworks often contain abundant information, sometimes with hierarchical relationships. XML configuration is convenient for describing tree structures due to its strong descriptive capabilities. However, the current trend advocates for eliminating cumbersome prescriptive configurations in favor of using conventions.

In Seata's AT (Automatic Transaction) mode, transaction processing is achieved through proxying data sources, resulting in minimal intrusion on the business logic. Simply identifying which business components need to enable global transactions during Seata startup can be achieved using annotations, thus facilitating descriptive configuration.


```java
@GlobalTransactional(timeoutMills = 300000, name = "busi-doBiz")
public String doBiz(String msg) {}
```
If using the TCC (Try-Confirm-Cancel) mode, transaction participants also need to annotate their involvement:


```java
@TwoPhaseBusinessAction(name = "tccActionForSpringTest" , commitMethod = "commit", rollbackMethod = "rollback")
public boolean prepare(BusinessActionContext actionContext, int i);
public boolean commit(BusinessActionContext actionContext);
public boolean rollback(BusinessActionContext actionContext);
```

## 4. Extension Configuration
Extension configurations typically have high requirements for product aggregation because products need to discover third-party implementations and incorporate them into their internals.

![Image Description](https://img-blog.csdnimg.cn/20200110213751452.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3ODA0NzM3,size_16,color_FFFFFF,t_70)

Here's an example of a custom configuration center provider class. Place a text file with the same name as the interface under META-INF/services, and the content of the file should be the implementation class of the interface. This follows the standard SPI (Service Provider Interface) approach. Then, modify the configuration file `registry.conf` to set `config.type=test`.

However, if you think that by doing so, Seata can recognize it and replace the configuration center, then you are mistaken. When Seata loads the configuration center, it encapsulates the value of the configuration center type specified in the configuration file using the enum `ConfigType`:


```java
private static Configuration buildConfiguration() {
   configTypeName = "test";//The 'config.type' configured in 'registry.conf
   configType = ConfigType.getType(configTypeName);//An exception will be thrown if ConfigType cannot be retrieved.
}
```

If a configuration center type like `test` is not defined in `ConfigType`, it will throw an exception. Therefore, merely modifying the configuration file without changing the source code will not enable the use of configuration center provider classes other than those defined in `ConfigType`.

Currently, in version 1.0, the configuration center types defined in `ConfigType` include: File, ZK, Nacos, Apollo, Consul, Etcd3, SpringCloudConfig, and Custom. If a user wishes to use a custom configuration center type, they can use the `Custom` type.

![Image Description](https://img-blog.csdnimg.cn/20200110215249152.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3ODA0NzM3,size_16,color_FFFFFF,t_70)

One inelegant approach here is to provide an implementation class with a specified name `ZK` but with a higher priority level (order=3) than the default `ZK` implementation (which has order=1). This will make `ConfigurationFactory` use `TestConfigurationProvider` as the configuration center provider class.

Through the above steps, Seata can be configured to use our own provided code. Modules in Seata such as codec, compressor, discovery, integration, etc., all use the SPI mechanism to load functional classes, adhering to the design philosophy of microkernel + plug-in, treating third parties equally.

## 5. Seata Source Code Analysis Series
Author: Zhao Runze, [Series Address](https://blog.csdn.net/qq_37804737/category_9530078.html).
