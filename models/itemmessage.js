'use strict';
module.exports = function(sequelize, DataTypes) {
    var ItemMessage = sequelize.define('ItemMessage', {
        title: DataTypes.STRING,
        ItemId: DataTypes.STRING,
        BarteredItemId: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                ItemMessage.belongsTo(models.Item, {as: 'Item2', foreignKey: 'BarteredItemId'})
                ItemMessage.belongsTo(models.Item)
                ItemMessage.hasMany(models.Message)
            }
        }
    });
    return ItemMessage;
};