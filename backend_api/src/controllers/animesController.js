// const Contact = mongoose.model('Contact', ContactSchema);
const AnimeService = require('../services/animesServices');

module.exports = {

  async findAllAnimes (req, res) {         
    console.log('called getAllAnimes() in controller');
    let animes = await AnimeService.retrieveAnimes(); 
    console.log('end call animes Controller get Animes');
    res.json(animes);
    // Contact.find({}, (err, contact) => {
    //     if(err){
    //         res.send(err);
    //     }
    //     res.json(contact);
    // });
  },

  async addAnime (req, res) {            
    console.log('anime want to create: ', req.body);    
    console.log('call addAnime() in controller');    
    await AnimeService.addAnime(req.body);
    
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