require('dotenv').config()
var express = require('express');
var router = express.Router();

const messageController = require('../controller/message.controller');

var jwt = require('express-jwt');

router.get('/:ItemMessageId', jwt({secret: process.env.JWT_SECRET}), messageController.getAllMessage)
router.get('/itemMessage/:ItemId', jwt({secret: process.env.JWT_SECRET}), messageController.getAllItemMessage)
router.post('/', jwt({secret: process.env.JWT_SECRET}), messageController.createMessage)
router.post('/itemMessage', jwt({secret: process.env.JWT_SECRET}), messageController.createItemMessage)


module.exports = router;
