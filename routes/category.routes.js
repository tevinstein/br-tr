require('dotenv').config()
var express = require('express');
var router = express.Router();

const categoryController = require('../controller/category.controller');

var jwt = require('express-jwt');

router.get('/', categoryController.getAllCategories)
router.get('/:CategoryId', jwt({secret: process.env.JWT_SECRET}), categoryController.searchByCategory)

module.exports = router;
