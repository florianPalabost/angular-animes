const db = require('../../db');

const retrieveAnimes = async (req, res) => {         
  return await db.getAllAnimes();  
};

const retrieveAnimeByTitle = async (req, res) => {         
  return await db.getByTitle(req);  
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
  retrieveAnimeByTitle,
  addAnime,
  updateAnime,
  deleteAnime
};