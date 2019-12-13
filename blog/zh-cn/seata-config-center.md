---
title: Seata 配置中心实现原理
author: 张乘辉
keywords: Seata、Config
description: Seata 可以支持多个第三方配置中心，那么 Seata 是如何同时兼容那么多个配置中心的呢？
date: 2019/12/12
---

# 前言
Seata 可以支持多个第三方配置中心，那么 Seata 是如何同时兼容那么多个配置中心的呢？下面我给大家详细介绍下 Seata 配置中心的实现原理。


# 配置中心属性加载

在 Seata 配置中心，有两个默认的配置文件：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191211193041.png)

file.conf 是默认的配置属性，registry.conf 主要存储第三方注册中心与配置中心的信息，主要有两大块：

```json
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  # ...
}

config {
  # file、nacos 、apollo、zk、consul、etcd3
  type = "file"
  nacos {
    serverAddr = "localhost"
    namespace = ""
  }
  file {
    name = "file.conf"
  }
  # ...
}
```

其中 registry 为注册中心的配置属性，这里先不讲，config 为配置中心的属性值，默认为 file 类型，即会加载本地的 file.conf 里面的属性，如果 type 为其它类型，那么会从第三方配置中心加载配置属性值。

在 config 模块的 core 目录中，有个配置工厂类 ConfigurationFactory，它的结构如下：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191210211022.png)

可以看到都是一些配置的静态常量：

REGISTRY_CONF_PREFIX、REGISTRY_CONF_SUFFIX：配置文件名、默认配置文件类型；

SYSTEM_PROPERTY_SEATA_CONFIG_NAME、ENV_SEATA_CONFIG_NAME、ENV_SYSTEM_KEY、ENV_PROPERTY_KEY：自定义文件名配置变量，也说明我们可以自定义配置中心的属性文件。

ConfigurationFactory 里面有一处静态代码块，如下：

io.seata.config.ConfigurationFactory

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191211102702.png)

根据自定义文件名配置变量找出配置文件名称与类型，如果没有配置，默认使用 registry.conf，FileConfiguration 是 Seata 默认的配置实现类，如果为默认值，则会更具  registry.conf 配置文件生成 FileConfiguration 默认配置对象，这里也可以利用 SPI 机制支持第三方扩展配置实现，具体实现是继承 ExtConfigurationProvider 接口，在`META-INF/services/`创建一个文件并填写实现类的全路径名，如下所示：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191211194643.png)



# 第三方配置中心实现类加载

在静态代码块逻辑加载完配置中心属性之后，Seata 是如何选择配置中心并获取配置中心的属性值的呢？

我们刚刚也说了 FileConfiguration 是 Seata 的默认配置实现类，它继承了 AbstractConfiguration，它的基类为 Configuration，提供了获取参数值的方法：

```java
short getShort(String dataId, int defaultValue, long timeoutMills);
int getInt(String dataId, int defaultValue, long timeoutMills);
long getLong(String dataId, long defaultValue, long timeoutMills);
// ....
```

那么意味着只需要第三方配置中心实现该接口，就可以整合到 Seata 配置中心了，下面我拿 zk 来做例子：

首先，第三方配置中心需要实现一个 Provider 类：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191211200155.png)

实现的 provider 方法如其名，主要是输出具体的 Configuration 实现类。

那么我们是如何获取根据配置去获取对应的第三方配置中心实现类呢？

在 Seata 项目中，获取一个第三方配置中心实现类通常是这么做的：

```java
Configuration CONFIG = ConfigurationFactory.getInstance();
```

在 getInstance() 方法中主要是使用了单例模式构造配置实现类，它的构造具体实现如下：

io.seata.config.ConfigurationFactory#buildConfiguration：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191211102905.png)

首先从 ConfigurationFactory 中的静态代码块根据 registry.conf 创建的 CURRENT_FILE_INSTANCE 中获取当前环境使用的配置中心，默认为为 File 类型，我们也可以在 registry.conf 配置其它第三方配置中心，这里也是利用了 SPI 机制去加载第三方配置中心的实现类，具体实现如下：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191211205127.png)

如上，即是刚刚我所说的 ZookeeperConfigurationProvider 配置实现输出类，我们再来看看这行代码：

```java
EnhancedServiceLoader.load(ConfigurationProvider.class,Objects.requireNonNull(configType).name()).provide();
```

EnhancedServiceLoader 是 Seata SPI 实现核心类，这行代码会加载 `META-INF/services/`和 `META-INF/seata/`目录中文件填写的类名，那么如果其中有多个配置中心实现类都被加载了怎么办呢？

我们注意到 ZookeeperConfigurationProvider 类的上面有一个注解：

```java
@LoadLevel(name = "ZK", order = 1)
```

在加载多个配置中心实现类时，会根据 order 进行排序：

io.seata.common.loader.EnhancedServiceLoader#findAllExtensionClass：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191211210438.png)

io.seata.common.loader.EnhancedServiceLoader#loadFile：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191211210347.png)

这样，就不会产生冲突了。

但是我们发现 Seata 还可以用这个方法进行选择，Seata 在调用 load 方法时，还传了一个参数：

```java
Objects.requireNonNull(configType).name()
```

ConfigType 为配置中心类型，是个枚举类：

```java
public enum ConfigType {
  File, ZK, Nacos, Apollo, Consul, Etcd3, SpringCloudConfig, Custom;
}
```

我们注意到，LoadLevel 注解上还有一个 name 属性，在进行筛选实现类时，Seata 还做了这个操作：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191211211210.png)

根据当前 configType 来判断是否等于 LoadLevel 的 name 属性，如果相等，那么就是当前配置的第三方配置中心实现类。



# 第三方配置中心实现类

ZookeeperConfiguration 继承了 AbstractConfiguration，它的构造方法如下：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191211202510.png)

构造方法创建了一个 zkClient 对象，这里的 FILE_CONFIG 是什么呢？

```java
private static final Configuration FILE_CONFIG = ConfigurationFactory.CURRENT_FILE_INSTANCE;
```

原来就是刚刚静态代码块中创建的 registry.conf 配置实现类，从该配置实现类拿到第三方配置中心的相关属性，构造第三方配置中心客户端，然后实现 Configuration 接口时：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191211203735.png)

就可以利用客户端相关方法去第三方配置获取对应的参数值了。



# 第三方配置中心配置同步脚本

上周末才写好，已经提交 PR 上去了，还处于 review 中，预估会在 Seata 1.0 版本提供给大家使用，敬请期待。

具体位置在 Seata 项目的 script 目录中：

![](https://raw.githubusercontent.com/objcoding/md-picture/master/img/20191211212141.png)

config.txt 为本地配置好的值，搭建好第三方配置中心之后，运行脚本会将 config.txt 的配置同步到第三方配置中心。


# 作者简介

张乘辉，目前就职于中通科技信息中心技术平台部，担任 Java 工程师，主要负责中通消息平台与全链路压测项目的研发，热爱分享技术，微信公众号「后端进阶」作者，技术博客（[https://objcoding.com/](https://objcoding.com/)）博主，Seata Contributor，GitHub ID：objcoding。