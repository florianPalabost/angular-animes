'use strict';
module.exports = (sequelize, DataTypes) => {
  const Anime_Recommendation = sequelize.define('animes_recommendation', {
    anime_id: DataTypes.INTEGER,
    anime_id_recom: DataTypes.INTEGER
  }, {
    freezeTableName: true
  });
  Anime_Recommendation.associate = function(models) {
    // associations can be defined here
    Anime_Recommendation.belongsTo(models.anime, {foreignKey: 'anime_id', targetKey: 'id'});
    Anime_Recommendation.belongsTo(models.anime, {foreignKey: 'anime_id_recom', targetKey: 'id'});

  };
  return Anime_Recommendation;
};
