const models = require('../models')
const User = models.User
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const runSeedTest = require('../seed/seedForTesting')
const urlApi = 'http://localhost:3000/api'
const decode = require('jwt-decode')

describe("Test for forgot password", () => {
    before(function(done) {
        runSeedTest.runSeedTest(done)

    })

    describe("Send request for reset password", () => {
        it("Expect to send request to reset password", (done) => {
            chai.request(urlApi)
                .get('/forgot_password')
                .send({
                    email: 'dharmadi93@gmail.com'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    done()
                })
        })
    })

    describe("reset password", () => {
        it("Expect to get new random password", (done) => {
            User.findOne({
                where: {
                    email: 'dharmadi93@gmail.com'
                }
            }).then((data) => {
                const oldPass = data.password
                chai.request(urlApi)
                    .get(`/forgot_password/verify_request_password/${oldPass}`)
                    .end((err, res) => {
                        expect(res).to.have.status(200)
                        expect(res.body).not.to.equal(oldPass)
                        done()
                    })
            })
        })
    })
})