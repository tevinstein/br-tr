const models = require('../models')
const User = models.User
const Category = models.Category
const Item = models.Item
const Message = models.Message
const ItemMessage = models.ItemMessage
const crypto = require('crypto')

function runSeedTest(done) {
    Message.destroy({
        where: {

        }
    }).then(() => {
        ItemMessage.destroy({
            where: {

            }
        }).then(() => {
            Item.destroy({
                where:{

                }
            }).then(() => {
                Category.destroy({
                    where: {

                    }
                }).then(() => {
                    User.destroy({
                        where: {

                        }
                    }).then(() => {
                        Category.create({
                            name: 'Sports & Outdoors'
                        }).then((data) => {
                            const CategoryId1 = data.id
                            Category.create({
                                name: 'Automotive & Industrial'
                            }).then(() => {
                                Category.create({
                                    name: 'Books & Audible'
                                }).then(() => {
                                    Category.create({
                                        name: 'Home, Garden & Tools'
                                    }).then(() => {
                                        Category.create({
                                            name: 'Clothing, Shoes & Jewelry'
                                        }).then(() => {
                                            Category.create({
                                                name: 'Electronics & Computers'
                                            }).then((data) => {
                                                const CategoryId2 = data.id
                                                Category.create({
                                                    name: 'Toys, Kids & Baby'
                                                }).then(() => {
                                                    Category.create({
                                                        name: 'Others'
                                                    }).then((data) => {
                                                        User.create({
                                                            username: 'dharmadi',
                                                            email: 'dharmadi93@gmail.com',
                                                            password: crypto.createHash('md5').update('dharmadi').digest("hex"),
                                                            avatar: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-plaid-shirt-guy.png'
                                                        }).then((data) => {
                                                            const IdUserDharmadi = data.id
                                                            Item.create({
                                                                TempItemId: Date.now().toString(),
                                                                UserId: IdUserDharmadi,
                                                                CategoryId: CategoryId1,
                                                                name: 'Sepatu Nike',
                                                                description: 'good for running',
                                                                dimension: '30cm x 5cm',
                                                                material: 'Leather',
                                                                photo: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS6BJ_9V0LWvhQQbmOlKNou3Bpk13q75W68HCXDSqvpaVmpE1Hw8A',
                                                                color: 'White',
                                                                status: 'up for barter'
                                                            }).then((data) => {
                                                                const ItemId = data.id
                                                                User.create({
                                                                    username: 'tepin',
                                                                    email: 'tepin@gmail.com',
                                                                    password: crypto.createHash('md5').update('tepin').digest("hex"),
                                                                    avatar: 'https://pickaface.net/assets/images/slides/slide4.png'
                                                                }).then((data) => {
                                                                    const IdUserTepin = data.id
                                                                    Item.create({
                                                                        TempItemId: Date.now().toString(),
                                                                        UserId: IdUserTepin,
                                                                        CategoryId: CategoryId2,
                                                                        name: 'Iphone 7',
                                                                        description: '128 GB',
                                                                        dimension: '7cm x 5cm',
                                                                        material: 'Metal',
                                                                        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZLE6s8Jk7SFPj4q5Ee3ccQ64irTJhoD_KGdeJrfrDTVsNHSz0',
                                                                        color: 'Black',
                                                                        status: 'up for barter'
                                                                    }).then((data) => {
                                                                        const BarteredItemId = data.id
                                                                        ItemMessage.create({
                                                                            ItemId: ItemId,
                                                                            BarteredItemId: BarteredItemId,
                                                                            title: "Nike Shoe",
                                                                        }).then((data) => {
                                                                            const ItemMessageId = data.id
                                                                            Message.create({
                                                                                TempMessageId: Date.now().toString(),
                                                                                ItemMessageId: ItemMessageId,
                                                                                UserId: IdUserTepin,
                                                                                body: "hi my name is tepin and i want to barter your shoe with my iphone",
                                                                                status: 'unread'
                                                                            }).then(() => {
                                                                                Message.create({
                                                                                    TempMessageId: Date.now().toString(),
                                                                                    ItemMessageId: ItemMessageId,
                                                                                    UserId: IdUserDharmadi,
                                                                                    body: "oke lets barter with my shoe",
                                                                                    status: 'unread'
                                                                                }).then(() => {
                                                                                    done()
                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = {
    runSeedTest: runSeedTest
}

