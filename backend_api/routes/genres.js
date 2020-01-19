var express = require('express');
var routerGenres = express.Router();

var GenresController = require('../src/controllers/genresController');

routerGenres.get('/', GenresController.findAllGenres);

module.exports = routerGenres;
