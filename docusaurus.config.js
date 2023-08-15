// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Seata',
  favicon: 'img/seata_logo_small.jpeg',

  // Set the production url of your site here
  url: 'https://seata.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'alibaba', // Usually your GitHub org/user name.
  projectName: 'seata', // Usually your repo name.
  
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-cn'],
    localeConfigs: {
      'en': {
        label: 'En',
        htmlLang: 'en-US',
      },
      'zh-cn': {
        label: '中',
        htmlLang: 'zh-CN',
      },
    }
  },
  scripts: [
    { src: '//g.alicdn.com/mamba/assets/0.0.19/mse-arc-ui.min.js' },
    {
      src: '//g.alicdn.com/alilog/mlog/aplus_v2.js',
      id: 'beacon-aplus',
      exparams: 'clog=o&aplus&sidx=aplusSidx&ckx=aplusCkx',
    },
    {
      src: '//g.alicdn.com/aes/??tracker/1.0.34/index.js,tracker-plugin-pv/2.4.5/index.js,tracker-plugin-event/1.2.5/index.js,tracker-plugin-jserror/1.0.13/index.js,tracker-plugin-api/1.1.14/index.js,tracker-plugin-perf/1.1.8/index.js,tracker-plugin-eventTiming/1.0.4/index.js',
    },
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-YHS75WKFBR',
      async: true,
    },
  ],
  stylesheets: [
    {
      href: '//g.alicdn.com/mamba/assets/0.0.19/mse-arc-ui.min.css',
    },
  ],
  plugins: ['docusaurus-plugin-sass'],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: '全部博文',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [{ name: 'keywords', content: 'Seata' }],
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true, // 禁止切换主题模式
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: '',
        logo: {
          alt: 'Seata Logo',
          src: 'img/seata_logo.png',
        },
        items: [
          {
            label: 'Home',
            to: '/',
            activeBaseRegex: '^/$',
            position: 'left',
          },
          {
            label: 'Docs',
            type: 'doc',
            docId: 'overview/what-is-seata',
            // type: 'docSidebar',
            // sidebarId: 'tutorialSidebar',
            position: 'left',
          },
          {
            label: 'Solutions',
            type: 'dropdown',
            position: 'left',
            items: [
              {
                label: 'Seata in cloud',
                href: 'https://cn.aliyun.com/product/aliware/mse?spm=seata-website.topbar.0.0.0',
              },
              {
                label: 'Microservice solutions',
                href: 'https://cn.aliyun.com/product/aliware/mse?spm=seata-website.topbar.0.0.0',
              },
              {
                label: 'High-availability solution',
                href: 'https://www.aliyun.com/product/ahas?spm=seata-website.topbar.0.0.0',
              },
              {
                label: 'Serverless solution for microservices',
                href: 'https://cn.aliyun.com/product/aliware/sae?spm=seata-website.topbar.0.0.0',
              },
              {
                label: 'PaaS solution',
                href: 'https://www.aliyun.com/product/edas?spm=seata-website.topbar.0.0.0',
              },
              {
                label: 'Service mesh solution',
                href: 'https://www.aliyun.com/product/servicemesh?spm=seata-website.topbar.0.0.0',
              },
              {
                label: 'SOFA distributed transaction',
                href: 'https://help.aliyun.com/document_detail/132903.html?spm=seata-website.topbar.0.0.0',
              },
            ],
          },
          {
            label: 'Developers',
            type: 'doc',
            docId: 'developers/developers_dev',
            position: 'left',
          },
          {
            label: 'Recruitment',
            to: 'https://mp.weixin.qq.com/s/nvDmIJEuDaNEY3RfTA3UyA',
            position: 'left',
            target: '_blank',
          },
          {
            label: 'Blog', 
            to: '/blog', 
            position: 'left'
          },
          {
            label: 'Community',
            to: '/community',
            position: 'left',
          },
          {
            label: 'Download', 
            // to: '/blog/download',
            type: 'doc',
            docId: 'download',
            position: 'left'
          },
          {
            label: 'Console sample',
            to: 'http://demo.seata.io/',
            position: 'left',
            target: '_blank',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Vision',
            items: [
              {
                label: 'Seata is ...',
                to: '/',
              },
            ],
          },
          {
            title: 'Documentation',
            items: [
              {
                label: 'What is Seata?',
                to: '/docs/overview/what-is-seata',
              },
              {
                label: 'Quick Start',
                to: '/docs/user/quickstart',
              },
              {
                label: 'Report a doc issue',
                href: 'https://github.com/seata/seata.github.io/issues/new',
              },
              {
                label: 'Edit This Page on GitHub',
                href: 'https://github.com/seata/seata.github.io',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Community',
                to: '/community',
              },
            ],
          },
        ],
        logo: {
          src: '//img.alicdn.com/tfs/TB1dGrSwVT7gK0jSZFpXXaTkpXa-4802-1285.png',
          width: 120,
          height: 36,
        },
        copyright: `Copyright © ${new Date().getFullYear()} Seata`,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      prism: {
        theme: lightCodeTheme,
      },
    }),
};

module.exports = config;
