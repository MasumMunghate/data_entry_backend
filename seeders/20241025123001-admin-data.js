module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('administrator', [
      {
        administratorID:'Masum Munghate',
        administratorPasswrd:8412,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('administrator', null, {});
  },
};