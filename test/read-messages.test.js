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
                        .get('/messages/itemMessage')
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
                        .get('/messages/itemMessage')
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
                        .get('/messages/itemMessage')
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
                        .get('/messages/itemMessage/all')
                        .set({authorization: `Bearer ${res.body}`})

                        .end((err, res) => {
                            expect(res).to.have.status(200)
                            expect(res.body).that.is.an('array')
                            expect(res.body[0]).to.haveOwnProperty('id')
                            expect(res.body[0]).to.haveOwnProperty('BarteredItemId')
                            expect(res.body[0]).to.haveOwnProperty('ItemId')
                            expect(res.body[0]).to.haveOwnProperty('Item')
                            expect(res.body[0]).to.haveOwnProperty('title')
                            expect(res.body[0]).to.haveOwnProperty('createdAt')
                            expect(res.body[0]).to.haveOwnProperty('updatedAt')
                            done()
                        })
                })
        })
    })
})
