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
	CommodityModel.findById(req.params.id, (err, data) => {
		if (err) {
			req.flash('error', err.toString() || '商品信息查询失败')
		}
		if (data) {
			initialData.name = data.name;
			initialData.desc = data.desc;
			initialData.price = data.price;
			initialData.imgSrc = data.imgSrc;
		}

		res.render('addCommodity', {
			title: '添加商品',
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
			if (req.file.size > 1 * 1024 * 1024 || !config.reg.imgExt.includes(extName.toLowerCase())) {
				throw new Error('商品图片只能为小于1M得jpg，png，jpeg图片');
			};
		};
	} catch (e) {
		req.flash('error', e.message);
		return req.params.id ? res.redirect(`/addCommodity/${req.params.id}`) : res.redirect(`/addCommodity`);
	};

	const commodity = new CommodityModel({
		name: req.body.name,
		price: req.body.price,
		desc: req.body.desc,
	})

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
			commodity.imgSrc = imgSrc;
			commodity.save()
				.then(() => {
					req.flash('success', '商品发布成功！');
					return req.params.id ? res.redirect(`/addCommodity/${req.params.id}`) : res.redirect(`/addCommodity`);
				})
				.catch(err => {
					req.flash('error', err || '商品发布失败');
					return req.params.id ? res.redirect(`/addCommodity/${req.params.id}`) : res.redirect(`/addCommodity`);
				});
		});
	} else {
		commodity.save()
			.then(() => {
				req.flash('success', '商品发布成功！');
				return req.params.id ? res.redirect(`/addCommodity/${req.params.id}`) : res.redirect(`/addCommodity`);
			})
			.catch(err => {
				req.flash('error', err || '商品发布失败');
				return req.params.id ? res.redirect(`/addCommodity/${req.params.id}`) : res.redirect(`/addCommodity`);
			});
	}
})

module.exports = router;