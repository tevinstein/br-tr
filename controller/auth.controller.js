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
            }, process.env.JWT_SECRET, {expiresIn: '168h'})
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
            }, process.env.JWT_SECRET, {expiresIn: '168h'})
            res.status(200).json(token)
        }).catch((err) => {
            res.status(500).json(err)
        })
    },
    editPassword: function(req, res) {
      user.update({
        password: crypto.createHash('md5').update(req.body.password).digest("hex")
      }, {
        fields: ['password'],
        where: {id: req.params.id}
      }).then(()=> {
        res.status(200)
      }).catch((err)=> {
        console.log(err);
        res.status(500)
      })
    },
    editAvatar: function(req, res) {
      user.update({
        avatar: req.body.avatar
      }, {
        where: {id: req.params.id}
      }).then((data)=> {
        res.status(200).json(data)
      }).catch((err)=> {
        console.log(err);
        res.status(500).json(err)
      })

    },

    getUserById: function(req, res) {
        user.findOne({
            where: {
                id: req.params.id
            }
        }).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500).json(err)
        })

    },

    editProfile: function(req, res) {
        if(req.body.password) {
            user.update({
                avatar: req.body.avatar,
                password: crypto.createHash('md5').update(req.body.password).digest("hex")
            }, {
                where: {id: req.params.id}
            }).then((data)=> {
                res.status(200).json(data)
            }).catch((err)=> {
                console.log(err);
                res.status(500).json(err)
            })
        }
        else {
            user.update({
                avatar: req.body.avatar
            }, {
                where: {id: req.params.id}
            }).then((data)=> {
                res.status(200).json(data)
            }).catch((err)=> {
                console.log(err);
                res.status(500).json(err)
            })
        }

    }
}
