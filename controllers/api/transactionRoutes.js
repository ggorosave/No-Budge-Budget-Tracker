const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Category, Transactions } = require('../../models');
const withAuth = require('../../utils/auth');


// Post Route
router.post('/', withAuth, async (req, res) => {
  try {
    const newTransaction = await Transactions.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTransaction);
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to get transaction data
router.get('/', async (req, res) => {
  try {

    const transactionData = await Category.findAll({
      include: [
        {
          model: Transactions,
          where: {
            user_id: 1,
            // Limits data to retrieve transactions only from this month
            // transaction_date: {
            //     [Op.between]: [startDate(), endDate()],
            // }
          },
          attributes: ['transaction_date', 'amount', 'item_name'],

        },

      ],

      attributes: {
        include: [
          'category_name',
          [sequelize.literal(`SUM(transactions.amount) OVER (PARTITION BY category_name)`), 'total']
        ]
      }
    });

    res.status(200).json(transactionData);

  } catch (err) {
    res.status(500).json(err);
  }
})

//   Delete Route - For future functionality
//   router.delete('/:id', withAuth, async (req, res) => {
//     try {
//       const transactionData = await Transactions.destroy({
//         where: {
//           id: req.params.id,
//           user_id: req.session.user_id,
//         },
//       });

//       if (!transactionData) {
//         res.status(404).json({ message: '!' });
//         return;
//       }

//       res.status(200).json(transactionData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

module.exports = router;