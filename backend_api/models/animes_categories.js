'use strict';
module.exports = (sequelize, DataTypes) => {
  const Anime_Category = sequelize.define('animes_categorie', {
    animeId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {        
      //   model: 'animes',
      //   key: 'id'
      // }
    },
    categoryId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {         
      //   model: 'categories',
      //   key: 'category_id'
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
   Anime_Category.removeAttribute('id');
   Anime_Category.associate = (models) => {
    // associations can be defined here
   
    // Anime.hasMany(models.category);


  };
  return Anime_Category;
};