/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-08 09:52:39
 * @version $Id$
 */

const {
	Router
} = require('express');
const router = Router();

router.get('/', (req, res) => {
	res.render('login', {
		title: '登录'
	})
});

module.exports = router;