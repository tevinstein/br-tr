const app = require('../app')
const mocha = require('mocha')
const chai = require('chai')
const expect = chai.expect
const models = require('../models')
const chaiHttp = require('chai-http')
const Item = models.Item
const Category = models.Category

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

describe("Items", function() {
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
                Item.destroy({
                    where: {
                        id: item.id
                    }
                }).then((data) => {
                    expect(data).to.equal(1)
                    done()
                })
            })
        })
    })
})

// =======================================
// API TEST CASES
// =======================================

// describe("Items API", function() {
//     beforeEach(function(done) {
//         Item.destroy({
//             where: {

//             }
//         }).then((data) => {
//             done()
//         })
//     })

//     describe("Get All Items", () => {
//         it('it should GET all items', (done) => {
//             Item.findAll().then((data) => {
//                 chai.request(app)
//                     .get('/api/items')
//                     .end((err, res) => {
//                         expect(res).to.have.status(200)
//                         expect(res.body).that.is.an('array')
//                         expect(res.body).length.should.be.eql(0)
//                         done()
//                     })
//             })
//         })
//     })

//     describe("Get All Items By Category", () => {
//         it('it should GET all items', (done) => {
//             Category.findAll().then((categories) => {
//                 Item.findAll({
//                     where: {
//                         CategoryId: categories[0].id
//                     }
//                 }).then((data) => {
//                     chai.request(app)
//                         .get(`/api/categories/${categories[0].id}`)
//                         .end((err, res) => {
//                             expect(res).to.have.status(200)
//                             expect(res.body).that.is.an('array')
//                             expect(res.body).length.should.be.eql(0)
//                             done()
//                         })
//                 })
//             })
//         })
//     })

//     describe("Get An Item", () => {
//         it('it should GET an item', (done) => {
//             Item.create(new_item).then((item) => {
//                 Item.findOne({
//                     where: {
//                         id: item.id
//                     }
//                 }).then((data) => {
//                     chai.request(app)
//                         .get(`/api/items/${data.id}`)
//                         .end((err, res) => {
//                             expect(res).to.have.status(200)
//                             expect(res.body).to.haveOwnProperty('id')
//                             expect(res.body).to.haveOwnProperty('name')
//                             expect(res.body).to.haveOwnProperty('description')
//                             expect(res.body).to.haveOwnProperty('dimension')
//                             expect(res.body).to.haveOwnProperty('material')
//                             expect(res.body).to.haveOwnProperty('photo')
//                             expect(res.body).to.haveOwnProperty('color')
//                             expect(res.body).to.haveOwnProperty('status')
//                             expect(res.body.name).to.equal('Hacktiv 8 Shirt')
//                             expect(res.body.color).to.equal('Orange')
//                             done()
//                         })
//                 })
//             })
//         })
//     })

//     describe("Post An Item", () => {
//         it('it should POST an item', (done) => {
//             chai.request(app)
//                 .post(`/api/items/${data.id}`)
//                 .send(new_item)
//                 .end((err, res) => {
//                     expect(res).to.have.status(200)
//                     expect(res.body).to.haveOwnProperty('id')
//                     expect(res.body).to.haveOwnProperty('name')
//                     expect(res.body).to.haveOwnProperty('description')
//                     expect(res.body).to.haveOwnProperty('dimension')
//                     expect(res.body).to.haveOwnProperty('material')
//                     expect(res.body).to.haveOwnProperty('photo')
//                     expect(res.body).to.haveOwnProperty('color')
//                     expect(res.body).to.haveOwnProperty('status')
//                     expect(res.body.name).to.equal('Hacktiv 8 Shirt')
//                     expect(res.body.color).to.equal('Orange')
//                     done()
//                 })
//         })
//     })

//     describe("Update An Item", () => {
//         it('it should UPDATE an item', (done) => {
//             Item.create(new_item).then((data) => {
//                 chai.request(app)
//                     .put(`/api/items/${data.id}`)
//                     .send(updated_item)
//                     .end((err, res) => {
//                         expect(res).to.have.status(200)
//                         expect(res.body.name).to.equal('Bee Gees Shirt')
//                         expect(res.body.material).to.equal('cotton')
//                         expect(res.body.color).to.equal('Black')
//                         expect(res.body.status).to.equal('Up for barter')
//                         expect(res.body.description).to.equal('Only used for 2 months.')
//                         expect(res.body.dimension).to.equal('L')
//                         done()
//                     })
//             })
//         })
//     })

//     describe("Delete an Item", () => {
//         it('it should DELETE an item', (done) => {
//             Item.create(new_item).then((item) => {
//                 Item.destroy({
//                     where: {
//                         id: item.id
//                     }
//                 }).then((data) => {
//                     chai.request(app)
//                         .delete(`/api/items/${item.id}`)
//                         .end((err, res) => {
//                             expect(res).to.have.status(200)
//                             expect(res.body).to.equal(1)
//                             done()
//                         })
//                 })
//             })
//         })
//     })
// })
