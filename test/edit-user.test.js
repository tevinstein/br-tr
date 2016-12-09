'use strict'
require('dotenv').config()
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect
const model = require('../models')
const user = model.User
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const decode = require('jwt-decode');
const urlApi = 'http://localhost:3000/api'

chai.use(chaiHttp);

describe.only("test for user change password", () => {

    before(function(done) {
        user.destroy({where: {}}).then(() => {
            console.log('all data deleted before test');
            done()
        })
    })

    after(function(done) {
        user.destroy({where: {}}).then(() => {
            console.log('all data deleted after test');
            done()
        })
    })

    describe('Edit user password direct to database', function() {
        it('expect to return new edited user password', function(done) {
            user.create({username: 'user_testing_for_change_password', email: 'user@testing.com', password: crypto.createHash('md5').update('userpassword').digest("hex"), avatar: 'http://dummy-avatar-image.com'}).then((data) => {
                user.update({
                    password: crypto.createHash('md5').update('newuserpassword').digest("hex")
                }, {
                    fields: ['password'],
                    where: {
                        id: data.id
                    }
                }).then(() => {
                    user.findOne({
                        where: {
                            id: data.id
                        }
                    }).then((user_data) => {
                        expect(user_data.password).to.be.equal(crypto.createHash('md5').update('newuserpassword').digest("hex"))
                        done()
                    })
                })
            })
        })
    })

    describe('Try to Edit user password without login via route "/auth/edit_password"', function() {
        it('Expect to return status 401 (Unauthorized user)', function(done) {
            user.create({username: 'user_testing_for_change_password_via_api', email: 'user_via_api@testing.com', password: crypto.createHash('md5').update('userpassword').digest("hex"), avatar: 'http://dummy-avatar-image.com'}).then((data) => {
                chai.request(urlApi).put('/auth/edit_password/' + data.id).send({password: crypto.createHash('md5').update('newuserpasswordviaapi').digest("hex")}).end(function(req, res) {
                    expect(401).to.be.equal(res.status)
                    done()
                })
            })
        })
    })

    describe('Edit user password after login via route "/auth/edit_password"', function() {
        it('Expect to return status 200', function(done) {
            user.create({username: 'authorized_user_for_change_password_via_api', email: 'authorized_user@testing.com', password: crypto.createHash('md5').update('authorizeduserpassword').digest("hex"), avatar: 'http://dummy-avatar-image.com'}).then((data) => {
                chai.request(urlApi).post('/auth/login').send({username: data.username, password: 'authorizeduserpassword'}).end((err, res) => {
                    const userDecoded = decode(res.body)
                    user.findOne({
                        where: {
                            id: data.id
                        }
                    }).then((one_user) => {
                        chai.request(urlApi).put('/auth/edit_password/' + one_user.id).send({password: crypto.createHash('md5').update('newuserpasswordviaapi').digest("hex")}).set({authorization: `Bearer ${res.body}`}).end(function(req, res) {
                            expect(200).to.be.equal(res.status)
                        })
                    })
                    done()
                })
            })
        })
    })
})
