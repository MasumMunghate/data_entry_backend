"use strict";
const { Sequelize } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("registeruser", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mobile_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false, 
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false, 
      },
      plan: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      caller: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      caller: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              [
                "caller 1",
                "caller 2",
                "caller 3",
                "caller 4",
                "caller 5",
                "caller 6",
                "caller 7",
                "caller 8",
                "caller 9",
              ],
            ],
            msg: "caller must be one of the allowed options.",
          },
        },
      },
      status: {
        type: Sequelize.ENUM,
        values: ["pending", "sussess", "frezz", "active"],
        defaultValue: "pending",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("registeruser");
  },
};
