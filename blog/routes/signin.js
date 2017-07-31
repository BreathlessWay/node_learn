const express = require('express');
const router = express.Router();

const checkNotLogin = require('../middlewares/check').checkNotLogin;

//获取登录页
router.get('/', checkNotLogin, (req, res, next) => {
  res.send(req.session);
});

//登录请求
router.post('/', checkNotLogin, (req, res, next) => {
  res.send(req.session);
});

module.exports = router;