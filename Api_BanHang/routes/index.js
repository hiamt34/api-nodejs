var express = require('express');
var router = express.Router();
const data= require('./../datastort.json');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(data);
});

module.exports = router;
