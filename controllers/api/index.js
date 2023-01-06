const router = require('express').Router();
const userRoutes = require('./userRoutes');
const transactionRoutes = require('./transactionRoutes')
const categoryRoutes = require('./categoryRoutes');

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/transactions', transactionRoutes)


module.exports = router;
