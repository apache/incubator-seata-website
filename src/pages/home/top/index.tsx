import React from 'react';
import { translate } from '@docusaurus/Translate';
import { Button, ButtonType } from '../../../components';
import { getLink } from '../../../utils';

import BrowserOnly from '@docusaurus/BrowserOnly';

import './index.scss';

const topData = {
  brandName: 'Seata',
  briefIntroduction: translate({
    id: 'homepage.briefIntroduction',
    message:
      'Seata 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。',
  }),
  buttons: [
    {
      text: translate({ id: 'homepage.quickstartButton', message: '快速入门' }),
      link: '/docs/user/quickstart',
      type: 'normal',
    },
    {
      text: translate({ id: 'homepage.userregistrationButton', message: '用户登记' }),
      link: 'https://github.com/seata/seata/issues/1246',
      type: 'normal',
      target: '_blank',
    },
    {
      text: 'GitHub-Java',
      link: 'https://github.com/seata/seata',
      type: 'normal',
      target: '_blank',
    },
    {
      text: 'GitHub-Golang',
      link: 'https://github.com/seata/seata-go',
      type: 'normal',
      target: '_blank',
    },
    {
      text: 'Docker Image',
      link: 'https://hub.docker.com/repository/docker/seataio/seata-server/tags?page=1&ordering=last_updated',
      type: 'normal',
      target: '_blank',
    },
  ],
  versionNote: {
    text: 'Release Note of 1.7.0',
    link: 'https://github.com/seata/seata/releases/tag/v1.7.0',
  },
  releaseDate: {
    text: 'Released on Jul 11, 2023',
  },
};

const Top = ({ language }: { language?: string }) => {
  const [state, setState] = React.useState({
    starCount: '',
    forkCount: '',
  });

  const { starCount, forkCount } = state;

  React.useEffect(() => {
    fetch('//api.github.com/repos/seata/seata')
      .then((res) => res.json())
      .then((data) => {
        setState({
          starCount: `${data.stargazers_count}`,
          forkCount: `${data.forks_count}`,
        });
      });
  }, []);

  return (
    <BrowserOnly>
      {() => (
        <section className="top-section">
          <div className="top-body">
            <div className="vertical-middle">
              <div className="product-name">
                <h2>{topData.brandName}</h2>
              </div>
              <p className="product-desc">{topData.briefIntroduction}</p>
              <div className="button-area">
                {topData.buttons.map((b) => (
                  <Button type={b.type as ButtonType} key={b.text} link={b.link} target={b.target} language={language}>
                    {b.text}
                  </Button>
                ))}
              </div>
              <div className="github-buttons">
                <a href="https://github.com/seata/seata" target="_blank" rel="noopener noreferrer">
                  <div className="star">
                    <img src="https://img.alicdn.com/tfs/TB1FlB1JwHqK1RjSZFPXXcwapXa-32-32.png" />
                    <span className="type">Star</span>
                    <span className="line" />
                    <span className="count">{starCount}</span>
                  </div>
                </a>
                <a href="https://github.com/seata/seata/fork" target="_blank" rel="noopener noreferrer">
                  <div className="fork">
                    <img src="https://img.alicdn.com/tfs/TB1zbxSJwDqK1RjSZSyXXaxEVXa-32-32.png" />
                    <span className="type">Fork</span>
                    <span className="line" />
                    <span className="count">{forkCount}</span>
                  </div>
                </a>
              </div>
              <div className="version-note">
                <a target="_blank" rel="noopener noreferrer" href={getLink(topData.versionNote.link)}>
                  {topData.versionNote.text}
                </a>
              </div>
              <div className="release-date">{topData.releaseDate.text}</div>
            </div>
            <div className="animation">
              <img className="img1" src="//img.alicdn.com/tfs/TB1evnpJhnaK1RjSZFBXXcW7VXa-702-312.png" />
              <img className="img2" src="//img.alicdn.com/tfs/TB1iau9JcbpK1RjSZFyXXX_qFXa-914-1156.png" />
              <div className="outer-circle" />
              <div className="rotate-circle">
                <svg viewBox="0 0 404 404" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient
                      id="linear"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="rgba(17, 186, 250, 1)" />
                      <stop offset="50%" stopColor="rgba(17, 186, 250, 0.1)" />
                      <stop offset="50%" stopColor="rgba(17, 186, 250, 1)" />
                      <stop offset="100%" stopColor="rgba(17, 186, 250, 0.1)" />
                    </linearGradient>
                  </defs>
                  <circle cx="202" cy="202" r="200" fill="rgba(0, 0, 0, 0)" stroke="url(#linear)" strokeWidth="4" />
                </svg>
              </div>
              <img className="img3" src="//img.alicdn.com/tfs/TB1EBu.JgHqK1RjSZJnXXbNLpXa-914-1156.png" />
              <img className="img4" src="//img.alicdn.com/tfs/TB115i2JmzqK1RjSZPxXXc4tVXa-186-78.png" />
              <img className="img5" src="//img.alicdn.com/tfs/TB115i2JmzqK1RjSZPxXXc4tVXa-186-78.png" />
            </div>
          </div>
        </section>
      )}
    </BrowserOnly>
  );
};

export default Top;