/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-13 13:35:36
 * @version $Id$
 */

const {
	Router
} = require('express');
const router = Router();

const {
	checkLogin
} = require('../middleware/checkAuth.js');
const CartsModel = require('../lib/carts.js');
const UserModel = require('../lib/user.js');

router.use(checkLogin);

router.get('/', (req, res) => {
	UserModel.findOne({
		name: req.session.user
	}, (err, userData) => {
		if (err) {
			req.flash('error', '数据库查询失败');
			return res.render('cartsList', {
				title: '购物车',
				cartList: [],
				priceCouont: 0
			});
		}
		CartsModel.find({
			uId: userData._id,
			cStatus: false
		}, (err, cartData) => {
			if (err) {
				req.flash('error', '数据库查询失败');
				return res.render('cartsList', {
					title: '购物车',
					cartList: [],
					priceCouont: 0
				});
			}
			let priceCouont = 0;
			cartData.forEach((list, index) => {
				priceCouont = priceCouont + list.cQuantity * list.cPrice
			})
			return res.render('cartsList', {
				title: '购物车',
				cartList: cartData,
				priceCouont
			});
		})
	})
});

router.delete('/:id', (req, res) => {
	CartsModel.deleteOne({
		_id: req.params.id
	}, (err) => {
		if (err) {
			return res.send('删除失败！')
		}
		res.send('删除成功！')
	});
});

router.post('/', (req, res) => {
	const cartList = req.body.params;
	cartList.forEach((list, index) => {
		CartsModel.findByIdAndUpdate(list.cId, {
			$set: {
				cQuantity: list.cQuantity,
				cStatus: true
			}
		}, {
			new: true
		}, (err, data) => {
			if (err) {
				return res.send(err || '结算失败！')
			}
			res.send('结算成功！')
		})
	})
})
module.exports = router;