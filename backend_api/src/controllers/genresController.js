const GenericService = require('../services/genericService');

const findAllGenres = async (req, res) => {
  try {
    const genres = await GenericService.retrieveDb('getAllGenres');
    res.status(200).json(genres);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  findAllGenres,
};
