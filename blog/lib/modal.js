const mongoose = require('./mongoose');

module.exports = function (modalName, schemaJson) {

    const schema = new mongoose.Schema(schemaJson);

    return mongoose.model(modalName, schema);
    
};