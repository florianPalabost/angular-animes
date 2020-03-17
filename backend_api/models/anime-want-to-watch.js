'use strict';
module.exports = (sequelize, DataTypes) => {
  const Anime_Want_To_Watch = sequelize.define('anime_want_to_watch', {
    user_id: DataTypes.STRING,
    anime_id: DataTypes.INTEGER
  }, {
    freezeTableName: true,
  });
  Anime_Want_To_Watch.associate = function(models) {
    // associations can be defined here
    Anime_Want_To_Watch.belongsTo(models.anime, {foreignKey: 'anime_id', targetKey: 'id'});
  };
  return Anime_Want_To_Watch;
};
