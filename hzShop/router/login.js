/**
 *
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-08 09:52:39
 * @version $Id$
 */

const {
    Router
} = require('express');
const router = Router();
const {
    checkNotLogin
} = require('../middleware/checkAuth.js');
const UserModel = require('../lib/user.js');
const config = require('../config/index.js');

router.use(checkNotLogin);

router.get('/', (req, res) => {
    res.render('login', {
        title: '登录'
    });
});

router.post('/', (req, res) => {
    try {
        if (req.body.user.trim() === '') {
            throw new Error('用户名不能为空');
        }
        if (req.body.password.trim() === '') {
            throw new Error('密码不能为空');
        }
        if (!config.reg.userName.test(req.body.user)) {
            throw new Error('用户名格式错误，只能为6-12位的英文汉字数字');
        }
        if (!config.reg.password.test(req.body.password)) {
            throw new Error('密码格式错误，只能为6-12位的数字字母下划线');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/login');
    }
    UserModel
        .findOne({
            name: req.body.user
        })
        .then(data => {
            if (data.password !== req.body.password) {
                req.flash('error', '密码错误，请重试');
                return res.redirect('/login');
            }
            req.flash('success', '登陆成功');
            req.session.user = req.body.user;
            res.redirect('/');
        })
        .catch(err => {
            req.flash('error', err || '数据库连接失败');
            return res.redirect('/login');
        });
});

module.exports = router;