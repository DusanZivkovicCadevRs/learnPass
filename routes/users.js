var express = require('express');
var router = express.Router();
var User = require('../models/userSchema');

/* all users listing. */
router.get('/', (req, res) => {
  User.find({}, (err, result) => {
    if (err) res.send('Nema korisnika ima greska');
    res.render('./userView/showUser', { foundUsers: result });
  });
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

module.exports = router;
