const CharactersService = require('../services/charactersServices');

const getNbCharacters = async (req, res) => {
  try {
    let nbCharacters = await CharactersService.getNbCharacters();
    res.status(200).json(nbCharacters);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  getNbCharacters,
};
