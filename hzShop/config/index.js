/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-07 16:40:48
 * @version $Id$
 */

module.exports = {
	port: 3000,
	session: {
		secret: 'user',
		key: 'user',
		maxAge: 60 * 1000 * 60
	},
	mongodb: 'mongodb://localhost:27017/hzShop'
}