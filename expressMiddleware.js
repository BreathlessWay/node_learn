/**
 * Created by Admin on 2017/7/4.
 */
const app = require('express')();

app.use((request, response, next) => {
  console.log(1);
  next();
});

app.use((request, response) => {
  console.log(2);
  response.status(200).end();
});

app.listen(3000);