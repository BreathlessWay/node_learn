const http = require('http');

http.createServer((req, res) => {
  console.log(req.method);
  res.end('ff')
}).listen(7000);

