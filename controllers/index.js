const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes')

router.use('/', homeRoutes);
router('/api', apiRoutes);

module.exports = router;