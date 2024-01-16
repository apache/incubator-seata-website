import React, { useEffect } from 'react';
import { translate } from '@docusaurus/Translate';
import './index.scss';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';

const data = {
  title: translate({ id: 'homepage.solutionTitle'}),
};

const Solution = () => {
  return (
    <Layout title={data.title} description={data.title}>
      <Head>
        <script src={useBaseUrl('/js/mse-arc-ui.min.js')} />
        <link rel='stylesheet' href={useBaseUrl('/css/mse-arc-ui.min.css')} />
      </Head>
      <section className='solution-section'>
        <div className='solution-container'>
          <h3>{data.title}</h3>
          <div id='mse-arc-container'></div>
        </div>
      </section>
    </Layout>
  );
};

export default Solution;
