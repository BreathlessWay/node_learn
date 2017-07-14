const router = require('express').Router();

router.get('/:name', (request, response) => {
  response.render('users', {
    name: request.params.name
  });
});

module.exports = router;