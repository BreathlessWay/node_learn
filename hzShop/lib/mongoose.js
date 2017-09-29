/**
 *
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-07 16:39:48
 * @version $Id$
 */

const mongoose = require('mongoose');

const config = require('../config/index.js');

mongoose.Promise = require('q').Promise;

mongoose.connect(config.mongodb, {
    useMongoClient: true
});

const db = mongoose.connection;

db.once('connect', () => {
    console.log(`数据库 - ${config.mongodb} - 连接成功`);
});

db.on('error', (err) => {
    console.log(`数据库 - ${config.mongodb} - 连接失败 - err`);
});

db.on('disconnected', () => {
    console.log(`数据库 - ${config.mongodb} - 断开连接`);
});

module.exports = mongoose;