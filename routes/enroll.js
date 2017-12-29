const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const Course = require('../models/courseSchema');
const m = require('../middlewares/middleware');

router.post('/add/:courseId', m.isStudent, (req, res) => {
    Course.findById(req.params.courseId, (err, foundCourse) => {
        if (err) throw err;
        if (foundCourse.students.findIndex(e => {
            return e.data.equals(req.user.id)
        }) == -1) {
            User.findById(req.user.id, (err, foundUser) => {
                if (err) err;
                foundCourse.students.push({ data: foundUser._id });
                foundCourse.save();
                foundUser.courses.push(foundCourse._id);
                foundUser.save();
                req.flash('success', 'uspesno prijavljen');
                res.redirect('/courses');
            })
        } else {
            req.flash('error', 'niste validan korisnik');
            res.redirect('/courses');
        }
    })
});

router.post('/unroll/:cid', (req, res) => {
    Course.findById(req.params.cid, (err, foundCourse) => {
        if (err) throw err;
        if (foundCourse.students.findIndex(e => {
            return e.data.equals(req.user.id)
        }) > -1) {
            User.findById(req.user.id, (err, foundUser) => {
                if (err) throw err;
                var i = foundCourse.students.findIndex(e => e.data == foundUser._id);
                foundCourse.students.splice(i, 1);
                foundCourse.save();
                // mongoose.model('Course').update(
                //     { _id: foundCourse._id },
                //     { $pull: { students: { data: foundUser._id } } }
                // );
                // // foundCourse.students.pull({ 'data': foundUser._id });
                // foundCourse.save();
                foundUser.courses.pull({ _id: foundCourse._id });
                foundUser.save();
                req.flash('success', 'Uspesno ste se ispisali sa kursa, i zivota...');
                res.redirect('/courses');
            })
        }else {
            req.flash('error', 'niste validan korisnik');
            res.redirect('/courses');
        }

    })
});

// provera da li je vec u kursu, zastita od postmana


module.exports = router;