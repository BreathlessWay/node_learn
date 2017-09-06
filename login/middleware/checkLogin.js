/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-06 15:14:37
 * @version $Id$
 */

const checkLogin = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/')
        return
    }
    next()
}

module.exports = checkLogin