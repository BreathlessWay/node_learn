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

router.get('/', (req, res) => {
	req.flash('success', '欢迎光临');
	res.render('main', {
		title: '主页'
	})
});

module.exports = router;