const {Router} = require('express');
const router = new Router();
const {checkLogin} = require('../middlewares/check');

//退出登陆
router.get('/', checkLogin, (req, res, next) => {
    res.end('hh');
});

module.exports = router;