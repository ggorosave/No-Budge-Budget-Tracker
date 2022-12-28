// Boiler-plate code ***Will need to be updated!*** 
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
