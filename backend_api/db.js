const dotenv = require('dotenv');
const models = require('./models');

dotenv.config();

const getAllAnimes = async (req, res) => {
  console.log('access dao : retrieve all animes');
  // async/await with try/catch
  try {
    return await models.anime.findAll(); 
  } catch (err) {
    console.log('error in db for getAllAnimes() ::::', err.stack);
    return err; 
  }
};

const getByTitle = async (title) => {
  try {
    return await models.anime.findOne({
      where: {
        title: title
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getByID = async (id) => {
  try {
    return await models.anime.findOne({
      where: {
        id: id
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createAnime = async (req, res) => {
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
};

const updateAnime = async (req) => {
  try {
    // first get & check the anime to update if exist
    let anime = await getByID(req.id);
    // if you modify the title you're fuck !!!
    // So we use the id -> primary key
    if(anime !== null) {
      return await models.anime.update(req, {
        where: {
          id: req.id
        }
      });
    } 
    throw new Error('anime not found with id:', req.id); 
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteAnime = async (idAnime) => {
  try {
    // check if anime exist
    let anime = await getByID(idAnime);
    console.log(anime);
    if(anime !== null) {
      return await models.anime.destroy({
        where: {
          id: idAnime
        }
      });   
    }
    throw new Error('anime not found with id:', idAnime); 
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getAllAnimes,
  getByTitle,
  getByID,
  createAnime,
  updateAnime,
  deleteAnime
};