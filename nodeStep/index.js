/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-08-25 10:17:41
 * @version $Id$
 */
const EventEmitter = require('events').EventEmitter;
const event = new EventEmitter();
const fs = require('fs');
const crypto = require('crypto');
const schedule = require('node-schedule');

event.on('nopa', (...arg) => {
    console.log(...arg)
})

const pwd = '1234567'
const md5 = crypto.createHash('md5')
const _pwd = en_upwd = md5.update(pwd).digest('hex');

console.log(_pwd)

event.emit('nopa')

console.log(event.listeners('nopa').toString())

schedule.scheduleJob('30 * * * * *', function() {
    console.log('schedule' + new Date())
})

fs.readFile('./mongodb.js', 'utf8', (err, res) => {
    console.log(res)
});