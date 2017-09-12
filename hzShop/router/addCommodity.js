/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-12 10:38:08
 * @version $Id$
 */

const {
	Router
} = require('express');
const router = Router();
const {
	checkLogin
} = require('../middleware/checkAuth.js');

const config = require('../config/index.js');
const CommodityModel = require('../lib/commodity.js');

router.use(checkLogin);

router.get('/:id?', (req, res) => {
	const initialData = {
		name: '',
		desc: '',
		price: '',
		imgSrc: ''
	}
	CommodityModel.findById(req.params.id, (err, data) => {
		if (err) {
			req.flash('error', err.toString() || '商品信息查询失败')
		}
		if (data) {
			initialData.name = data.name;
			initialData.desc = data.des;
			initialData.price = data.price;
			initialData.imgSrc = data.imgSrc;
		}

		res.render('addCommodity', {
			title: '添加商品',
			initialData
		});
	})
});

module.exports = router;