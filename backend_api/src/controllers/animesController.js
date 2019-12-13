const AnimeService = require('../services/animesServices');

const findAllAnimes = async (req, res) => {         
  try {
    let animes = await AnimeService.retrieveAnimes(); 
    // console.log('JSON get Animes:::::', JSON.stringify(animes));
    res.status(200).json(animes);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const findAnimes = async (req, res) => {
  try {
    console.log('oui');
    let animes = await AnimeService.retrieveAnimesWith(req.params.batch);
    // console.log('JSON get Animes:::::', JSON.stringify(animes));
    res.status(200).json(animes);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const findAnimeByTitle = async (req, res) => {         
  try {
    let anime = await AnimeService.retrieveAnimeByTitle(req.params.title); 
    res.status(200).json(anime);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const findAnimesLike = async (req, res) => {         
  try {
    let animes = await AnimeService.retrieveAnimesLike(req.params.name); 
    res.status(200).json(animes);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const findAnimesLikeAll = async (req, res) => {         
  try {
    let animes = await AnimeService.retrieveAnimesLikeAll(req.params.name); 
    res.status(200).json(animes);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};


const addAnime = async (req, res) => {            
  try {
    let anime = await AnimeService.addAnime(req.body);
    res.status(201).json(anime);
  } catch (err) {
    console.log(err);
    res.status(400).send(error);
  }
  
};

const updateAnime = async (req, res) => {
  try {
    // req.body --> anime to update
    console.log('update controller : ', req.body);

 //   let isUpdated = await AnimeService.updateAnime(req.body);
    res.status(200).json(isUpdated);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const deleteAnime = async (req, res) => {
  try {
    // req.params.id --> anime id to delete
    let isDeleted = await AnimeService.deleteAnime(req.params.id);
    res.status(200).json(isDeleted);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  findAllAnimes,
  findAnimes,
  findAnimeByTitle,
  findAnimesLike,
  findAnimesLikeAll,
  addAnime,
  updateAnime,
  deleteAnime
};
