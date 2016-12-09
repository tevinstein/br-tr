const app = require('../app')
const models = require('../models')
const Message = models.Message
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const runSeedTest = require('../seed/seedForTesting')
const urlApi = 'http://localhost:3000/api'

describe("Test for read all messages", () => {

    before(function(done) {
        runSeedTest.runSeedTest(done)

    })

    describe("read all messages before login", () => {
        it("Expect to return 401", (done) => {
            chai.request(urlApi)
                .post('/auth/login')
                .end((err, res) => {
                    chai.request(urlApi)
                        .get('/messages')
                        .end((err, res) => {
                            expect(res).to.have.status(401)
                            done()
                        })
                })
        })
    })

    describe("read all messages login empty", () => {
        it("Expect to return 401", (done) => {
            chai.request(urlApi)
                .post('/auth/login')
                .end((err, res) => {
                    chai.request(urlApi)
                        .get('/messages')
                        .set({authorization: `Bearer ${res.body}`})
                        .end((err, res) => {
                            expect(res).to.have.status(401)
                            done()
                        })
                })
        })
    })

    describe("read all messages login with wrong pass or username", () => {
        it("Expect to return 401", (done) => {
            chai.request(urlApi)
                .post('/auth/login')
                .send({
                    username: 'aa',
                    password: 'bb'
                })
                .end((err, res) => {
                    chai.request(urlApi)
                        .get('/messages')
                        .set({authorization: `Bearer ${res.body}`})
                        .end((err, res) => {
                            expect(res).to.have.status(401)
                            done()
                        })
                })
        })
    })

    describe("read all messages after login", () => {
        it("Expect to return all messages", (done) => {
            chai.request(urlApi)
                .post('/auth/login')
                .send({
                    username: 'dharmadi',
                    password: 'dharmadi'
                })
                .end((err, res) => {
                    chai.request(urlApi)
                        .get('/messages')
                        .set({authorization: `Bearer ${res.body}`})

                        .end((err, res) => {
                            expect(res).to.have.status(200)
                            expect(res.body).that.is.an('array')
                            expect(res.body[0]).to.haveOwnProperty('id')
                            expect(res.body[0]).to.haveOwnProperty('TempMessageId')
                            expect(res.body[0]).to.haveOwnProperty('ItemMessageId')
                            expect(res.body[0]).to.haveOwnProperty('UserId')
                            expect(res.body[0]).to.haveOwnProperty('body')
                            expect(res.body[0]).to.haveOwnProperty('status')
                            expect(res.body[0]).to.haveOwnProperty('createdAt')
                            expect(res.body[0]).to.haveOwnProperty('updatedAt')
                            expect(res.body.length).to.equal(2)
                            done()
                        })
                })
        })
    })
})