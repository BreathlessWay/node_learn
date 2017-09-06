/**
 * 
 * @authors BreathlessWay (731005087@qq.com)
 * @date    2017-09-06 15:02:19
 * @version $Id$
 */

const { Router } = require('express');
const router = new Router();

router.get('/', (req, res) => {
    if (req.session.user) {
        res.render('index', {
            user: req.session.user
        })
    } else {
        res.render('index', {
            user: null
        })
    }
})

module.exports = router;