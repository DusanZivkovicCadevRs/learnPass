var express = require('express');
var router = express.Router();
var User = require('../models/userSchema');
var m = require('../middlewares/middleware');

/* all users listing. */
router.get('/', (req, res) => {
  User.find ({}, (err, result) => {
    if (err) res.send('Nema korisnika ima greska');
    res.render('./userView/showUser', { foundUsers: result });
  })
});

/* render for register */
router.get('/register', (req, res) => {
  res.render('./userView/registerUser', {})
});

/* for create */
router.post('/', (req, res) => {
  User.create(req.body, (err, result) => {
    if (err) throw err;
    res.redirect('/users');
  })
})

// show one
router.get('/:id', m.checkUserOwnership, (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if (err) throw err;
    res.render('./userView/showUser', {foundUser: foundUser});
  })
})

// Edit ruta
router.put('/:id', m.checkUserOwnership, (req, res) => {
  let updatedUser = {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }
  };
  req.body.image === '' ? updatedUser.$unset = { image: '' } : updatedUser.$set.image = req.body.image;
  User.findByIdAndUpdate(req.user.id, updatedUser, (err, foundUser) => {
    if (err) throw err;
    res.redirect('/courses');
  });
});

module.exports = router;
