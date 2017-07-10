const http = require('http');
const superagent = require('superagent');
const fs = require('fs');
const cheerio = require('cheerio');

// http.createServer((request, response) => {
//   response.writeHead(200, {
//     'Content-Type': 'text/plain'
//   });
//   response.write('what happened');
//   response.end();
// }).listen(8080, () => {
//   console.log('server is running on http://localhost:8080');
// });

// const req = http.request({
//   host: 'cnodejs.org',
//   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36'
// }, (response) => {
//   response.on('data', (chunk) => {
//     console.log(chunk.toString('utf8'));
//   });
// });
//
// req.on('error', (err) => {
//   console.log(err.message);
// });
// req.write('fff');
// req.end();
const getNode = (url) => {
  superagent
      .get(url)
      .set('Origin', 'http://www.runoob.com')
      .set('Referer', url)
      .set('User-Agent',
          'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36')
      .set('Cookie',
          'UM_distinctid=15ac5be8d990-09cd78761-3b664008-1fa400-15ac5be8d9a373; CNZZDATA5578006=cnzz_eid%3D1249371290-1481518241-https%253A%252F%252Fwww.baidu.com%252F%26ntime%3D1495438955; Hm_lvt_8e2a116daf0104a78d601f40a45c75b4=1498619058,1499061464; Hm_lpvt_8e2a116daf0104a78d601f40a45c75b4=1499649174; SERVERID=c43b07a1f37a8a7217ab8c689727ffd0|1499649180|1499649180')
      .end((request, response) => {
        const $ = cheerio.load(response.text);
        const nextLink = $('.next-design-link a').attr('href');
        const params = {title: $('#content h1').text(), nextLink};
        fs.appendFile('javascript.json', JSON.stringify(params) + ',');
        nextLink ? getNode(nextLink) : console.log('没有更多');
      });
};

getNode('http://www.runoob.com/nodejs/nodejs-stream.html');