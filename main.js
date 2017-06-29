/**
 * Created by Admin on 2017/6/28.
 */
const http = require('http');
const url = require('url');

const start = (handlePost, router) => {
  http.createServer((request, response) => {
    const pathname = url.parse(request.url).pathname;
    console.log(`request for '${pathname}'`);
    if (pathname === '/favicon.ico') {

    } else if (pathname === '/uploadFile') {
      router(handlePost, pathname, response, request);
    } else if (pathname === '/upload') {
      let postData = '';
      request.addListener('data', (chunk) => {
        postData += chunk;
      });
      request.addListener('end', () => {
        router(handlePost, pathname, response, postData);
      });
    } else {
      router(handlePost, pathname, response, '');
    }
  }).listen(8080, () => {
    console.log('server is running on http://localhost:8080');
  });
};

exports.start = start;