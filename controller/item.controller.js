const models = require('../models')
const Item = models.Item
const User = models.User


module.exports = {
    getAllItem: (req, res) => {
        Item.findAll({
            include: [
                {
                    model: User
                }
            ],
            where: {
                status: {
                    $ne: 'deleted'
                }
            }
        }).then((datas) => {
            res.status(200).json(datas)
        }).catch((err) => {
            res.status(500).json(err)
        })
    },
    getItem: (req,res) => {
        Item.findOne({
            include: [
                {
                    model: User
                }
            ],
            where: {
                id: req.params.id,
                status: {
                    $ne: 'deleted'
                }
            }
        }).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500).json(err)
        })
    },
    getItemByName: (req,res) => {
        Item.findAll({
            include: [
                {
                    model: User
                }
            ],
            where: {
            	$and: [
					{
                        name: {
                            ilike: `%${req.params.name.toLowerCase()}%`
                        }
					},
					{
                        status: {
                            $ne: 'deleted'
                        }
					}
				]
            }
        }).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500).json(err)
        })
    },
    getDeletedItem: (req,res) => {
        Item.findAll({
            include: [
                {
                    model: User
                }
            ],
            where: {
                status: 'deleted'
            }
        }).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500).json(err)
        })
    },
    getItemByUserId: (req,res) => {
        Item.findAll({
            include: [
                {
                    model: User
                }
            ],
            where: {
                UserId: req.params.UserId
            }
        }).then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500).json(err)
        })
    },
    postItem: (req,res) => {
        Item.create({
            UserId: req.body.UserId,
            CategoryId: req.body.CategoryId,
            name: req.body.name,
            description: req.body.description,
            dimension: req.body.dimension,
            material: req.body.material,
            photo: req.body.photo,
            color: req.body.color,
            status: req.body.status
        }).then((data) => {
            res.status(200).json({'message': 'data is added!', data})
        }).catch((err) => {
            res.status(500).json(err)
        })
    },
    editItem: (req,res) => {
        Item.update({
            UserId: req.body.UserId,
            CategoryId: req.body.CategoryId,
            name: req.body.name,
            description: req.body.description,
            dimension: req.body.dimension,
            material: req.body.material,
            photo: req.body.photo,
            color: req.body.color,
            status: req.body.status
        }, {
            where: {
                id: req.params.id
            }
        }).then(() => {
            Item.findOne({
                where: {
                    id: req.params.id
                }
            }).then((data) => {
                res.status(200).json({'message': 'data is updated!', data})
            }).catch((err) => {
                res.status(500).json(err)
            })
        })
    },
    deleteItem: (req,res) => {
        Item.update({
            status: 'deleted'
        }, {
            where: {
                id: req.params.id
            }
        }).then((data) => {
            res.status(200).json({data})
        }).catch((err) => {
            res.status(500).json(err)
        })
    }
    // deleteItem: (req,res) => {
    // 	Item.destroy({
    // 		where: {
    // 			id: req.params.id
    // 		}
    // 	}).then((data) => {
    // 		res.status(200).json({'message': 'data is deleted!', data})
    // 	}).catch((err) => {
    // 		res.status(500).json(err)
    // 	})
    // }
}
