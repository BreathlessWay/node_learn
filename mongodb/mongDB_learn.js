/**
 * Created by Administrator on 2017/7/11.
 */
const mongoose = require('mongoose');
mongoose.Promise = require('q').Promise; //为mongoose添加promise
mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true
  /* other options */
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('link');
});

const Cat = mongoose.model('Cat', {name: String});
const kitty = new Cat({name: 'ggg'});
kitty.save()
    .then(() => {
      mongoose.disconnect();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      console.log('哈哈');
    });
