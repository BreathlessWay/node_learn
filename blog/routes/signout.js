const express = require('express');
const router = express.Router();

const checkLogin = require('../middlewares/check').checkLogin;

//登出请求
router.get('/', checkLogin, (req, res, next) => {
  res.send(req.session);
});

module.exports = router;