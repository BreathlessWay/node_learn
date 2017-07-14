/**
 * Created by Admin on 2017/7/4.
 */
const express = require('express');
const app = express();
// app.use((request, response, next) => {
//   console.log(1);
//   next();
// });
//
// app.use((request, response) => {
//   console.log(2);
//   response.status(200).end();
// });
//
// app.listen(3000);

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.send('hello world');
}).listen(3000, err => {
  console.log(err);
  console.log('server is running');
});
