const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/check').checkLogin;

//获取文章列表
router.get('/', (req, res, next) => {
  res.render('posts', {
    title: '博客',
    list: [
      {
        _id: 'fa125gv364hndgh57azsf',
        title: 'fafa',
        desc: 'gaf',
        date: '2015-05-20',
        author: 'faft3',
        read: 5,
        apply: 4
      },
      {
        _id: 'fa125gv364hndgh57azsf',
        title: 'fafa',
        desc: 'gaf',
        date: '2015-05-20',
        author: 'faft3',
        read: 5,
        apply: 4
      },
      {
        _id: 'fa125gv364hndgh57azsf',
        title: 'fafa',
        desc: 'gaf',
        date: '2015-05-20',
        author: 'faft3',
        read: 5,
        apply: 4
      }
    ]
  });
});

//发表文章
router.post('/', checkLogin, (req, res, next) => {
  res.send(req.session);
});

//获取新建文章页
router.get('/create', checkLogin, (req, res, next) => {
  res.render('editArticle', {
    title: '创建文章'
  });
});

//获取编辑文章页
router.get('/edit/:postId', checkLogin, (req, res, next) => {
  res.render('editArticle', {
    title: '编辑文章'
  });
});

//编辑文章
router.put('/edit/:postId', checkLogin, (req, res, next) => {
  res.render('editArticle', {
    title: '编辑文章'
  });
});

//获取文章详情
router.get('/:postId', (req, res, next) => {
  res.locals.user = req.session.user;
  res.render('detailArticle', {
    title: '文章详情',
    content: {
      _id: 'fa125gv364hndgh57azsf',
      title: 'fafa',
      desc: 'gaf',
      date: '2015-05-20',
      author: 'faft3',
      read: 5,
      apply: 4
    },
    comment: [
      {
        _id: 'fa125gv364hndgh57azsf',
        name: 'fafa',
        avater: '',
        date: '2015-05-20',
        detail: 'faft3'
      }
    ]
  });
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