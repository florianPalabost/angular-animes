const db = require('../../db');

module.exports = {
  async retrieveAnimes (req, res) {         
    return await db.getAllAnimes();  
  },

  async addAnime (req, res) {                
    return await db.createAnime(req);
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