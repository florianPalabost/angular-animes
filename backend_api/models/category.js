'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    img: DataTypes.STRING
  }, {});
  Category.removeAttribute('id');
  Category.associate = function(models) {
    // associations can be defined here
    Category.belongsToMany(models.anime, {foreignKey: 'categoryId',through: 'animes_categories', as: 'anime'});
  };
  return Category;
};