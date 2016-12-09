require('dotenv').config()
var express = require('express');
var router = express.Router();

const itemController = require('../controller/item.controller');

var jwt = require('express-jwt');

router.get('/', jwt({secret: process.env.JWT_SECRET}), itemController.getAllItem)
router.post('/', jwt({secret: process.env.JWT_SECRET}), itemController.postItem)
router.get('/:id', jwt({secret: process.env.JWT_SECRET}), itemController.getItem)
router.put('/:id', jwt({secret: process.env.JWT_SECRET}), itemController.editItem)
router.delete('/:id', jwt({secret: process.env.JWT_SECRET}), itemController.deleteItem)

module.exports = router;