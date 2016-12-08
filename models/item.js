'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    TempItemId: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    dimension: DataTypes.STRING,
    material: DataTypes.STRING,
    photo: DataTypes.STRING,
    color: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Item;
};