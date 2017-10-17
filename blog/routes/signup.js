const {Router} = require('express');
const router = new Router();
const {checkNotLogin} = require('../middlewares/check');
const multer = require('multer');
const upload = multer({});
// 加密模块
const crypto = require('crypto');
const md5 = crypto.createHash('md5');
// 图片保存
const fs = require('fs');
const path = require('path');
// modal
const UserModal = require('../lib/user');
//注册页
router.get('/', checkNotLogin, (req, res, next) => {
    res.render('signup', {
        title: '注册',
        nav: [
            {
                title: '主页',
                link: '/'
            },
            {
                title: '登陆',
                link: '/signin'
            }
        ]
    });
});

//注册
router.post('/', checkNotLogin, upload.single('avatar'), (req, res, next) => {
    const username = req.body.username;
    const sex = req.body.sex;
    const intro = req.body.intro;
    let avatar = req.file;
    let password = req.body.password;
    const repassword = req.body.password_repeat;
    // 校验参数
    try {
        if (!(username.length >= 1 && username.length <= 10)) {
            throw new Error('名字请限制在 1-10 个字符');
        }
        if (['m', 'f', 'x'].indexOf(sex) === -1) {
            throw new Error('性别只能是 m、f 或 x');
        }
        if (!(intro.length >= 1 && intro.length <= 30)) {
            throw new Error('个人简介请限制在 1-30 个字符');
        }
        if (!avatar.fieldname) {
            throw new Error('缺少头像');
        }
        const extName = path.extname(req.file.originalname);
        if (req.file.size > 2 * 1024 * 1024 || ['jpg', 'png', 'jpeg'].includes(extName.toLowerCase())) {
            throw new Error('商品图片只能为小于2M得jpg，png，jpeg图片');
        }
        if (password.length < 6) {
            throw new Error('密码至少 6 个字符');
        }
        if (password !== repassword) {
            throw new Error('两次输入密码不一致');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/signup');
    }
    // 密码md5加密
    md5.update(password);
    password = md5.digest('hex');
    // 保存头像图片
    fs.writeFile(path.resolve(__dirname, `../public/img/${req.file.originalname}`), req.file.buffer, err => {
        if (err) {
            req.flash('error', '头像上传失败！');
            return res.redirect('/signup');
        }
        avatar = `/img/${req.file.originalname}`;
        // 待写入数据库的用户信息
        const user = {
            name: username,
            password: password,
            gender: sex,
            bio: intro,
            avatar: avatar
        };
        const userData = new UserModal(user);

        UserModal.findOne({
            name: user.name
        }, (err, data) => {
            if (err) {
                req.flash('error', '数据库查询失败！');
                return res.redirect('/signup');
            }
            if (data) {
                req.flash('error', '用户名已存在！');
                return res.redirect('/signup');
            }
            userData.save()
                .then(data => {
                    req.flash('success', '注册成功！');
                    res.redirect('/posts');
                })
                .catch(err => {
                    req.flash('error', '注册失败！');
                    res.redirect('/signup');
                });
        });
    });
});

module.exports = router;