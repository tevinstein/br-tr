const app = require('../app')
const mocha = require('mocha')
const chai = require('chai')
const expect = chai.expect
const models = require('../models')
const Item = models.Item

describe("Items", function() {
    beforeEach(function(done) {
        Item.destroy().then((data) => {
            done()
        })
    })

    describe("Get All Items", () => {
        it('it should GET all items', (done) => {
            Item.findAll().then((data) => {
                //expect
                done()
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
                status: 'Secondhand'
            }).then((data) => {
                //expect
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
                    status: 'Up for bartered'
                }, where: {
                    id: data.id
                }).then(() => {
                    Item.findOne({
                        where: {
                            id: data.id
                        }
                    }).then((data) => {
                        //expect
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
                	//expect
                	done()
                })
            })
        })
    })
})
