const Modal = require('./modal');

module.exports = Modal('posts', {
    author: {type: String},
    title: {type: String},
    content: {type: String},
    pv: {type: Number},
    comments: {type: Array, default: []},
    create_at: {type: Date, default: Date.now}
});