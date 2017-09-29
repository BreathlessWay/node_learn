const mongo = require('./mongo');

const schema = new mongo.Schema({});

const Modal = mongo.model('', schema);

module.exports = Modal;