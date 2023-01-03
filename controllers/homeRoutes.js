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
    } catch (err) {
        res.status(500).json(err);
    }

});

// Sign Up page
router.get('/signup', (req, res) => {

    try {

        res.render('signup')
    } catch (err) {
        res.status(500).json(err);
    }

});

// Manage Transaction Page
router.get('/manage-transactions', async (req, res) => {

    try {
        
        const transactionData = await Category.findAll({
            include: [
                {
                    model: Transactions,
                    where: {
                        // TODO: pull the user id from the session (i.e. req.session.user_id)
                        user_id: req.session.user_id
                    },
                    attributes: ['transaction_date', 'amount', 'item_name']
                }
            ],
        });

        const categories = await transactionData.map((category) => category.get({ plain: true }));

        res.render('manage-transactions', {
            // transactions
            categories
        });
    } catch (err) {
        res.status(500).json(err);
    }

});