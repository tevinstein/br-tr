'use strict';
module.exports = function(sequelize, DataTypes) {
  var ItemMessage = sequelize.define('ItemMessage', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ItemMessage;
};