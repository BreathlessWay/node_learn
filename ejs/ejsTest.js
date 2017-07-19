const path = require('path');
const express = require('express');
const useRouter = require('./routes/users');
const favicon = require('serve-favicon');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: './upload/'});
const errorHandler = require('errorhandler');
const app = express();

app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'uwotm8'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', (req, res, next) => {
  console.log('all');
  console.log(req.app.get('port'));
  next();
});

app.use('/user', useRouter);

app.post('/upload', upload.array('file', 50), (request, response) => {
  console.log(response);
});

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  // next(err);
  res.render('404', {
    err
  });
});

// 错误处理中间件应当在路由加载之后才能加载
if ('development' === app.get('env')) {
  app.use(errorHandler());
}

app.listen(app.get('port'), () => {
  console.log(`server is running on http://localhost:${app.get('port')}`);
});