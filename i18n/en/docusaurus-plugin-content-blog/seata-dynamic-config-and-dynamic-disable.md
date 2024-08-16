---
title: Seata Dynamic Configuration Subscription and Degradation Implementation Principles
author: chenghui.zhang
keywords: [Seata, Dynamic, Config]
description: This article explains how Seata adapts to different dynamic configuration subscriptions and implements degradation functionality with support for multiple configuration centers.
date: 2019/12/17
---

# Preface.
Seata's dynamic degradation needs to be combined with the dynamic configuration subscription feature of the configuration centre. Dynamic configuration subscription, that is, through the configuration centre to listen to the subscription, according to the need to read the updated cache value, ZK, Apollo, Nacos and other third-party configuration centre have ready-made listener can be achieved dynamic refresh configuration; dynamic degradation, that is, by dynamically updating the value of the specified configuration parameter, so that Seata can be dynamically controlled in the running process of the global transaction invalidated (at present, only the AT mode has). (currently only AT mode has this feature).

So how do the multiple configuration centres supported by Seata adapt to different dynamic configuration subscriptions and how do they achieve degradation? Here is a detailed explanation from the source code level.



# Dynamic Configuration Subscriptions

The Seata Configuration Centre has a listener baseline interface, which has an abstract method and default method, as follows:

io.seata.config.ConfigurationChangeListener

![](https://gitee.com/objcoding/md-picture/raw/master/img/20191216212442.png)

This listener baseline interface has two main implementation types:

1. implementation of the registration of configuration subscription event listener: for the implementation of a variety of functions of dynamic configuration subscription, such as GlobalTransactionalInterceptor implements ConfigurationChangeListener, according to the dynamic configuration subscription to the dynamic degradation of the implementation of the function;
2. the implementation of the configuration centre dynamic subscription function and adaptation: for the file type default configuration centre that currently does not have dynamic subscription function, you can implement the benchmark interface to achieve dynamic configuration subscription function; for the blocking subscription needs to start another thread to execute, then you can implement the benchmark interface for adaptation, you can also reuse the thread pool of the benchmark interface; and there are also asynchronous subscription, there is subscription to a single key, there is subscription to multiple keys, and so on. key, multiple key subscriptions, and so on, we can implement the baseline interface to adapt to each configuration centre.

## Nacos Dynamic Subscription Implementation

Nacos has its own internal implementation of the listener, so it directly inherits its internal abstract listener, AbstractSharedListener, which is implemented as follows:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20191223212237.png)

As above.

- dataId: configuration attribute for the subscription;
- listener: configures the subscription event listener, which is used to use the incoming listener as a wrapper to perform the actual change logic.

It's worth mentioning that nacos doesn't use ConfigurationChangeListener to implement its own listener configuration, on the one hand, because Nacos itself already has a listener subscription function, so it doesn't need to implement it; on the other hand, because nacos is a non-blocking subscription, it doesn't need to reuse the ConfigurationChangeListener's thread pool, i.e., no adaptation is needed.

Add the subscription:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20191223213347.png)

The logic of adding a subscription to a dataId in Nacos Configuration Centre is very simple, create a NacosListener with the dataId and a listener, call the configService#addListener method, and use the NacosListener as a listener for the dataId, and then the dataId can be dynamically configured for subscription. Dynamic Configuration Subscription.

## file Dynamic subscription implementation

Take its implementation class FileListener as an example, its implementation logic is as follows:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20191215151642.png)

As above.

- dataId: configuration attribute for the subscription;

- listener: the configuration subscription event listener, used as a wrapper for the incoming listener to perform the real change logic, it is important to note that ** this listener and FileListener also implement the ConfigurationChangeListener interface, except that FileListener is used to provide dynamic configuration subscription to the file, while listener is used to execute configuration subscription events**;

- executor: a thread pool used for processing configuration change logic, used in the ConfigurationChangeListener#onProcessEvent method.

