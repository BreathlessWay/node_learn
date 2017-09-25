const {Router} = require('express');
const router = new Router();
const {checkNotLogin} = require('../middlewares/check');

//登陆页
router.get('/', checkNotLogin, (req, res, next) => {
    res.end('hh');
});

//登陆
router.post('/', checkNotLogin, (req, res, next) => {
    res.end('hh');
});

module.exports = router;