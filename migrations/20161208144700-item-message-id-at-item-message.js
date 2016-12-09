'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
      return queryInterface.addColumn('Messages', 'ItemMessageId', {
          type: Sequelize.INTEGER,
          references: {
              model: 'ItemMessages',
              key: 'id'
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
      })
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.removeColumn('Messages', 'ItemMessageId')
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
