import React from 'react';
import { translate } from '@docusaurus/Translate';
import { Button, ButtonType } from '../../../components';

import './index.scss';

const topData = {
  brandName: 'Apache Seata™',
  briefIntroduction: translate({
    id: 'homepage.briefIntroduction',
  }),
  buttons: [
    {
      text: translate({ id: 'homepage.quickstartButton', message: '快速入门' }),
      link: 'docs/user/quickstart',
      type: 'normal',
    },
    {
      text: 'GitHub',
      link: 'https://github.com/apache/incubator-seata',
      type: 'primary',
      target: '_blank',
    },
  ],
};

const Top = () => {
  const [repo, setRepo] = React.useState({
    starCount: '',
    forkCount: '',
  });
  const [releaseNote, setReleaseNote] = React.useState({
    version: 'v1.7.1',
    url: 'https://github.com/apache/incubator-seata/releases/tag/v1.7.1',
    date: '2023/9/5',
  });

  React.useEffect(() => {
    fetch('//api.github.com/repos/apache/incubator-seata')
      .then((res) => res.json())
      .then((data) => {
        setRepo({
          starCount: `${data.stargazers_count}`,
          forkCount: `${data.forks_count}`,
        });
      });
    fetch('https://api.github.com/repos/apache/incubator-seata/releases/latest')
      .then((res) => res.json())
      .then((data) => {
        setReleaseNote({
          version: data.name,
          url: data.html_url,
          date: new Date(data.published_at).toLocaleDateString(),
        });
      });
  }, []);

  return (
    <section className='top-section'>
      <div className='top-body'>
        <div className='vertical-middle'>
          <div className='product-name'>
            <h2>{topData.brandName}</h2>
          </div>
          <p className='product-desc'>{topData.briefIntroduction}</p>
          <div className='button-area'>
            {topData.buttons.map((b) => (
              <Button
                type={b.type as ButtonType}
                key={b.text}
                link={b.link}
                target={b.target}
              >
                {b.text}
              </Button>
            ))}
          </div>
          <div className='github-buttons'>
            <a
              href='https://github.com/apache/incubator-seata'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className='star'>
                <img src='https://img.alicdn.com/tfs/TB1FlB1JwHqK1RjSZFPXXcwapXa-32-32.png' />
                <span className='type'>Star</span>
                <span className='line' />
                <span className='count'>{repo.starCount}</span>
              </div>
            </a>
            <a
              href='https://github.com/apache/incubator-seata/fork'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className='fork'>
                <img src='https://img.alicdn.com/tfs/TB1zbxSJwDqK1RjSZSyXXaxEVXa-32-32.png' />
                <span className='type'>Fork</span>
                <span className='line' />
                <span className='count'>{repo.forkCount}</span>
              </div>
            </a>
          </div>
          <div className='version-note'>
            <a target='_blank' rel='noopener noreferrer' href={releaseNote.url}>
              Release Note of {releaseNote.version}
            </a>
          </div>
          <div className='release-date'>Released on {releaseNote.date}</div>
        </div>
        <div className='animation'>
          <img
            className='img1'
            src='//img.alicdn.com/tfs/TB1evnpJhnaK1RjSZFBXXcW7VXa-702-312.png'
          />
          <img
            className='img2'
            src='//img.alicdn.com/tfs/TB1iau9JcbpK1RjSZFyXXX_qFXa-914-1156.png'
          />
          <div className='outer-circle' />
          <div className='rotate-circle'>
            <svg viewBox='0 0 404 404' xmlns='http://www.w3.org/2000/svg'>
              <defs>
                <linearGradient id='linear' x1='0%' y1='0%' x2='100%' y2='0%'>
                  <stop offset='0%' stopColor='rgba(17, 186, 250, 1)' />
                  <stop offset='50%' stopColor='rgba(17, 186, 250, 0.1)' />
                  <stop offset='50%' stopColor='rgba(17, 186, 250, 1)' />
                  <stop offset='100%' stopColor='rgba(17, 186, 250, 0.1)' />
                </linearGradient>
              </defs>
              <circle
                cx='202'
                cy='202'
                r='200'
                fill='rgba(0, 0, 0, 0)'
                stroke='url(#linear)'
                strokeWidth='4'
              />
            </svg>
          </div>
          <img
            className='img3'
            src='//img.alicdn.com/tfs/TB1EBu.JgHqK1RjSZJnXXbNLpXa-914-1156.png'
          />
          <img
            className='img4'
            src='//img.alicdn.com/tfs/TB115i2JmzqK1RjSZPxXXc4tVXa-186-78.png'
          />
          <img
            className='img5'
            src='//img.alicdn.com/tfs/TB115i2JmzqK1RjSZPxXXc4tVXa-186-78.png'
          />
        </div>
      </div>
    </section>
  );
};

export default Top;
