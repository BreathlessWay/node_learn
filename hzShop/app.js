/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-07 16:35:03
 * @version $Id$
 */

const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const config = require('./config/index.js');
const flash = require('connect-flash');
const router = require('./router/index.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(cookieParser(config.session.secret));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(session({
	name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
	secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
	cookie: {
		maxAge: config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
	},
	store: new MongoStore({ // 将 session 存储到 mongodb
		url: config.mongodb // mongodb 地址
	}),
	resave: true,
	saveUninitialized: true
}));

app.use(flash());

app.use((req, res, next) => {
	res.locals.user = req.session.user;
	res.locals.success = req.flash('success').toString();
	res.locals.error = req.flash('error').toString();
	next()
});

app.use(router);

app.use((req, res, next) => {
	const error = new Error('404 NOT FOUND');
	error.status = 404;
	next(error)
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.render('error', {
		title: 'error',
		message: err
	});
});

app.listen(config.port, () => {
	console.log(`server is running on ${config.port}`);
});