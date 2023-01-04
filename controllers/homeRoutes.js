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
router.get('/manage-transactions', withAuth,  async (req, res) => {

    try {
        
        const transactionData = await Category.findAll({
            include: [
                {
                    model: Transactions,
                    where: {
                        user_id: req.session.user_id
                    },
                    attributes: ['transaction_date', 'amount', 'item_name']
                }
            ],
        });

        const catsData = await Category.findAll()

        
        const categories = await transactionData.map((category) => category.get({ plain: true }));

        const cats = await catsData.map((cat) => cat.get({ plain: true }));
        
        console.log(cats);

        res.render('manage-transactions', {
            // transactions
            categories,
            cats,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }

});