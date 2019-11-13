const db = require('../../db');

module.exports = {

  async retrieveAnimes (req, res) {         
    console.log('called retrieveAnimes() in service');
    let animes = await db.getAllAnimes();
    console.log('end call services restrieveAnimes');
    return animes;
    // Contact.find({}, (err, contact) => {
    //     if(err){
    //         res.send(err);
    //     }
    //     res.json(contact);
    // });
  },

  async addAnime (req, res) {                
    console.log('call addAnime() in service');
    console.log('in service req : ', req);
    await db.createAnime(req);
    console.debug('res: ', res);

        // let newContact = new Contact(req.body);
        // newContact.save((err, contact) => {
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