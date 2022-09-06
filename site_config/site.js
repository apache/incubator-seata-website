// 全局的一些配置
export default {
    rootPath: '',
    port: 8080,
    domain: 'seata.io', // 站点部署域名，无需协议和path等
    defaultSearch: 'baidu', // 默认搜索引擎，baidu或者google
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
                key: 'enterprise',
                text: 'SEATA IN CLOUD',
                link: 'https://cn.aliyun.com/product/aliware/mse?spm=seata-website.topbar.0.0.0',
                imgUrl: 'https://img.alicdn.com/imgextra/i4/O1CN01iksJGI1TOscjbXlOD_!!6000000002373-2-tps-30-30.png'
            },
            {
                key: 'solution',
                text: 'SOLUTIONS',
                link: '',
                imgUrl: 'https://img.alicdn.com/tfs/TB1esl_m.T1gK0jSZFrXXcNCXXa-200-200.png',
                children: [{
                    key: 'gts',
                    text: 'Distributed transaction solution',
                    link: 'https://www.aliyun.com/aliware/txc?spm=seata-website.topbar.0.0.0'
                }, {
                    key: 'micoservice',
                    text: 'Microservice solutions',
                    link: 'https://cn.aliyun.com/product/aliware/mse?spm=seata-website.topbar.0.0.0'
                }, {
                    key: 'msha',
                    text: 'High-availability solution',
                    link: 'https://www.aliyun.com/product/ahas?spm=seata-website.topbar.0.0.0'
                }, {
                    key: 'serverless',
                    text: 'Serverless solution for miscoservices',
                    link: 'https://cn.aliyun.com/product/aliware/sae?spm=seata-website.topbar.0.0.0'
                },
                {
                    key: 'appas',
                    text: 'PaaS solution',
                    link: 'https://www.aliyun.com/product/edas?spm=seata-website.topbar.0.0.0'
                }, {
                    key: 'mesh',
                    text: 'Service mesh solution',
                    link: 'https://www.aliyun.com/product/servicemesh?spm=seata-website.topbar.0.0.0',
                }
                ]
            },
            {
                key: 'developers',
                text: 'DEVELOPERS',
                link: '/en-us/docs/developers/developers_dev.html',
            },
            {
                key: 'SummerCode2022',
                text: 'SummerCode2022',
                link: 'https://mp.weixin.qq.com/s/q6J-swbdWqZebuSiq2JDWg',
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
            {
                key: 'download',
                text: 'DOWNLOAD',
                link: '/en-us/blog/download.html',
            }
        ],
        vision: {
            title: 'Vision',
            content: 'Seata is an Alibaba open source distributed transaction solution that delivers high performance and easy to use distributed transaction services under a microservices architecture.',
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
        copyright: 'Copyright © 2022 Seata',
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
                key: 'enterprise',
                text: 'Seata企业版',
                link: 'https://cn.aliyun.com/product/aliware/mse?spm=seata-website.topbar.0.0.0',
                imgUrl: 'https://img.alicdn.com/imgextra/i4/O1CN01iksJGI1TOscjbXlOD_!!6000000002373-2-tps-30-30.png'
            },
            {
                key: 'solution',
                text: '解决方案',
                link: '',
                imgUrl: 'https://img.alicdn.com/tfs/TB1esl_m.T1gK0jSZFrXXcNCXXa-200-200.png',
                children: [{
                    key: 'seata',
                    text: '分布式事务解决方案',
                    link: 'https://cn.aliyun.com/product/aliware/mse?spm=seata-website.topbar.0.0.0'
                }, {
                    key: 'micoservice',
                    text: '微服务解决方案',
                    link: 'https://cn.aliyun.com/product/aliware/mse?spm=seata-website.topbar.0.0.0'
                }, {
                    key: 'msha',
                    text: '高可用解决方案',
                    link: 'https://www.aliyun.com/product/ahas?spm=seata-website.topbar.0.0.0'
                }, {
                    key: 'serverless',
                    text: '微服务Serverless解决方案',
                    link: 'https://cn.aliyun.com/product/aliware/sae?spm=seata-website.topbar.0.0.0'
                },
                {
                    key: 'appas',
                    text: 'PaaS解决方案',
                    link: 'https://www.aliyun.com/product/edas?spm=seata-website.topbar.0.0.0'
                }, {
                    key: 'mesh',
                    text: '服务网格解决方案',
                    link: 'https://www.aliyun.com/product/servicemesh?spm=seata-website.topbar.0.0.0',
                }
                ]
            },
            {
                key: 'developers',
                text: '开发者',
                link: '/zh-cn/docs/developers/developers_dev.html',
            },
            {
                key: 'SummerCode2022',
                text: '开源之夏2022',
                link: 'https://mp.weixin.qq.com/s/q6J-swbdWqZebuSiq2JDWg',
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
        copyright: 'Copyright © 2022 Seata',
    },
};
