const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true
  /* other options */
});
app.use(cookieParser('12345'));
app.use(session({
  secret: '12345',
  name: 'testapp',
  cookie: {maxAge: 80000},
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.get('/awesome', function(req, res) {

  if (req.session.lastPage) {
    console.log('Last page was: ' + req.session.lastPage + '.');
  }
  req.session.lastPage = '/awesome'; //每一次访问时，session对象的lastPage会自动的保存或更新内存中的session中去。
  res.send('You\'re Awesome. And the session expired time is: ' + req.session.cookie.maxAge);
});

app.get('/radical', function(req, res) {
  if (req.session.lastPage) {
    console.log('Last page was: ' + req.session.lastPage + '.');
  }
  req.session.lastPage = '/radical';
  res.send('What a radical visit! And the session expired time is: ' + req.session.cookie.maxAge);
});

app.get('/tubular', function(req, res) {
  if (req.session.lastPage) {
    console.log('Last page was: ' + req.session.lastPage + '.');
  }

  req.session.lastPage = '/tubular';
  res.send('Are you a suffer? And the session expired time is: ' + req.session.cookie.maxAge);
});

app.listen(5000);