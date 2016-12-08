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
    it('expect to return user property and value', function(done) {
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
          expect(token).to.have.property('id')
          expect(token).to.have.property('username')
          expect(token).to.have.property('email')
          expect(token).to.have.property('avatar')
          expect(token.username).to.be.equal('user_testing')
          expect(token.email).to.be.equal('user@testing.com')
          expect(token.password).to.not.equal('userpassword')
          expect(token.avatar).to.be.equal('http://dummy-avatar-image.com')
        }).catch((err) => {
          console.log('Error : ', err);
        })
    })
})
