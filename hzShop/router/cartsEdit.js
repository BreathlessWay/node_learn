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

router.use(checkLogin);

router.get('/', (req, res) => {
	res.render('cartsEdit', {
		title: '购物车'
	});
});

module.exports = router;