/**
 *
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-14 14:12:47
 * @version $Id$
 */

const {
    Router
} = require('express');
const router = Router();
const {
    checkLogin
} = require('../middleware/checkAuth.js');

const UserModel = require('../lib/user.js');
const CartsModel = require('../lib/carts.js');

router.use(checkLogin);

router.get('/', (req, res) => {
    UserModel.findOne({
        name: req.session.user
    }, (err, userData) => {
        if (err) {
            req.flash('error', err || '数据库查询失败');
            return res.render('personal', {
                title: '个人中心',
                accounting: [],
                accounted: []
            });
        }
        CartsModel.find({
            uId: userData._id
        }, (err, cartData) => {
            if (err) {
                req.flash('error', err || '数据库查询失败');
                return res.render('personal', {
                    title: '个人中心',
                    accounting: [],
                    accounted: []
                });
            }
            let accounting = [],
                accounted = [];
            accounting = cartData.filter(list => !list.cStatus);
            accounted = cartData.filter(list => list.cStatus);
            return res.render('personal', {
                title: '个人中心',
                accounting,
                accounted
            });
        });
    });
});

module.exports = router;