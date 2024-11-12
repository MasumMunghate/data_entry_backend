'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up :async(queryInterface, Sequelize)=> {
    await queryInterface.createTable('userlogindetail',{
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
      }
    })
  },

   down:async (queryInterface, Sequelize)=> {
    await queryInterface.dropTable("userlogindetail");
  }
};
