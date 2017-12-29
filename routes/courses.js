const express = require('express');
const router = express.Router();
const Course = require('../models/courseSchema');
const Carousel = require('../models/caruselSchema');
const m = require('../middlewares/middleware');

// show all courses
router.get('/', (req, res) => {
    Course.find({}, (er, allCourses) => {
        if (er) throw er
        Carousel.find({}, (err, allCarousels) => {
            if (err) res.send('Nema kurseva ima greska... ');
            res.render('showAll', { allCourses: allCourses, allCarousels: allCarousels});
        })
    });
});

// go to newly created course
router.get('/new', m.isTeacher, (req, res) => {
    res.render('newCourse');
})

// make new course
router.post('/', m.isTeacher, (req, res) => {
    req.body.teacher = req.user._id;
    let newCourse = {
        name: req.body.name,
        code: req.body.code,
        description: req.body.description,
        image: req.body.image,
        teacher: req.body.teacher
    };
    if (!newCourse.image) delete newCourse.image;
    Course.create(newCourse, (err, createdCourse) => {
        if (err) throw err;
        res.render('showCourse', { foundCourse: createdCourse });
    });
});

// show ruta kursa
router.get('/:id', (req, res) => {
    let requestedCourseId = req.params.id;
    Course.findById(req.params.id)
        .populate('students.data')
        .exec((err, result) => {
            if (err) throw err;
            res.render('showCourse', { foundCourse: result })
        });
});

// edit this
router.get('/:id/edit', m.checkCourseOwnership, (req, res) => {
    let requestedCourseId = req.params.id;
    Course.findById(requestedCourseId, (err, result) => {
        if (err) throw err;
        res.render('editCourse', { foundCourse: result });
    });
});

// update
router.put('/:id', m.checkCourseOwnership, (req, res) => {

    let updatedCourse = {
        $set: {
            teacher: req.body.newTeacher
        }
    };

    Course.findByIdAndUpdate(req.params.id, updatedCourse, (err, foundCourse) => {
        if (err) throw err;
        res.redirect('/courses');
    });
});

router.delete('/:id', m.checkCourseOwnership, (req, res) => {
    console.log('router delete')
    Course.findById(req.params.id, (err, result) => {
        if (err) throw err;
        result.remove();
        res.redirect('/courses');
    });
});

module.exports = router;