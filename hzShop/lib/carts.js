/**
 *
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-07 17:00:03
 * @version $Id$
 */

const mongoose = require('./mongoose.js');

const schema = new mongoose.Schema({
    uId: {
        type: String
    },
    cId: {
        type: String
    },
    cName: {
        type: String
    },
    cDesc: {
        type: String
    },
    cPrice: {
        type: Number,
        required: true
    },
    cImgSrc: {
        type: String
    },
    cQuantity: {
        type: String
    },
    cStatus: {
        type: Boolean,
        default: false
    }
});

const CartsModel = mongoose.model('carts', schema);

module.exports = CartsModel;