const app = require('../app')
const models = require('../models')
const Message = models.Message
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

describe("Test for read all messages", () => {

    describe("read all messages before login", () => {
        it("Expect to return 403", (done) => {
            chai.request(app)
                .post('/api/users/login')
                .send({
                    username: 'dharmadi'
                })
                .end((err, res) => {
                    chai.request(app)
                        .get('/api/messages')
                        .end((err, res) => {
                            expect(res).to.have.status(403)
                            done()
                        })
                })
        })
    })

    describe("read all messages after login", () => {
        it("Expect to return all messages", (done) => {
            chai.request(app)
                .post('/api/users/login')
                .send({
                    username: 'dharmadi'
                })
                .end((err, res) => {
                    chai.request(app)
                        .get('/api/categories')
                        .set('token', res.body.token)
                        .end((err, res) => {
                            expect(res).to.have.status(200)
                            expect(res.body).that.is.an('array')
                            expect(res.body[0]).to.haveOwnProperty('id')
                            expect(res.body[0]).to.haveOwnProperty('name')
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