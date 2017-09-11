/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-11 09:31:20
 * @version $Id$
 */

const {
	Router
} = require('express');
const router = Router();
const {
	checkLogin
} = require('../middleware/checkAuth.js')

router.get('/', checkLogin, (req, res) => {
	req.session.destroy();
	res.render('logout', {
		title: '退出成功'
	})
})

module.exports = router;