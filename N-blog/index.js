/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-04 15:14:19
 * @version $Id$
 */

const express = require('express');
const app = express();

app.use('/static', express.static('public'));

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    next();
})

app.use(require('./router/index.js'));


app.listen(8080, () => {
    console.log('server is running on 8080');
})