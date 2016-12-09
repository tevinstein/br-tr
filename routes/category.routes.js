require('dotenv').config()
var express = require('express');
var router = express.Router();

const categoryController = require('../controller/category.controller');

var jwt = require('express-jwt');

router.get('/', jwt({secret: process.env.JWT_SECRET}), categoryController.getAllCategories)

module.exports = router;
