// Boiler-plate code ***Will need to be updated!*** 
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const catgoryRoutes = require('./categoryRoutes');

router.use('/users', userRoutes);
router.use('/categories', catgoryRoutes);

module.exports = router;
