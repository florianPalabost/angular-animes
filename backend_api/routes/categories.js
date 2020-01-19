var express = require('express');
var routerCategories = express.Router();

var CategoriesController = require('../src/controllers/categoriesController');

/**
 * retrieve all the categories (name)
 */
routerCategories.get('/', CategoriesController.findAllCategories);


module.exports = routerCategories;
