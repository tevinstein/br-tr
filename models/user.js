'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        validate: {
            isUnique: (value, next) => {
                User.find({
                    where: {
                        username: value
                    },
                    attributes: ['id']
                }).done((error, user) => {
                    if (error) {
                        console.log('error unique: ', error);
                        return next(error);
                    } else if (user) {
                        console.log('username has been used');
                        return next({message: 'username has been used'});
                    } else {
                        next();
                    }
                });
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          User.hasMany(models.Item)
          User.hasMany(models.Message)
      }
    }
  });
  return User;
};
