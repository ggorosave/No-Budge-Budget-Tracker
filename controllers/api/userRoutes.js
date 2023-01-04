// Boiler-plate code ***Will need to be updated!*** 
const router = require('express').Router();
const { User } = require('../../models');

// signup route (delete)
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

// Login route
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

// Signup Route
router.post('/signup', async (req, res) => {
    try {

      if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'You must enter an email and password to sign up. '})
      }

      const userData = await User.create(req.body)

      req.session.save(() => {
        req.session.user_id = userData.id
        req.session.logged_in = true
        res.json({ user: userData, message: 'Your profile has been created.'})
      })
    } catch (err) {
      res.status(500).json(err)
    }
});

// logout route
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