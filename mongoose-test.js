/**
 * Created by Administrator on 2017/7/13.
 */

const mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/mongooseTest', {
  useMongoClient: true
});

const db = mongoose.connection;
db.on('error', (err) => {
  console.log(err);
});
db.once('open', () => {
  console.log('link to mongodb');
});

const TestSchema = mongoose.Schema({
  title: String,
  content: String
});

TestSchema.methods.layout = function() {
  console.log(this.title + '--' + this.content);
};

const TestModal = mongoose.model('mongoose', TestSchema);

const testData = new TestModal({
  title: 'morning',
  content: 'this is mongoose test'
});

testData.save()
    .then(res => {
      console.log(res);
      testData.layout();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      mongoose.disconnect();
      console.log('link finish');
    });