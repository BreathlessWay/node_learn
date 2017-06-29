/**
 * Created by Admin on 2017/6/29.
 */
const app = require('express')();
const utility = require('utility');
app.get('/', (request, response) => {
  console.log(request.headers);
  const q = request.query.q;
  const qMd5 = utility.md5(q);
  response.send(qMd5);
});
app.listen(8080, () => {
  console.log('server is running on http://localhost:8080');
});