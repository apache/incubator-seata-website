export default {
    'en-us': {
        sidemenu: [
            {
                title: 'Developers List',
                children: [

                    {
                        title: 'Developers',
                        link: '/en-us/docs/developers/developers_dev.html',
                    },
                ],
            },
            {
                title: 'Contribute Guide',
                children: [
                    {
                        title: 'New contributor guide',
                        link: '/en-us/docs/developers/contributor-guide/new-contributor-guide_dev.html',
                    },
                    {
                        title: 'Test coverage guide',
                        link: '/en-us/docs/developers/contributor-guide/test-coverage-guide_dev.html',
                    },
                    {
                        title: 'How to report security issues',
                        link: '/en-us/docs/developers/contributor-guide/reporting-security-issues_dev.html',
                    },
                    {
                        title: 'How to contribute',
                        link: '/en-us/docs/developers/guide_dev.html', // 开发者文档均以_dev结尾作为文件名，md文件放在docs目录下
                    },
                ]
            },
            {
                title: 'Committer Guide',
                children: [
                    {
                        title: 'Label an Issue',
                        link: '/en-us/docs/developers/committer-guide/label-an-issue-guide_dev.html',
                    },
                    {
                        title: 'Website Guide',
                        link: '/en-us/docs/developers/committer-guide/website-guide_dev.html',
                    },
                    {
                        title: 'Release Guide',
                        link: '/en-us/docs/developers/committer-guide/release-guide_dev.html',
                    }
                ]
            }
        ],
        barText: 'Developers',
    },
    'zh-cn':
        {
            sidemenu: [
                {
                    title: '开发者列表',
                    children: [
                        {
                            title: '开发人员',
                            link: '/zh-cn/docs/developers/developers_dev.html',
                        }
                    ],
                },
                {
                    title: '贡献者向导',
                    children: [
                        {
                            title: '新贡献者向导',
                            link: '/zh-cn/docs/developers/contributor-guide/new-contributor-guide_dev.html',
                        },
                        {
                            title: '测试覆盖率向导',
                            link: '/zh-cn/docs/developers/contributor-guide/test-coverage-guide_dev.html',
                        },
                        {
                            title: '如何汇报安全漏洞',
                            link: '/zh-cn/docs/developers/contributor-guide/reporting-security-issues_dev.html',
                        },
                        {
                            title: '参与贡献',
                            link: '/zh-cn/docs/developers/guide_dev.html',
                        },
                    ]
                },
                {
                    title: '提交者向导',
                    children: [
                        {
                            title: '给问题打标签',
                            link: '/zh-cn/docs/developers/committer-guide/label-an-issue-guide_dev.html',
                        },
                        {
                            title: '网站向导',
                            link: '/zh-cn/docs/developers/committer-guide/website-guide_dev.html',
                        },
                        {
                            title: '版本发布向导',
                            link: '/zh-cn/docs/developers/committer-guide/release-guide_dev.html',
                        }
                    ]
                },
                {
                    title: '贡献者活动',
                    children: [
                        {
                            title: 'Top Contributor',
                            link: '/zh-cn/docs/developers/contributor-activity/top-contributer_dev.html',
                        }
                    ]
                }
            ],
            barText: '开发者',
        }
}
;
