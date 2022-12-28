// This is where tell the server what data and where to render it
const router = require('express').Router();
const { User, Category, Transactions } = require('../models');
const { beforeFindAfterOptions } = require('../models/User');
const withAuth = require('../utils/auth');

module.exports = router;

router.get('/', (req, res) => {

    try {

        res.render('homepage')
    } catch(err) {
        res.status(500).json(err);
    }

});

router.get('/manage-transactions', (req, res) => {

    try {

        res.render('manage-transactions')
    } catch(err) {
        res.status(500).json(err);
    }

});