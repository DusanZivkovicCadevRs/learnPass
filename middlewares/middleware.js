var Course = require('../models/courseSchema');
var User = require('../models/userSchema');

// fora je sto cu da mu prikacim stvari
// jer export exportuje jednu stvar
var m = {}

m.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error', 'Nisi ulogovan...');
        res.redirect('/auth/login');
    }
};

m.isStudent = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.type == 'student')
            return next();
        else res.redirect('back');
    } else {
        req.flash('error', 'nisi ulogovan student');
        res.redirect('/auth/login');
    }
}

m.isAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.type == 'admin')
            return next();
        else res.redirect('back');
    } else {
        req.flash('error', 'nisi ulogovan adminj');
        res.redirect('/auth/login');
    }
}

m.isTeacher = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.type == 'teacher' || req.user.type == 'admin')
            return next();
        else res.redirect('back');
    } else {
        req.flash('error', 'nisi ulogovan adminj');
        res.redirect('/auth/login');
    }
}

m.checkCourseOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Course.findById(req.params.id, (err, foundCourse) => {
            if (err || !foundCourse) {
                req.flash('error', 'Nema takvog kursa');
                res.redirect('/courses');
            } else {
                if (foundCourse.teacher.equals(req.user.id) || req.user.type == 'admin') {
                    return next();
                } else {
                    req.flash('error', 'Nisi ti kreirao ti ovaj kurs...');
                    res.redirect('/courses');
                }
            }
        })
    } else {
        req.flash('error', 'nisi ni logovan...');
        res.redirect('/auth/login');
    }
}

m.checkUserOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        User.findById(req.params.id, (err, foundUser) => {
            if (err || !foundUser) {
                req.flash('error', 'Nema takvog korisnika');
                res.redirect('/');
            } else {
                if (foundUser.id == req.user.id || req.user.type == 'admin') {
                    return next();
                }
            }
        })
    } else {
        req.flash('error', 'nisi logovan...');
        res.redirect('/auth/login');
    }
};

m.checkIfEnrolled = (req, res, next) => {
    Course.findById(req.params.id, (err, foundCourse) => {
        if (err) throw err;
        User.findById(req.user.id, (err, foundCourse) => {
            if (err) throw err;

        })
    })
}

module.exports = m;