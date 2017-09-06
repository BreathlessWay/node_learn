/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-06 15:02:41
 * @version $Id$
 */

const { Router } = require('express');
const router = new Router();
const checkLogin = require('../middleware/checkLogin.js')

router.get('/login', checkLogin, (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {
    req.session.user = req.body.user;
    res.redirect('/')
})

module.exports = router