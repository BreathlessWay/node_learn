/**
 * Created by Administrator on 2017/7/4.
 */
const http = require('http');
const querystring = require('querystring');

const postData = querystring.stringify({
  'name': 'BreathlessWay'
});

//请求的是已启动的服务器，模拟浏览器访问
const options = {
  host: 'localhost',
  port: 6586,
  path: '/upload',
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, response => {
  console.log({status: response.statusCode});
  console.log({headers: JSON.stringify(response.headers)});
  response.setEncoding('utf8');
  response.on('data', (chunk) => {
    console.log({chunk});
  });
  response.on('end', () => {
    console.log('响应结束');
  });
});

req.on('error', (error) => {
  console.log({error: error.message});
});

req.write(postData);
req.end();