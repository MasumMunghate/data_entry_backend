"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("submitassignment", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      totalform: {
        type: Sequelize.INTEGER,
        defaultValue: 400,
      },
      sumitedform: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      pendingform: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      wrongform: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("submitassignment");
  },
};
