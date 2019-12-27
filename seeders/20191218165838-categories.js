'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('categories', [
      {
        name: 'Programming',
        is_published: 1,
        is_archived: 0
      },
      {
        name: 'Sport',
        is_published: 1,
        is_archived: 0
      },
      {
        name: 'Coocking',
        is_published: 1,
        is_archived: 0
      },
      {
        name: 'Religious',
        is_published: 1,
        is_archived: 0
      },
      {
        name: 'Pet',
        is_published: 1,
        is_archived: 0
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('categories', null, {});
  }
};
