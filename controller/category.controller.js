const models = require('../models')
const Category = models.Category

module.exports = {
    getAllCategories: (req, res) => {
        Category.findAll().then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500).json(err)
        })
    }
}