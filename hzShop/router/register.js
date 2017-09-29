/**
 *
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-08 09:52:45
 * @version $Id$
 */

const {
    Router
} = require('express');
const router = Router();
const {
    checkNotLogin
} = require('../middleware/checkAuth.js');
const config = require('../config/index.js');
const UserModel = require('../lib/user.js');

router.use(checkNotLogin);

router.get('/', (req, res) => {
    res.render('register', {
        title: '注册'
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
        if (req.body.password_repeat.trim() === '') {
            throw new Error('重复密码不能为空');
        }
        if (!config.reg.userName.test(req.body.user)) {
            throw new Error('用户名格式错误，只能为6-12位的英文汉字数字');
        }
        if (!config.reg.password.test(req.body.password)) {
            throw new Error('密码格式错误，只能为6-12位的数字字母下划线');
        }
        if (req.body.password !== req.body.password_repeat) {
            throw new Error('两次密码输入不一致');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/register');
    }
    UserModel.find({
        name: req.body.user
    }, (err, data) => {
        if (err) {
            req.flash('error', '数据库连接失败');
            return res.redirect('/register');
        }
        if (data.length > 0) {
            req.flash('error', '用户名已注册');
            return res.redirect('/register');
        }
        const user = new UserModel({
            name: req.body.user,
            password: req.body.password
        });
        user.save()
            .then(() => {
                req.session.user = req.body.user;
                req.flash('success', '注册成功');
                res.redirect('/');
            })
            .catch(err => {
                req.flash('error', '注册失败');
                res.redirect('/register');
            });
    });
});

module.exports = router;