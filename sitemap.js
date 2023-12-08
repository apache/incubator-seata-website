const sitemap = require('algolia-sitemap');
const fs = require('fs');
const os = require('os');

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
const homeUrls = ['https://seata.io/','https://seata.io/zh-cn/'];
const urls = new Set();

// Turn a record into a sitemap entry
function hitToParams({ url_without_anchor }) {
  if(urls.has(url_without_anchor)){
    return;
  }
  urls.add(url_without_anchor);
  const priority = homeUrls.includes(url_without_anchor) ? 1 : 0.5;
  return {
    loc: url_without_anchor,
    lastmod,
    changefreq,
    priority
   };
}

const call = new Promise(async resolve => {
  await sitemap({
    algoliaConfig,
    hitToParams,
    // The URL of the sitemaps directory
    sitemapLoc: 'https://seata.io/sitemaps',
    // The directory with all sitemaps (default: `sitemaps`)
    outputFolder: 'sitemaps',
    // ... 
  });
  resolve()
});

call.then( () => {
  // generate site.txt
  urls.forEach((url) => {
    fs.appendFile(
      'sitemaps/site.txt', 
      url + os.EOL, 
      err => {
        if(err){
          console.log(err)
        }
      })
    }
  );
})


