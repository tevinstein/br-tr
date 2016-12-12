const models = require('../models')
const Category = models.Category
const Item = models.Item

module.exports = {
    getAllCategories: (req, res) => {
        Category.findAll({
            order: [
                ['name', 'ASC'],
            ]
        }).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500).json(err)
        })
    },

    searchByCategory: (req, res) => {
        Item.findAll({
            where: {
                CategoryId: req.params.CategoryId
            }
        }).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500).json(err)
        })
    }
}