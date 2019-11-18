export default {
    'en-us': {
        sidemenu: [
            {
                title: 'Overview',
                children: [
                    {
                        title: 'What is Seata?',
                        link: '/en-us/docs/overview/what-is-seata.html',
                    },
                    {
                        title: 'Terminology',
                        link: '/en-us/docs/overview/terminology.html',
                    },
                    {
                        title: 'FAQ',
                        link: '/en-us/docs/overview/faq.html',
                    }
                ],
            },

            {
                title: 'User Doc',
                children: [
                    {
                        title: 'Quick Start',
                        link: '/en-us/docs/user/quickstart.html',
                    },
                    {
                        title: 'API Guide',
                        link: '/en-us/docs/user/api.html',
                    },
                    {
                        title: 'Microservices Framework Supports',
                        link: '/en-us/docs/user/microservice.html',
                    }
                ],
            },
            {
                title: 'Developer Guide',
                children: [
                    {
                        title: 'Transaction Mode',
                        children: [
                            {
                                title: 'Seata AT mode',
                                link: '/en-us/docs/dev/mode/at-mode.html',
                            },
                            {
                                title: 'Seata TCC mode',
                                link: '/en-us/docs/dev/mode/tcc-mode.html',
                            },
                            {
                                title: 'Seata Saga mode',
                                link: '/en-us/docs/dev/mode/saga-mode.html',
                            }
                        ],
                    },
                    {
                        title: 'Metrics',
                        link: '/en-us/docs/dev/seata-mertics.html',
                    },
                ],
            },
            {
                title: 'FAQ',
                link: '/en-us/docs/faq/faq.html',
		children: [
		    {
			title: 'FAQ',
			link: '/en-us/docs/faq/faq.html',
		    }
		]
	    },
	    {
                title: 'Ops Guide',
                children: [
                    {
                        title: 'Metrics配置',
                        link: '/en-us/docs/ops/multi-configuration-isolation.html',
                    },
                ]
            }
        ],
        barText: 'Documentation'
    },
    'zh-cn': {
        sidemenu: [
            {
                title: '概述',
                children: [
                    {
                        title: 'Seata 是什么？',
                        link: '/zh-cn/docs/overview/what-is-seata.html',
                    },
                    {
                        title: '术语表',
                        link: '/zh-cn/docs/overview/terminology.html',
                    },
                    {
                        title: '常见问题',
                        link: '/zh-cn/docs/overview/faq.html',
                    },
                ],
            },
            {
                title: '用户文档',
                children: [
                    {
                        title: '快速启动',
                        link: '/zh-cn/docs/user/quickstart.html',
                    },
                    {
                        title: 'Saga 模式',
                        link: '/zh-cn/docs/user/saga.html',
                    },
                    {
                        title: '参数配置',
                        link: '/zh-cn/docs/user/configurations.html',
                    },
                    {
                        title: 'Spring 支持',
                        link: '/zh-cn/docs/user/spring.html',
                    },
                    {
                        title: 'API 支持',
                        link: '/zh-cn/docs/user/api.html',
                    },
                    {
                        title: '微服务框架支持',
                        link: '/zh-cn/docs/user/microservice.html',
                    },
                    {
                        title: 'ORM 框架支持',
                        link: '/zh-cn/docs/user/ormframework.html',
                    },
                    {
                        title: '数据源类型支持',
                        link: '/zh-cn/docs/user/datasource.html',
                    },
                ],
            },

            {
                title: '开发者指南',
                children: [
                    {
                        title: '各事务模式',
                        children: [
                            {
                                title: 'Seata AT 模式',
                                link: '/zh-cn/docs/dev/mode/at-mode.html',
                            },
                            {
                                title: 'Seata TCC 模式',
                                link: '/zh-cn/docs/dev/mode/tcc-mode.html',
                            },
                            {
                                title: 'Seata Saga 模式',
                                link: '/zh-cn/docs/dev/mode/saga-mode.html',
                            }
                        ],
                    },
                    {
                        title: 'Metrics',
                        link: '/zh-cn/docs/dev/seata-mertics.html',
                    },
                ],
            },
            {
                title: '运维指南',
                children: [
                    {
                        title: 'Metrics配置',
                        link: '/zh-cn/docs/ops/operation.html',
                    },
                ]

            },
            {
                title: '常见问题',
                link: '/zh-cn/docs/faq/faq.html',
		children: [
		    {
			title: '常见问题',
			link: '/zh-cn/docs/faq/faq.html',
		    }
		]
            },
            {
                title: '开源共建',
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
            }
        ],
        barText: '文档',
    },
};
