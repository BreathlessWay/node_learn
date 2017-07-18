const express = require('express');
const app = express();
const router = express.Router();

router.use((request, response, next) => {
  console.log('all middleware');
  next();
});

router.use('/user/:uuid', (request, response, next) => {
  console.log('user middleware one');
  next();
}, (request, response, next) => {
  console.log('user middleware two');
  next();
});

router.get('/user/:uuid', (request, response, next) => {
  request.params.uuid === '0' ? next('route') : next();
}, (request, response) => {
  response.send('fuck router middleware');
});

router.get('/user/:uuid', (request, response) => {
  response.send('stupid router middleware');
});

app.use('/', router);

app.listen(3002, () => {
  console.log('server is running on http://localhost:3002');
});