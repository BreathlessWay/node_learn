const {Router} = require('express');
const router = new Router();
const {checkLogin} = require('../middlewares/check');

//获取文章列表
router.get('/', (req, res, next) => {
    let nav = [];
    if (!req.session.user) {
        nav = [
            {
                title: '注册',
                link: '/signup'
            }, {
                title: '登陆',
                link: '/signin'
            }
        ];
    } else {
        nav = [
            {
                title: '个人主页',
                link: '/signup'
            }, {
                title: '发表文章',
                link: '/signin'
            }, {
                title: '退出',
                link: '/signout'
            }
        ];
    }
    res.render('posts', {
        title: '文章列表',
        nav
    });
});

//发表文章页
router.get('/create', function (req, res, next) {
    res.render('create', {
        title: '发布文章',
        nav: [
            {
                title: '主页',
                link: '/'
            }, {
                title: '个人主页',
                link: '/signin'
            }, {
                title: '退出',
                link: '/signout'
            }
        ]
    });
});

//发表文章
router.post('/', checkLogin, (req, res, next) => {
    res.end('ff');
});

//文章详情
router.get('/:postId', (req, res, next) => {
    res.end('ff');
});

//编辑文章
router.get('/:postId/edit', checkLogin, (req, res, next) => {
    res.end('ff');
});

//更新文章
router.post('/:postId/edit', checkLogin, (req, res, next) => {
    res.end('ff');
});

//删除文章
router.get('/:postId/remove', checkLogin, (req, res, next) => {
    res.end('ff');
});

//发布留言
router.post('/:postId/comment', checkLogin, (req, res, next) => {
    res.end('ff');
});

//删除留言
router.get('/:postId/comment/:commentId/remove', checkLogin, (req, res, next) => {
    res.end('ff');
});

module.exports = router;