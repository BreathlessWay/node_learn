/**
 *
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-07 16:40:48
 * @version $Id$
 */

module.exports = {
    port: 3000,
    session: {
        secret: 'user',
        key: 'user',
        maxAge: 60 * 1000 * 60
    },
    mongodb: 'mongodb://localhost:27017/hzShop',
    reg: {
        userName: /^[a-zA-Z0-9\u4e00-\u9fa5]{6,12}$/,
        password: /^\w{6,12}$/,
        price: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
        imgExt: ['.jpg', '.jpeg', '.png']
    }
};