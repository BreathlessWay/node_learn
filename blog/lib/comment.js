const Modal = require('./modal');
const mongoose = require('./mongoose');
const Schema = mongoose.Schema;
const user = require('./user');
const posts = require('./post');

module.exports = Modal('comment', {
    commenter: {type: Schema.Types.ObjectId, ref: 'user'},
    post: {type: Schema.Types.ObjectId, ref: 'posts'},
    content: {type: String},
    create_at: {type: Date, default: Date.now}
});