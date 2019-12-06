'use strict';
module.exports = (sequelize, DataTypes) => {
  const Anime_Genre = sequelize.define('animes_genre', {
    animeId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {        
      //   model: 'animes',
      //   key: 'id'
      // }
    },
    genreId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {         
      //   model: 'genres',
      //   key: 'genre_id'
      // }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
      
  },
  
   {
     
   });
   Anime_Genre.removeAttribute('id');
   Anime_Genre.associate = (models) => {
    // associations can be defined here
   
    // Anime.hasMany(models.category);
    

  };
  return Anime_Genre;
};