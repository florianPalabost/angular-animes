'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('genre', {
    genre_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {});
  Genre.removeAttribute('id');
  Genre.associate = function(models) {
    // associations can be defined here
    Genre.belongsToMany(models.anime, {foreignKey: 'genreId',through: 'animes_genres', as: 'anime'});
  };
  
  return Genre;
};