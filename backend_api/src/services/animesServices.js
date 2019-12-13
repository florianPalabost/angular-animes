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


const retrieveAnimesLike = async (req, res) => {         
  return await db.getLikeByTitle(req);  
};

const retrieveAnimesLikeAll = async (req, res) => {         
  return await db.getLikeByTitleAll(req);  
};

const addAnime = async (req, res) => {                
  return await db.createAnime(req);
};

const updateAnime = async (req, res) => {                
  return await db.updateAnime(req);
};

const deleteAnime = async (req, res) => {                
  return await db.deleteAnime(req);
};

module.exports = {
  retrieveAnimes,
  retrieveAnimesWith,
  retrieveAnimeByTitle,
  retrieveAnimesLike,
  retrieveAnimesLikeAll,
  addAnime,
  updateAnime,
  deleteAnime
};
