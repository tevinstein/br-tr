require('dotenv').config()
var express = require('express');
var router = express.Router();

const forgotPasswordController = require('../controller/forgot_password.controller');

router.post('/', forgotPasswordController.sendRequest)
router.get('/verify_request_password/:password', forgotPasswordController.resetPassword)


module.exports = router;
