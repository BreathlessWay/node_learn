const express = require('express');
const router = express.Router();

const checkNotLogin = require('../middlewares/check').checkNotLogin;

//获取注册页
router.get('/', checkNotLogin, (req, res, next) => {
  res.send(req.session);
});

//注册请求
router.post('/', checkNotLogin, (req, res, next) => {
  res.send(req.session);
});

module.exports = router;