'use strict';
module.exports = (sequelize, DataTypes) => {
  const Anime_Rewatched = sequelize.define('animes_rewatched', {
    anime_id: DataTypes.INTEGER,
    user_id: DataTypes.STRING,
    times_rewatched: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    freezeTableName: true
  });
  Anime_Rewatched.associate = function(models) {
    // associations can be defined here
    Anime_Rewatched.belongsTo(models.anime, {foreignKey: 'anime_id', targetKey: 'id'});
  };
  return Anime_Rewatched;
};
