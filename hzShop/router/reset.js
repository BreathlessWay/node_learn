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
    checkLogin
} = require('../middleware/checkAuth.js');
const config = require('../config/index.js');
const UserModel = require('../lib/user.js');

router.use(checkLogin);

router.get('/', (req, res) => {
    res.render('reset', {
        title: '重置密码'
    });
});

router.post('/', (req, res) => {
    try {
        if (req.body.password.trim() === '') {
            throw new Error('密码不能为空');
        }
        if (req.body.password_repeat.trim() === '') {
            throw new Error('重复密码不能为空');
        }
        if (!config.reg.password.test(req.body.password)) {
            throw new Error('密码格式错误，只能为6-12位的数字字母下划线');
        }
        if (req.body.password !== req.body.password_repeat) {
            throw new Error('两次密码输入不一致');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/reset');
    }
    UserModel.findOneAndUpdate({
        name: req.session.user
    }, {
        $set: {
            password: req.body.password
        }
    }, (err, data) => {
        if (err) {
            req.flash('error', '数据库连接失败');
            return res.redirect('/reset');
        }
        req.session.destroy();
        res.redirect('/');
    });
});

module.exports = router;