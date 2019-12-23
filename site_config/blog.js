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
            }
        ]
    },
};
