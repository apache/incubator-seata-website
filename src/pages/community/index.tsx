import React from 'react';
import { translate } from '@docusaurus/Translate';
import { Bar, Slider } from '../../components';
import EventCard from './eventCard';
import ContactItem, { ContactData } from './contactItem';
import ContributorItem, { ContributorData } from './contributorItem';
import Layout from '@theme/Layout';

import './index.scss';

const data = {
  barText: translate({ id: 'community.barText', message: '社区' }),
  events: {
    title: translate({ id: 'community.eventsTitle', message: '事件 & 新闻' }),
    list: [
      {
        img: 'https://img.alicdn.com/tfs/TB1qH2YwVP7gK0jSZFjXXc5aXXa-2002-901.jpg',
        title: 'Seata Meetup·杭州站成功举办',
        content:
          'Seata Community Meetup·杭州站,于12月21号在杭州市梦想小镇浙江青年众创空间完美举办',
        dateStr: 'Dec 25nd，2019',
        link: '/zh-cn/blog/seata-meetup-hangzhou.html',
      },
      {
        img: require('@site/static/img/blog/20191218210552.png').default,
        title: 'Seata Community Meetup·杭州站',
        content:
          'Seata Community Meetup·杭州站,将于12月21号在杭州市梦想小镇浙江青年众创空间正式召开',
        dateStr: 'Dec 18nd，2019',
        link: '/zh-cn/blog/seata-community-meetup-hangzhou-ready.html',
      },
    ],
  },
  contacts: {
    title: translate({ id: 'community.contactsTitle', message: '联系我们' }),
    desc: translate({
      id: 'community.contactsDesc',
      message: '有问题需要反馈？请通过一下方式联系我们。',
    }),
    list: [
      {
        img: require('@site/static/img/community/mailinglist.png').default,
        imgHover: require('@site/static/img/community/mailinglist_hover.png').default,
        title: translate({
          id: 'community.contactsListTitle1',
          message: '邮件列表',
        }),
        link: 'mailto:dev@seata.apache.org',
      },
      {
        img: '//img.alicdn.com/tfs/TB1OTCISET1gK0jSZFrXXcNCXXa-344-346.jpg',
        imgHover:
          '//img.alicdn.com/tfs/TB1OTCISET1gK0jSZFrXXcNCXXa-344-346.jpg',
        title: translate({
          id: 'community.contactsListTitle2',
          message: 'Seata 微信官方公众号(强烈推荐)',
        }),
      },
      {
        img: '//img.alicdn.com/tfs/TB1nccZi79l0K4jSZFKXXXFjpXa-614-614.jpg',
        imgHover:
          '//img.alicdn.com/tfs/TB1nccZi79l0K4jSZFKXXXFjpXa-614-614.jpg',
        title: translate({
          id: 'community.contactsListTitle3',
          message: '微信群拉取小助手',
        }),
      },
      {
        img: '//img.alicdn.com/imgextra/i3/O1CN01JP7KIR1ju3dlIdipd_!!6000000004607-0-tps-454-460.jpg',
        imgHover:
          '//img.alicdn.com/imgextra/i3/O1CN01JP7KIR1ju3dlIdipd_!!6000000004607-0-tps-454-460.jpg',
        title: translate({
          id: 'community.contactsListTitle4',
          message: '钉钉③群(推荐)',
        }),
      },
      {
        img: '//img.alicdn.com/imgextra/i2/O1CN014QxxzN1GH0sOVYTgf_!!6000000000596-0-tps-300-302.jpg',
        imgHover:
          '//img.alicdn.com/imgextra/i2/O1CN014QxxzN1GH0sOVYTgf_!!6000000000596-0-tps-300-302.jpg',
        title: translate({
          id: 'community.contactsListTitle5',
          message: 'QQ③群',
        }),
      },
    ],
  },
  contributorGuide: {
    title: translate({ id: 'community.contributeTitle', message: '贡献指南' }),
    desc: translate({
      id: 'community.contributeDesc',
      message: '欢迎为 Seata 做贡献！',
    }),
    list: [
      {
        img: require('@site/static/img/community/mailinglist.png').default,
        title: translate({
          id: 'community.contributeListTitle1',
          message: '邮件列表',
        }),
        content: (
          <span>
            <a href='mailto:dev-subscribe@seata.apache.org' target='_blank'>
              {translate({
                id: 'community.contributeListContent1',
                message: '加入我们的邮件列表',
              })}
            </a>
          </span>
        ),
      },
      {
        img: require('@site/static/img/community/issue.png').default,
        title: translate({
          id: 'community.contributeListTitle2',
          message: '报告问题',
        }),
        content: (
          <span>
            {translate({
              id: 'community.contributeListContent2_1',
              message: '提交',
            })}
            &nbsp;
            <a
              href='https://github.com/apache/incubator-seata/issues/new'
              target='_blank'
            >
              {translate({
                id: 'community.contributeListContent2_2',
                message: '新问题',
              })}
            </a>
          </span>
        ),
      },
      {
        img: require('@site/static/img/community/documents.png').default,
        title: translate({
          id: 'community.contributeListTitle3',
          message: '改进文档',
        }),
        content: (
          <span>
            {translate({
              id: 'community.contributeListContent3_1',
              message: '改进',
            })}
            &nbsp;
            <a
              href='https://github.com/apache/incubator-seata-website'
              target='_blank'
            >
              {translate({
                id: 'community.contributeListContent3_2',
                message: '文档',
              })}
            </a>
          </span>
        ),
      },
      {
        img: require('@site/static/img/community/pullrequest.png').default,
        title: translate({
          id: 'community.contributeListContent4_1',
          message: '提交 PR',
        }),
        content: (
          <span>
            {translate({
              id: 'community.contributeListContent4_2',
              message: '创建一个',
            })}
            &nbsp;
            <a
              href='https://github.com/apache/incubator-seata/pulls'
              target='_blank'
            >
              PR
            </a>
          </span>
        ),
      },
    ],
  },
};

export default function Community(): JSX.Element {
  return (
    <Layout title={'Seata'} description='Seata Community'>
      <div className='community-page'>
        <Bar
          img='https://img.alicdn.com/tfs/TB115XwJzTpK1RjSZKPXXa3UpXa-160-160.png'
          text={data.barText}
        />
        <section className='events-section'>
          <h3>{data.events.title}</h3>
          <Slider>
            {data.events.list.map((event, i) => (
              <EventCard event={event} key={i} />
            ))}
          </Slider>
        </section>
        <section className='contact-section'>
          <h3>{data.contacts.title}</h3>
          <p>{data.contacts.desc}</p>
          <div className='contact-list'>
            {data.contacts.list.map((contact, i) => (
              <ContactItem contact={contact as ContactData} key={i} />
            ))}
          </div>
        </section>
        <section className='contributor-section'>
          <h3>{data.contributorGuide.title}</h3>
          <p>{data.contributorGuide.desc}</p>
          <div className='contributor-list'>
            {data.contributorGuide.list.map((contributor, i) => (
              <ContributorItem
                contributor={contributor as ContributorData}
                key={i}
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
