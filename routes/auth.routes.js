var express = require('express');
var router = express.Router();

const authController = require('../controller/auth.controller');
var jwt = require('express-jwt');

const passport = require('passport');

router.get('/auth/user/:id', jwt({secret: process.env.JWT_SECRET}), authController.getUserById)
router.post('/auth/register', authController.registerProcess)
router.post('/auth/login', passport.authenticate('local'), authController.loginProcess)
router.put('/auth/edit_password/:id', jwt({secret: process.env.JWT_SECRET}), authController.editPassword)
router.put('/auth/edit_avatar/:id', jwt({secret: process.env.JWT_SECRET}), authController.editAvatar)
router.put('/auth/edit_profile/:id', jwt({secret: process.env.JWT_SECRET}), authController.editProfile)

module.exports = router;
