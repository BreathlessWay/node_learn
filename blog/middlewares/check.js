module.exports = {
    checkLogin(req, res, next) {
        if (!req.session.user) {
            req.flash('error', '尚未登陆！');
            return res.redirect('/signin');
        }
        next();
    },
    checkNotLogin(req, res, next) {
        if (req.session.user) {
            req.flash('error', '已登陆！');
            return res.redirect('back');
        }
        next();
    }
};