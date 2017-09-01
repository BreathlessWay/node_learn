/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-08-31 14:51:14
 * @version $Id$
 */

const EventEmitter = require('events');

let emitter = new EventEmitter();

emitter.on('myEvent', function sth () {
  emitter.on('myEvent', sth);
  console.log('hi');
});

emitter.emit('myEvent');