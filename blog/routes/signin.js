const {Router} = require('express');
const router = new Router();
const {checkNotLogin} = require('../middlewares/check');

//登陆页
router.get('/', checkNotLogin, (req, res, next) => {
    res.render('signin', {
        title: '登陆',
        nav: [
            {
                title: '主页',
                link: '/'
            },
            {
                title: '注册',
                link: '/signup'
            }
        ]
    });
});

//登陆
router.post('/', checkNotLogin, (req, res, next) => {
    res.end('hh');
});

module.exports = router;