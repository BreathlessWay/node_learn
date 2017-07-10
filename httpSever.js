const http = require('http');

// http.createServer((request, response) => {
//   response.writeHead(200, {
//     'Content-Type': 'text/plain'
//   });
//   response.write('what happened');
//   response.end();
// }).listen(8080, () => {
//   console.log('server is running on http://localhost:8080');
// });

const req = http.request({
  port: 8088
}, (response) => {
  response.on('data', (chunk) => {
    console.log({chunk});
  });
});

req.on('error', (err) => {
  console.log(err.message);
});
req.write('fff');
req.end();