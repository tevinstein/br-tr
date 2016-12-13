const models = require('../models')
const User = models.User
const Category = models.Category
const Item = models.Item
const ItemMessage = models.ItemMessage
const Message = models.Message

module.exports = {
    getAllItemMessage: (req, res) => {
        console.log("masuk")
        ItemMessage.findAll({
            include:[
                {
                    model:Item,
                },
                {
                    model: Item,
                    as: 'Item2'
                }
            ],
            where: {
                ItemId: req.params.ItemId
            }
        }).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    getAllMessage: (req, res) => {
        Message.findAll({
            include: [
                {
                    model: User
                }
            ],
            where: {
                ItemMessageId: req.params.ItemMessageId
            }
        }).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500).json(err)
        })
    },

    createItemMessage: (req, res) => {
        ItemMessage.create({
            title: req.body.title,
            ItemId: req.body.ItemId,
            BarteredItemId: req.body.BarteredItemId
        }).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500).json(err)
        })
    },

    createMessage: (req, res) => {
        Message.create({
            TempMessageId: req.body.TempMessageId,
            body: req.body.body,
            ItemMessageId: req.body.ItemMessageId,
            UserId: req.body.UserId,
            status: req.body.status
        }).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500).json(err)
        })
    }
}
