/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-06 14:13:16
 * @version $Id$
 */

const app = require('express')();
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(cookieParser());
app.use(session({
    secret: 'sessiontest', //与cookieParser中的一致
    resave: true,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    console.log(req.session.isVisit)
    if (req.cookies.isVisit) {
        req.session.isVisit = req.cookies.isVisit
        res.send('欢迎回来')
    } else {
        req.session.isVisit = null
        res.cookie('isVisit', 1, { maxAge: 60 * 1000 })
        res.send('你好')
    }
}).listen(8000)