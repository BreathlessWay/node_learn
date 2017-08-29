/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-08-25 10:17:41
 * @version $Id$
 */
const EventEmitter = require('events').EventEmitter;
const event = new EventEmitter();

event.on('nopa', (...arg) => {
	console.log(...arg)
})

event.emit('nopa')

console.log(event.listeners('nopa').toString())