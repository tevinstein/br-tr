const mocha = require('mocha')
const chai = require('chai')
const expect = chai.expect
const models = require('../models')
const chaiHttp = require('chai-http')
const Item = models.Item
const Category = models.Category
const urlApi = 'http://localhost:3000/api'

chai.use(chaiHttp)

var new_item = {
    name: 'Hacktiv 8 Shirt',
    description: 'Been using this for 2012, color is not bad at all.',
    dimension: 'M',
    material: 'silk',
    photo: 'http://i.imgur.com/N5QkKfH.jpg',
    color: 'Orange',
    status: 'Up for barter'
}

var updated_item = {
    name: 'Bee Gees Shirt',
    description: 'Only used for 2 months.',
    dimension: 'L',
    material: 'cotton',
    photo: 'http://i.imgur.com/tg8ylqw.jpg',
    color: 'Black',
    status: 'Bartered'
}

// =======================================
// ITEMS MODEL TEST CASES
// =======================================

describe("Test Items Model", function() {
    beforeEach(function(done) {
        Item.destroy({
            where: {}
        }).then((item) => {
            done()
        })
    })

    describe("Get All Items", () => {
        it('it should GET all items', (done) => {
            Item.findAll().then((data) => {
                expect(data).that.is.an('array')
                expect(data).to.have.lengthOf(0)
                done()
            })
        })
    })

    describe("Get All Items By Category", () => {
        it('it should GET all items by category', (done) => {
            Category.destroy({
                where: {}
            }).then((deleted_category) => {
                Category.create({ name: 'Electronic' })
                    .then((category) => {
                        var my_current_item = new_item
                        my_current_item.CategoryId = category.id
                        Item.create(my_current_item)
                            .then((item) => {
                                Item.findAll({
                                    where: {
                                        CategoryId: category.id
                                    }
                                }).then((data) => {
                                    expect(data[0]).to.have.property('id')
                                    expect(data[0]).to.have.property('name')
                                    expect(data[0]).to.have.property('CategoryId')
                                    expect(data[0].dimension).to.equal('M')
                                    expect(data[0].color).to.equal('Orange')
                                    expect(data[0].CategoryId).to.equal(category.id)
                                    done()
                                })
                            })
                    })
            })
        })
    })

    describe("Get An Item", () => {
        it('it should GET an item', (done) => {
            Item.create(new_item).then((item) => {
                Item.findOne({
                    where: {
                        id: item.id
                    }
                }).then((data) => {
                    expect(data).to.have.property('id')
                    expect(data).to.have.property('name')
                    expect(data).to.have.property('description')
                    expect(data).to.have.property('dimension')
                    expect(data).to.have.property('material')
                    expect(data).to.have.property('photo')
                    expect(data).to.have.property('color')
                    expect(data).to.have.property('status')
                    expect(data.name).to.equal('Hacktiv 8 Shirt')
                    expect(data.color).to.equal('Orange')
                    done()
                })
            })
        })
    })

    describe("Post An Item", () => {
        it('it should POST an item', (done) => {
            Item.create(new_item).then((data) => {
                expect(data).to.have.property('id')
                expect(data).to.have.property('name')
                expect(data).to.have.property('description')
                expect(data).to.have.property('dimension')
                expect(data).to.have.property('material')
                expect(data).to.have.property('photo')
                expect(data).to.have.property('color')
                expect(data).to.have.property('status')
                expect(data.name).to.equal('Hacktiv 8 Shirt')
                expect(data.color).to.equal('Orange')
                done()
            })
        })
    })

    describe("Update An Item", () => {
        it('it should UPDATE an item', (done) => {
            Item.create(new_item).then((data) => {
                Item.update(updated_item, {
                    where: {
                        id: data.id
                    }
                }).then(() => {
                    Item.findOne({
                        where: {
                            id: data.id
                        }
                    }).then((data) => {
                        expect(data).to.have.property('name')
                        expect(data.name).to.equal('Bee Gees Shirt')
                        expect(data.material).to.equal('cotton')
                        expect(data.color).to.equal('Black')
                        expect(data.status).to.equal('Bartered')
                        expect(data.description).to.equal('Only used for 2 months.')
                        expect(data.dimension).to.equal('L')
                        done()
                    })
                })
            })
        })
    })

    describe("Delete an Item", () => {
        it('it should DELETE an item', (done) => {
            Item.create(new_item).then((item) => {
              Item.update({
                  status: 'deleted'
              }, {
                  where: {
                      id: item.id
                  }
              }).then((data) => {
                Item.findOne({
                  where: {
                    name: new_item.name
                  }
                }).then((new_data) => {
                  expect(new_data.status).to.be.equal('deleted')
                  done()
                })
              })
            })
        })
    })
})

// =======================================
// ITEMS API TEST CASES
// =======================================

