'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('animes_genres', {
      animeId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {        
          model: 'animes',
          key: 'id'
        }
      },
      genreId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'genres',
          key: 'genre_id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('animes_genres');
  }
};
