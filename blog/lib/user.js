const Modal = require('./modal');

module.exports = Modal('user', {
    name: {type: String},
    password: {type: String},
    avatar: {type: String},
    gender: {type: String, enum: ['m', 'f', 'x']},
    bio: {type: String}
});