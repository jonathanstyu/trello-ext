var express = require('express');
var router = express.Router();
var config = require('../config/trelloKey');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Trello-Extended',
    developerKey: config.developerKey
  });
});

module.exports = router;
