const dotenv = require('dotenv');
const models = require('./models');
const Sequelize = require('sequelize');

dotenv.config();

const getAllAnimes = async (req, res) => {
  console.log('access dao : retrieve all animes');
  // async/await with try/catch
  try {
    return await models.anime.findAll({
      attributes: ['id', 'status' ],
      include: [ {
        model: models.genre,
        through: { attributes: [] } // to avoid to take the attributes of animes_genres table
      }, {
        model: models.category,
        through: { attributes: [] }
      }
      ]

    },
    ); 
  } catch (err) {
    console.log('error in db for getAllAnimes() ::::', err.stack);
    return err; 
  }
};

const getAnimesWith = async (batch) => {
  // console.log('access dao : retrieve animes with batch:'+batch + ' & lastKey: '+lastKey);
  // async/await with try/catch
  try {
    console.log('batch : ' + batch);
    return await models.anime.findAll({
          attributes: ['id', 'title', 'status', 'posterImage', 'coverImage', 'subtype'],
          limit: 10,
          offset: batch
        },
    );
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
      },
      include: [ {
        model: models.genre,
        through: { attributes: [] } // to avoid to take the attributes of animes_genres table
      }, {
        model: models.category,
        through: { attributes: [] }
      }, {
        model: models.character,
        attributes: ['name','role','description', 'img', 'other_name']
      }
    ]
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getLikeByTitle = async (title) => {
  try {
    console.log('db title : ', title);
    return await models.anime.findAll({
      where: {
        title: {
          [Sequelize.Op.iLike]: '%' + title + '%'
        }
      },
      attributes: ['id', 'title', 'status', 'posterImage', 'coverImage', 'subtype'],
      limit: 10
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getLikeByTitleAll = async (title) => {
  try {
    console.log('db title : ', title);
    return await models.anime.findAll({
      where: {
        title: {
          [Sequelize.Op.iLike]: '%' + title + '%'
        }
      },
      attributes: ['id', 'title', 'status', 'posterImage', 'coverImage', 'subtype'],
      // limit: 10
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getByID = async (id) => {
  try {
    return await models.anime.findOne({
      include: [
        {
          model: models.animes_genre, as: 'genre'
        }
      ],
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

const getNbCharacters = async (id) => {
  try {
    return await models.character.count({distinct:true, col: 'character_id'});
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getAllAnimes,
  getAnimesWith,
  getByTitle,
  getLikeByTitle,
  getLikeByTitleAll,
  getByID,
  createAnime,
  updateAnime,
  deleteAnime,
  getNbCharacters
};
