const db = require('../../db');

const retrieveGenres = async (req, res) => {
  return await db.getAllGenres();
};

module.exports = {
  retrieveGenres,

};
