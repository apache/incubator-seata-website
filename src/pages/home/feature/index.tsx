import React from 'react';
import { translate } from '@docusaurus/Translate';
import { Icon } from '../../../components';
import BrowserOnly from '@docusaurus/BrowserOnly';
import './index.scss';

const data = {
  list: [
    {
      icon: 'feature-1',
      title: translate({ id: 'homepage.featureListTitle1', message: '微服务框架支持' }),
      content: [
        translate({
          id: 'homepage.featureListContent1',
          message:
            '目前已支持Dubbo、Spring Cloud、Sofa-RPC、Motan 和 gRPC 等RPC框架，其他框架持续集成中',
        }),
      ],
    },
    {
      icon: 'feature-2',
      title: translate({ id: 'homepage.featureListTitle2', message: 'AT 模式' }),
      content: [
        translate({
          id: 'homepage.featureListContent2',
          message: '提供无侵入自动补偿的事务模式，目前已支持MySQL、Oracle、PostgreSQL、TiDB 和 MariaDB。H2、DB2、SQLServer、达梦开发中',
        }),
      ],
    },
    {
      icon: 'feature-3',
      title: translate({ id: 'homepage.featureListTitle3', message: 'TCC 模式' }),
      content: translate({
        id: 'homepage.featureListContent3',
        message:
          '支持 TCC 模式并可与 AT 混用，灵活度更高',
      }),
    },
    {
      icon: 'feature-4',
      title: translate({ id: 'homepage.featureListTitle4', message: 'SAGA 模式' }),
      content: translate({
        id: 'homepage.featureListContent4',
        message: '为长事务提供有效的解决方案,提供编排式与注解式(开发中)',
      }),
    },
    {
      icon: 'feature-5',
      title: translate({ id: 'homepage.featureListTitle5', message: 'XA 模式' }),
      content: translate({
        id: 'homepage.featureListContent5',
        message:
          '支持已实现 XA 接口的数据库的 XA 模式，目前已支持MySQL、Oracle、TiDB和MariaDB',
      }),
    },
    {
      icon: 'feature-6',
      title: translate({ id: 'homepage.featureListTitle6', message: '高可用' }),
      content: translate({
        id: 'homepage.featureListContent6',
        message: '支持计算分离集群模式，水平扩展能力强的数据库和 Redis 存储模式.Raft模式Preview阶段',
      }),
    },
  ],
  title: translate({ id: 'homepage.featureTitle', message: '特色功能' }),
};

const Feature = () => {
  return (
    <BrowserOnly>
      {() => (
        <section className="feature-section">
          <div className="feature-container">
            <h3>{data.title}</h3>
            <ul>
              {data.list.map((feature, i) => (
                <Item feature={feature} key={i} />
              ))}
            </ul>
          </div>
        </section>
      )}
    </BrowserOnly>
  );
};

const Item = (props) => {
  const { feature } = props;
  return (
    <BrowserOnly>
      {() => (
        <li>
          <Icon type={feature.icon} />
          <div>
            <h4>{feature.title}</h4>
            <p>{feature.content}</p>
          </div>
        </li>
      )}
    </BrowserOnly>
  );
};

export default Feature;