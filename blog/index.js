const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const config = require('./config/default');
const routes = require('./routes/index');
const pkg = require('../package.json');

const app = express();

//设置模板
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//设置静态资源目录，可以通过 /xxx.xx  访问
// 如果你希望所有通过 express.static 访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录
// app.use('/static', express.static('public'));
// 可以通过 /static/xxx.xx  访问
app.use(express.static(path.join(__dirname, 'public')));
//设置ico
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// 表单数据格式化
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//session 中间件会在 req 上添加 session 对象，即 req.session 初始值为 {}，当我们登录后设置 req.session.user = 用户信息，返回浏览器的头信息中会带上 set-cookie 将 session id 写到浏览器 cookie 中，那么该用户下次请求时，通过带上来的 cookie 中的 session id 我们就可以查找到该用户，并将用户信息保存到 req.session.user。
app.use(session({
    name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({// 将 session 存储到 mongodb
        url: config.mongodb// mongodb 地址
    }),
    resave: true,  //need
    saveUninitialized: true  //need
}));

//添加flash中间件
app.use(flash());

//app.locals 上通常挂载常量信息（如博客名、描述、作者信息），res.locals 上通常挂载变量信息，即每次请求可能的值都不一样（如请求者信息，res.locals.user = req.session.user）。
app.locals.blog = {
    title: pkg.name,
    description: pkg.description
};

//接受 错误/成功 信息
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});

//设置路由
routes(app);

//处理404错误
app.use((req, res, next) => {
    const error = new Error('404 NOT FOUND');
    error.status = 404;
    next(error);
});

//路由错误收集处理
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        title: 'error',
        message: err,
        nav: [
            {
                title: '主页',
                link: '/'
            },
            {
                title: '注册',
                link: '/signup'
            }, {
                title: '登陆',
                link: '/signin'
            }
        ]
    });
});

//启动服务
app.listen(config.port, () => {
    console.log(`${pkg.name} listening on port ${config.port}`);
});