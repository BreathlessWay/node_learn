const { Router } = require('express');
const router = new Router();

router.get('/', (req, res, next) => {
    res.send('主页');
});

module.exports = router;