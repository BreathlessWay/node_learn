const {Router} = require('express');
const router = new Router();
const {checkLogin} = require('../middlewares/check');

//退出登陆
router.get('/', checkLogin, (req, res, next) => {
    // 清空 session 中用户信息
    req.session.user = null;
    req.flash('success', '登出成功');
    // 登出成功后跳转到主页
    res.redirect('/posts');
});

module.exports = router;