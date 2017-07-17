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

app.get('/', function(req, res) {
  res.send('Hello World');
});

const server = app.listen(8081, function() {

  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
