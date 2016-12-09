var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({'message': 'welcome to api!'});
});

module.exports = router;
