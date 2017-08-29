/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-08-29 09:18:33
 * @version $Id$
 */

const mongoose = require('mongoose');

mongoose.Promise = require('q').Promise;

const BASE_URI = 'mongodb://localhost:27017/mongooseTest'

mongoose.connect(BASE_URI, {
    useMongoClient: true
});

const db = mongoose.connection;

db.once('connected', () => {
    console.log('connect to ' + BASE_URI)
})

db.on('error', () => {
    console.log('connect to ' + BASE_URI + 'error')
})

db.on('disconnected', () => {
    console.log('disconnect to ' + BASE_URI)
})

const userSchema = mongoose.Schema({
    name: {
        type: String,
        default: '张三'
    },
    age: {
        type: Number,
        default: 55
    },
    sex: {
        type: String,
        default: '男'
    }
})

const UserModel = mongoose.model('mongoose', userSchema);

const data = new UserModel({
    name: '李四',
    age: 66,
    sex: '女'
})

data.save()
    .then(() => {
        console.log('save success')
        setTimeout(() => {
            mongoose.disconnect()
        }, 3000)
    })
    .catch(err => {
        console.log(err)
    })
    .finally(() => {
        console.log('mongoose test')
        const pageIndex = 2
        pageSize = 2;
        UserModel.find({}).skip((pageIndex - 1) * pageSize).limit(pageSize).exec((err, res) => {
            console.log(err || res)
        })
    })

console.log(Math.random())