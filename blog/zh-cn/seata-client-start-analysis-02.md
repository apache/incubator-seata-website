---
layout:     post
comments: true
title:      Seata应用侧启动过程剖析——注册中心与配置中心模块
date:       2021-03-04 1:35:01
author:     "booogu"
catalog: true
tags:
    - Seata
---

> “刚上手Seata，对其各个模块了解还不够深入？ <br>
想深入研究Seata源码，却还未付诸实践？<br>
想探究下在集成Seata后，自己的应用在启动过程中“偷偷”干了些啥？<br>
想学习Seata作为一款优秀开源框架蕴含的设计理念和最佳实践？<br>
如果你有上述任何想法之一，那么今天这篇文章，就是为你量身打造的~

## 前言
在Seata的应用侧（RM、TM）启动过程中，首先要做的就是与协调器侧（TC）建立通信，这是Seata能够完成分布式事务协调的前提，那么Seata在完成应用侧初始化以及与TC建立连接的过程中，是**如何找到TC事务协调器的集群和地址**的？又是**如何从配置模块中获取各种配置信息**的呢？这正是本文要探究的重点。

## 给个限定
Seata作为一款中间件级的底层组件，是很谨慎引入第三方框架具体实现的，感兴趣的同学可以深入了解下Seata的SPI机制，看看Seata是如何通过大量扩展点（Extension），来将依赖组件的具体实现倒置出去，转而依赖抽象接口的，同时，Seata为了更好地融入微服务、云原生等流行架构所衍生出来的生态中，也基于SPI机制对多款主流的微服务框架、注册中心、配置中心以及Java开发框架界“扛把子”——SpringBoot等做了主动集成，在保证微内核架构、松耦合、可扩展的同时，又可以很好地与各类组件“打成一片”，使得采用了各种技术栈的环境都可以比较方便地引入Seata。

本文为了贴近大家**刚引入Seata试用时**的场景，在以下介绍中，选择**应用侧**的限定条件如下：使用**File（文件）作为配置中心与注册中心**，并基于**SpringBoot**启动。

有了这个限定条件，接下来就让我们深入Seata源码，一探究竟吧。

