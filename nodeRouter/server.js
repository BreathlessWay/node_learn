const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    console.log(url.parse(req.url));
    res.end('end');
}).listen(8000, () => {
    console.log('server is running on 8000');
});