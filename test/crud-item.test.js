const app = require('../app')
const mocha = require('mocha')
const chai = require('chai')
const expect = chai.expect
const models = require('../models')
const Item = models.Item
const Category = models.Category

describe("Items", function() {
    beforeEach(function(done) {
        Item.destroy().then((data) => {
            done()
        })
    })

    describe("Get All Items", () => {
        it('it should GET all items', (done) => {
            Item.findAll().then((data) => {
                expect(data).that.is.an('array')
                expect(data).length.should.be.eql(0)
                done()
            })
        })
    })

    describe("Get All Items By Category", () => {
        it('it should GET all items', (done) => {
            Category.findAll().then((categories) => {
                Item.findAll({
                    where: {
                        CategoryId: categories[0].id
                    }
                }).then((data) => {
                    expect(data).that.is.an('array')
                    expect(data).length.should.be.eql(0)
                    done()
                })
            })
        })
    })

    describe("Get An Item", () => {
        it('it should GET an item', (done) => {
            Item.create({
                name: 'Hacktiv 8 Shirt',
                description: 'Been using this for 2012, color is not bad at all.',
                dimension: 'M',
                material: 'silk',
                photo: 'http://i.imgur.com/N5QkKfH.jpg',
                color: 'Orange',
                status: 'Up for barter'
            }).then((item) => {
                Item.findOne({
                	where: {
                		id: data.id
                	}
                }).then((data) => {
                	expect(data[0]).to.haveOwnProperty('id')
                	expect(data[0]).to.haveOwnProperty('name')
                	expect(data[0]).to.haveOwnProperty('description')
                	expect(data[0]).to.haveOwnProperty('dimension')
                	expect(data[0]).to.haveOwnProperty('material')
                	expect(data[0]).to.haveOwnProperty('photo')
                	expect(data[0]).to.haveOwnProperty('color')
                	expect(data[0]).to.haveOwnProperty('status')
                	expect(data[0].name).to.equal('Hacktiv 8 Shirt')
                	expect(data[0].color).to.equal('Orange')
                	done()
                })
            })
        })
    })

    describe("Post An Item", () => {
        it('it should POST an item', (done) => {
            Item.create({
                name: 'Hacktiv 8 Shirt',
                description: 'Been using this for 2012, color is not bad at all.',
                dimension: 'M',
                material: 'silk',
                photo: 'http://i.imgur.com/N5QkKfH.jpg',
                color: 'Orange',
                status: 'Up for barter'
            }).then((data) => {
                expect(data).to.haveOwnProperty('id')
                expect(data).to.haveOwnProperty('name')
                expect(data).to.haveOwnProperty('description')
                expect(data).to.haveOwnProperty('dimension')
                expect(data).to.haveOwnProperty('material')
                expect(data).to.haveOwnProperty('photo')
                expect(data).to.haveOwnProperty('color')
                expect(data).to.haveOwnProperty('status')
                expect(data.name).to.equal('Hacktiv 8 Shirt')
                expect(data.color).to.equal('Orange')
                done()
            })
        })
    })

    describe("Update An Item", () => {
        it('it should UPDATE an item', (done) => {
            Item.create({
                name: 'Hacktiv 8 Shirt',
                description: 'Been using this for 2012, color is not bad at all.',
                dimension: 'M',
                material: 'silk',
                photo: 'http://i.imgur.com/N5QkKfH.jpg',
                color: 'Orange',
                status: 'Up for bartered'
            }).then((data) => {
                Item.update({
                    name: 'Bee Gees Shirt',
                    description: 'Only used for 2 months.',
                    dimension: 'L',
                    material: 'cotton',
                    photo: 'http://i.imgur.com/tg8ylqw.jpg',
                    color: 'Black',
                    status: 'Up for barter'
                }, {
                    where: {
                        id: data.id
                    }
                }).then(() => {
                    Item.findOne({
                        where: {
                            id: data.id
                        }
                    }).then((data) => {
                        expect(data.name).to.equal('Bee Gees Shirt')
                        expect(data.material).to.equal('cotton')
                        expect(data.color).to.equal('Black')
                        expect(data.status).to.equal('Up for barter')
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
            Item.create({
                name: 'Hacktiv 8 Shirt',
                description: 'Been using this for 2012, color is not bad at all.',
                dimension: 'M',
                material: 'silk',
                photo: 'http://i.imgur.com/N5QkKfH.jpg',
                color: 'Orange',
                status: 'Up for bartered'
            }).then((data) => {
                Item.destroy({
                    where: {
                        id: data.id
                    }
                }).then((data) => {
                    expect(data).to.equal(1)
                    done()
                })
            })
        })
    })
})
