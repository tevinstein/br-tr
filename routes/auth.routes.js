var express = require('express');
var router = express.Router();

const authController = require('../controller/auth.controller');
var jwt = require('express-jwt');

const passport = require('passport');

router.post('/auth/register', authController.registerProcess)
router.post('/auth/login', passport.authenticate('local'), authController.loginProcess)
router.put('/auth/edit_password/:id', jwt({secret: process.env.JWT_SECRET}), authController.editPassword)

module.exports = router;
