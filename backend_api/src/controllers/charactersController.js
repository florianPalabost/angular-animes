const GenericService = require('../services/genericService');

const getNbCharacters = async (req, res) => {
  try {
    const nbCharacters = await GenericService.retrieveDb('getNbCharacters');
    res.status(200).json(nbCharacters);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const findCharacter = async (req, res) => {
  try {
    const character = await GenericService.retrieveDb('getCharacterByTitle', req.params.name);
    res.status(200).json(character);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  getNbCharacters,
  findCharacter
};
