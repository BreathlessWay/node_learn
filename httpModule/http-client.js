/**
 * Created by Admin on 2017/7/14.
 */
const http = require('http');

const httpClient = http.request({
  host: 'localhost',
  port: 3000,
  path: '/index.html'
}, response => {
  console.log(response);
  let res = '';
  // response.setEncoding('utf8');
  response.on('data', chunk => {
    res += chunk;
  });
  response.on('end', () => {
    console.log(res);
    console.log('stop link to server');
  });
});

httpClient.end();