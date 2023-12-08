const http = require('http');
const fs = require('fs')
const readline = require('readline')

async function processLineByLine() {
  const postData = [];
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('sitemaps/site.txt'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      if(postData.length < 2000){
        postData.push(line)
      }else{
        submit(postData);
        postData.splice(0,postData.length);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

processLineByLine();
  
  
  
  // 发送 POST 请求并处理响应
  
  const submit = (postData) => {

    // 配置 POST 请求的选项

    var options = {
      host: 'http://data.zz.baidu.com',
      // port: 80,
      path: '/urls?site=https://seata.io&token=xxx',
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
        }
  };
  
  var req = http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
      });
  });
  
  req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
  });
  
  // write data to request body
  postData.array.forEach(item => {
    req.write(item);
  });
  req.end();
  }