import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Top from './home/top';
import Introduction from './home/introduction';
import MseMap from './home/msemap';
import Feature from './home/feature';
// import Community from './home/community';
import { Footer } from '../components';
import './index.scss';
import { translate } from '@docusaurus/Translate';

export default function Home(): React.Element {
  const el = React.useRef<HTMLDivElement>(null);

  //   const setEleBg = (ele: HTMLDivElement, isTransparent: boolean) => {
  //     if (isTransparent) {
  //       ele.style.backgroundColor = 'transparent';
  //       ele.style.boxShadow = 'unset';
  //     } else {
  //       ele.style.backgroundColor = '#fff';
  //       ele.style.boxShadow = 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px';
  //     }
  //   };

  //   React.useEffect(() => {
  //     el.current = document.getElementsByClassName('navbar')[0] as HTMLDivElement;
  //     el.current.style.position = 'fixed';
  //     el.current.style.width = '100%';

  //     setEleBg(el.current, true);
  //     const onScroll = () => {
  //       const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  //       setEleBg(el.current, scrollTop < 60);
  //     };
  //     window.addEventListener('scroll', onScroll);
  //   }, []);

  return (
    <Layout
      description={translate({
        id: 'homepage.briefIntroduction',
      })}
    >
      <div ref={el} className='home-page'>
        <Top />
        <Introduction />
        <MseMap />
        <Feature />
        {/* <Community /> */}
        {/* <Footer/> */}
      </div>
    </Layout>
  );
}
