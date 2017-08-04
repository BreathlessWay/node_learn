const mongoose = require('mongoose');
const config = require('../config/default');

mongoose.Promise = require('q').Promise;

mongoose.connect(config.mongodb, {
  useMongoClient: true
  /* other options */
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('mongodb error:' + err);
});

db.once('open', () => {
  console.log('link to mongodb');
});

db.once('disconnect', () => {
  console.log('disconnect to mongodb');
});

module.exports = mongoose;