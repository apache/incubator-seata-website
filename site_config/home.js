export default {
  'zh-cn': {
    brand: {
      brandName: 'Seata',
      briefIntroduction: 'Seata 是一款阿里巴巴开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。',
      buttons: [
        {
          text: '快速入门',
          link: '/zh-cn/docs/overview/what_is_seata.html',
          type: 'primary',
        },
        {
          text: 'Github',
          link: 'https://github.com/alibaba/seata',
          type: 'normal',
        },
      ],
    },
    introduction: {
      title: '什么是 Seata？',
      desc: 'Seata 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。Seata 于2019.1 正式对外开源，前身是阿里巴巴2014年诞生的 TXC（Taobao Transaction Constructor），在集团业务得到了广泛使用。并且于2016年对外发布阿里云 GTS（Global Transactional Service），使得 Seata 在分布式事务领域受到企业和个人用户青睐。',
      img: 'https://img.alicdn.com/tfs/TB1rDpkJAvoK1RjSZPfXXXPKFXa-794-478.png',
    },
    features: {
      title: '特色功能',
      list: [
        {
          icon: 'feature-1',
          title: '微服务框架支持',
          content: '目前已支持 Dubbo 和 Spring Cloud 微服务框架，其他微服务框架持续集成中',
        },
        {
          icon: 'feature-2',
          title: '数据库支持',
          content: '已支持 MySQL 自动模式, Oracle、PostgreSQL、H2 开发中',
        },
        {
          icon: 'feature-3',
          title: 'TCC 模式（开发中）',
          content: '支持 用户自定义 TCC 接口模式并可与 AT 混用',
        },
        {
          icon: 'feature-4',
          title: 'XA 模式（开发中）',
          content: '支持已实现 XA 接口的数据库的 XA 模式',
        },
        {
          icon: 'feature-5',
          title: '动态伸缩',
          content: 'TBD',
        },
        {
          icon: 'feature-6',
          title: '高可用',
          content: 'TBD',
        },
      ],
    },
  },
  'en-us': {
    brand: {
      brandName: 'Seata',
      briefIntroduction: 'Seata is a distributed transaction solution with high performance and ease of use for microservices architecture',
      buttons: [
        {
          text: 'Get Started',
          link: '/en-us/docs/quickstart.html',
          type: 'primary',
        },
        {
          text: 'Github',
          link: 'https://github.com/alibaba/seata',
          type: 'normal',
        },
      ],
    },
    introduction: {
      title: 'What is Seata?',
      desc: 'Seata is a distributed messaging and streaming computing platform with high performance and high throughput. It is an open source project from Alibaba, which has been donated to the Apache Software Foundation in 2016. On September 25, 2017, it became an Apache top-level project. Its predecessor was MetaQ, a data messaging engine created by Alibaba in 2011. And it was created as an open source project known as Seata 3.0 in 2012. Low latency, high reliability, and scalability make Apache Seata popular among enterprises and individuals in the distributed computing field.',
      img: 'https://img.alicdn.com/tfs/TB1rDpkJAvoK1RjSZPfXXXPKFXa-794-478.png',
    },
    features: {
      title: 'Feature List',
      list: [
        {
          icon: 'feature-1',
          title: 'Scalability',
          content: 'Brokers, producers, consumers, and name servers adopt special deployment and processing methods that bring strong scale-out ability. ',
        },
        {
          icon: 'feature-2',
          title: 'Distributed transaction',
          content: 'Seata implements a function similar to distributed transaction processing of X/Open XA, which allows multiple resources to be accessed within the same transaction.',
        },
        {
          icon: 'feature-3',
          title: 'Cache and Cache Maintenance',
          content: 'Seata makes the best use of system memory cache to maintain data to the file system through flushing either synchronously or asynchronously.',
        },
        {
          icon: 'feature-4',
          title: 'Message filtering',
          content: 'Apache Seata supports flexible syntax expressions to filter messages, which reduces transmission of useless messages to consumers.',
        },
        {
          icon: 'feature-5',
          title: 'Consumer offset',
          content: 'Based on the message storage model of Apache Seata, consumer offset can be reset by the time, accurate to a millisecond. Messages can be re-consumed from the earliest offset and the latest offset.',
        },
        {
          icon: 'feature-6',
          title: 'Timed messaging',
          content: 'Apache Seata supports timed messaging, but the time precision has specific levels. ',
        },
      ]
    },
  },
};
