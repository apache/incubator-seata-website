import React from 'react';
import { translate } from '@docusaurus/Translate';

import './index.scss';

const data = {
  vision: {
    title: translate({ id: 'homepage.footerVersionTitle', message: '愿景' }),
    content: translate({
      id: 'homepage.footerVersionContent',
      message:
        'Apache Seata 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。',
    }),
  },
  documentation: {
    title: translate({ id: 'homepage.footerDocTitle', message: '文档' }),
    list: [
      {
        text: translate({
          id: 'homepage.footerDocListText1',
          message: 'Seata 是什么？',
        }),
        link: 'docs/overview/what-is-seata',
        target: '',
      },
      {
        text: translate({
          id: 'homepage.footerDocListText2',
          message: '快速开始',
        }),
        link: 'docs/user/quickstart',
        target: '',
      },
      {
        text: translate({
          id: 'homepage.footerDocListText3',
          message: '报告文档问题',
        }),
        link: 'https://github.com/seata/seata.github.io/issues/new',
        target: '_blank',
      },
      {
        text: translate({
          id: 'homepage.footerDocListText4',
          message: '在Github上编辑此文档',
        }),
        link: 'https://github.com/seata/seata.github.io',
        target: '_blank',
      },
    ],
  },
  resources: {
    title: translate({ id: 'homepage.footerResourcesTitle', message: '资源' }),
    list: [
      {
        text: translate({
          id: 'homepage.footerResourcesListText1',
          message: '博客',
        }),
        link: 'blog',
        target: '',
      },
      {
        text: translate({
          id: 'homepage.footerResourcesListText2',
          message: '社区',
        }),
        link: 'community',
        target: '',
      },
    ],
  },
  copyright: `Copyright © ${new Date().getFullYear()} Seata`,
};

type Props = {
  logo: string;
};

const Footer = (props: Props) => {
  const { logo } = props;

  return (
    <footer className='footer-container'>
      <div className='footer-body'>
        <img
          style={{ marginTop: '4px', maxWidth: '120px', height: 'auto' }}
          src={logo}
        />
        <br />
        <br />
        {/* <p className="docusaurus-power">website powered by docusaurus</p> */}
        <div className='cols-container'>
          <div className='col col-12'>
            <h3>{data.vision.title}</h3>
            <p>{data.vision.content}</p>
          </div>
          <div className='col col-6'>
            <dl>
              <dt>{data.documentation.title}</dt>
              {data.documentation.list.map((d, i) => (
                <dd key={i}>
                  {d.link?.substr(0, 4) === 'http' && (
                    <a href={d.link} target={d.target || '_self'}>
                      {d.text}
                    </a>
                  )}
                  {d.link?.substr(0, 4) !== 'http' && (
                    <a href={d.link} target={d.target || '_self'}>
                      {d.text}
                    </a>
                  )}
                </dd>
              ))}
            </dl>
          </div>
          <div className='col col-6'>
            <dl>
              <dt>{data.resources.title}</dt>
              {data.resources.list.map((d, i) => (
                <dd key={i}>
                  <a href={d.link} target={d.target || '_self'}>
                    {d.text}
                  </a>
                </dd>
              ))}
            </dl>
          </div>
        </div>
        <div className='copyright'>
          <span>{data.copyright}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
