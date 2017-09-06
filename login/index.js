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

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'sessiontest', //与cookieParser中的一致
    resave: true,
    saveUninitialized: true
}));
app.use(require('./router/index.js'))

app.listen(8000)