'use strict';
module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('character', {
    character_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }, 
    animeId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    role: DataTypes.STRING,
    img: DataTypes.STRING,
    other_name: DataTypes.STRING
  }, {});
  Character.removeAttribute('id');
 
  Character.associate = function(models) {
    // associations can be defined here
    Character.belongsTo(models.anime, {foreignKey: 'animeId', targetKey: 'id'});
  };
  return Character;
};