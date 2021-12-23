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
                        title: 'Metrics design',
                        link: '/en-us/docs/dev/seata-mertics.html',
                    },
                ],
            },
            {
                title: 'Ops Guide',
                children: [
                    {
                        title: 'Configuration Isolation',
                        link: '/en-us/docs/ops/multi-configuration-isolation.html',
                    },
                    {
                        title: 'Deploy',
                        children: [
                            {
                                title: 'Deploy Directly',
                                link: '/en-us/docs/ops/deploy-server.html',
                            },
                            {
                                title: 'Deploy by Docker',
                                link: '/en-us/docs/ops/deploy-by-docker.html',
                            },
                            {
                                title: 'Deploy by Kubernetes',
                                link: '/en-us/docs/ops/deploy-by-kubernetes.html',
                            },
                            {
                                title: 'Deploy by Helm',
                                link: '/en-us/docs/ops/deploy-by-helm.html',
                            },
                            {
                                title: 'Deploy in High Available Usage',
                                link: '/en-us/docs/ops/deploy-ha.html',
                            },
                        ]
                    }
                ]
            },
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
                        title: 'FAQ',
                        link: '/zh-cn/docs/overview/faq.html',
                    }
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
                        title: '参数配置',
                        link: '/zh-cn/docs/user/configurations.html',
                    },
                    {
                        title: '事务分组',
                        children: [
                            {
                                title: '事务分组介绍',
                                link: '/zh-cn/docs/user/txgroup/transaction-group.html',
                            },
                            {
                                title: '事务分组与高可用',
                                link: '/zh-cn/docs/user/txgroup/transaction-group-and-ha.html',
                            }
                        ]
                    },
                    {
                        title: '配置中心',
                        children: [
                            {
                                title: '简介',
                                link: '/zh-cn/docs/user/configuration/index.html',
                            },
                            {
                                title: 'Nacos 配置中心',
                                link: '/zh-cn/docs/user/configuration/nacos.html',
                            },
                            {
                                title: 'Apollo 配置中心',
                                link: '/zh-cn/docs/user/configuration/apollo.html',
                            },
                            {
                                title: 'Etcd3 配置中心',
                                link: '/zh-cn/docs/user/configuration/etcd3.html',
                            },
                            {
                                title: 'Consul 配置中心',
                                link: '/zh-cn/docs/user/configuration/consul.html',
                            },
                            {
                                title: 'Zookeeper 配置中心',
                                link: '/zh-cn/docs/user/configuration/zookeeper.html',
                            }
                        ],
                    },
                    {
                        title: '注册中心',
                        children: [
                            {
                                title: '简介',
                                link: '/zh-cn/docs/user/registry/index.html',
                            },
                            {
                                title: 'Nacos 注册中心',
                                link: '/zh-cn/docs/user/registry/nacos.html',
                            },
                            {
                                title: 'Eureka 注册中心',
                                link: '/zh-cn/docs/user/registry/eureka.html',
                            },
                            {
                                title: 'Etcd3 注册中心',
                                link: '/zh-cn/docs/user/registry/etcd3.html',
                            },
                            {
                                title: 'Consul 注册中心',
                                link: '/zh-cn/docs/user/registry/consul.html',
                            },
                            {
                                title: 'Zookeeper 注册中心',
                                link: '/zh-cn/docs/user/registry/zookeeper.html',
                            }
                        ],
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
                        title: '数据库类型支持',
                        link: '/zh-cn/docs/user/datasource.html',
                    },
                    {
                        title: 'SQL参考',
                        children: [
                            {
                                title: 'SQL限制',
                                link: '/zh-cn/docs/user/sqlreference/sql-restrictions.html',
                            },
                            {
                                title: 'DML语句',
                                link: '/zh-cn/docs/user/sqlreference/dml.html',
                            },
                            {
                                title: 'SQL修饰',
                                link: '/zh-cn/docs/user/sqlreference/sql-decoration.html',
                            },
                            {
                                title: '函数',
                                link: '/zh-cn/docs/user/sqlreference/function.html',
                            },
                        ]
                    },
                    {
                        title: 'APM',
                        children: [
                            {
                                title: 'SkyWalking',
                                link: '/zh-cn/docs/user/apm/skywalking.html',

                            },
                            {
                                title: 'Prometheus',
                                link: '/zh-cn/docs/user/apm/prometheus.html',

                            },
                        ]
                    },
                    {
                        title: '测试报告',
                        children: [
                            {
                                title: '性能测试报告',
                                link: '/zh-cn/docs/user/performance.html',

                            },
                        ]
                    },
                    {
                        title: '附录',
                        children: [
                            {
                                title: '事务状态',
                                link: '/zh-cn/docs/user/appendix/global-transaction-status.html',
                            },
                            {
                                title: '事务隔离',
                                link: '/zh-cn/docs/user/appendix/isolation.html',
                            }
                        ]
                    }]
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
                                link: '/zh-cn/docs/user/saga.html',// zh-cn/docs/dev/mode/saga-mode.html
                            },
                            {
                                title: 'Seata XA 模式',
                                link: '/zh-cn/docs/dev/mode/xa-mode.html',
                            }
                        ],
                    },
                    {
                        title: 'Metrics设计',
                        link: '/zh-cn/docs/dev/seata-mertics.html',
                    },
                ],
            },
            {
                title: '运维指南',
                children: [
                    {
                        title: '版本升级指南',
                        link: '/zh-cn/docs/ops/upgrade.html',
                    },
                    {
                        title: '部署',
                        children: [
                            {
                                title: '新人文档',
                                link: '/zh-cn/docs/ops/deploy-guide-beginner.html',
                            },
                            {
                                title: '直接部署',
                                link: '/zh-cn/docs/ops/deploy-server.html',
                            },
                            {
                                title: 'Docker部署',
                                link: '/zh-cn/docs/ops/deploy-by-docker.html',
                            },
                            {
                                title: 'Docker compose部署',
                                link: '/zh-cn/docs/ops/deploy-by-docker-compose.html',
                            },
                            {
                                title: 'Kubernetes部署',
                                link: '/zh-cn/docs/ops/deploy-by-kubernetes.html',
                            },
                            {
                                title: 'Helm 部署',
                                link: '/zh-cn/docs/ops/deploy-by-helm.html',
                            },
                            {
                                title: '高可用部署',
                                link: '/zh-cn/docs/ops/deploy-ha.html',
                            },
                        ]
                    }
                ]

            },
        ],
        barText: '文档',
    },
};
