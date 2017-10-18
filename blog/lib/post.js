const Modal = require('./modal');
const mongoose = require('./mongoose');
const Schema = mongoose.Schema;

module.exports = Modal('posts', {
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    title: {type: String},
    content: {type: String},
    pv: {type: Number},
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}],
    create_at: {type: Date, default: Date.now}
});