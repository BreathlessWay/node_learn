const Modal = require('./modal');

module.exports = Modal('user', {
    name: {type: String},
    password: {type: String},
    avatar: {type: String},
    gender: {type: String, enum: ['男', '女']},
    bio: {type: String}
});