const path = require('path');
const express = require('express');
const app = express();
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(expressSession);
const config = require('./config/default');
const routes = require('./routes');
const pkg = require('../package.json');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(expressSession({
  name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  }),
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

console.log(app.get('env'));

//统一收集错误信息
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});

// 路由
routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    title: 'error',
    message: '404 not found'
  });
});

// 监听端口，启动程序
app.listen(config.port, function() {
  console.log(`${pkg.name} listening on port ${config.port}`);
});