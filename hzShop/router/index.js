/**
 *
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-08 09:52:24
 * @version $Id$
 */

module.exports = (app) => {
    app.use('/', require('./main.js'));
    app.use('/register', require('./register.js'));
    app.use('/login', require('./login.js'));
    app.use('/logout', require('./logout.js'));
    app.use('/addCommodity', require('./addCommodity.js'));
    app.use('/carts', require('./cartsList.js'));
    app.use('/personal', require('./personal.js'));
    app.use('/forget', require('./forget.js'));
    app.use('/reset', require('./reset.js'));
};