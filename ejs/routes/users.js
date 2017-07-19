const router = require('express').Router();

router.get('/:name', (request, response) => {
  console.log(request.baseUrl);
  console.log(request.ip);
  console.log(request.hostname);
  console.log(request.originalUrl);
  console.log(request.path);
  console.log(request.protocol);
  response.render('users', {
    name: request.params.name
  });
});

module.exports = router;