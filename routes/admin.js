const m = require('../middlewares/middleware');
const express = require('express');
const nudes = express.Router();
const Carousel = require('../models/caruselSchema');
const User = require('../models/userSchema');
const Course = require('../models/courseSchema');
const flash = require('connect-flash');

nudes.get('/courses', m.isAdmin, (req, res) => {
    Course.find({}, (err, allCourses) => {
        flash('success', 'svi kursevi:');
        res.render('./admin/allCourses', { allCourses: allCourses });
    });
});

// create new course

// edit course

// delete course
nudes.get('/courses/delete/:courseId', m.isAdmin, (req, res) => {
    Course.findByIdAndRemove(req.params.courseId, err => {
        if (err) throw err;
        flash('success', 'obrisan kurs');
        res.redirect('/');
    });
});

nudes.get('/teacher/:courseId', m.isAdmin, (req, res) => {
    Course.findById(req.params.courseId, (err, foundCourse) => {
        if (err) throw err;
        User.find({ type: 'teacher' }).populate('User').exec( (err, foundTeachers) => {
            flash('success', 'promeni nastavnika');
            res.render('./admin/changeTeacher', { foundCourse: foundCourse, foundTeachers: foundTeachers });
        })
    })
});

nudes.get('/users', m.isAdmin, (req, res) => {
    User.find({}, (err, allUsers) => {
        if(err) throw err;
        res.render('./userView/showUsers', {foundUsers: allUsers});
    })
})

module.exports = nudes;