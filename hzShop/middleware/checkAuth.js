/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-11 09:35:22
 * @version $Id$
 */

module.exports = {
  checkLogin (req, res, next) {
    if (!req.session.user) {
      req.flash ('error', '未登录');
      return res.redirect ('/');
    }
    next ();
  },

  checkNotLogin (req, res, next) {
    if (req.session.user) {
      req.flash ('error', '已登录');
      return res.redirect ('back');//返回之前的页面
    }
    next ();
  }
};