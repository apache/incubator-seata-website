﻿export default {
    'en-us': {
        barText: 'Blog',
        postsTitle: 'All posts',
        list: [
            {
                title: 'How to use Seata to ensure consistency between Dubbo Microservices',
                author: '@slievrly',
                dateStr: 'Jan 17th, 2019',
                desc: 'This blog describes details of using Seata to ensure consistency between Dubbo Microservices',
                link: '/en-us/blog/dubbo-seata.html',
            }
        ]
    },
    'zh-cn': {
        barText: '博客',
        postsTitle: '所有文章',
        list: [
            {
                title: '如何使用Seata保证Dubbo微服务间的一致性',
                author: '@slievrly',
                dateStr: 'Jan 17th, 2019',
                desc: '本文详细介绍了如何使用Seata保证Dubbo微服务间的一致性',
                link: '/zh-cn/blog/dubbo-seata.html',
            },
            {
                title: '分布式事务 Seata 及其三种模式详解',
                author: '@long187',
                dateStr: 'Aug 11th, 2019',
                desc: '着重分享分布式事务产生的背景、理论基础，以及 Seata 分布式事务的原理以及三种模式（AT、TCC、Saga）的分布式事务实现',
                link: '/zh-cn/blog/seata-at-tcc-saga.html',
            },
            {
                title: '基于 Seata Saga 设计更有弹性的金融应用',
                author: '@long187',
                dateStr: 'Nov 4th, 2019',
                desc: '本文从金融分布式应用开发的一些痛点出发，结合理论和实践对社区和行业的解决方案进行了分析，并讲解了如何基于Seata saga设计更有弹性的金融应用',
                link: '/zh-cn/blog/design-more-flexable-application-by-saga.html',
            },
            {
                title: 'SpringBoot+Dubbo+MybatisPlus整合Seata分布式事务',
                author: '@FUNKYE',
                dateStr: 'Nov 29th, 2019',
                desc: '本文讲述如何将springboot+dubbo+mybatisplus整合seata直连方式搭建',
                link: '/zh-cn/blog/springboot-dubbo-mybatisplus-seata.html',
            },
            {
                title: '透过源码解决SeataAT模式整合Mybatis-Plus失去MP特性的问题',
                author: '@FUNKYE',
                dateStr: 'Nov 30th, 2019',
                desc: '本文讲述如何透过源码解决Seata整合Mybatis-Plus失去MP特性的问题',
                link: '/zh-cn/blog/seata-mybatisplus-analysis.html',
            },
            {
                title: 'Seata分布式事务启用Nacos做配置中心',
                author: '@FUNKYE',
                dateStr: 'Dec 2th, 2019',
                desc: '本文讲述如何使用Seata整合Nacos配置',
                link: '/zh-cn/blog/seata-nacos-analysis.html',
            },
            {
                title: 'Docker部署Seata与Nacos整合',
                author: '@FUNKYE',
                dateStr: 'Dec 3th, 2019',
                desc: '本文讲述如何使用Seata整合Nacos配置的Docker部署',
                link: '/zh-cn/blog/seata-nacos-docker.html',
            },
            {
                title: '通过AOP动态创建/关闭Seata分布式事务',
                author: '@FUNKYE',
                dateStr: 'Dec 23th, 2019',
                desc: '本文讲述如何通过AOP动态创建/关闭Seata分布式事务',
                link: '/zh-cn/blog/seata-spring-boot-aop-aspectj.html',
            },
            {
                title: '源码分析Seata-XID传递 Dubbo篇',
                author: '@FUNKYE',
                dateStr: 'Jan 1th, 2020',
                desc: '本文讲述通过源码解析Seata-Dubbo传递XID',
                link: '/zh-cn/blog/seata-analysis-dubbo-transmit-xid.html',
            },
            {
                title: 'Seata 高可用部署实践',
                author: '@helloworlde',
                dateStr: 'Apr 10th, 2020',
                desc: 'Seata 高可用部署实践',
                link: '/zh-cn/blog/seata-ha-practice.html',
            },
            {
                title: '分布式事务如何实现？深入解读 Seata 的 XA 模式',
                author: '@sharajava',
                dateStr: 'Apr 28th, 2020',
                desc: '深入解读 Seata 的 XA 模式',
                link: '/zh-cn/blog/seata-xa-introduce.html',
            },
            {
                title: 'Seata Server端启动流程源码解读',
                author: '@杨同学',
                dateStr: 'Jul 27th, 2020',
                desc: '本文从源码的角度讲述了Seata 1.3.0版本Server端启动流程',
                link: '/zh-cn/blog/seata-sourcecode-server-bootstrap.html',
            },
            {
                title: 'Seata Client端启动流程源码解读[一]',
                author: '@杨同学',
                dateStr: 'AUG 25th, 2020',
                desc: '本文从源码的角度讲述了Seata 1.3.0版本Client端启动流程',
                link: '/zh-cn/blog/seata-sourcecode-client-bootstrap.html',
            },
            {
                title: 'Seata数据源代理解析',
                author: '@罗小勇',
                dateStr: 'Oct 16th, 2020',
                desc: '本文主要介绍Seata数据源代理实现原理及使用时可能会遇到的问题',
                link: '/zh-cn/blog/seata-datasource-proxy.html',
            },
            {
                title: 'seata-golang 通信模型详解',
                author: '@刘晓敏',
                dateStr: 'Jan 4th, 2021',
                desc: '本文详细讲述 seata-golang 底层 rpc 通信的实现原理',
                link: 'http://seata.io/zh-cn/blog/seata-golang-communication-mode.html',
            },
            {
                title: 'Seata配置管理原理解析',
                author: '@罗小勇',
                dateStr: 'Jan 10th, 2021',
                desc: '本文主要介绍Seata配置管理的核心实现以及和Spring配置的交互过程',
                link: '/zh-cn/blog/seata-config-manager.html',
            },
            {
                title: 'ConcurrentHashMap导致的Seata死锁问题分析',
                author: '@罗小勇',
                dateStr: 'Mar 13th, 2021',
                desc: '本文主要介绍了一个线上问题，因ConcurrentHashMap的Bug而导致的Seata动态数据源代理死锁',
                link: '/zh-cn/blog/seata-dsproxy-deadlock.html',
            },
            {
                title: 'Seata应用侧启动过程剖析——RM & TM如何与TC建立连接',
                author: '@booogu',
                dateStr: 'Feb 28th, 2021',
                desc: '本文分析了Seata的RM & TM两个应用侧模块在启动过程中与TC建立连接的过程',
                link: '/zh-cn/blog/seata-client-start-analysis-01.html',
            },
            {
                title: 'Seata应用侧启动过程剖析——注册中心与配置中心模块',
                author: '@booogu',
                dateStr: 'Mar 4th, 2021',
                desc: '本文分析了Seata的RM & TM两个应用侧模块在启动过程中通过注册中心/配置中心模块寻找TC集群的过程',
                link: '/zh-cn/blog/seata-client-start-analysis-02.html',
            },
            {
                title: 'Seata新特性支持 -- undo_log压缩',
                author: '@chd',
                dateStr: 'May 07th, 2021',
                desc: '本文主要分析了关于Seata1.4.2支持的新特性undo_log信息压缩解决的问题以及代码实现',
                link: '/zh-cn/blog/seata-feature-undo-log-compress.html',
            },
            {
                title: 'Seata基于改良版雪花算法的分布式UUID生成器分析',
                author: '@selfishlover',
                dateStr: 'Apr 29th, 2021',
                desc: '深入浅出地解读Seata内置的分布式UUID生成器及其对于雪花算法的改良',
                link: '/zh-cn/blog/seata-analysis-UUID-generator.html',
            },
            {
                title: '关于新版雪花算法的答疑',
                author: '@selfishlover',
                dateStr: 'Jun 21th, 2021',
                desc: '回答读者关于Seata的新版雪花算法的疑虑，并结合实践分析算法的优劣',
                link: '/zh-cn/blog/seata-snowflake-explain.html',
            },
            {
                title: 'Seata 1.5.2 重磅发布，支持xid负载均衡',
                author: '@Seata社区',
                dateStr: 'Jul 12th, 2022',
                desc: 'Seata 1.5.2 重磅发布，支持xid负载均衡',
                link: '/zh-cn/blog/seata-1.5.2.html',
            },
            {
                title: 'Seata 1.6.0 重磅发布，大幅提升性能',
                author: '@Seata社区',
                dateStr: 'Dec 17th, 2022',
                desc: 'Seata 1.6.0 重磅发布，大幅提升性能',
                link: '/zh-cn/blog/seata-1.6.0.html',
            },
            {
                title: '生产环境可用的 seata-go 1.2.0 来了！！！',
                author: '@Seata社区',
                dateStr: 'Jun 08th, 2023',
                desc: '生产环境可用的 seata-go 1.2.0 来了！！！',
                link: '/zh-cn/blog/seata-go-1.2.0.html',
            },
            {
                title: 'Seata：连接数据与应用',
                author: '@季敏-Seata 开源社区创始人，分布式事务团队负责人',
                dateStr: 'Jun 11th, 2024',
                desc: '本文介绍Seata的过去、现在和未来演进',
                link: '/zh-cn/blog/seata-connect-data-and-application.html',
            },
        ]
    },
};