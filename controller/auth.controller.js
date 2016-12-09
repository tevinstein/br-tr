'use strict'
const models = require('../models')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const user = models.User

module.exports = {
    registerProcess: function(req, res) {
        user.create({
            username: req.body.username,
            password: crypto.createHash('md5').update(req.body.password).digest("hex"),
            email: req.body.email,
            avatar: req.body.avatar
        }).then((data) => {
            let token = jwt.sign({
                id: data.id,
                username: data.username,
                email: data.email,
                avatar: data.avatar
            }, process.env.JWT_SECRET, {expiresIn: '1h'})
            res.status(200).json(token)
        }).catch((err) => {
            res.status(500).json(err)
        })
    },
    loginProcess: function(req, res) {
        user.find({
            where: {
                username: req.body.username
            }
        }).then((data) => {
            let token = jwt.sign({
                id: data.id,
                username: data.username,
                email: data.email,
                avatar: data.avatar
            }, process.env.JWT_SECRET, {expiresIn: '1h'})
            res.status(200).json(token)
        }).catch((err) => {
            res.status(500).json(err)
        })
    }
}
