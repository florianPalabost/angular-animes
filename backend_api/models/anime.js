'use strict';
module.exports = (sequelize, DataTypes) => {
  const Anime = sequelize.define('anime', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
    },
    idApi: {
      type: DataTypes.STRING,
    },
    linkApi: {
      type: DataTypes.STRING,
    },
		synopsis: {
      type: DataTypes.TEXT,
		},
		rating: {
      type: DataTypes.INTEGER,
		},
		startDate: {
      type: DataTypes.STRING,
		},
		endDate: {
      type: DataTypes.STRING,
		},
		status: {
      type: DataTypes.STRING,
		},
		posterImage: {
      type: DataTypes.STRING,
		},
		coverImage: {
      type: DataTypes.STRING,
		},
		nbEpisode: {
      type: DataTypes.INTEGER,
		},
		episodeLength: {
      type: DataTypes.INTEGER,
		},
		ytVideoID: {
      type: DataTypes.STRING,
    },
    subtype: {
      type: DataTypes.STRING,
    },
  },
  
   {
     
   });
  Anime.associate = (models) => {
    // associations can be defined here
    Anime.belongsToMany(models.genre, { through: 'animes_genres'});
    Anime.belongsToMany(models.category, { through: 'animes_categories'});

    Anime.hasMany(models.character, {foreignKey: 'animeId', targetKey: 'id'});


  };
  return Anime;
};
