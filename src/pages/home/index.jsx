import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch'; // fetch polyfill
import { getScrollTop, getLink } from '../../../utils';
import Header from '../../components/header';
import Button from '../../components/button';
import Footer from '../../components/footer';
import Language from '../../components/language';
import Item from './featureItem';
import homeConfig from '../../../site_config/home.jsx';
import './index.scss';

class Home extends Language {

  constructor(props) {
    super(props);
    this.state = {
      headerType: 'primary',
      starCount: 0,
      forkCount: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const scrollTop = getScrollTop();
      if (scrollTop > 66) {
        this.setState({
          headerType: 'normal',
        });
      } else {
        this.setState({
          headerType: 'primary',
        });
      }
    });
    fetch('//api.github.com/repos/seata/seata')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          starCount: data.stargazers_count,
          forkCount: data.forks_count,
        });
      });
  }

  render() {
    const { starCount, forkCount } = this.state;
    const language = this.getLanguage();
    const dataSource = homeConfig[language];
    const { headerType } = this.state;
    const headerLogo = headerType === 'primary' ? '//img.alicdn.com/tfs/TB1qTjWw.T1gK0jSZFhXXaAtVXa-4802-1285.png' : '//img.alicdn.com/tfs/TB1gqL1w4D1gK0jSZFyXXciOVXa-1497-401.png';
    return (
      <div className="home-page">
        <section className="top-section">
          <Header
            currentKey="home"
            type={headerType}
            logo={headerLogo}
            language={language}
            onLanguageChange={this.onLanguageChange}
          />
          <div className="top-body">
            <div className="vertical-middle">
              <div className="product-name">
                <h2>{dataSource.brand.brandName}</h2>
              </div>
              <p className="product-desc">{dataSource.brand.briefIntroduction}</p>
              <div className="button-area">
              {
                dataSource.brand.buttons.map(b => <Button type={b.type} key={b.text} link={b.link} target={b.target}>{b.text}</Button>)
              }
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
                <a target="_blank" rel="noopener noreferrer" href={getLink(dataSource.brand.versionNote.link)}>{dataSource.brand.versionNote.text}</a>
              </div>
              <div className="release-date">{dataSource.brand.releaseDate}</div>
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
        <section className="introduction-section">
          <div className="introduction-body">
            <div className="introduction">
              <h3>{dataSource.introduction.title}</h3>
              <p>{dataSource.introduction.desc}</p>
            </div>
            <img src={getLink(dataSource.introduction.img)} />
          </div>
        </section>
        <section className="feature-section">
          <div className="feature-container">
            <h3>{dataSource.features.title}</h3>
            <ul>
            {
              dataSource.features.list.map((feature, i) => (
                <Item feature={feature} key={i} />
              ))
            }
            </ul>
          </div>
        </section>
        <section className="users-section">
          <h3>{dataSource.users.title}</h3>
          <Bone type="dark" />
          <p>{dataSource.users.desc}</p>
          <div className="users">
            {
              dataSource.users.list.map((user, i) => (
                  <div className="user-item" key={i}>
                    <img src={user} />
                  </div>
              ))
            }
          </div>
        </section>
        <Footer logo="//img.alicdn.com/tfs/TB1dGrSwVT7gK0jSZFpXXaTkpXa-4802-1285.png" language={language} />
      </div>
    );
  }
}

document.getElementById('root') && ReactDOM.render(<Home />, document.getElementById('root'));

export default Home;
