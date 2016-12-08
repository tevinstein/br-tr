const models = require('../models')
const User = models.User
const Category = models.Category
const Item = models.Item
const Message = models.Message
const ItemMessage = models.ItemMessage
const UserNote = models.UserNote

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
                        User.create({
                            username: 'dharmadi',
                            email: 'dharmadi93@gmail.com',
                            password: 'dharmadi',
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
                                    password: 'tepin',
                                    avatar: 'data:image/png;base64,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'
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
                                            message.create({
                                                TempMessageId: Date.now().toString(),
                                                ItemMessageId: ItemMessageId,
                                                UserId: IdUserTepin,
                                                body: "hi my name is tepin and i want to barter your shoe with my iphone"
                                            }).then(() => {
                                                message.create({
                                                    TempMessageId: Date.now().toString(),
                                                    ItemMessageId: ItemMessageId,
                                                    UserId: IdUserDharmadi,
                                                    body: "hi my name is tepin and i want to barter your shoe with my iphone"
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
}).catch ((err) => {
    console.log("error seed")
})

