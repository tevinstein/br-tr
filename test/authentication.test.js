'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect
const model = require('../models')
const user = models.User
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


chai.use(chaiHttp);

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
            }, process.env.SECRET, {expiresIn: '1h'})
            console.log('register token created : ', token);
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
      user.find({
        where: {username: data.username, password: crypto.createHash('md5').update(data.password).digest("hex") }
      }).then((auth_user) => {
        let token = jwt.sign({
            id: auth_user.id,
            username: auth_user.username,
            email: auth_user.email,
            avatar: auth_user.avatar
        }, process.env.SECRET, {expiresIn: '1h'})
        console.log('login token created : ', token);
        expect(auth_user).to.not.be.null
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
