// In the generated migration file
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("registeruser", "stampId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "stampInfo", 
        key: "id",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("registeruser", "stampId");
  },
};
