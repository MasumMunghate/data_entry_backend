module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('administrator', [
      {
        administratorID: process.env.ADMINISTORE_USERNAME,
        administratorPasswrd:process.env.ADMINISTORE_PASSWORD,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('administrator', null, {});
  },
};