const mongoose = require('mongoose');
const config = require('../config/default');

mongoose.Promise = require('q').Promise;

mongoose.connect(config.mongodb, {
    useMongoClient: true
});

const db = mongoose.connection;

db.once('connect', () => {
    console.log('数据库连接成功');
});

db.on('error', (err) => {
    console.log('数据库连接失败：' + err);
});

db.on('disconnected', () => {
    console.log('数据库断开连接');
});

module.exports = mongoose;