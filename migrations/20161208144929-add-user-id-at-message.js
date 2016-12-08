'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
      return queryInterface.addColumn('Messages', 'UserId', {
          type: Sequelize.INTEGER,
          references: {
              model: 'Users',
              key: 'id'
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
      })
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.removeColumn('Messages', 'UserId')
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
