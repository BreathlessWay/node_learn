const {Router} = require('express');
const router = new Router();
const {checkNotLogin} = require('../middlewares/check');
// modal
const UserModal = require('../lib/user');
// md5
const crypto = require('crypto');
const md5 = crypto.createHash('md5');
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
    UserModal.findOne({name: req.body.username}, (err, data) => {
        if (err) {
            req.flash('error', '数据库连接失败');
            return res.redirect('/signin');
        }
        if (!data) {
            req.flash('error', '用户不存在');
            return res.redirect('/signin');
        }

        md5.update(req.body.password);
        const psd = md5.digest('hex');
        if (psd.toUpperCase() !== data.password.toUpperCase()) {
            req.flash('error', '密码输入错误');
            return res.redirect('/signin');
        }
        req.session.user = data;
        req.flash('success', '登陆成功');
        res.redirect('/posts');
    });
});

module.exports = router;