describe("Test Items API", function() {
    beforeEach(function(done) {
        Item.destroy({
            where: {}
        }).then((item) => {
            done()
        })
    })

    describe("Get All Items", () => {
        it('it should not let user GET all items and return status 401', (done) => {
            chai.request(urlApi)
                .get('/items')
                .end((err, res) => {
                    expect(res).to.have.status(401)
                    done()
                })
        })
    })

    describe("Get All Items", () => {
        it('it should GET all items', (done) => {
            chai.request(urlApi)
                .post('/auth/login')
                .send({
                    username: 'tepin',
                    password: 'tepin'
                })
                .end((err, res) => {
                    chai.request(urlApi)
                        .get('/items')
                        .set({ authorization: `Bearer ${res.body}` })
                        .end((err, res) => {
                            expect(res).to.have.status(200)
                            expect(res.body).that.is.an('array')
                            done()
                        })
                })
        })
    })

    describe("Get An Item", () => {
        it('it should GET an item', (done) => {
            chai.request(urlApi)
                .post('/auth/login')
                .send({
                    username: 'tepin',
                    password: 'tepin'
                })
                .end((err, res) => {
                    Item.create(new_item).then((data) => {
                        chai.request(urlApi)
                            .get(`/items/${data.id}`)
                            .set({ authorization: `Bearer ${res.body}` })
                            .end((err, response) => {
                                expect(response).to.have.status(200)
                                expect(response.body).to.have.property('id')
                                expect(response.body).to.have.property('name')
                                expect(response.body).to.have.property('description')
                                expect(response.body).to.have.property('dimension')
                                expect(response.body).to.have.property('material')
                                expect(response.body).to.have.property('photo')
                                expect(response.body).to.have.property('color')
                                expect(response.body).to.have.property('status')
                                expect(response.body.name).to.equal('Hacktiv 8 Shirt')
                                expect(response.body.color).to.equal('Orange')
                                done()
                            })
                    })
                })
        })
    })

    describe("Get Item By Name", () => {
        it('it should GET an item by name', (done) => {
            chai.request(urlApi)
                .post('/auth/login')
                .send({
                    username: 'tepin',
                    password: 'tepin'
                })
                .end((err, res) => {
                    Item.create(new_item).then((data) => {
                        chai.request(urlApi)
                            .get(`/items/search/8`)
                            .set({ authorization: `Bearer ${res.body}` })
                            .end((err, response) => {
                                expect(response).to.have.status(200)
                                expect(response.body[0]).to.have.property('id')
                                expect(response.body[0]).to.have.property('name')
                                expect(response.body[0]).to.have.property('description')
                                expect(response.body[0]).to.have.property('dimension')
                                expect(response.body[0]).to.have.property('material')
                                expect(response.body[0]).to.have.property('photo')
                                expect(response.body[0]).to.have.property('color')
                                expect(response.body[0]).to.have.property('status')
                                expect(response.body[0].name).to.equal('Hacktiv 8 Shirt')
                                expect(response.body[0].color).to.equal('Orange')
                                done()
                            })
                    })
                })
        })
    })

    describe("Post An Item", () => {
        it('it should POST an item', (done) => {
            chai.request(urlApi)
                .post('/auth/login')
                .send({
                    username: 'tepin',
                    password: 'tepin'
                })
                .end((err, res) => {
                    chai.request(urlApi)
                        .post(`/items`)
                        .set({ authorization: `Bearer ${res.body}` })
                        .send(new_item)
                        .end((err, response) => {
                            expect(response).to.have.status(200)
                            expect(response.body.message).to.equal('data is added!')
                            expect(response.body.data).to.have.property('id')
                            expect(response.body.data).to.have.property('name')
                            expect(response.body.data).to.have.property('description')
                            expect(response.body.data).to.have.property('dimension')
                            expect(response.body.data).to.have.property('material')
                            expect(response.body.data).to.have.property('photo')
                            expect(response.body.data).to.have.property('color')
                            expect(response.body.data).to.have.property('status')
                            expect(response.body.data.name).to.equal('Hacktiv 8 Shirt')
                            expect(response.body.data.color).to.equal('Orange')
                            done()
                        })
                })
        })
    })

    describe("Update An Item", () => {
        it('it should UPDATE an item', (done) => {
            Item.create(new_item).then((data) => {
                chai.request(urlApi)
                    .post('/auth/login')
                    .send({
                        username: 'tepin',
                        password: 'tepin'
                    })
                    .end((err, res) => {
                        chai.request(urlApi)
                            .put(`/items/${data.id}`)
                            .set({ authorization: `Bearer ${res.body}` })
                            .send(updated_item)
                            .end((err, response) => {
                                expect(response).to.have.status(200)
                                expect(response.body.message).to.equal('data is updated!')
                                expect(response.body.data).to.have.property('id')
                                expect(response.body.data).to.have.property('name')
                                expect(response.body.data).to.have.property('description')
                                expect(response.body.data).to.have.property('dimension')
                                expect(response.body.data).to.have.property('material')
                                expect(response.body.data).to.have.property('photo')
                                expect(response.body.data).to.have.property('color')
                                expect(response.body.data).to.have.property('status')
                                expect(response.body.data.name).to.equal('Bee Gees Shirt')
                                expect(response.body.data.dimension).to.equal('L')
                                done()
                            })
                    })
            })
        })
    })

    describe("Delete an Item", () => {
        it('it should DELETE an item', (done) => {
            Item.create(new_item).then((item) => {
                chai.request(urlApi)
                    .post('/auth/login')
                    .send({
                        username: 'tepin',
                        password: 'tepin'
                    })
                    .end((err, res) => {
                        chai.request(urlApi)
                            .put(`/items/delete/${item.id}`)
                            .set({ authorization: `Bearer ${res.body}` })
                            .end((err, response) => {
                                expect(response).to.have.status(200)
                                expect(response.body.data).to.equal(1)
                                done()
                            })
                    })
            })
        })
    })
})
