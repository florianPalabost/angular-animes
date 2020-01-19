
var express = require('express');
var routerCharacters = express.Router();

var CharactersController = require('../src/controllers/charactersController');

/* TODO GET characters listing. */
// routerCharacters.get('/', AnimesController.findAllAnimes);

/**
 *
 * get the number of characters for dashboard
 */
routerCharacters.get('/nbcharacters', CharactersController.getNbCharacters);


module.exports = routerCharacters;
