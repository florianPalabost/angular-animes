// TODO In this file call the right controller corresponding to its route 

var express = require('express');
var router = express.Router();

const AnimesController = require('../src/controllers/animesController');

/* GET animes listing. */
router.get('/', AnimesController.findAllAnimes);
router.get('/:title', AnimesController.findAnimeByTitle);
router.get('/pages/:batch', AnimesController.findAnimes);
router.get('/like/:name', AnimesController.findAnimesLike);
router.get('/likeall/:name', AnimesController.findAnimesLikeAll);
router.get('/:idAnime/recommendations', AnimesController.findAnimeRecommendations);

router.post('/get-rewatch', (req, res) => {AnimesController.findAnimeRewatchedTimes(req, res)});
router.post('/update-rewatch', (req, res) => {AnimesController.createOrUpdateAnimeRewatched(req, res)});


router.put('/:id', (req, res) => {AnimesController.updateAnime(req, res)});
router.delete('/:id', AnimesController.deleteAnime);
router.post('/', (req, res) => {AnimesController.addAnime(req, res)});
router.post('/filters', (req, res) => {AnimesController.findAnimesWithFilters(req, res)});
router.post('/watched-status', (req, res) => {AnimesController.updateAnimeUserStatus(req, res)});
router.post('/status-user', (req, res) => {AnimesController.findAnimeUserStatus(req, res)});

router.get('/users/:userId', AnimesController.findAnimesWithUserId);


module.exports = router;
