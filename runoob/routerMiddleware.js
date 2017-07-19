const express = require('express');
const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

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

app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).send({error: err});
});

app.get('/', (request, response) => {
  response.send('all get');
});

app.listen(3002, () => {
  console.log('server is running on http://localhost:3002');
});