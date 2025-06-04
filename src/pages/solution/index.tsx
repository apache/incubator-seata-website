/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect } from 'react';
import { translate } from '@docusaurus/Translate';
import './index.scss';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';

const data = {
  title: translate({ id: 'homepage.solutionTitle' }),
};

const Solution = () => {
  return (
    <Layout title={data.title} description={data.title}>
      <Head>
        <script src={useBaseUrl('/js/solution-ui.min.js')} />
        <link rel='stylesheet' href={useBaseUrl('/css/solution-ui.min.css')} />
      </Head>
      <section className='solution-section'>
        <div className='solution-container'>
          <h3>{data.title}</h3>
          <div id='solution-container'></div>
        </div>
      </section>
    </Layout>
  );
};

export default Solution;
