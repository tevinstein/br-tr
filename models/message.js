'use strict';
module.exports = function(sequelize, DataTypes) {
    var Message = sequelize.define('Message', {
        TempMessageId: DataTypes.STRING,
        body: DataTypes.STRING,
        UserId: DataTypes.STRING,
        ItemMessageId: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Message.belongsTo(models.ItemMessage)
                Message.belongsTo(models.User)
            }
        }
    });
    return Message;
};