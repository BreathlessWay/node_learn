/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-08 09:52:24
 * @version $Id$
 */

const {
	Router
} = require('express');
const router = new Router();

module.exports = [
	require('./main.js'),
	require('./register.js')
]