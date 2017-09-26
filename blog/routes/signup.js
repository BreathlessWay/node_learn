const {Router} = require('express');
const router = new Router();
const {checkNotLogin} = require('../middlewares/check');

//注册页
router.get('/', checkNotLogin, (req, res, next) => {
    res.render('signup', {
        title: '注册',
        nav: [
            {
                title: '主页',
                link: '/'
            },
            {
                title: '登陆',
                link: '/signin'
            }
        ]
    });
});

//注册
router.post('/', checkNotLogin, (req, res, next) => {
    res.end('hh');
});

module.exports = router;