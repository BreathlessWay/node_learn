/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-08 09:52:54
 * @version $Id$
 */

const {
	Router
} = require('express');
const router = Router();
const CommodityModel = require('../lib/commodity.js');

router.get('/', (req, res) => {
	CommodityModel.find({}, (err, data) => {
			if (err) {
				req.flash('error', err || '数据库查询失败')
				return res.render('main', {
					title: '主页',
					commodityList: []
				})
			}
			res.render('main', {
				title: '主页',
				commodityList: data
			})
		})
});


module.exports = router;