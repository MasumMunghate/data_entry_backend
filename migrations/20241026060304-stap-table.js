"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('stampInfo',{
      id : {
        type:Sequelize.INTEGER,
        allowNull : false,
        autoIncrement:true,
        primaryKey : true
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      start_date:{
        type:Sequelize.DATE,
        allowNull:false
      },
      signature:{
        type: Sequelize.STRING,
        allowNull:false
      },
      passport_photo:{
        type: Sequelize.STRING,
        allowNull:false
      },
      createAt:{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.NOW // store current date and time.
      },
      updatedAt:{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.NOW
      }

    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stampInfo');
  },
};
