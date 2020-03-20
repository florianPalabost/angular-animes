'use strict';
module.exports = (sequelize, DataTypes) => {
  const Anime_Watching = sequelize.define('animes_watching', {
    user_id: DataTypes.STRING,
    anime_id: DataTypes.INTEGER
  }, {
    freezeTableName: true,
  });
  Anime_Watching.associate = function(models) {
    // associations can be defined here
    Anime_Watching.belongsTo(models.anime, {foreignKey: 'anime_id', targetKey: 'id'});
  };
  return Anime_Watching;
};
