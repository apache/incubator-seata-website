export default {
  'en-us': {
    sidemenu: [
      {
        title: 'Fescar',
        children: [
          {
            title: 'Overview',
            opened: true,
            children: [
              {
                title: 'What is Dragonfly?',
                link: '/en-us/docs/overview/what_is_dragonfly.html',
              },
              {
                title: 'Terminology',
                link: '/en-us/docs/overview/terminology.html',
              },
            ],
          },
          {
            title: 'Quick Start',
            link: '/en-us/docs/quickstart.html',
          },
          {
            title: 'User Guide',
            opened: true,
            children: [
              {
                title: 'Installing Server',
                link: '/en-us/docs/userguide/install_server.html',
              },
              {
                title: 'Installing Client',
                link: '/en-us/docs/userguide/install_client.html',
              },
              {
                title: 'Downloading Files',
                link: '/en-us/docs/userguide/download_files.html',
              },
              {
                title: 'Supernode Configuration',
                link: '/en-us/docs/userguide/supernode_configuration.html',
              },
            ],
          },
          {
            title: 'CLI Reference',
            opened: true,
            children: [
              {
                title: 'dfdaemon',
                link: '/en-us/docs/cli_ref/dfdaemon.html',
              },
              {
                title: 'dfget',
                link: '/en-us/docs/cli_ref/dfget.html',
              },
            ],
          },
          {
            title: 'API Reference',
            link: '/en-us/docs/api.html',
          },
          {
            title: 'FAQ',
            link: '/en-us/docs/faq.html',
          },
        ],
      },
    ],
    barText: 'Documentation',
  },
  'zh-cn': {
    sidemenu: [
      {
        title: 'Fescar',
        children: [
          {
            title: '概述',
            opened: true,
            children: [
              {
                title: '什么是 Dragonfly？',
                link: '/zh-cn/docs/overview/what_is_dragonfly.html',
              },
              {
                title: '术语表',
                link: '/zh-cn/docs/overview/terminology.html',
              },
            ],
          },
          {
            title: '快速开始',
            link: '/zh-cn/docs/quickstart.html',
          },
          {
            title: '使用指南',
            opened: true,
            children: [
              {
                title: '安装服务端',
                link: '/zh-cn/docs/userguide/install_server.html',
              },
              {
                title: '安装客户端',
                link: '/zh-cn/docs/userguide/install_client.html',
              },
              {
                title: '下载文件',
                link: '/zh-cn/docs/userguide/download_files.html',
              },
              {
                title: '超级节点配置',
                link: '/zh-cn/docs/userguide/supernode_configuration.html',
              },
            ],
          },
          {
            title: 'CLI 参考',
            opened: true,
            children: [
              {
                title: 'dfdaemon',
                link: '/zh-cn/docs/cli_ref/dfdaemon.html',
              },
              {
                title: 'dfget',
                link: '/zh-cn/docs/cli_ref/dfget.html',
              },
            ],
          },
          {
            title: 'API 参考',
            link: '/zh-cn/docs/api.html',
          },
          {
            title: '常见问题',
            link: '/zh-cn/docs/faq.html',
          },
        ],
      },
    ],
    barText: '文档',
  },
};
