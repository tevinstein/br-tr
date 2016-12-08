'use strict';
module.exports = function(sequelize, DataTypes) {
  var ItemMessage = sequelize.define('ItemMessage', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          ItemMessage.belongsTo(models.Item)
          ItemMessage.hasMany(models.Message)
      }
    }
  });
  return ItemMessage;
};