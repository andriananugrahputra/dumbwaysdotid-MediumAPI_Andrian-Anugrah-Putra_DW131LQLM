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
    return queryInterface.bulkInsert('users', [
      {
        fullname: 'Andrian Anugrah Putra',
        username: 'andriananugrahputra',
        email: 'andriananugrah.putra@gmail.com',
        password: '6661'
      },
      {
        fullname: 'Putra Anugrah Andrian',
        username: 'putraanugrahandrian',
        email: 'putraanugrahandrian@gmail.com',
        password: '1999'
      },
      {
        fullname: 'Andrian Putra Anugrah',
        username: 'andrianputraanugrah',
        email: 'andrianputraanugrah@gmail.com',
        password: '5552'
      },
      {
        fullname: 'Anugrah Putra Andrian',
        username: 'anugrahputraandrian',
        email: 'anugrahputraandrian@gmail.com',
        password: '9970'
      },
      {
        fullname: 'Putra Andrian Anugrah',
        username: 'putraandriananugrah',
        email: 'putraandriananugrah@gmail.com',
        password: '7070'
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
   queryInterface.bulkDelete('users', null, {});
  }
};
