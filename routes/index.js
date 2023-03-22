const express = require('express');
const apiRouter = require('./apiRoutes.js');
const noteRouter = require('./noteRoutes.js');
const router = express.Router();

router.use('/api', apiRouter);
router.use('/', noteRouter);

module.exports = router;