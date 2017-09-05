const { Router } = require('express');
const router = new Router();

router.get('/user/:name', (req, res, next) => {
    res.send(req.params.name);
});

module.exports = router