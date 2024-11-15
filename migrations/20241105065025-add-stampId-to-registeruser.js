// In the generated migration file
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("registeruser", "stampid", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "stampInfo", 
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("registeruser", "stampid");
  },
};
