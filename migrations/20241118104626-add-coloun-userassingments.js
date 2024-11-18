'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.addColumn('userassignments', 'submited', {
      type: Sequelize.STRING,
      allowNull: true, 
      defaultValue: 0,
    });

    await queryInterface.addColumn('userassignments', 'pending', {
      type: Sequelize.INTEGER,
      allowNull: false, 
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('userassignments', 'submited');
    await queryInterface.removeColumn('userassignments', 'pending');
  },
};
