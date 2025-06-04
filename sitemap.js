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

const sitemap = require('algolia-sitemap');
const fs = require('fs');

if (!process.env.ALGOLIA_APIKEY) {
  throw new Error('no algolia apiKey configured');
}

// You need an API key with `browse` permission
const algoliaConfig = {
  appId: 'ICHFIJRDZF',
  apiKey: process.env.ALGOLIA_APIKEY,
  indexName: 'seata',
};

const lastmod = new Date().toISOString();
const changefreq = 'daily';
const homeUrls = [
  'https://seata.apache.org/',
  'https://seata.apache.org/zh-cn/',
];
const urls = new Set();

// Turn a record into a sitemap entry
function hitToParams({ url_without_anchor }) {
  if (urls.has(url_without_anchor)) {
    return;
  }
  urls.add(url_without_anchor);
  const priority = homeUrls.includes(url_without_anchor) ? 1 : 0.5;
  return {
    loc: url_without_anchor,
    lastmod,
    changefreq,
    priority,
  };
}

const call = () => {
  return new Promise(async (resolve) => {
    await sitemap({
      algoliaConfig,
      hitToParams,
      // The URL of the sitemaps directory
      sitemapLoc: 'https://seata.apache.org/sitemaps',
      // The directory with all sitemaps (default: `sitemaps`)
      outputFolder: 'sitemaps',
      // ...
    });
    resolve();
  });
};

call().then(() => {
  // generate site.txt
  urls.forEach((url) => {
    fs.appendFile('sitemaps/site.txt', url + '\n', (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
});
