const m = require('../middlewares/middleware');
const express = require('express');
const router = express.Router();
const Carousel = require('../models/caruselSchema');
var multer = require('multer')
var flash = require('connect-flash');
var path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

router.get('/new', (req, res) => {
    res.render('./carouselView/carousel');
});

router.get('/upload', (req, res) => {
    res.render('./carouselView/upload');
});

router.post('/', (req, res) => {
    Carousel.create(req.body, (err, createdCarousel) => {
        res.redirect('/');
    })
});

router.get('/uploadFile', (req, res) => {
    res.render('./carouselView/uploadMulti');
});

router.post('/uploadFile', m.isAdmin, (req, res) => {
    upload = multer({ storage: storage }).single('picture');
    upload(req, res, err => {
        var newCarousel = {
            picture: req.file,
            link: req.body.link,
            sort: req.body.sort
        }
        Carousel.create(newCarousel, err => {
            res.redirect('/');
        });
    });

});

module.exports = router;