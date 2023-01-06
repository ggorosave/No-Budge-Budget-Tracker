// This is where tell the server what data and where to render it
const router = require('express').Router();
const { Op } = require("sequelize");
const { User, Category, Transactions } = require('../models');
const { sequelize } = require('../models/User');
const withAuth = require('../utils/auth');
const { dateGetter, getStartDate, getEndDate, startDate, endDate } = require('../utils/date.js')

module.exports = router;

// Homepage/Login
router.get('/', (req, res) => {

    try {

        if (req.session.logged_in) {
            res.redirect('manage-transactions');
        }

        res.render('homepage')
    } catch (err) {
        res.status(500).json(err);
    }

});

// Sign Up page
router.get('/signup', (req, res) => {

    try {

        if (req.session.logged_in) {
            res.redirect('manage-transactions');
        }

        res.render('signup')
    } catch (err) {
        res.status(500).json(err);
    }

});

// Manage Transaction Page
router.get('/manage-transactions', withAuth, async (req, res) => {

    try {

        const transactionData = await Category.findAll({
            include: [
                {
                    model: Transactions,
                    where: {
                        user_id: req.session.user_id,
                        // transaction_date: {
                        //     [Op.between]: [startDate(), endDate()],
                        // }
                    },
                    attributes: ['transaction_date', 'amount', 'item_name']
                },
            ],

            attributes: {
                include: [
                    'category_name',
                    [sequelize.literal(`SUM(transactions.amount) OVER (PARTITION BY category_name)`), 'total']
                ]
            }
        });

        const catsData = await Category.findAll()

        const categories = await transactionData.map((category) => category.get({ plain: true }));

        const cats = await catsData.map((cat) => cat.get({ plain: true }));


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

// Route for chart-view
router.get('/chart-view', withAuth, async (req, res) => {
    try {
        res.render('chart-view', {
            user_id: req.session.user_id,
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

// Past Reports Page
router.get('/past-reports/:month', withAuth, async (req, res) => {

    try {

        const transactionData = await Category.findAll({
            include: [
                {
                    model: Transactions,
                    where: {
                        user_id: req.session.user_id,
                        transaction_date: {
                            [Op.between]: [getStartDate(req.params.month), getEndDate(req.params.month)],
                        }
                    },
                    attributes: ['transaction_date', 'amount', 'item_name']
                }
            ],
        });


        const categories = await transactionData.map((category) => category.get({ plain: true }));


        // Change page
        res.render('past-reports', {
            // transactions
            categories,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;