const express = require('express');
const router = express.Router();

const checkNotLogin = require('../middlewares/check').checkNotLogin;

//获取注册页
router.get('/', checkNotLogin, (req, res, next) => {
  res.render('signup', {
    title: '注册'
  });
});

//注册请求
router.post('/', checkNotLogin, (req, res, next) => {
  res.render('signup', {
    title: '注册成功'
  });
});

module.exports = router;