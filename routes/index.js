const router = require('express').Router();
const apiRouter = require('./api/');

router.patch('/seed', require('../seed/seed'));
router.use('/api', apiRouter);

module.exports = router;