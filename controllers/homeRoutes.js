// This is where tell the server what data and where to render it
const router = require('express').Router();
const { User, Category, Transactions } = require('../models');
const { beforeFindAfterOptions } = require('../models/User');
const withAuth = require('../utils/auth');

module.exports = router;

// Homepage/Login
router.get('/', (req, res) => {

    try {

        res.render('homepage')
    } catch(err) {
        res.status(500).json(err);
    }

});

// Sign Up page
router.get('/signup', (req, res) => {

    try {

        res.render('signup')
    } catch(err) {
        res.status(500).json(err);
    }

});

// Manage Transaction Page
router.get('/manage-transactions', async (req, res) => {

    try {
        const transactionData = await Transactions.findAll({
            where: {
                // TODO: pull the user id from the session (i.e. req.session.user_id)
                user_id: 1
            },
            include: [
                {
                    model: Category
                }
            ]
        });

        const transactions = await transactionData.map((transaction) => transaction.get({ plain: true }));

        console.log(transactions);

        res.render('manage-transactions')
    } catch(err) {
        res.status(500).json(err);
    }

});