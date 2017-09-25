const {Router} = require('express');
const router = new Router();
const {checkLogin} = require('../middlewares/check');

//获取文章列表
router.get('/', (req, res, next) => {
    res.end('hh');
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