export default {
  'zh-cn': {
    brand: {
      brandName: 'Seata',
      briefIntroduction: 'Seata 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。',
      buttons: [
        {
          text: '快速入门',
          link: '/zh-cn/docs/overview/what-is-seata.html',
          type: 'primary',
        },
        {
          text: 'Github',
          link: 'https://github.com/seata/seata',
          type: 'normal',
        },
      ],
    },
    introduction: {
      title: 'Seata 是什么？',
      desc: 'Seata 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。在 Seata 开源之前，Seata 对应的内部版本在阿里经济体内部一直扮演着分布式一致性中间件的角色，帮助经济体平稳的度过历年的双11，对各BU业务进行了有力的支撑。经过多年沉淀与积累，商业化产品先后在阿里云、金融云进行售卖。2019.1 为了打造更加完善的技术生态和普惠技术成果，Seata 正式宣布对外开源，未来 Seata 将以社区共建的形式帮助其技术更加可靠与完备。',
      img: 'https://img.alicdn.com/tfs/TB1rDpkJAvoK1RjSZPfXXXPKFXa-794-478.png',
    },
    features: {
      title: '特色功能',
      list: [
        {
          icon: 'feature-1',
          title: '微服务框架支持',
          content: '目前已支持 Dubbo、Spring Cloud、Sofa-RPC、Motan 和 grpc 等RPC框架，其他框架持续集成中',
        },
        {
          icon: 'feature-2',
          title: 'AT 模式',
          content: '提供无侵入自动补偿的事务模式，目前已支持 MySQL、 Oracle 的AT模式、PostgreSQL、H2 开发中',
        },
        {
          icon: 'feature-3',
          title: 'TCC 模式',
          content: '支持 TCC 模式并可与 AT 混用，灵活度更高',
        },
        {
          icon: 'feature-4',
          title: 'SAGA 模式',
          content: '为长事务提供有效的解决方案',
        },
        {
          icon: 'feature-5',
          title: 'XA 模式（开发中）',
          content: '支持已实现 XA 接口的数据库的 XA 模式',
        },
        {
          icon: 'feature-6',
          title: '高可用',
          content: '支持基于数据库存储的集群模式，水平扩展能力强',
        },
      ],
    },
  },
  'en-us': {
    brand: {
      brandName: 'Seata',
      briefIntroduction: 'Seata is an open source distributed transaction solution that delivers high performance and easy to use distributed transaction services under a microservices architecture.',
      buttons: [
        {
          text: 'Get Started',
          link: '/en-us/docs/user/quickstart.html',
          type: 'primary',
        },
        {
          text: 'Github',
          link: 'https://github.com/seata/seata',
          type: 'normal',
        },
      ],
    },
    introduction: {
      title: 'What is Seata?',
      desc: 'Seata is an open source distributed transaction solution that delivers high performance and easy to use distributed transaction services under a microservices architecture. Before the open-source of Seata, the internal version of Seata played a role of distributed consistency Middleware in Ali economy, helping the economy to survive the double 11 of the past years smoothly, and providing strong support for businesses of all departments. After years of precipitation and accumulation, commercial products have been sold in Alibaba cloud and financial cloud. 2019.1 in order to create a more complete technological ecology and inclusive technological achievements, Seata officially announced open source to the outside world. In the future, Seata will help its technology become more reliable and complete in the form of community building.',
      img: 'https://img.alicdn.com/tfs/TB1rDpkJAvoK1RjSZPfXXXPKFXa-794-478.png',
    },
    features: {
      title: 'Feature List',
      list: [
        {
          icon: 'feature-1',
          title: 'Microservices Framework Support',
          content: 'RPC frameworks such as Dubbo, Spring Cloud, Sofa-RPC, Motan, and grpc are currently supported, and other frameworks are continuously integrated.',
        },
        {
          icon: 'feature-2',
          title: 'AT mode',
          content: 'Provides non-intrusive automatic compensation transaction mode, currently supports MySQL, Oracle\'s AT mode, PostgreSQL, In developing the H2.',
        },
        {
          icon: 'feature-3',
          title: 'TCC mode',
          content: 'Support TCC mode and mix with AT for greater flexibility.',
        },
        {
          icon: 'feature-4',
          title: 'SAGA mode',
          content: 'Provide an effective solution for long transactions.',
        },
        {
          icon: 'feature-5',
          title: 'XA mode (under development)',
          content: 'Support for XA schemas for databases that have implemented XA interfaces.',
        },
        {
          icon: 'feature-6',
          title: 'High availability',
          content: 'Support cluster mode based on database storage, strong horizontal scalability.',
        },
      ]
    },
  },
};
