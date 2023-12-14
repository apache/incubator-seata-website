const http = require('http');
const fs = require('fs');
const readline = require('readline');
const https = require('https');

if (!process.env.BAIDU_LINK_SUBMIT_TOKEN) {
  throw new Error('no baidu link submit token configured');
}

/**
 * get old site.txt from official site
 */
const getOldSiteData = () => {
  return new Promise((resolve, reject) => {
    https
      .get('https://seata.io/site.txt', (res) => {
        res.setEncoding('utf-8');
        if (res.statusCode === 200) {
          res.on('data', (data) => {
            resolve(data.split('\n'));
          });
        } else {
          res.on('data', function (chunk) {
            reject(
              `get old site.txt from official site error,statusCode: ${res.statusCode},body:${chunk}`
            );
          });
        }
      })
      .on('error', (e) => {
        reject(e);
      });
  });
};

/**
 * get the new generated local site.txt
 */
const getNewData = () => {
  return new Promise((resolve, reject) => {
    const data = [];
    try {
      const rl = readline.createInterface({
        input: fs.createReadStream('sitemaps/site.txt'),
        crlfDelay: Infinity,
      });
      rl.on('line', (line) => {
        data.push(line);
      }).on('close', () => {
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * compute added data
 */
const computeAddedData = (oldData, newData) => {
  const addedData = [];
  newData.forEach((element) => {
    if (!oldData.includes(element)) {
      addedData.push(element);
    }
  });
  return addedData;
};

const submit = (data) => {
  return new Promise((resolve, reject) => {
    var options = {
      host: 'data.zz.baidu.com',
      port: 80,
      path:
        '/urls?site=https://seata.io&token=' +
        process.env.BAIDU_LINK_SUBMIT_TOKEN,
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
    };

    var req = http.request(options, function (res) {
      if (res.statusCode == 200) {
        res.on('data', function (chunk) {
          resolve(chunk);
        });
      } else {
        res.on('data', function (chunk) {
          reject(
            `baidu link submit error,statusCode: ${res.statusCode},body:${chunk}`
          );
        });
      }
    });

    req.on('error', function (e) {
      reject('baidu link submit request error: ' + e.message);
    });

    // write data to request body
    data.forEach((item) => {
      req.write(item + '\n');
    });
    req.end();
  });
};

getOldSiteData()
  .then((oldData) => {
    getNewData()
      .then(async (newData) => {
        try {
          const addedData = computeAddedData(oldData, newData);
          // baidu limits up to 2,000 entries at a time
          while (addedData.length > 2000) {
            // delete and intercept
            const data = addedData.splice(0, 2000);
            const result = await submit(data);
            console.log(result);
            if (result.remain < addedData.length) {
              throw new Error('baidu link submit over quota');
            }
          }
          // submission of the remaining data of less than 2,000 entries
          if (addedData.length > 0) {
            const result = await submit(addedData);
            console.log(result);
          }
        } catch (err) {
          console.error(err);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .catch((err) => {
    console.error(err);
  });
