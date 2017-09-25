const {Router} = require('express');
const router = new Router();
const {checkNotLogin} = require('../middlewares/check');

//注册页
router.get('/', checkNotLogin, (req, res, next) => {
    res.end('hh');
});

//注册
router.post('/', checkNotLogin, (req, res, next) => {
    res.end('hh');
});

module.exports = router;