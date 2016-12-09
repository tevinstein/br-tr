const models = require('../models')
const Category = models.Category
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const urlApi = 'http://localhost:3000/api'
const runSeedTest = require('../seed/seedForTesting')

describe("Test for read all categories", () => {

    before(function(done) {
        runSeedTest.runSeedTest(done)

    })

    describe("read all categories before login", () => {
        it("Expect to return 403", (done) => {
            chai.request(urlApi)
                .post('/auth/login')
                .end((err, res) => {
                    chai.request(urlApi)
                        .get('/categories')
                        .end((err, res) => {
                            expect(res).to.have.status(401)
                            done()
                        })
                })
        })
    })

    describe("read all categories login empty", () => {
        it("Expect to return all categories", (done) => {
            chai.request(urlApi)
                .post('/auth/login')
                .end((err, res) => {
                    console.log("ini body: ", res.body)
                    chai.request(urlApi)
                        .get('/categories')
                        .set({authorization: `Bearer ${res.body}`})

                        .end((err, res) => {
                            expect(res).to.have.status(401)
                            done()
                        })
                })
        })
    })

    describe("read all categories login with wrong pass and user", () => {
        it("Expect to return all categories", (done) => {
            chai.request(urlApi)
                .post('/auth/login')
                .end((err, res) => {
                    console.log("ini body: ", res.body)
                    chai.request(urlApi)
                        .get('/categories')
                        .set({authorization: `Bearer ${res.body}`})
                        .send({
                            username: 'aa',
                            password: 'bb'
                        })
                        .end((err, res) => {
                            expect(res).to.have.status(401)
                            done()
                        })
                })
        })
    })

    describe("read all categories after login", () => {
        it("Expect to return all categories", (done) => {
            chai.request(urlApi)
                .post('/auth/login')
                .send({
                    username: 'dharmadi',
                    password: 'dharmadi'
                })
                .end((err, res) => {
                console.log("ini body: ", res.body)
                    chai.request(urlApi)
                        .get('/categories')
                        .set({authorization: `Bearer ${res.body}`})

                        .end((err, res) => {
                            expect(res).to.have.status(200)
                            expect(res.body).that.is.an('array')
                            expect(res.body[0]).to.haveOwnProperty('id')
                            expect(res.body[0]).to.haveOwnProperty('name')
                            expect(res.body[0]).to.haveOwnProperty('createdAt')
                            expect(res.body[0]).to.haveOwnProperty('updatedAt')
                            expect(res.body.length).to.equal(6)
                            done()
                        })
                })
        })
    })
})