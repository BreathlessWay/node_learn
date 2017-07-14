/**
 * Created by Admin on 2017/7/14.
 */
const http = require('http');
const url = require('url');
const fs = require('fs');
const util = require('util');

const httpServer = http.createServer((request, response) => {
  const params = url.parse(request.url);
  console.log(util.inspect(params));
  console.log(`Request for ${params.pathname}`);
  fs.readFile(params.pathname.substr(1), (err, res) => {
    if (err) {
      response.writeHead(404, {
        'Content-Type': 'text/html'
      });
      response.write('404 not found');
    } else {
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      response.write(res.toString());
    }
    response.end();
  });
}).listen(3000, () => {
  console.log('server is running');
});

httpServer.on('error', err => {
  console.log(err);
});