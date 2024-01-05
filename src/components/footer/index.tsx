import React from 'react';
import { translate } from '@docusaurus/Translate';

import './index.scss';

const ApacheSvg = require('@site/static/img/apache/incubator.svg').default;

const data = {
  vision: {
    title: translate({ id: 'homepage.footerVersionTitle', message: '愿景' }),
    content: translate({
      id: 'homepage.footerVersionContent',
      message:
        'Apache Seata (incubating) 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。',
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

const Footer = () => {

  return (
    <footer className='footer-container'>
      <div className='footer-body '>
        <div>
          <div className="center-div">
            <a href="https://incubator.apache.org/" target="_blank">
              <ApacheSvg role="img" />
            </a>
          </div>
          <br/>
          <div className="fs-12">
            <div className="center-div">
              <span>Apache Seata is an effort undergoing incubation at The Apache Software Foundation (ASF), sponsored by the Apache Incubator. Incubation is required of all newly accepted projects until a further review indicates that the infrastructure, communications, and decision making process have stabilized in a manner consistent with other successful ASF projects. While incubation status is not necessarily a reflection of the completeness or stability of the code, it does indicate that the project has yet to be fully endorsed by the ASF.</span>
            </div>
            <br/>
            <div className="center-div">
              <span>Copyright © 2024, The Apache Software Foundation Apache Seata, Seata, Apache, Apache Incubator, the Apache feather, the Apache Incubator logo and the Apache Seata project logo are either registered trademarks or trademarks of the Apache Software Foundation.</span>
              <br />
            </div>
            <br/>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