## 多模块交替协作的RM/TM初始化过程
在[ Seata客户端启动过程剖析（一）](http://booogu.top/2021/02/28/seata-client-start-analysis-01/)中，我们分析了Seata应用侧TM与RM的初始化、以及应用侧如何创建Netty Channel并向TC Server发送注册请求的过程。除此之外，在RM初始化过程中，Seata的其他多个模块（注册中心、配置中心、负载均衡）也都纷纷登场，相互协作，共同完成了连接TC Server的过程。

当执行Client重连TC Server的方法：NettyClientChannelManager.Channreconnect()时，首先需要根据当前的**事务分组**获取可用的TC Server地址列表：
```js
    /**
     * NettyClientChannelManager.reconnect()
     * Reconnect to remote server of current transaction service group.
     *
     * @param transactionServiceGroup transaction service group
     */
    void reconnect(String transactionServiceGroup) {
        List<String> availList = null;
        try {
            //从注册中心中获取可用的TC Server地址
            availList = getAvailServerList(transactionServiceGroup);
        } catch (Exception e) {
            LOGGER.error("Failed to get available servers: {}", e.getMessage(), e);
            return;
        }
        //以下代码略
    }
```

关于事务分组的详细概念介绍，大家可以参考官方文档[事务分组介绍](https://seata.io/zh-cn/docs/user/txgroup/transaction-group.html)。这里简单介绍一下:
- 每个Seata应用侧的RM、TM，都具有一个**事务分组**名
- 每个Seata协调器侧的TC，都具有一个**集群名**和**地址**
应用侧连接协调器侧时，经历如下两步：
- 通过事务分组的名称，从配置中获取到该应用侧对应的TC集群名
- 通过集群名称，可以从注册中心中获取TC集群的地址列表
以上概念、关系与过程，如下图所示：
![Seata事务分组与建立连接的关系](http://booogu.top/img/in-post/TXGroup_Group_Relation.jpg)

### 从**注册中心**获取TC Server集群地址
了解RM/TC连接TC时涉及的主要概念与步骤后，我们继续探究getAvailServerList方法：
```js
    private List<String> getAvailServerList(String transactionServiceGroup) throws Exception {
        //① 使用注册中心工厂，获取注册中心实例
        //② 调用注册中心的查找方法lookUp()，根据事务分组名称获取TC集群中可用Server的地址列表
        List<InetSocketAddress> availInetSocketAddressList = RegistryFactory.getInstance().lookup(transactionServiceGroup);
        if (CollectionUtils.isEmpty(availInetSocketAddressList)) {
            return Collections.emptyList();
        }

        return availInetSocketAddressList.stream()
                                         .map(NetUtil::toStringAddress)
                                         .collect(Collectors.toList());
    }
```
#### 用哪个注册中心？**Seata元配置文件**给出答案
上面已提到，Seata支持多种注册中心的实现，那么，Seata首先需要从一个地方先获取到“注册中心的类型”这个信息。

从哪里获取呢？Seata设计了一个“配置文件”用于存放其框架内所用组件的一些基本信息，我更愿意称这个配置文件为 **『元配置文件』**，这是因为它包含的信息，其实是“配置的配置”，也即“元”的概念，大家可以对比数据库表中的信息，和数据库表本身结构的信息（表数据和表元数据）来理解。

我们可以把注册中心、配置中心中的信息，都看做是**配置信息本身**，而这些**配置信息的配置**是什么？这些信息，就包含在Seata的元配置文件中。实际上，『元配置文件』中只包含**两类信息**：
- 一是注册中心的类型：registry.type，以及该类型注册中心的一些基本信息，比如当注册中心类型为文件时，元配置文件中存放了文件的名字信息；当注册中心类型是Nacos时，元配置文件中则存放着Nacos的地址、命名空间、集群名等信息
- 二是配置中心的类型：config.type，以及该类型配置中心的一些基本信息，比如当配置中心为文件时，元配置文件中存放了文件的名字信息；当注册中心类型为Consul时，元配置文件中存放了Consul的地址信息

Seata的元配置文件支持Yaml、Properties等多种格式，而且可以集成到SpringBoot的application.yaml文件中（使用seata-spring-boot-starter即可），方便与SpringBoot集成。

Seata中自带的默认元配置文件是registry.conf，当我们采用文件作为注册与配置中心时，registry.conf中的内容设置如下：
```js
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "file"
  file {
    name = "file.conf"
  }
}

config {
  # file、nacos 、apollo、zk、consul、etcd3
  type = "file"
  file {
    name = "file.conf"
  }
}
```
在如下源码中，我们可以发现，Seata使用的注册中心的类型，是从ConfigurationFactory.CURRENT_FILE_INSTANCE中获取的，而这个CURRENT_FILE_INSTANCE，就是我们所说的，Seata**元配置文件的实例**
```js
    //在getInstance()中，调用buildRegistryService，构建具体的注册中心实例
    public static RegistryService getInstance() {
        if (instance == null) {
            synchronized (RegistryFactory.class) {
                if (instance == null) {
                    instance = buildRegistryService();
                }
            }
        }
        return instance;
    }

    private static RegistryService buildRegistryService() {
        RegistryType registryType;
        //获取注册中心类型
        String registryTypeName = ConfigurationFactory.CURRENT_FILE_INSTANCE.getConfig(
            ConfigurationKeys.FILE_ROOT_REGISTRY + ConfigurationKeys.FILE_CONFIG_SPLIT_CHAR
                + ConfigurationKeys.FILE_ROOT_TYPE);
        try {
            registryType = RegistryType.getType(registryTypeName);
        } catch (Exception exx) {
            throw new NotSupportYetException("not support registry type: " + registryTypeName);
        }
        if (RegistryType.File == registryType) {
            return FileRegistryServiceImpl.getInstance();
        } else {
            //根据注册中心类型，使用SPI的方式加载注册中心的实例
            return EnhancedServiceLoader.load(RegistryProvider.class, Objects.requireNonNull(registryType).name()).provide();
        }
    }
```
我们来看一下元配置文件的初始化过程，当首次获取静态字段CURRENT_FILE_INSTANCE时，触发ConfigurationFactory类的初始化：
```js
    //ConfigurationFactory类的静态块
    static {
        load();
    }

     /**
     * load()方法中，加载Seata的元配置文件
     */   
    private static void load() {
        //元配置文件的名称，支持通过系统变量、环境变量扩展
        String seataConfigName = System.getProperty(SYSTEM_PROPERTY_SEATA_CONFIG_NAME);
        if (seataConfigName == null) {
            seataConfigName = System.getenv(ENV_SEATA_CONFIG_NAME);
        }
        if (seataConfigName == null) {
            seataConfigName = REGISTRY_CONF_DEFAULT;
        }
        String envValue = System.getProperty(ENV_PROPERTY_KEY);
        if (envValue == null) {
            envValue = System.getenv(ENV_SYSTEM_KEY);
        }
        //根据元配置文件名称，创建一个实现了Configuration接口的文件配置实例
        Configuration configuration = (envValue == null) ? new FileConfiguration(seataConfigName,
                false) : new FileConfiguration(seataConfigName + "-" + envValue, false);
        Configuration extConfiguration = null;
        //通过SPI加载，来判断是否存在扩展配置提供者
        //当应用侧使用seata-spring-boot-starer时，将通过SpringBootConfigurationProvider作为扩展配置提供者，这时当获取元配置项时，将不再从file.conf（默认）中获取，而是从application.properties/application.yaml中获取
        try {
            //通过ExtConfigurationProvider的provide方法，将原有的Configuration实例替换为扩展配置的实例
            extConfiguration = EnhancedServiceLoader.load(ExtConfigurationProvider.class).provide(configuration);
            if (LOGGER.isInfoEnabled()) {
                LOGGER.info("load Configuration:{}", extConfiguration == null ? configuration.getClass().getSimpleName()
                        : extConfiguration.getClass().getSimpleName());
            }
        } catch (EnhancedServiceNotFoundException ignore) {

        } catch (Exception e) {
            LOGGER.error("failed to load extConfiguration:{}", e.getMessage(), e);
        }
        //存在扩展配置，则返回扩展配置实例，否则返回文件配置实例
        CURRENT_FILE_INSTANCE = extConfiguration == null ? configuration : extConfiguration;
    }
```
load()方法的调用序列图如下：
![Seata元配置文件的加载过程](http://booogu.top/img/in-post/seata_config_initialization.png)

上面的序列图中，大家可以关注以下几点：
- Seata元配置文件**名称支持扩展**
- Seata元配置文件后缀**支持3种后缀**，分别为yaml/properties/conf，在创建元配置文件实例时，会依次尝试匹配
- Seata中**配置能力相关的顶级接口为Configuration**，各种配置中心均需实现此接口，Seata的元配置文件就是使用FileConfiguration（文件类型的配置中心）实现了此接口

```js
/**
 * Seata配置能力接口
 * package：io.seata.config
 */

public interface Configuration {
    /**
     * Gets short.
     *
     * @param dataId       the data id
     * @param defaultValue the default value
     * @param timeoutMills the timeout mills
     * @return the short
     */
    short getShort(String dataId, int defaultValue, long timeoutMills);

    //以下内容略，主要能力为配置的增删改查
}
```
- Seata提供了一个类型为ExtConfigurationProvider的扩展点，开放了对配置具体实现的扩展能力，它具有一个provide()方法，接收原有的Configuration，返回一个全新的Configuration，此接口方法的形式决定了，一般可以采用静态代理、动态代理、装饰器等设计模式来实现此方法，实现对原有Configuration的增强
```js
/**
 * Seata扩展配置提供者接口
 * package：io.seata.config
 */
public interface ExtConfigurationProvider {
    /**
     * provide a AbstractConfiguration implementation instance
     * @param originalConfiguration
     * @return configuration
     */
    Configuration provide(Configuration originalConfiguration);
}
```
- 当应用侧基于seata-seata-spring-boot-starter启动时，将**采用『SpringBootConfigurationProvider』作为扩展配置提供者**，在其provide方法中，使用动态字节码生成（CGLIB）的方式为『FileConfiguration』实例创建了一个动态代理类，拦截了所有以"get"开头的方法，来从application.properties/application.yaml中获取元配置项。

关于SpringBootConfigurationProvider类，本文只说明下实现思路，不再展开分析源码，这也仅是ExtConfigurationProvider接口的一种实现方式，从Configuration可扩展、可替换的角度来看，Seata正是通过ExtConfigurationProvider这样一个扩展点，为多种配置的实现提供了一个广阔的舞台，允许配置的多种实现与接入方案。

经历过上述加载流程后，如果我们**没有扩展配置提供者**，我们将从Seata元配置文件中获取到注册中心的类型为file，同时创建了一个文件注册中心实例：FileRegistryServiceImpl
#### 从注册中心获取TC Server地址
获取注册中心的实例后，需要执行lookup()方法（RegistryFactory.getInstance().**lookup(transactionServiceGroup)**），FileRegistryServiceImpl.lookup()的实现如下：
```js
    /**
     * 根据事务分组名称，获取TC Server可用地址列表
     * package：io.seata.discovery.registry
     * class：FileRegistryServiceImpl
     */
    @Override
    public List<InetSocketAddress> lookup(String key) throws Exception {
        //获取TC Server集群名称
        String clusterName = getServiceGroup(key);
        if (clusterName == null) {
            return null;
        }
        //从配置中心中获取TC集群中所有可用的Server地址
        String endpointStr = CONFIG.getConfig(
            PREFIX_SERVICE_ROOT + CONFIG_SPLIT_CHAR + clusterName + POSTFIX_GROUPLIST);
        if (StringUtils.isNullOrEmpty(endpointStr)) {
            throw new IllegalArgumentException(clusterName + POSTFIX_GROUPLIST + " is required");
        }
        //将地址封装为InetSocketAddress并返回
        String[] endpoints = endpointStr.split(ENDPOINT_SPLIT_CHAR);
        List<InetSocketAddress> inetSocketAddresses = new ArrayList<>();
        for (String endpoint : endpoints) {
            String[] ipAndPort = endpoint.split(IP_PORT_SPLIT_CHAR);
            if (ipAndPort.length != 2) {
                throw new IllegalArgumentException("endpoint format should like ip:port");
            }
            inetSocketAddresses.add(new InetSocketAddress(ipAndPort[0], Integer.parseInt(ipAndPort[1])));
        }
        return inetSocketAddresses;
    }

    /**
     * 注册中心接口中的default方法
     * package：io.seata.discovery.registry
     * class：RegistryService
     */
    default String  getServiceGroup(String key) {
        key = PREFIX_SERVICE_ROOT + CONFIG_SPLIT_CHAR + PREFIX_SERVICE_MAPPING + key;
        //在配置缓存中，添加事务分组名称变化监听事件
        if (!SERVICE_GROUP_NAME.contains(key)) {
            ConfigurationCache.addConfigListener(key);
            SERVICE_GROUP_NAME.add(key);
        }
        //从配置中心中获取事务分组对应的TC集群名称
        return ConfigurationFactory.getInstance().getConfig(key);
    }
```
可以看到，代码逻辑与第一节中图**Seata事务分组与建立连接的关系**中的流程相符合，
这时，注册中心将需要**配置中心的协助**，来获取事务分组对应的集群名称、并查找集群中可用的服务地址。

### 从**配置中心**获取TC集群名称
#### 配置中心的初始化
配置中心的初始化（在ConfigurationFactory.buildConfiguration()），与注册中心的初始化流程类似，都是先从**元配置文件**中获取配置中心的类型等信息，然后初始化一个具体的配置中心实例，有了之前的分析基础，这里不再赘述。

#### 获取配置项的值
上方代码段的两个方法：*FileRegistryServiceImpl.lookup()*以及*RegistryService.getServiceGroup()*中，都从配置中心中获取的配置项的值：
- lookup()需要由具体的注册中心实现，使用文件作为注册中心，其实是一种直连TC Server的情况，其特殊点在于**TC Server的地址是写死在配置中的**的（正常应存于注册中心中），因此FileRegistryServiceImpl.lookup()方法，是通过配置中心获取的TC集群中Server的地址信息
- getServiceGroup()是RegistryServer接口中的default方法，即所有注册中心的公共实现，Seata中任何一种注册中心，都需要通过配置中心来根据事务分组名称来获取TC集群名称

### 负载均衡
经过上述环节配置中心、注册中心的协作，现在我们已经获取到了当前应用侧所有可用的TC Server地址，那么在发送真正的请求之前，还需要通过特定的负载均衡策略，选择一个TC Server地址，这部分源码比较简单，就不带着大家分析了。

> 关于负载均衡的源码，大家可以阅读AbstractNettyRemotingClient.doSelect()，因本文分析的代码是RMClient/TMClient的重连方法，此方法中，所有获取到的Server地址，都会通过遍历依次连接（重连），因此这里不需要再做负载均衡。

以上就是Seata应用侧在启动过程中，注册中心与配置中心这两个关键模块之间的协作关系与工作流程，欢迎共同探讨、学习！

> 后记：本文及其上篇[ Seata客户端启动过程剖析（一）](http://booogu.top/2021/02/28/seata-client-start-analysis-01/)，是本人撰写的首批技术博客，将上手Seata时，个人认为Seata中较为复杂、需要研究和弄通的部分源码进行了分析和记录。
在此欢迎各位读者提出各种改进建议，谢谢！
