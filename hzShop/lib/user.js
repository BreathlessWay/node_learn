/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-07 16:50:57
 * @version $Id$
 */

const mongoose = require('./mongoose.js');

const schema = new mongoose.Schema({
	name: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	}
});

const UserModel = mongoose.model('user', schema);

module.exports = UserModel;