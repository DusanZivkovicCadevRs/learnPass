const express = require('express');
const router = express.Router();
const Course = require('../models/courseSchema');

router.get('/', (req, res) => {
    Course.find({}, (er, allCourses) => {
        if (er) res.send('Nema kurseva ima greska... ');
        res.render('showAll', {allCourses: allCourses});
    });
});

router.get('/new', (req, res) => {
    res.render('newCourse');
})

router.post('/', (req, res) => {
    let newCourse = {
        name: req.body.name,
        code: req.body.code,
        description: req.body.description,
        image: req.body.image
    };

    if (!newCourse.image) delete newCourse.image;

    Course.create(newCourse, (err, createdCourse) => {
        if (err) throw err;
        res.json(createdCourse);
    });
});

router.get('/:id', (req, res) => {
    let requestedCourseId = req.params.id;
    Course.findById(requestedCourseId, (err, result) => {
        if (err) throw err;
        res.render('showCourse', {foundCourse: result})
    });
});

router.get('/:id/edit', (req, res) => {
    let requestedCourseId = req.params.id;
    Course.findById(requestedCourseId, (err, result) => {
        if (err) throw err;
        res.render('editCourse', {foundCourse: result});
    });
});



router.put('/:id', (req, res) => {
    let updatedCourse = {
        $set: {
        name: req.body.name,
        code: req.body.code,
        description: req.body.description,
        image: req.body.image }
    };

    Course.findByIdAndUpdate(req.params.id, updatedCourse, (err, foundCourse) => {
        if (err) throw err;
        res.redirect('/courses');
    });
});

router.delete('/:id', (req, res) => {
    console.log('router delete')
    Course.findByIdAndRemove(req.params.id, (err, result) =>{
        if (err) throw err;
        res.redirect('/courses');
    });
});

module.exports = router;