/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-12 10:38:08
 * @version $Id$
 */

const fs = require('fs');
const path = require('path');

const {
	Router
} = require('express');
const router = Router();
const {
	checkLogin
} = require('../middleware/checkAuth.js');

const config = require('../config/index.js');
const CommodityModel = require('../lib/commodity.js');
const CartsModel = require('../lib/carts.js');
const UserModel = require('../lib/user.js');
const multer = require('multer');
const upload = multer({});

router.use(checkLogin);

router.get('/:id?', (req, res) => {
	const initialData = {
		name: '',
		desc: '',
		price: '',
		imgSrc: ''
	}
	let title = '添加商品'
	CommodityModel.findById(req.params.id, (err, data) => {
		if (err) {
			req.flash('error', err.toString() || '商品信息查询失败')
		}
		if (data) {
			title = '编辑商品'
			initialData.name = data.name;
			initialData.desc = data.desc;
			initialData.price = data.price;
			initialData.imgSrc = data.imgSrc;
		}

		res.render('addCommodity', {
			title,
			initialData
		});
	})
});

router.post('/:id?', upload.single('imgSrc'), (req, res) => {
	try {
		if (req.body.name.trim() === '') {
			throw new Error('商品名称不能为空');
		};
		if (req.body.price.trim() === '') {
			throw new Error('商品价格不能为空');
		};
		if (!config.reg.userName.test(req.body.name)) {
			throw new Error('商品名称格式错误，只能为6-12位的英文汉字数字');
		};
		if (!config.reg.price.test(req.body.price)) {
			throw new Error('商品价格格式错误，只能为0.00格式数字');
		};
		if (req.body.desc.trim().length > 200) {
			throw new Error('商品描述字数不能大于200字');
		};
		if (req.file) {
			const extName = path.extname(req.file.originalname)
			if (req.file.size > 2 * 1024 * 1024 || !config.reg.imgExt.includes(extName.toLowerCase())) {
				throw new Error('商品图片只能为小于2M得jpg，png，jpeg图片');
			};
		};
	} catch (e) {
		req.flash('error', e.message);
		return req.params.id ? res.redirect(`/addCommodity/${req.params.id}`) : res.redirect(`/addCommodity`);
	};

	if (req.file) {
		// const readSteam = fs.createReadStream(req.file.path);
		// const writeSteam = fs.createWriteStream(path.resolve(__dirname, `../public/img/${req.file.originalname}`));
		// readSteam.pipe(writeSteam);
		// req.params.id ? res.redirect(`/addCommodity/${req.params.id}`) : res.redirect(`/addCommodity`);
		fs.writeFile(path.resolve(__dirname, `../public/img/${req.file.originalname}`), req.file.buffer, err => {
			if (err) {
				req.flash('error', '上传文件失败！');
			}
			const imgSrc = `/img/${req.file.originalname}`;
			if (req.params.id) {
				CommodityModel.update({
					_id: req.params.id
				}, {
					name: req.body.name,
					price: req.body.price,
					desc: req.body.desc,
					imgSrc: imgSrc
				}, error => {
					if (error) {
						req.flash('error', '商品更新失败！');
						return res.redirect(`/addCommodity/${req.params.id}`)
					}
					req.flash('success', '商品更新成功！');
					res.redirect(`/addCommodity/${req.params.id}`)
				});
			} else {
				const commodity = new CommodityModel({
					name: req.body.name,
					price: req.body.price,
					desc: req.body.desc,
					imgSrc: imgSrc
				})
				commodity.save()
					.then(() => {
						req.flash('success', '商品发布成功！');
						return res.redirect(`/addCommodity`);
					})
					.catch(err => {
						req.flash('error', err || '商品发布失败');
						return res.redirect(`/addCommodity`);
					});
			}
		});
	} else {
		if (req.params.id) {
			CommodityModel.update({
				_id: req.params.id
			}, {
				name: req.body.name,
				price: req.body.price,
				desc: req.body.desc
			}, error => {
				if (error) {
					req.flash('error', '商品更新失败！');
					return res.redirect(`/addCommodity/${req.params.id}`)
				}
				req.flash('success', '商品更新成功！');
				res.redirect(`/addCommodity/${req.params.id}`)
			});
		} else {
			const commodity = new CommodityModel({
				name: req.body.name,
				price: req.body.price,
				desc: req.body.desc
			})
			commodity.save()
				.then(() => {
					req.flash('success', '商品发布成功！');
					return res.redirect(`/addCommodity`);
				})
				.catch(err => {
					req.flash('error', err || '商品发布失败');
					return res.redirect(`/addCommodity`);
				});
		}
	}
});

router.delete('/:id', (req, res) => {
	UserModel.findOne({
		name: req.session.user
	}, (err, userData) => {
		if (err) {
			return res.send('商品删除失败！')
		}
		CommodityModel.findByIdAndRemove(req.params.id, err => {
			if (err) {
				return res.send('商品删除失败！')
			}
			CartsModel.findOneAndRemove({
				uId: userData._id,
				cId: req.params.id,
				cStatus: false,
			}, err => {
				if (err) {
					return res.send('商品删除失败！')
				}
				return res.send('商品删除成功！')
			})
		})
	})
})

module.exports = router;