const _ = require('underscore');
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

const findAnimeRecommendations = async (req, res) => {
  try {
    console.log('ozefjkzeopfkp;;;;;',req.params.idAnime);
    let animes = await AnimeService.retrieveAnimesRecommendations(req.params.idAnime);
    res.status(200).json(animes);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const findAnimesWithUserId = async (req, res) => {
  try {
    let animesCompleted = await AnimeService.retrieveAnimesWithUserId(req.params.userId, 'completed');
    let animesWatching = await AnimeService.retrieveAnimesWithUserId(req.params.userId, 'watching');
    let animesWantToWatch = await AnimeService.retrieveAnimesWithUserId(req.params.userId, 'want_to_watch');
    let animesDontWantToWatch = await AnimeService.retrieveAnimesWithUserId(req.params.userId, 'dont_want_to_watch');
    const stats = {
      completed: animesCompleted.length > 0 ? animesCompleted : 0,
      watching: animesWatching.length > 0 ? animesWatching : 0,
      want_to_watch: animesWantToWatch.length > 0 ? animesWantToWatch : 0,
      dont_want_to_watch: animesDontWantToWatch.length > 0 ? animesDontWantToWatch : 0
    };
    console.log('toto stats:', stats);
    res.status(200).json(stats);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const findAnimesWithFilters = async (req, res) => {
  try {
    console.log('filters:::', req.body);

    // array with just the name of genres & categories for filter
    let genres = [];
    _.each(req.body.genres, (genre) => {
      genres.push(genre.genre_id);
    });

    console.log('les genres :::::::::::', genres);
    let categories = [];
    _.each(req.body.categories, (category) => {
      categories.push(category.category_id);
    });
    console.log('les categories :::::::::::', categories);

    let animes = await AnimeService.retrieveAnimeByFilters(req.body, genres, categories);
    console.log('ANIMES FILTERS LENGTH:::::::::::', Object.keys(animes).length);
    res.status(200).json(animes);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const findAnimeUserStatus = async (req, res) => {
  try {
    console.log('find Anime user status with:::', req.body);

    const statusCompleted = await AnimeService.retrieveAnimesUserStat(req.body, 'completed');
    const statusWatching = await AnimeService.retrieveAnimesUserStat(req.body, 'watching');
    const statusWantToWatch = await AnimeService.retrieveAnimesUserStat(req.body, 'want_to_watch');
    const statusDontWatch = await AnimeService.retrieveAnimesUserStat(req.body, 'dont_want_to_watch');

    // console.log('STATUS COMPLETED::::::::::::::::', statusCompleted);
    const theStatus = {
      completed: statusCompleted.length > 0 ? statusCompleted : 0,
      watching: statusWatching.length > 0 ? statusWatching : 0,
      want_to_watch: statusWantToWatch.length > 0 ? statusWantToWatch : 0,
      dont_want_to_watch: statusDontWatch.length > 0 ? statusDontWatch : 0
    };
    console.log('STATUS :::::::::::', theStatus);
    res.status(200).json(theStatus);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};


const updateAnimeUserStatus = async (req, res) => {
  try {
    console.log('Update Anime user status controller:::', req.body);
    let isUpdated = await AnimeService.updateAnimeUserStat(req.body);
    res.status(200).json(isUpdated);
    // let animes = await AnimeService.retrieveAnimeByFilters(req.body, genres, categories);
    //
    // res.status(200).json(animes);
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
   let isUpdated = await AnimeService.updateAnime(req.body);
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
  findAnimeRecommendations,
  findAnimeByTitle,
  findAnimesWithFilters,
  findAnimesWithUserId,
  findAnimesLike,
  findAnimesLikeAll,
  findAnimeUserStatus,
  addAnime,
  updateAnime,
  updateAnimeUserStatus,
  deleteAnime
};
