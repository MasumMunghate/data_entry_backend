'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up :async(queryInterface, Sequelize)=> {
      await queryInterface.addColumn('registeruser','totalform',{
        type:Sequelize.INTEGER,
        defaultValue : 400
      })
      await queryInterface.addColumn('registeruser','sumitedform',{
        type:Sequelize.INTEGER,
        defaultValue : 0
      })
      await queryInterface.addColumn('registeruser','pendingform',{
        type:Sequelize.INTEGER,
        defaultValue : 0
      })
      await queryInterface.addColumn('registeruser','wrongform',{
        type:Sequelize.INTEGER,
        defaultValue : 0
      })
  },

   down:async (queryInterface, Sequelize)=> {
    await queryInterface.dropTable('registeruser','totalform')
    await queryInterface.dropTable('registeruser','sumitedform')
    await queryInterface.dropTable('registeruser','pendingform')
    await queryInterface.dropTable('registeruser','wrongform')
  }
};
