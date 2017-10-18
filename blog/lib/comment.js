const Modal = require('./modal');
const mongoose = require('./mongoose');
const Schema = mongoose.Schema;

module.exports = Modal('comment', {
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    postId: {type: Schema.Types.ObjectId, ref: 'posts'},
    content: {type: String},
    create_at: {type: Date, default: Date.now}
});