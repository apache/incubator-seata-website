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
                                title: 'What is Fescar?',
                                link: '/en-us/docs/overview/what_is_fescar.html',
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
                                title: '什么是 Fescar？',
                                link: '/zh-cn/docs/overview/what_is_fescar.html',
                            },
                            {
                                title: '术语表',
                                link: '/zh-cn/docs/overview/terminology.html',
                            },
                        ],
                    },
                    {
                        title: '设计原理',
                        opened: true,
                        children: [
                            {
                                title: 'Fescar AT 模式',
                                link: '/zh-cn/docs/architecture/fescar_at.html',
                            },
                            {
                                title: 'Fescar TCC 模式',
                                link: '/zh-cn/docs/architecture/fescar_tcc.html',
                            },
                            {
                                title: 'Metrics设计',
                                link: '/zh-cn/docs/architecture/fescar_mertics.html',
                            },
                        ],
                    },
                    {
                        title: '开发指南',
                        opened: true,
                        children: [
                            {
                                title: 'Spring 支持',
                                link: '/zh-cn/docs/quickstart/spring.html',
                            },
                            {
                                title: 'API 支持',
                                link: '/zh-cn/docs/quickstart/api.html',
                            },
                            {
                                title: '微服务框架支持',
                                link: '/zh-cn/docs/quickstart/microservice.html',
                            },
                            {
                                title: 'ORM 框架支持',
                                link: '/zh-cn/docs/quickstart/ormframework.html',
                            },
                            {
                                title: '数据源类型支持',
                                link: '/zh-cn/docs/quickstart/datasource.html',
                            },
                        ],
                    },
                    {
                        title: '运维指南',
                        link: '/zh-cn/docs/ops/operation.html',
                    },
                    {
                        title: '开源共建',
                        link: '/zh-cn/docs/api.html',
                        opened: true,
                        children: [
                            {
                                title: '社区贡献',
                                link: '/zh-cn/docs/community/contribution.html',
                            },
                            {
                                title: '有奖活动',
                                link: '/zh-cn/docs/community/activity.html',
                            },
                            {
                                title: '提交问题',
                                link: '/zh-cn/docs/community/question.html',
                            },
                            {
                                title: '社区规划',
                                link: '/zh-cn/docs/community/roadmap.html',
                            },
                            {
                                title: '联系我们',
                                link: '/zh-cn/docs/community/contact.html',
                            },
                        ],
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
