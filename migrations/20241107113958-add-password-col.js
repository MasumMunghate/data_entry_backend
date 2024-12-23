module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("registeruser", "password", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("registeruser", "password");
  },
};
