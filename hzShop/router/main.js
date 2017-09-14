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
const CartsModel = require('../lib/carts.js');
const UserModel = require('../lib/user.js');

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

router.post('/', (req, res) => {
	UserModel.findOne({
		name: req.session.user
	}, (err, userData) => {
		if (err) {
			res.status(400).send('数据库查询失败！')
		}
		CartsModel.find({
			uId: userData._id,
			cId: req.body.id
		}, (err, cartData) => {
			if (err) {
				return res.status(400).send('数据库查询失败！')
			}
			const notAccount = cartData.filter(list => !list.cStatus);
			if (notAccount.length > 0) {
				const needAccount = notAccount[0];
				const num = +needAccount.cQuantity + 1;
				CartsModel.updateOne({
					uId: userData._id,
					cId: req.body.id,
					cStatus: false
				}, {
					$set: {
						cQuantity: num
					}
				}, err => {
					if (err) {
						return res.status(400).send(err || '添加失败！')
					}
					return res.status(200).send('添加成功！')
				})
			} else {
				CommodityModel.findById(req.body.id, (err, commodityData) => {
					if (err) {
						return res.status(400).send('数据库查询失败！')
					}
					const carts = new CartsModel({
						uId: userData._id,
						cId: req.body.id,
						cName: commodityData.name,
						cDesc: commodityData.desc,
						cPrice: commodityData.price,
						cImgSrc: commodityData.imgSrc,
						cQuantity: 1,
						cStatus: false
					});
					carts.save()
						.then(() => {
							res.status(200).send('添加成功！')
						})
						.catch(err => {
							return res.status(400).send(err || '添加失败！')
						})
				})
			}
		})
	})

})

module.exports = router;