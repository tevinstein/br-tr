require('dotenv').config()
var express = require('express');
var router = express.Router();

const messageController = require('../controller/message.controller');

var jwt = require('express-jwt');

router.get('/', jwt({secret: process.env.JWT_SECRET}), messageController.getAllMessage)
router.post('/', jwt({secret: process.env.JWT_SECRET}), messageController.createMessage)


module.exports = router;
