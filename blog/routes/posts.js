const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/check').checkLogin;

//获取文章列表
router.get('/', (req, res, next) => {
  req.flash('error', '用户不存在');
  res.send(req.flash());
});

//发表文章
router.post('/', checkLogin, (req, res, next) => {
  res.send(req.session);
});

//获取新建文章页
router.get('/create', checkLogin, (req, res, next) => {
  res.send(req.session);
});

//获取文章详情
router.get('/:postId', (req, res, next) => {
  res.send(req.session);
});

//编辑文章
router.put('/:postId', checkLogin, (req, res, next) => {
  res.send(req.session);
});

//删除文章
router.delete('/:postId', checkLogin, (req, res, next) => {
  res.send(req.session);
});

//发表评论
router.put('/:postId/comment', checkLogin, (req, res, next) => {
  res.send(req.session);
});

//删除评论
router.delete('/:postId/comment', checkLogin, (req, res, next) => {
  res.send(req.session);
});

module.exports = router;