module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("registeruser", "stampid", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("registeruser", "stampid", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
