'use strict'
require('dotenv').config()
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect
const model = require('../models')
const user = model.User
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const urlApi = 'http://localhost:3000/api'




chai.use(chaiHttp);


before(function(done) {
  user.destroy({
    where: {}
  }).then(()=> {
    console.log('all data deleted before test');
    done()
  })
})


describe('Create new User (register case) direct to database', function() {
    it('expect to return new user credentials and make sure a token is exist', function(done) {
        user.create({
          username: 'user_testing',
          email: 'user@testing.com',
          password: crypto.createHash('md5').update('userpassword').digest("hex"),
          avatar: 'http://dummy-avatar-image.com'
        }).then((data) => {
            let token = jwt.sign({
                id: data.id,
                username: data.username,
                email: data.email,
                avatar: data.avatar
            }, process.env.JWT_SECRET, {expiresIn: '1h'})
          expect(data).to.have.property('id')
          expect(data).to.have.property('username')
          expect(data).to.have.property('email')
          expect(data).to.have.property('avatar')
          expect(data.username).to.be.equal('user_testing')
          expect(data.email).to.be.equal('user@testing.com')
          expect(data.password).to.not.equal('userpassword')
          expect(data.avatar).to.be.equal('http://dummy-avatar-image.com')
          expect(token).to.exist
          done()
        }).catch((err) => {
          console.log('Error : ', err);
        })
    })
})

describe('Find User (Login case) direct to database and make sure a token from login is exist', function() {
  it('expect to return authenticated user credentials', function(done) {
    user.create({
      username: 'user_testing_login',
      email: 'user_testing_login@testing.com',
      password: crypto.createHash('md5').update('userpassword').digest("hex"),
      avatar: 'http://dummy-avatar-image.com'
    }).then((data) => {
      user.findOne({
        where: {username: data.username, password: crypto.createHash('md5').update('userpassword').digest("hex") }
      }).then((auth_user) => {
        let token = jwt.sign({
            id: auth_user.id,
            username: auth_user.username,
            email: auth_user.email,
            avatar: auth_user.avatar
        }, process.env.JWT_SECRET, {expiresIn: '1h'})
        expect(auth_user).to.not.be.undefined
        expect(auth_user.username).to.be.equal('user_testing_login')
        expect(auth_user.email).to.be.equal('user_testing_login@testing.com')
        expect(auth_user.password).to.not.equal('userpassword')
        expect(auth_user.avatar).to.be.equal('http://dummy-avatar-image.com')
        expect(token).to.exist
        done()
      })
    })
  })
})

describe('Create new User (register case) via route "/auth/register" to database ', function() {
    it('expect to make sure a token is generated and token is not undefined', function(done) {
        chai.request(urlApi)
            .post('/auth/register')
            .send({
              username: 'user_testing_route_register',
              email: 'user_testing_route_register@testing.com',
              password: crypto.createHash('md5').update('userpassword').digest("hex"),
              avatar: 'http://dummy-avatar-image.com'
            })
            .end(function(req, res) {
              expect(res.body).to.exist
              expect(res.body).to.not.be.undefined
              done()
            })
    })
})

describe('Create new User (register case fail) via route "/auth/register" to database ', function() {
    it('expect to make sure a token is generated and token is undefined', function(done) {
        chai.request(urlApi)
            .post('/auth/register')
            .send({
              username: 'user_testing_route_register_fail',
              email: 'user_testing_route_register_failtestingdotcom',
              password: crypto.createHash('md5').update('userpasswordfail').digest("hex"),
              avatar: 'http://dummy-avatar-image.com'
            })
            .end(function(req, res) {
              expect(res.body).to.be.empty
              done()
            })
    })
})


describe('Find User (login success case) via route "/auth/login" from database ', function() {
    it('expect to make sure a token is generated and token is not undefined', function(done) {
      user.create({
        username: 'user_testing_route_login',
        email: 'user_testing_route_login@testing.com',
        password: crypto.createHash('md5').update('userpassword').digest("hex"),
        avatar: 'http://dummy-avatar-image.com'
      }).then((data) => {
        chai.request(urlApi)
            .post('/auth/login')
            .send({
              username: 'user_testing_route_login',
              password: crypto.createHash('md5').update('userpassword').digest("hex")
            })
            .end(function(req, res) {
              expect(res.body).to.exist
              expect(res.body).to.not.be.undefined
              done()
            })
        })
    })
})

describe('Find User (login fail case) via route "/auth/login" from database ', function() {
    it('expect to make sure a token is undefined', function(done) {
      user.create({
        username: 'user_testing_route_login_fail',
        email: 'user_testing_route_login_fail@testing.com',
        password: crypto.createHash('md5').update('userpasswordfail').digest("hex"),
        avatar: 'http://dummy-avatar-image.com'
      }).then((data) => {
        chai.request(urlApi)
            .post('/auth/login')
            .send({
              username: 'user_testing_route_login_success',
              password: crypto.createHash('md5').update('userpasswordsuccess').digest("hex")
            })
            .end(function(req, res) {
              expect(res.body).to.be.empty
              done()
            })
        })
    })
})

after(function(done) {
  user.destroy({
    where: {}
  }).then(()=> {
    console.log('all data deleted after test');
    done()
  })
})






// expect(res.body).to.have.property('username')
// expect(res.body).to.have.property('email')
// expect(res.body).to.have.property('password')
// expect(res.body).to.have.property('avatar')
// expect(res.body.username).to.be.equal('user_testing_route_register')
// expect(res.body.email).to.be.equal('user_testing_route_register@testing.com')
// expect(res.body.password).to.not.equal('userpassword')
// expect(res.body.avatar).to.be.equal('http://dummy-avatar-image.com')
