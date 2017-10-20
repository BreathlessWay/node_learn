const Modal = require('./modal');
const mongoose = require('./mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

module.exports = Modal('comment', {
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    postId: {type: Schema.Types.ObjectId, ref: 'posts'},
    content: {type: String},
    create_at: {type: Date, default: Date.now, get: v => moment(v).format('YYYY-MM-DD HH:mm')}
});