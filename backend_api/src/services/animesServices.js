const db = require('../../db');

const retrieveAnimes = async (req, res) => {         
  return await db.getAllAnimes();  
};

const retrieveAnimesWith = async (batch) => {
  return await db.getAnimesWith(batch);
};

const retrieveAnimeByTitle = async (req, res) => {         
  return await db.getByTitle(req);  
};

const retrieveAnimesRecommendations = async (req, res) => {
  return await db.getAnimesRecommendations(req);
};

const retrieveAnimesWithUserId = async (req, status) => {
  return await db.getWithUserId(req, status);
};

const retrieveAnimeByFilters = async (req, genres, categories) => {
  return await db.getWithFilters(req, genres, categories);
};

const retrieveAnimeRewatchTimes = async (req, genres, categories) => {
  return await db.getAnimesRewatchTimes(req);
};

const retrieveAnimesUserStat = async (req, status) => {
  return await db.getAnimeUserStat(req, status);
};


const retrieveAnimesLike = async (req, res) => {         
  return await db.getLikeByTitle(req);  
};

const retrieveAnimesLikeAll = async (req, res) => {         
  return await db.getLikeByTitleAll(req);  
};

const addAnime = async (req, res) => {                
  return await db.createAnime(req);
};

const addOrUpdateAnimeRewatched = async (req, res) => {
  const animeRewatch = await db.getAnimesRewatchTimes(req);
  if(animeRewatch) {
    // already exist so we need to incremente watch time
    return await db.updateAnimeRewatch(req);
  }
  else {
    // not exist -> we create a new anime-rewatch with value 1;
    return await db.createAnimeRewatch(req);
  }

};

const updateAnime = async (req, res) => {                
  return await db.updateAnime(req);
};

const updateAnimeUserStat = async (req, res) => {
  return await db.updateAnimeUserStats(req);
};

const deleteAnime = async (req, res) => {                
  return await db.deleteAnime(req);
};

module.exports = {
  retrieveAnimes,
  retrieveAnimesWith,
  retrieveAnimesRecommendations,
  retrieveAnimesWithUserId,
  retrieveAnimesUserStat,
  retrieveAnimeByTitle,
  retrieveAnimeByFilters,
  retrieveAnimeRewatchTimes,
  retrieveAnimesLike,
  retrieveAnimesLikeAll,
  addAnime,
  addOrUpdateAnimeRewatched,
  updateAnime,
  updateAnimeUserStat,
  deleteAnime
};
