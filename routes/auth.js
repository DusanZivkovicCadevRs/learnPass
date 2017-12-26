var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/userSchema');

// show register form
router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', (req, res) => {
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
    });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) throw err;
        passport.authenticate('local')(req, res, () => {
            req.flash('success', 'uspesno registrovan');
            res.redirect('/courses');
        });
    });
});

router.get('/login', (req, res) => {
    console.log(User.schema.path('type').enumValues);
    res.render('auth/login')
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/courses',
    failureRedirect: '/',
    failureFlash: true
}), (req, res) => {
});

router.get('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        req.logOut();
        // req.flash('success', 'Logged out');
        res.redirect('/courses');
    } else {
        // moze isto ono session
        res.redirect('/courses');
    }
})

module.exports = router;