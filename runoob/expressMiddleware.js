/**
 * Created by Admin on 2017/7/4.
 */
const express = require('express');
const app = express();
// app.use('/user/:uuid', (request, response, next) => {
//   console.log(request.method);
//   console.log(request.headers);
//   console.log(request.params);
//   console.log(response.body);
//   next();
// });

// app.get('/', (request, response, next) => {
//   next();
// }, (request, response) => {
//   response.status(200).end('fff');
// });

// app.get('/user/:uuid', (request, response) => {
//   console.log(request.params);
//   response.status(200).end('fff');
// });
//
// app.listen(3001, () => {
//   console.log('server is running on http://localhost:3001');
// });

// app.use(express.static('public'));
//
// app.get('/', function(req, res) {
//   res.send('Hello World');
// });
//
// const server = app.listen(8081, function() {
//
//   const host = server.address().address;
//   const port = server.address().port;
//
//   console.log('Example app listening at http://%s:%s', host, port);
//
// });
app.get('/user/:uuid', (request, response, next) => {
  +request.params.uuid === 0 ? next('route') : next();
}, (request, response) => {
  response.send('fuck');
});

app.get('/user/:uuid', (request, response) => {
  response.send('you');
});

app.listen(3001, () => {
  console.log('server is running on http://localhost:3001');
});