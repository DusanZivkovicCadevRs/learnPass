const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const Course = require('../models/courseSchema');

router.post('/add/:courseId', (req, res) => {
    Course.findById(req.params.courseId, (err, foundCourse) => {
        if (err) throw err;
        User.findById(req.user.id, (err, foundUser) => {
            if (err) err;
            foundCourse.students.push({ data: foundUser._id });
            foundCourse.save();
            foundUser.courses.push(foundCourse._id);
            foundUser.save();
            req.flash('success', 'uspesno prijavljen');
            res.redirect('/courses');
        })
    })
});

router.post('/unroll/:cid', (req, res) => {
    Course.findById(req.params.cid, (err, foundCourse) => {
        if (err) throw err;
        User.findById(req.user.id, (err, foundUser) => {
            if (err) throw err;
            mongoose.model('Course').update(
                {_id: foundCourse._id},
                {$pull: {students: {data: foundUser._id}}},
                function(err, numAffected) { console.log('broj obrisanih je:' + numAffected) }
            );
            // foundCourse.students.pull({ 'data': foundUser._id });
            // foundCourse.save();
            foundUser.courses.pull({ _id: foundCourse._id });
            foundUser.save();
            req.flash('success', 'Uspesno ste se ispisali sa kursa, i zivota...');
            res.redirect('/courses');
        })
    })
});

// show 

module.exports = router;