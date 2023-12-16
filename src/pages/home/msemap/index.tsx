import React, { useEffect } from 'react';
import { translate } from '@docusaurus/Translate';
import './index.scss';

const data = {
  title: translate({ id: 'homepage.msemapTitle', message: '微服务全景图' }),
};

const MseMap = () => {
  useEffect(() => {
    if (
      !document.querySelector(
        '#mse-arc-ui-css-ed9f813d-76a2-464b-acd6-8a5c3d2649e1'
      )
    ) {
      const mseCss = document.createElement('link');
      // make sure the id is unique
      mseCss.id = 'mse-arc-ui-css-ed9f813d-76a2-464b-acd6-8a5c3d2649e1';
      mseCss.rel = 'stylesheet';
      mseCss.href = '//g.alicdn.com/mamba/assets/0.0.19/mse-arc-ui.min.css';
      document.head.appendChild(mseCss);
    }
    if (
      !document.querySelector(
        '#mse-arc-ui-js-b6fe54d7-b7c4-45f8-82f8-252d03b5a981'
      )
    ) {
      const mseScript = document.createElement('script');
      // make sure the id is unique
      mseScript.id = 'mse-arc-ui-js-b6fe54d7-b7c4-45f8-82f8-252d03b5a981';
      mseScript.src = '//g.alicdn.com/mamba/assets/0.0.19/mse-arc-ui.min.js';
      document.head.appendChild(mseScript);
    }
  }, []);

  return (
    <section className='msemap-section'>
      <div className='msemap-container'>
        <h3>{data.title}</h3>
        <div id='mse-arc-container'></div>
      </div>
    </section>
  );
};

export default MseMap;
