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
                title: 'Seata是什么',
                children: [
                    {
                        title: '简介',
                        link: '/zh-cn/docs/overview/what-is-seata.html',
                    },
                    {
                        title: 'RoadMap',
                        link: '/zh-cn/docs/overview/roadmap.html',
                    }
                ],
            },
			{
                title: '概念&架构',
                children: [
                    {
                        title: '事务与分布式事务',
                        link: '/zh-cn/docs/concept/transaction-and-distributed-transaction.html',
                    },
                    {
                        title: '事务模式',
                        children: [
							{
                                title: '概述',
                                link: '/zh-cn/docs/concept/mode/mode-overview.html',
                            },
                            {
                                title: 'Seata AT 模式',
                                link: '/zh-cn/docs/concept/mode/at-mode.html',
                            },
                            {
                                title: 'Seata TCC 模式',
                                link: '/zh-cn/docs/concept/mode/tcc-mode.html',
                            },
                            {
                                title: 'Seata Saga 模式',
                                link: '/zh-cn/docs/concept/mode/saga-mode.html',
                            },
                            {
                                title: 'Seata XA 模式',
                                link: '/zh-cn/docs/concept/mode/xa-mode.html',
                            }
                        ],
                    },
                    {
                        title: '架构',
                        link: '/zh-cn/docs/concept/framework.html',
                    }
                ],
            },
			{
                title: '快速开始',
                children: [
                    {
                        title: 'Seata-Server部署',
                        children: [
							{
                                title: '直接部署',
                                link: '/zh-cn/docs/quickstart/server-deploy/deploy-server.html',
                            },
                            {
                                title: 'Docker部署',
                                link: '/zh-cn/docs/quickstart/server-deploy/deploy-by-docker.html',
                            },
                            {
                                title: 'Docker-compose部署',
                                link: '/zh-cn/docs/quickstart/server-deploy/deploy-by-docker-compose.html',
                            },
                            {
                                title: 'Kubernetes部署',
                                link: '/zh-cn/docs/quickstart/server-deploy/deploy-by-kubernetes.html',
                            },
                            {
                                title: 'Helm部署',
                                link: '/zh-cn/docs/quickstart/server-deploy/deploy-by-helm.html',
                            }
                        ],
                    },
                    {
                        title: 'AT模式集成',
                        children: [
							{
                                title: '快速入门',
                                link: '/zh-cn/docs/quickstart/at/at-quick.html',
                            },
                            {
                                title: '进阶使用',
                                link: '/zh-cn/docs/quickstart/at/at-advance.html',
                            },
                            {
                                title: '框架集成',
                                link: '/zh-cn/docs/quickstart/at/at-integration.html',
                            }
                        ],
                    },
                    {
                        title: 'TCC模式集成',
                        children: [
							{
                                title: '快速入门',
                                link: '/zh-cn/docs/quickstart/tcc/tcc-quick.html',
                            },
                            {
                                title: '进阶使用',
                                link: '/zh-cn/docs/quickstart/tcc/tcc-advance.html',
                            },
                            {
                                title: '框架集成',
                                link: '/zh-cn/docs/quickstart/tcc/tcc-integration.html',
                            }
                        ],
                    },
					{
                        title: 'XA模式集成',
                        children: [
							{
                                title: '快速入门',
                                link: '/zh-cn/docs/quickstart/xa/xa-quick.html',
                            },
                            {
                                title: '进阶使用',
                                link: '/zh-cn/docs/quickstart/xa/xa-advance.html',
                            },
                            {
                                title: '框架集成',
                                link: '/zh-cn/docs/quickstart/xa/xa-integration.html',
                            }
                        ],
                    },
					{
                        title: 'Saga模式集成',
                        children: [
							{
                                title: '快速入门',
                                link: '/zh-cn/docs/quickstart/saga/saga-quick.html',
                            },
                            {
                                title: '进阶使用',
                                link: '/zh-cn/docs/quickstart/saga/saga-advance.html',
                            },
                            {
                                title: '框架集成',
                                link: '/zh-cn/docs/quickstart/saga/saga-integration.html',
                            }
                        ],
                    },
					{
                        title: '常见解决方案',
                        children: [
							{
                                title: '分库分表集成ShadingSphere',
                                link: '/zh-cn/docs/quickstart/solution/shardingsphere.html',
                            },
                            {
                                title: '多数据源',
                                link: '/zh-cn/docs/quickstart/solution/multiple-datasource.html',
                            }
                        ],
                    }
                ],
            },
            {
                title: '用户文档',
                children: [
                    {
                        title: 'FAQ',
                        link: '/zh-cn/docs/user/faq.html',
                    },
					{
                        title: '参数配置',
                        link: '/zh-cn/docs/user/configuration/configurations.html',
                    },
                    {
                        title: '事务分组',
                        children: [
                            {
                                title: '事务分组介绍',
                                link: '/zh-cn/docs/user/txgroup/transaction-group.html',
                            },
                            {
                                title: '事务分组最佳实践',
                                link: '/zh-cn/docs/user/txgroup/transaction-group-best-practice.html',
                            }
                        ]
                    },
                    {
                        title: '配置中心',
                        children: [
                            {
                                title: '简介',
                                link: '/zh-cn/docs/user/configcenter/index.html',
                            },
                            {
                                title: 'Nacos 配置中心',
                                link: '/zh-cn/docs/user/configcenter/nacos.html',
                            },
                            {
                                title: 'Apollo 配置中心',
                                link: '/zh-cn/docs/user/configcenter/apollo.html',
                            },
                            {
                                title: 'Etcd3 配置中心',
                                link: '/zh-cn/docs/user/configcenter/etcd3.html',
                            },
                            {
                                title: 'Consul 配置中心',
                                link: '/zh-cn/docs/user/configcenter/consul.html',
                            },
                            {
                                title: 'Zookeeper 配置中心',
                                link: '/zh-cn/docs/user/configcenter/zookeeper.html',
                            },
                            {
                                title: 'File 配置中心',
                                link: '/zh-cn/docs/user/configcenter/file.html',
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
                            },
                            {
                                title: 'Sofa 注册中心',
                                link: '/zh-cn/docs/user/registry/sofa.html',
                            },
                            {
                                title: 'Redis 注册中心',
                                link: '/zh-cn/docs/user/registry/redis.html',
                            },
                            {
                                title: 'File 注册中心',
                                link: '/zh-cn/docs/user/registry/file.html',
                            }
                        ],
                    },
                    {
                        title: 'API支持',
                        link: '/zh-cn/docs/user/api.html',
                    },
					{
                        title: 'Open-API',
                        link: '/zh-cn/docs/user/open-api.html',
                    },
                    {
                        title: 'SQL参考(AT)',
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
								title: 'Metrics设计',
								link: '/zh-cn/docs/user/apm/seata-mertics.html',
							},
                            {
                                title: 'SkyWalking',
                                link: '/zh-cn/docs/user/apm/skywalking.html',

                            },
                            {
                                title: 'Prometheus',
                                link: '/zh-cn/docs/user/apm/prometheus.html',

                            }
                        ]
                    },
					{
                        title: '事务状态',
                        link: '/zh-cn/docs/user/global-transaction-status.html',
                    },
					{
                        title: 'SPI扩展实现',
                        link: '/zh-cn/docs/user/spi.html',
                    }
				]
            },
            {
                title: '测试报告',
                children: [
                    {
                        title: 'AT模式',
                        link: '/zh-cn/docs/test/at-test-report.html',
                    },
                    {
                        title: 'TCC模式',
                        link: '/zh-cn/docs/test/tcc-test-report.html',
                    },
					{
                        title: 'XA模式',
                        link: '/zh-cn/docs/test/xa-test-report.html',
                    },
					{
                        title: 'SAGA模式',
                        link: '/zh-cn/docs/test/saga-test-report.html',
                    }
                ],
            },
            {
                title: '升级与兼容性',
                children: [
                    {
                        title: '版本升级指南',
                        link: '/zh-cn/docs/upgrade/upgrade.html',
                    }
                ]

            },
        ],
        barText: '文档',
    },
};
