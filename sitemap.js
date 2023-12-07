const sitemap = require('algolia-sitemap');

if(!process.env.ALGOLIA_APIKEY){
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
const homeUrls = ['https://seata.io/','https://seata.io/en/','https://seata.io/zh-cn/'];

// Turn a record into a sitemap entry
function hitToParams({ url }) {
  const priority = homeUrls.includes(url) ? 1 : 0.5;
  return { 
    loc: url,
    lastmod,
    changefreq,
    priority
   };
}

sitemap({
  algoliaConfig,
  hitToParams,
  // The URL of the sitemaps directory
  sitemapLoc: 'https://seata.io/sitemaps',
  // The directory with all sitemaps (default: `sitemaps`)
  outputFolder: 'sitemaps',
  // ... 
});