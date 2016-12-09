'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
      return queryInterface.addColumn('ItemMessages', 'BarteredItemId', {
          type: Sequelize.INTEGER,
          references: {
              model: 'Items',
              key: 'id'
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
      })
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.removeColumn('ItemMessages', 'BarteredItemId')
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
