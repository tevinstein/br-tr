const app = require('../app')
const models = require('../models')
const Message = models.Message
const Item = models.Item
const ItemMessage = models.ItemMessage
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

describe("Test for Create messages", () => {

    describe("create messages before login", () => {
        it("Expect to return 403", (done) => {
            chai.request(app)
                .post('/api/users/login')
                .send({
                    username: 'dharmadi'
                })
                .end((err, res) => {
                    chai.request(app)
                        .post('/api/messages')
                        .end((err, res) => {
                            expect(res).to.have.status(403)
                            done()
                        })
                })
        })
    })

    describe("create messages after login", () => {
        it("Expect to return messages that has been created", (done) => {
            chai.request(app)
                .post('/api/users/login')
                .send({
                    username: 'dharmadi'
                })
                .end((err, res) => {
                    Item.findAll({
                        limit: 2
                    }).then((data) => {
                        ItemMessage.create({
                            ItemId: data[0].id,
                            BarteredItemId: data[1].id
                        }).then((data) => {
                            chai.request(app)
                                .post('/api/messages')
                                .set('token', res.body.token)
                                .send({
                                    TempMessageId: Date.now().toString(),
                                    ItemMessageId: data.id,
                                    body: 'content test',
                                    status: 'unread'
                                })
                                .end((err, res) => {
                                    expect(res).to.have.status(200)
                                    expect(res.body).that.is.an('array')
                                    expect(res.body).to.haveOwnProperty('id')
                                    expect(res.body).to.haveOwnProperty('name')
                                    expect(res.body).to.haveOwnProperty('status')
                                    expect(res.body).to.haveOwnProperty('createdAt')
                                    expect(res.body).to.haveOwnProperty('updatedAt')
                                    expect(res.body).to.be.equal(data.id)
                                    expect(res.body).to.be.equal(data.name)
                                    expect(res.body).to.be.equal(data.status)
                                    done()
                                })
                        })
                    }).catch((err) => {
                        res.json(err)
                    })
                })
        })
    })
})