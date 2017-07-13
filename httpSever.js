const http = require('http');
const superagent = require('superagent');
const fs = require('fs');
const cheerio = require('cheerio');
const mkdirp = require('mkdirp');

// http.createServer((request, response) => {
//   response.writeHead(200, {
//     'Content-Type': 'text/plain'
//   });
//   console.log(new Date());
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
      .set('Referer', url)
      .set('User-Agent',
          'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36 QIHU 360SE')
      .set('Cookie',
          'CNZZDATAWAP=652679704-1498989199-http%3A%2F%2Fm.91danji.com; cna=3UQjEB5ijhkCAWVWDANKkmlz')
      .end((request, response) => {
        const $ = cheerio.load(response.text);
        // const nextLink = $('.next-design-link a').attr('href');
        // const params = {title: $('#content h1').text(), nextLink};
        // fs.appendFile('javascript.json', JSON.stringify(params) + ',');
        const img = $('.tpc_content.do_not_catch img');
        img.each((index, ele) => {
          const imgSrc = $(ele).attr('src');
          const imgN = imgSrc.split('/');
          const imgName = imgN[imgN.length - 1];
          superagent
              .get(imgSrc)
              .end((req, res) => {
                if (res) {
                  fs.writeFile(`./img/${imgName}`, res.body);
                }
              });
        });
        // nextLink ? getNode(nextLink) : console.log('没有更多');
      });
};
mkdirp('./img', err => {
  console.log(err);
});
setInterval(() => {
  getNode('http://cl.ps7.win/htm_data/7/1707/2511777.html');
}, 1000);

// const getImg = (url) => {
//   superagent
//       .get(url)
//       .end((request, response) => {
//         fs.createWriteStream('1.jpg').write(response.body);
//       });
// };
//
// getImg('http://www.runoob.com/wp-content/uploads/2014/03/nodejs-require.jpg');

// function saveImg(url) {
//   http.get(url, function(res) {
//     res.setEncoding('binary');
//     var data = '';
//     res.on('data', function(chunk) {
//       data += chunk;
//     });
//     res.on('end', function() {
//       fs.writeFile('1.jpg', data, 'binary', function(err) {
//         if (err) throw err;
//       });
//     });
//   }).on('error', function(e) {
//     console.log('error' + e);
//   });
// }
//
// saveImg('http://www.runoob.com/wp-content/uploads/2014/03/nodejs-require.jpg');
