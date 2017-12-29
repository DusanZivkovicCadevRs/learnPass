var express = require('express');
var router = express.Router();
var Carousel = require('../models/caruselSchema');

/* GET home page. */
router.get('/', function (req, res, next) {
  Carousel.find({}, (err, allCarousels) => {
    if (err) throw err;
    res.render('index', { title: 'Express', allCarousels: allCarousels });
  })
});

module.exports = router;
