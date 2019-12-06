'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {

    // return Promise.all([
    //   queryInterface.addColumn(
    //     'animes',
    //     'genres',
    //     {
    //       type: Sequelize.INTEGER,
    //       references: {
    //         model: 'genres',
    //         key: 'genre_id'
    //       }
    //     }
    //   ),
    //   queryInterface.addColumn(
    //     'animes',
    //     'categories',{
    //       type: Sequelize.INTEGER,
    //       references: {
    //         model: 'categories', // name of the table !
    //         key: 'category_id'
    //       }
    //     }
    //   ),
    // ]);
  },

  down: (queryInterface, Sequelize) => {

  //  return Promise.all(
  //    [
  //     queryInterface.removeColumn('animes', 'genres'),
  //     queryInterface.removeColumn('animes', 'categories')
  //    ]
  //  );
  }
};
