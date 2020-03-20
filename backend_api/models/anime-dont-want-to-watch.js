'use strict';
module.exports = (sequelize, DataTypes) => {
  const Anime_Dont_Want_To_Watch = sequelize.define('animes_dont_want_to_watch', {
    user_id: DataTypes.STRING,
    anime_id: DataTypes.INTEGER
  }, {
    freezeTableName: true,
  });
  Anime_Dont_Want_To_Watch.associate = function(models) {
    // associations can be defined here
    Anime_Dont_Want_To_Watch.belongsTo(models.anime, {foreignKey: 'anime_id', targetKey: 'id'});
  };
  return Anime_Dont_Want_To_Watch;
};
