// In the generated migration file
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("registeruser", "stampId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "stampInfo", 
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("registeruser", "stampId");
  },
};
