export default {
  'zh-cn': {
    brand: {
      brandName: 'Seata',
      briefIntroduction: 'Seata 是一款阿里巴巴开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。',
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
      desc: 'Seata 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。Seata 于2019.1 正式对外开源，前身是阿里巴巴2014年诞生的 TXC（Taobao Transaction Constructor），在集团业务得到了广泛使用。并且于2016年对外发布阿里云 GTS（Global Transactional Service），使得 Seata 在分布式事务领域受到企业和个人用户青睐。',
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
      briefIntroduction: 'Seata is an Alibaba open source distributed transaction solution that delivers high performance and easy to use distributed transaction services under a microservices architecture.',
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
      desc: 'Seata is an open source distributed transaction solution that delivers high performance and easy to use distributed transaction services under a microservices architecture. Seata officially opened sourced in January  2019, TXC(Taobao Transaction Constructor) was born in 2014 by alibaba, It is widely used in group business. In 2016, the company released the Global Transactional Service (GTS), which made Seata popular among enterprises and individual users in the field of distributed transactions.',
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
