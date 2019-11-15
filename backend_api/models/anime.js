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
  },
  
   {
     
   });
  Anime.associate = (models) => {
    // associations can be defined here
  };
  return Anime;
};