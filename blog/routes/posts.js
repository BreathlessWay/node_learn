const {Router} = require('express');
const router = new Router();
const {checkLogin} = require('../middlewares/check');
// modal
const PostModal = require('../lib/post');
const CommentModal = require('../lib/comment');
// moment
const moment = require('moment');
// q
const Q = require('q');
//获取文章列表
router.get('/', (req, res, next) => {
    const condition = req.query.author ? {author: req.query.author} : {};
    PostModal.find(condition)
        .populate({path: 'author', select: 'avatar'})
        .exec((err, data) => {
            if (err) {
                req.flash('err', err || '数据库查询失败');
                return res.redirect('/posts');
            }
            let nav = [];
            const posts = [];
            data.forEach(list => {
                const json = {};
                json._id = list._id;
                json.title = list.title;
                json.content = list.content;
                json.pv = list.pv;
                json.comments = list.comments;
                json.create_at = moment(list.create_at).format('YYYY-MM-DD HH:mm:ss');
                json.author = list.author;
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
            req.query.author && nav.unshift({
                title: '主页',
                link: '/'
            });
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
    Q.all([
        CommentModal.find({postId: req.params.postId})
            .populate({path: 'author'})
            .exec(),
        PostModal.findOneAndUpdate({_id: req.params.postId}, {$inc: {pv: 1}}, {new: true})
            .populate({path: 'author'})
            .exec()
    ])
        .then(data => {
            const doc = data[1];
            const comments = data[0];
            const post = {
                comments: []
            };
            post._id = doc._id;
            post.author = doc.author;
            post.content = doc.content;
            post.pv = doc.pv;
            post.create_at = moment(doc.create_at).format('YYYY-MM-DD HH:mm:ss');
            comments.forEach(list => {
                const json = {};
                json._id = list._id;
                json.content = list.content;
                json.postId = list.postId;
                json.create_at = moment(list.create_at).format('YYYY-MM-DD HH:mm:ss');
                json.author = list.author;
                post.comments.push(json);
            });
            res.render('post', {
                title: '文章详情',
                nav: req.session.user ? [
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
                ] : [
                    {
                        title: '主页',
                        link: '/'
                    }, {
                        title: '登陆',
                        link: '/signin'
                    }, {
                        title: '注册',
                        link: '/signup'
                    }
                ],
                post
            });
        })
        .catch(err => {
            req.flash('error', err.toString() || '数据库查询失败');
            return res.redirect('/posts');
        });
});

//编辑文章
router.get('/:postId/edit', checkLogin, (req, res, next) => {
    PostModal.findOne({_id: req.params.postId}, (err, data) => {
        if (err) {
            req.flash('error', '数据库查询失败');
            return res.redirect('/posts');
        }
        if (data.author.toString() !== req.session.user._id.toString()) {
            req.flash('error', '权限不足');
            return res.redirect('/posts');
        }
        res.render('edit', {
            title: '编辑文章',
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
            ],
            post: data
        });
    });

});

//更新文章
router.post('/:postId/edit', checkLogin, (req, res, next) => {
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
    PostModal.findOneAndUpdate({_id: req.params.postId}, {$set: {title, content}}, (err, data) => {
        if (err) {
            req.flash('error', '文章编辑失败');
            return res.redirect(`/posts/${req.params.postId}/edit`);
        }
        req.flash('success', '文章编辑成功');
        res.redirect(`/posts`);
    });
});

//删除文章
router.get('/:postId/remove', checkLogin, (req, res, next) => {
    PostModal.findOne({_id: req.params.postId}, (err, data) => {
        if (err) {
            req.flash('error', '数据库查询失败');
            return res.redirect('/posts');
        }
        if (data.author.toString() !== req.session.user._id.toString()) {
            req.flash('error', '权限不足');
            return res.redirect('/posts');
        }
        PostModal.findOneAndRemove({_id: req.params.postId}, (err, data) => {
            if (err) {
                req.flash('error', '文章删除失败');
                return res.redirect(`/posts`);
            }
            req.flash('success', '文章删除成功');
            res.redirect(`/posts`);
        });
    });
});

//发布留言
router.post('/:postId/comment', checkLogin, (req, res, next) => {
    const content = req.body.comment;
    if (!content.length) {
        req.flash('error', '请输入评论内容');
        return res.redirect(`/posts/${req.params.postId}`);
    }
    const comment = {
        author: req.session.user._id,
        postId: req.params.postId,
        content,
        create_at: Date.now()
    };
    const commentData = new CommentModal(comment);
    commentData.save()
        .then(() => {
            req.flash('success', '发表评论成功');
            return res.redirect(`/posts/${req.params.postId}`);
        })
        .catch(err => {
            req.flash('error', err.toString() || '发表评论成功');
            return res.redirect(`/posts/${req.params.postId}`);
        });
});

//删除留言
router.get('/:postId/comment/:commentId/remove', checkLogin, (req, res, next) => {
    CommentModal.findOne({postId: req.params.postId, _id: req.params.commentId}, (err, data) => {
        if (err) {
            req.flash('error', '数据库查询失败');
            return res.redirect('/posts');
        }
        if (data.author.toString() !== req.session.user._id.toString()) {
            req.flash('error', '权限不足');
            return res.redirect(`/posts/${req.params.postId}`);
        }
        CommentModal.findOneAndRemove({postId: req.params.postId, _id: req.params.commentId}, (err, data) => {
            if (err) {
                req.flash('error', '评论删除失败');
                return res.redirect(`/posts/${req.params.postId}`);
            }
            req.flash('success', '评论删除成功');
            return res.redirect(`/posts/${req.params.postId}`);
        });
    });
});

module.exports = router;