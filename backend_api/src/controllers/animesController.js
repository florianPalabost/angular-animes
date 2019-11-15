const AnimeService = require('../services/animesServices');

module.exports = {
  async findAllAnimes (req, res) {         
    try {
      let animes = await AnimeService.retrieveAnimes(); 
      // console.log('JSON get Animes:::::', JSON.stringify(animes));
      res.status(200).json(animes);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  async findAnimeByTitle (req, res) {         
    try {
      let anime = await AnimeService.retrieveAnimeByTitle(req.params.title); 
      res.status(200).json(anime);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  async addAnime (req, res) {            
    // console.log('anime want to create: ', req.body);    
    try {
      let anime = await AnimeService.addAnime(req.body);
      res.status(201).json(anime);
    } catch (err) {
      console.log(err);
      res.status(400).send(error);
    }
    
//     if(err){
//         res.send(err);
//     }    
//     res.json(contact);
// });
    },
};

// module.exports = {
//   create(req, res) {
//     return Todo
//       .create({
//         title: req.body.title,
//       })
//       .then(todo => res.status(201).send(todo))
//       .catch(error => res.status(400).send(error));
//   },
// };