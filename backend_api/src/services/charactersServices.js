const db = require('../../db');

const getNbCharacters = async (req, res) => {
  return await db.getNbCharacters();
};


module.exports = {
  getNbCharacters,
};
