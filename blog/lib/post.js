const Modal = require('./modal');
const mongoose = require('./mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

module.exports = Modal('posts', {
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    title: {type: String},
    content: {type: String},
    pv: {type: Number},
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}],
    create_at: {type: Date, default: Date.now, get: v => moment(v).format('YYYY-MM-DD HH:mm')}
});