The implementation of the **FileListener#onChangeEvent method gives the file the ability to subscribe to dynamic configurations** with the following logic:

It loops indefinitely to get the current value of the subscribed configuration property, fetches the old value from the cache, determines if there is a change, and executes the logic of the external incoming listener if there is a change.

ConfigurationChangeEvent The event class used to save configuration changes, it has the following member properties:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20191215175232.png)



How does the getConfig method sense changes to the file configuration? We click into it and find that it ends up with the following logic:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20191215162713.png)

We see that it creates a future class, wraps it in a Runnable and puts it into the thread pool to execute asynchronously, and then calls the get method to block the retrieval of the value, so let's move on:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20191215170908.png)

allowDynamicRefresh: configure switch for dynamic refresh;

targetFileLastModified: time cache of the last change to the file.

The above logic:

Get the tempLastModified value of the last update of the file, then compare it with the targetFileLastModified value, if tempLastModified > targetFileLastModified, it means that the configuration has been changed in the meantime. instance is reloaded, replacing the old fileConfig so that later operations can get the latest configuration values.

The logic for adding a configuration property listener is as follows:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20191215161103.png)

configListenersMap is a configuration listener cache for FileConfiguration with the following data structure:

 ```java
 ConcurrentMap<String/*dataId*/, Set<ConfigurationChangeListener>> configListenersMap
 ```

As you can see from the data structure, each configuration property can be associated with multiple event listeners.

Eventually the onProcessEvent method is executed, which is the default method in the listener's base interface, and it calls the onChangeEvent method, which means that it will eventually call the implementation in the FileListener.



# Dynamic Degradation

With the above dynamic configuration subscription functionality, we only need to implement the ConfigurationChangeListener listener to do all kinds of functionality. Currently, Seata only has dynamic degradation functionality for dynamic configuration subscription.

In the article 「[Seata AT mode startup source code analysis](https://mp.weixin.qq.com/s/n9MHk47zSsFQmV-gBq_P1A)」, it is said that in the project of Spring integration with Seata, when AT mode is started, it will use the GlobalTransactionalInterceptor replaces the methods annotated with GlobalTransactional and GlobalLock. GlobalTransactionalInterceptor implements MethodInterceptor, which will eventually execute the invoker method, so if you want to achieve dynamic demotion, you can do something here.

- Add a member variable to GlobalTransactionalInterceptor:

 ```java
 private volatile boolean disable; ``java
 ```

Initialise the assignment in the constructor:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20191215173221.png)

ConfigurationKeys.DISABLE_GLOBAL_TRANSACTION (service.disableGlobalTransaction) This parameter currently has two functions:

1. to determine whether to enable global transactions at startup;
2. to decide whether or not to demote a global transaction after it has been enabled.

- Implement ConfigurationChangeListener:

![](https://gitee.com/objcoding/md-picture/raw/master/img/20191215173358.png)

The logic here is simple, it is to determine whether the listening event belongs to the ConfigurationKeys.DISABLE_GLOBAL_TRANSACTION configuration attribute, if so, directly update the disable value.

- Next, do something in GlobalTransactionalInterceptor#invoke

![](https://gitee.com/objcoding/md-picture/raw/master/img/20191215174155.png)

As above, when disable = true, no global transaction with global lock is performed.

- Configuration Centre Subscription Degradation Listener

io.seata.spring.annotation.GlobalTransactionScanner#wrapIfNecessary

![](https://gitee.com/objcoding/md-picture/raw/master/img/20191215174409.png)

The current Configuration Centre will subscribe to the demotion event listener during wrap logic in Spring AOP.

# Author Bio

Zhang Chenghui, currently working in the technology platform department of Zhongtong Technology Information Centre as a Java engineer, mainly responsible for the development of Zhongtong messaging platform and all-links pressure testing project, love to share technology, WeChat public number "back-end advanced" author, technology blog ([https://objcoding.com/](https://objcoding.com/)) Blogger, Seata Contributor, GitHub ID: objcoding.

