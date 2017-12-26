const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const Course = require('../models/courseSchema');

router.post('/add/:courseId', (req, res) => {
    console.log('eo me u ruta za add me to course');
    Course.findById(req.params.courseId, (err, foundCourse) => {
        console.log('eo me u /add/courseid=', foundCourse.id);
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

// show 

module.exports = router;