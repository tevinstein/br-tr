const models = require('../models')
const Category = models.Category
const Item = models.Item
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const urlApi = 'http://localhost:3000/api'
const runSeedTest = require('../seed/seedForTesting')
const decode = require('jwt-decode')

describe.only("Test for read all categories", () => {

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




    describe.only("read all item by category id after login", () => {
        it("Expect to return all categories", (done) => {
            chai.request(urlApi)
                .post('/auth/login')
                .send({
                    username: 'dharmadi',
                    password: 'dharmadi'
                })
                .end((err, res) => {
                    const userDecoded = decode(res.body)
                    Category.findOne({
                        order:[
                            ['id', 'ASC']
                        ]
                    }).then((data) => {
                        const CategoryId = data.id
                        Item.create({
                            UserId: userDecoded.id,
                            CategoryId: CategoryId,
                            name: 'item 1',
                            description: 'description 1',
                            dimension: '1x1',
                            material: 'maretial 1',
                            photo: 'photo 1',
                            color: 'red',
                            status: 'up for barter'
                        }).then((data) => {
                            Item.create({
                                UserId: userDecoded.id,
                                CategoryId: CategoryId,
                                name: 'item 2',
                                description: 'description 2',
                                dimension: '2x2',
                                material: 'maretial 2',
                                photo: 'photo 2',
                                color: 'blue',
                                status: 'up for barter'
                            }).then((data) => {
                                chai.request(urlApi)
                                    .get(`/categories/${CategoryId}`)
                                    .set({authorization: `Bearer ${res.body}`})

                                    .end((err, res) => {
                                        expect(res).to.have.status(200)
                                        expect(res.body).that.is.an('array')
                                        expect(res.body[0]).to.haveOwnProperty('id')
                                        expect(res.body[0]).to.haveOwnProperty('UserId')
                                        expect(res.body[0]).to.haveOwnProperty('CategoryId')
                                        expect(res.body[0]).to.haveOwnProperty('name')
                                        expect(res.body[0]).to.haveOwnProperty('description')
                                        expect(res.body[0]).to.haveOwnProperty('dimension')
                                        expect(res.body[0]).to.haveOwnProperty('material')
                                        expect(res.body[0]).to.haveOwnProperty('photo')
                                        expect(res.body[0]).to.haveOwnProperty('color')
                                        expect(res.body[0]).to.haveOwnProperty('status')
                                        expect(res.body[0]).to.haveOwnProperty('createdAt')
                                        expect(res.body[0]).to.haveOwnProperty('updatedAt')
                                        expect(res.body.length).to.equal(3)
                                        done()
                                    })
                            })
                        })

                    }).catch((err) => {
                        res.status(500).json(err)
                    })
                })
        })
    })
})