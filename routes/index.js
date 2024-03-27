const router = require('express').Router();
const apiRouter = require('./api/');

router.post('/seed', require('../seed/seed'));
router.use('/api', apiRouter);

module.exports = router;