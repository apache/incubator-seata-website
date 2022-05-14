import React from 'react';

export default {
  'en-us': {
    barText: 'Community',
    events: {
      title: 'Events & News',
      list: [
        {
          img: 'https://img.alicdn.com/tfs/TB1isb2wYj1gK0jSZFuXXcrHpXa-4300-2867.jpg',
          title: 'title',
          content: 'seata',
          dateStr: 'May 12nd，2018',
          link: '/en-us/blog/blog1.html',
        },
      ]
    },
    contacts: {
      title: 'Talk To Us',
      desc: 'Feel free to contact us via the following channel.',
      list: [
        {
          img: '/img/mailinglist.png',
          imgHover: '/img/mailinglist_hover.png',
          title: 'Mailing List',
          link: 'mailto:dev-seata+subscribe@googlegroups.com'
        },
        {
          img: '//img.alicdn.com/tfs/TB1OTCISET1gK0jSZFrXXcNCXXa-344-346.jpg',
          imgHover: '//img.alicdn.com/tfs/TB1OTCISET1gK0jSZFrXXcNCXXa-344-346.jpg',
          title: 'Seata WeChat Official Account(Recommend)',
        },
        {
          img: '//img.alicdn.com/tfs/TB1nccZi79l0K4jSZFKXXXFjpXa-614-614.jpg',
          imgHover: '//img.alicdn.com/tfs/TB1nccZi79l0K4jSZFKXXXFjpXa-614-614.jpg',
          title: 'Wechat group assistant',
        },
        {
          img: '//img.alicdn.com/imgextra/i1/O1CN01TlIbgM1JSrtYmHNIw_!!6000000001028-0-tps-458-456.jpg',
          imgHover: '//img.alicdn.com/imgextra/i1/O1CN01TlIbgM1JSrtYmHNIw_!!6000000001028-0-tps-458-456.jpg',
          title: 'dingTalk③(Recommend)',
        }
      ],
    },
    contributorGuide: {
      title: 'Contributor Guide',
      desc: 'You can always contribute to Seata.',
      list: [
        {
          img: '/img/channels/email_gray.svg',
          title: 'Mailing List',
          content: <span>Join our mailing list.</span>,
        },
        {
          img: '/img/channels/github_gray.svg',
          title: 'Issue',
          content: <span>Submit a <a href="https://github.com/seata/seata/issues/new">new issue</a>.</span>,
        },
        {
          img: '/img/documents.png',
          title: 'Documents',
          content: <span>Improve the <a href="https://github.com/seata/seata.github.io">documentation</a>.</span>,
        },
        {
          img: '/img/pullrequest.png',
          title: 'Pull Request',
          content: <span>Create a brilliant <a href="https://github.com/seata/seata/pulls">pull request</a>.  </span>,
        },
      ],
    },
  },
  'zh-cn': {
    barText: '社区',
    events: {
      title: '事件 & 新闻',
      list: [
        {
          img: 'https://img.alicdn.com/tfs/TB1qH2YwVP7gK0jSZFjXXc5aXXa-2002-901.jpg',
          title: 'Seata Meetup·杭州站成功举办',
          content: 'Seata Community Meetup·杭州站,于12月21号在杭州市梦想小镇浙江青年众创空间完美举办',
          dateStr: 'Dec 25nd，2019',
          link: '/zh-cn/blog/seata-meetup-hangzhou.html',
        },
        {
          img: '/img/blog/20191218210552.png',
          title: 'Seata Community Meetup·杭州站',
          content: 'Seata Community Meetup·杭州站,将于12月21号在杭州市梦想小镇浙江青年众创空间正式召开',
          dateStr: 'Dec 18nd，2019',
          link: '/zh-cn/blog/seata-community-meetup-hangzhou-ready.html',
        },
      ]
    },
    contacts: {
      title: '联系我们',
      desc: '有问题需要反馈？请通过一下方式联系我们。',
        list: [
            {
                img: '/img/mailinglist.png',
                imgHover: '/img/mailinglist_hover.png',
                title: '邮件列表',
                link: 'mailto:dev-seata+subscribe@googlegroups.com'
            },
            {
                img: '//img.alicdn.com/tfs/TB1OTCISET1gK0jSZFrXXcNCXXa-344-346.jpg',
                imgHover: '//img.alicdn.com/tfs/TB1OTCISET1gK0jSZFrXXcNCXXa-344-346.jpg',
                title: 'Seata 微信官方公众号(强烈推荐)',
            },
            {
                img: '//img.alicdn.com/tfs/TB1nccZi79l0K4jSZFKXXXFjpXa-614-614.jpg',
                imgHover: '//img.alicdn.com/tfs/TB1nccZi79l0K4jSZFKXXXFjpXa-614-614.jpg',
                title: '微信群拉取小助手',
            },
            {
                img: '//img.alicdn.com/imgextra/i1/O1CN01TlIbgM1JSrtYmHNIw_!!6000000001028-0-tps-458-456.jpg',
                imgHover: '//img.alicdn.com/imgextra/i1/O1CN01TlIbgM1JSrtYmHNIw_!!6000000001028-0-tps-458-456.jpg',
                title: '钉钉③群(推荐)',
            },
      ],
    },
    contributorGuide: {
      title: '贡献指南',
      desc: '欢迎为 Seata 做贡献！',
      list: [
        {
          img: '/img/channels/email_gray.svg',
          title: '邮件列表',
          content: <span>加入我们的邮件列表。</span>,
        },
        {
          img: '/img/channels/github_gray.svg',
          title: '报告问题',
          content: <span>提交<a href="https://github.com/seata/seata/issues/new">新问题</a>。</span>,
        },
        {
          img: '/img/documents.png',
          title: '改进文档',
          content: <span>改进<a href="https://github.com/seata/seata.github.io">文档</a>。</span>,
        },
        {
          img: '/img/pullrequest.png',
          title: '提交 PR',
          content: <span>创建一个<a href="https://github.com/seata/seata/pulls">PR</a>。</span>,
        },
      ],
    },
  },
};
