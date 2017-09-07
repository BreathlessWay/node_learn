/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-07 16:56:47
 * @version $Id$
 */

const mongoose = require('./mongoose.js');

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true,
		max: 9999,
		min: 0
	},
	imgSrc: {
		type: String
	}
});

const CommodityModel = mongoose.model('commodity', schema);

module.exports = CommodityModel