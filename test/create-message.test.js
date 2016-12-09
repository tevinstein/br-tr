const app = require('../app')
const models = require('../models')
const Message = models.Message
const ItemMessage = models.ItemMessage
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const runSeedTest = require('../seed/seedForTesting')
const urlApi = 'http://localhost:3000/api'
const decode = require('jwt-decode')

describe("Test for read all messages", () => {

    before(function(done) {
        runSeedTest.runSeedTest(done)

    })


    describe("create messages before login", () => {
        it("Expect to return 401", (done) => {
            ItemMessage.findOne({
                order: [
                    ['id', 'ASC']
                ]
            }).then((data) => {
                const ItemMessageId = data.id
                const TempMessageId = Date.now().toString()
                chai.request(urlApi)
                    .post('/messages')
                    .send({
                        TempMessageId: TempMessageId,
                        body: 'where will we meet?',
                        ItemMessageId: ItemMessageId,
                        status: 'unread'
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(401)
                        done()
                    })
            }).catch((err) => {
                console.log(err)
            })
        })
    })

    describe("create messages after login", () => {
        it("Expect to return all messages", (done) => {
            chai.request(urlApi)
                .post('/auth/login')
                .send({
                    username: 'tepin',
                    password: 'tepin'
                })
                .end((err, res) => {
                    const userDecoded = decode(res.body)

                    ItemMessage.findOne({
                        order: [
                            ['id', 'ASC']
                        ]
                    }).then((data) => {
                        const ItemMessageId = data.id
                        const TempMessageId = Date.now().toString()
                        chai.request(urlApi)
                            .post('/messages')
                            .send({
                                TempMessageId: TempMessageId,
                                body: 'where will we meet?',
                                ItemMessageId: ItemMessageId,
                                UserId: userDecoded.id,
                                status: 'unread'
                            })
                            .set({authorization: `Bearer ${res.body}`})

                            .end((err, res) => {
                                expect(res).to.have.status(200)
                                expect(res.body).to.haveOwnProperty('id')
                                expect(res.body).to.haveOwnProperty('TempMessageId')
                                expect(res.body).to.haveOwnProperty('ItemMessageId')
                                expect(res.body).to.haveOwnProperty('UserId')
                                expect(res.body).to.haveOwnProperty('body')
                                expect(res.body).to.haveOwnProperty('status')
                                expect(res.body).to.haveOwnProperty('createdAt')
                                expect(res.body).to.haveOwnProperty('updatedAt')
                                expect(res.body.TempMessageId).to.equal(TempMessageId)
                                expect(res.body.body).to.equal('where will we meet?')
                                expect(res.body.ItemMessageId).to.equal(ItemMessageId)
                                expect(res.body.UserId).to.equal(userDecoded.id)
                                expect(res.body.status).to.equal('unread')
                                done()
                            })
                    }).catch((err) => {
                        res.status(500).json(err)
                    })
                })
        })
    })
})