const GenresService = require('../services/genresServices');

const findAllGenres = async (req, res) => {
  try {
    let genres = await GenresService.retrieveGenres();
    // console.log('JSON get Animes:::::', JSON.stringify(animes));
    res.status(200).json(genres);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  findAllGenres,
};
