/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-06 14:45:23
 * @version $Id$
 */

const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongodbStore = require('connect-mongo')(session)

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    name: 'user', // 设置 cookie 中保存 session id 的字段名称
    secret: 'user', // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    cookie: {
        maxAge: 60 * 1000 * 1000 // 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongodbStore({ // 将 session 存储到 mongodb
        url: 'mongodb://localhost:27017/login' // mongodb 地址
    }),
    resave: true,
    saveUninitialized: true
}));
app.use(require('./router/index.js'))

app.listen(8000)