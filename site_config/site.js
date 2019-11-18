// 全局的一些配置
export default {
  rootPath: '', // 发布到服务器的根目录，需以/开头但不能有尾/，如果只有/，请填写空字符串
  port: 8080, // 本地开发服务器的启动端口
  // domain: 'dubbo.apache.org', // 站点部署域名，无需协议和path等
  // defaultSearch: 'google', // 默认搜索引擎，baidu或者google
  defaultLanguage: 'en-us',
  'en-us': {
    pageMenu: [
      {
        key: 'home', // 用作顶部菜单的选中
        text: 'HOME',
        link: '/en-us/index.html',
      },
      {
        key: 'docs',
        text: 'DOCS',
        link: '/en-us/docs/overview/what-is-seata.html',
      },
      {
        key: 'blog',
        text: 'BLOG',
        link: '/en-us/blog/index.html',
      },
      {
        key: 'community',
        text: 'COMMUNITY',
        link: '/en-us/community/index.html',
      },
    ],
    vision: {
      title: 'Vision',
      content: 'Seata is dedicated to improving the efficiency of large-scale file distribution, building the go-to solution and standards of container image distribution, and providing you with file and image distribution service which is efficient, easy-to-use, and of high availability.',
    },
    documentation: {
      title: 'Documentation',
      list: [
        {
          text: 'What is Seata?',
          link: '/en-us/docs/overview/what-is-seata.html',
        },
        {
          text: 'Quick Start',
          link: '/en-us/docs/user/quickstart.html',
        },
        {
          text: 'Report a doc issue',
          link: 'https://github.com/seata/seata.github.io/issues/new',
        },
        {
          text: 'Edit This Page on GitHub',
          link: 'https://github.com/seata/seata.github.io',
        }
      ],
    },
    resources: {
      title: 'Resources',
      list: [
        {
          text: 'Blog',
          link: '/en-us/blog/index.html',
        },
        {
          text: 'Community',
          link: '/en-us/community/index.html',
        },
      ],
    },
    copyright: 'Copyright © 2019 Seata',
  },
  'zh-cn': {
    pageMenu: [
      {
        key: 'home',
        text: '首页',
        link: '/zh-cn/index.html',
      },
      {
        key: 'docs',
        text: '文档',
        link: '/zh-cn/docs/overview/what-is-seata.html',
      },
      {
        key: 'blog',
        text: '博客',
        link: '/zh-cn/blog/index.html',
      },
      {
        key: 'community',
        text: '社区',
        link: '/zh-cn/community/index.html',
      },
      {
        key: 'download',
        text: '下载',
        link: '/zh-cn/blog/download.html',
      },
    ],
    vision: {
      title: '愿景',
      content: 'Seata 是一款阿里巴巴开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。',
    },
    documentation: {
      title: '文档',
      list: [
        {
          text: 'Seata 是什么？',
          link: '/zh-cn/docs/overview/what-is-seata.html',
        },
        {
          text: '快速开始',
          link: '/zh-cn/docs/user/quickstart.html',
        },
        {
          text: '报告文档问题',
          link: 'https://github.com/seata/seata.github.io/issues/new',
        },
        {
          text: '在Github上编辑此文档',
          link: 'https://github.com/seata/seata.github.io',
        }
      ],
    },
    resources: {
      title: '资源',
      list: [
        {
          text: '博客',
          link: '/zh-cn/blog/index.html',
        },
        {
          text: '社区',
          link: '/zh-cn/community/index.html',
        },
      ],
    },
    copyright: 'Copyright © 2019 Seata',
  },
};
