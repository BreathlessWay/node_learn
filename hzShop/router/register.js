/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-08 09:52:45
 * @version $Id$
 */

const {
	Router
} = require('express');
const router = new Router();

router.get('/register', (req, res) => {
	req.flash('success','快来注册')
	res.render('register', {
			title: '注册'
		})
});

module.exports = router;