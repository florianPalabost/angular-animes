const _ = require('underscore');
const AnimeService = require('../services/animesServices');
const GenericService = require('../services/genericService');

const findAllAnimes = async (req, res) => {         
  try {
    const animes = await GenericService.retrieveDb('getAllAnimes');
    res.status(200).json(animes);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const findAnimes = async (req, res) => {
  try {
    const animes = await GenericService.retrieveDb('getAnimesWith', req.params.batch);
    res.status(200).json(animes);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const findAnimeByTitle = async (req, res) => {
  try {
    const anime = await GenericService.retrieveDb('getByTitle', req.params.title);
    res.status(200).json(anime);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const findAnimeRecommendations = async (req, res) => {
  try {
    const animes = await GenericService.retrieveDb('getAnimesRecommendations', req.params.idAnime);
    res.status(200).json(animes);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const findAnimesWithUserId = async (req, res) => {
  try {
    const animesCompleted = await GenericService.retrieveDb('getWithUserId', req.params.userId, 'completed');
    const animesWatching = await GenericService.retrieveDb('getWithUserId', req.params.userId, 'watching');
    const animesWantToWatch = await GenericService.retrieveDb('getWithUserId', req.params.userId, 'want_to_watch');
    const animesDontWantToWatch = await GenericService.retrieveDb('getWithUserId', req.params.userId, 'dont_want_to_watch');
    const animesRewatched = await GenericService.retrieveDb('getWithUserId', req.params.userId, 'rewatched');
    const stats = {
      completed: animesCompleted.length > 0 ? animesCompleted : 0,
      watching: animesWatching.length > 0 ? animesWatching : 0,
      want_to_watch: animesWantToWatch.length > 0 ? animesWantToWatch : 0,
      dont_want_to_watch: animesDontWantToWatch.length > 0 ? animesDontWantToWatch : 0,
      rewatched: animesRewatched.length > 0 ? animesRewatched : 0
    };

    res.status(200).json(stats);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const findAnimesWithFilters = async (req, res) => {
  try {
    // console.log('filters:::', req.body);
    // array with just the name of genres & categories for filter
    let genres = [];
    _.each(req.body.genres, (genre) => {
      genres.push(genre.genre_id);
    });

    // console.log('les genres :::::::::::', genres);
    let categories = [];
    _.each(req.body.categories, (category) => {
      categories.push(category.category_id);
    });
    // console.log('les categories :::::::::::', categories);

    // const animes = await AnimeService.retrieveAnimeByFilters(req.body, genres, categories);
    const animes = await GenericService.retrieveDb('getWithFilters', req.body, [genres, categories]);
    // console.log('ANIMES FILTERS LENGTH:::::::::::', Object.keys(animes).length);
    res.status(200).json(animes);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const findAnimeRewatchedTimes = async (req, res) => {
  try {
    const rewatchTimes = await GenericService.retrieveDb('getAnimesRewatchTimes', req.body);
    if(rewatchTimes) {
      res.status(200).json(rewatchTimes.times_rewatched);
    }
    else {
      res.status(200).json(0);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const findAnimeUserStatus = async (req, res) => {
  try {
    const statusCompleted = await GenericService.retrieveDb('getAnimeUserStat', req.body, 'completed');
    const statusWatching = await GenericService.retrieveDb('getAnimeUserStat', req.body, 'watching');
    const statusWantToWatch = await GenericService.retrieveDb('getAnimeUserStat', req.body, 'want_to_watch');
    const statusDontWatch = await GenericService.retrieveDb('getAnimeUserStat', req.body, 'dont_want_to_watch');

    const theStatus = {
      completed: statusCompleted.length > 0 ? statusCompleted : 0,
      watching: statusWatching.length > 0 ? statusWatching : 0,
      want_to_watch: statusWantToWatch.length > 0 ? statusWantToWatch : 0,
      dont_want_to_watch: statusDontWatch.length > 0 ? statusDontWatch : 0
    };
    res.status(200).json(theStatus);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const updateAnimeUserStatus = async (req, res) => {
  try {
    console.log('Update Anime user status controller:::', req.body);
    // const isUpdated = await AnimeService.updateAnimeUserStat(req.body);
    const isUpdated = await GenericService.retrieveDb('updateAnimeUserStats', req.body);
    res.status(200).json(isUpdated);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};


const findAnimesLike = async (req, res) => {         
  try {
    const animes = await GenericService.retrieveDb('getLikeByTitle', req.params.name);
    res.status(200).json(animes);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const findAnimesLikeAll = async (req, res) => {         
  try {
    const animes = await GenericService.retrieveDb('getLikeByTitleAll', req.params.name);
    res.status(200).json(animes);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const addAnime = async (req, res) => {            
  try {
    const anime = await GenericService.retrieveDb('createAnime', req.body);
    res.status(201).json(anime);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const createOrUpdateAnimeRewatched = async (req, res) => {
  try {
    const anime = await AnimeService.addOrUpdateAnimeRewatched(req.body);
    res.status(201).json(anime);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }

};


const updateAnime = async (req, res) => {
  try {
    // req.body --> anime to update
    const isUpdated = await GenericService.retrieveDb('updateAnime', req.body);
    res.status(200).json(isUpdated);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const deleteAnime = async (req, res) => {
  try {
    // req.params.id --> anime id to delete
    const isDeleted = await GenericService.retrieveDb('deleteAnime', req.params.id);
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
  findAnimeRewatchedTimes,
  addAnime,
  createOrUpdateAnimeRewatched,
  updateAnime,
  updateAnimeUserStatus,
  deleteAnime
};
