module.exports = function (app) {
  app.get('/', (req, res, next) => {
    res.redirect('/posts');
  });
  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
  app.use('/posts', require('./posts'));
};