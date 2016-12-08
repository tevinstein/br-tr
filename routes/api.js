var express = require('express');
var router = express.Router();

const authController = require('../controller/auth.controller');

const passport = require('passport');

router.post('/auth/register', authController.registerProcess)
router.post('/auth/login', passport.authenticate('local'), authController.loginProcess)

module.exports = router;
