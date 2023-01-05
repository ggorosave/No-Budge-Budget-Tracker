const router = require('express').Router();
const { Category } = require('../../models');
const withAuth = require('../../utils/auth');

// route to create data
router.post('/', withAuth, async (req, res) => {
  try {
    const newCategory = await Category.create({
      ...req.body
    });

    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

//   Delete Route - For future functionality
//   router.delete('/:id', async (req, res) => {
//     try {
//       const categoryData = await Category.destroy({
//         where: {
//           id: req.params.id,
//           user_id: req.session.user_id,
//         },
//       });

//       if (!categoryData) {
//         res.status(404).json({ message: '!' });
//         return;
//       }

//       res.status(200).json(categoryData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

module.exports = router;