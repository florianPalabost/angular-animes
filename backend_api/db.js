const dotenv = require('dotenv');
const models = require('./models');

dotenv.config();

module.exports = {
  async getAllAnimes (req, res) {
    console.log('access dao : retrieve all animes');
    // async/await with try/catch
    try {
      return await models.anime.findAll(); 
    } catch (err) {
      console.log('error in db for getAllAnimes() ::::', err.stack);
      return err; 
    }
  },

  async createAnime (req, res) {
    console.log('access dao : create new anime');
    try {
      const newAnime =  {
        title: req.title,
        synopsis: req.synopsis,
        rating: req.rating,
        startDate: req.startDate,
        endDate: req.endDate,
        status: req.status,
        posterImage: req.posterImage,
        coverImage: req.coverImage,
        nbEpisode: req.nbEpisode,
        episodeLength: req.episodeLength,
        ytVideoID: req.ytVideoID
      };
      // maybe use findOrCreate() 
      return await models.anime.create(newAnime);
    }
    catch(error) {
      // maybe an error about the creation of this item 
      // either the object is not well implement or either bug somewhere else
      console.log(error);
      return error;
    }  
  }
}