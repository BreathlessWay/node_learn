const {Router} = require('express');
const router = new Router();
const {checkLogin} = require('../middlewares/check');
// modal
const PostModal = require('../lib/post');
// moment
const moment = require('moment');
//获取文章列表
router.get('/', (req, res, next) => {
    let nav = [];
    let posts = [];
    PostModal.find({}, (err, data) => {
        if (err) {
            req.flash('err', err || '数据库查询失败');
            return res.redirect('/posts');
        }
        data.forEach(list => {
            const json = {};
            json.title = list.title;
            json.content = list.content;
            json.pv = list.pv;
            json.comments = list.comments;
            json.create_at = moment(list.create_at).format('YYYY-MM-DD HH:mm:ss');
            json.avatar = req.session.user.avatar;
            posts.push(json);
        });
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
                    link: '/'
                }, {
                    title: '发表文章',
                    link: '/posts/create'
                }, {
                    title: '退出',
                    link: '/signout'
                }
            ];
        }
        res.render('posts', {
            title: '文章列表',
            nav,
            posts
        });
    });

});

//发表文章页
router.get('/create', checkLogin, function (req, res, next) {
    res.render('create', {
        title: '发布文章',
        nav: [
            {
                title: '主页',
                link: '/'
            }, {
                title: '个人主页',
                link: '/'
            }, {
                title: '退出',
                link: '/signout'
            }
        ]
    });
});

//发表文章
router.post('/', checkLogin, (req, res, next) => {
    const author = req.session.user._id;
    const title = req.body.title;
    const content = req.body.content;

    // 校验参数
    try {
        if (!title.length) {
            throw new Error('请填写标题');
        }
        if (!content.length) {
            throw new Error('请填写内容');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }

    const post = {
        author: author,
        title: title,
        content: content,
        pv: 0,
        comments: [],
        create_at: Date.now()
    };
    PostModal.findOne({title}, (err, data) => {
        if (err) {
            req.flash('error', err || '数据库查询失败');
            return res.redirect('/posts/create');
        }
        if (data) {
            req.flash('error', '已存在该文章标题');
            return res.redirect('/posts/create');
        }
        const postData = new PostModal(post);
        postData.save()
            .then(() => {
                req.flash('success', '发布文章成功');
                return res.redirect('/posts');
            })
            .catch((err) => {
                req.flash('error', err.toString() || '发布文章成功');
                return res.redirect('/posts/create');
            });
    });
});

//文章详情
router.get('/:postId', (req, res, next) => {
    res.render('post', {
        title: '文章详情',
        nav: [
            {
                title: '主页',
                link: '/'
            }, {
                title: '个人主页',
                link: '/'
            }, {
                title: '退出',
                link: '/signout'
            }
        ]
    });
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