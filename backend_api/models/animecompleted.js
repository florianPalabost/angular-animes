'use strict';
module.exports = (sequelize, DataTypes) => {
  const Anime_Completed = sequelize.define('animes_completed', {
    user_id: DataTypes.STRING,
    anime_id: DataTypes.INTEGER
  }, {
    freezeTableName: true,

  });
  Anime_Completed.associate = function(models) {
    // associations can be defined here
    Anime_Completed.belongsTo(models.anime, {foreignKey: 'anime_id', targetKey: 'id'});
  };
  return Anime_Completed;
};
