"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("userassignment", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true,
      },
      mobileNumber: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      zipCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      IP: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      license: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("userassignment");
  },
};
