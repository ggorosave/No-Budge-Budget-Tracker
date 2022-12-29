// Boiler-plate code ***Will need to be updated!*** 
const router = require('express').Router();
const { json } = require('express');
const { User, Category, Transactions } = require('../../models');

// DELETE - For Grant's reference only
router.get('/', async (req, res) => {
  try {
    
    const userData = await User.findAll({
      include: [{ model: Transactions }]
    });
    
    res.status(200).json(userData);
  } catch(err) {
    res.status(500).json(err)
  }
});

router.get('/transactions', async (req, res) => {
  try {
    
    const transactionData = await Transactions.findAll({
      include: [{ model: Category }]
    });

    const transactions = await transactionData.map((category) => category.get({ plain: true }));
    
    console.log(transactions)
    
    res.status(200).json(transactionData);
  } catch(err) {
    res.status(500).json(err)
  }
});

router.get('/categories', async (req, res) => {
  try {
    
    const transactionData = await Category.findAll({
      include: [
        { 
          model: Transactions,
          where: {
            user_id: 1
          },
          attributes: ['transaction_date', 'amount', 'item_name']
        }
      ],
    });

    const categories = await transactionData.map((category) => category.get({ plain: true }));
    // const transactions = await transactionData.map((category) => category.transactions.map((transaction) => transaction.get({ plain: true })));
    // const transactions = await transactionData.map((category) => category.transactions.map((transaction) => transaction.get({ plain: true })));

    console.info(categories)
    // console.log(transactions)
    // console.log(newArr)

    
    
    res.status(200).json(transactionData);
  } catch(err) {
    res.status(500).json(err)
  }
});
// ^^^DELETE - For Grant's reference only^^^

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;