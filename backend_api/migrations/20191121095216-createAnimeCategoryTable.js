'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('animes_categories', {
      animeId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {        
          model: 'animes',
          key: 'id'
        }
      },
      categoryId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'categories',
          key: 'category_id'
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
    return queryInterface.dropTable('animes_categories');
  }
};
