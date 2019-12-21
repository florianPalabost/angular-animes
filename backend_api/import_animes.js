const pg = require('pg');
const dotenv = require('dotenv');
const request = require('request');
const models = require('./models/');
const databaseAnime = require('./db'); 

dotenv.config();
const Pool = pg.Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'animes_api',
  password: process.env.POSTGRES_PWD,
  port: process.env.POSTGRES_PORT || '5432',
});
console.log('user : ', process.env.POSTGRES_USER);
console.log('host : ', process.env.POSTGRES_HOST);
console.log('database : ', process.env.POSTGRES_DB);
console.log('password : ', process.env.POSTGRES_PWD);
console.log('port : ', process.env.POSTGRES_PORT);

;(async () => {
  // const client = await pool.connect();
  // console.log('connected to the db for creating database !');

  // let nbLignes = 1;
  // data.meta.count -> contient le nb total d'animes to proceed
  let nbLignes = 14901;

  let start = 0;
  let length = 20;
  const linkApi = 'https://kitsu.io/api/edge/anime?page%5Blimit%5D=20&page%5Boffset%5D=';
  let link;

  // set all the link to scratch infos 
  while (start < nbLignes) {
    link = linkApi + start;
    console.log('call : ', link);
    // call url to have the 20 animes to proceed
    request(link, async (err, resp, body) => {
      // on recup un string donc il faut le parse en json pour mieux l'utiliser 
      body = JSON.parse(body);

      if (body.meta.count !== "" && nbLignes < body.meta.count) {
        nbLignes = body.meta.count;
      }
      console.log('nbLIGNE:::::::::::::', nbLignes);
      // console.log('body:::',typeof body);
      for(var i = 0; i< Object.keys(body.data).length; i++) {
        console.log('---------Process::', body.data[i].attributes.canonicalTitle);
        // todo check if anime exist with anime title -> later
        
        let anime = await models.anime.findOne({
          where: {
            title: body.data[i].attributes.canonicalTitle
          }
        });

        if (typeof anime != null) {
          // anime already exist
          console.log('anime already exist');
          // console.log('ANIME:::::', anime);
             
          // Update the anime subtype : TV, ova, film, ...
          if (body.data[i].attributes.subtype !== null && body.data[i].attributes.subtype !== "") {
            console.log('update subtype ', body.data[i].attributes.subtype);
            await models.anime.update( 
              {
                subtype: body.data[i].attributes.subtype
              },
              {
                where: {
                  title: body.data[i].attributes.canonicalTitle
                }
              }
            );
            
          }
          else {
            console.log('pas de subtype');
          }
        }
        else {
          console.log(':::::Create one anime::::::');

          let newAnime = {
            title: body.data[i].attributes.canonicalTitle,
          };

          let fields = {
              idApi: body.data[i].id ,
              linkApi: body.data[i].links.self !== 'undefined' ? body.data[i].links.self : null,
              synopsis: body.data[i].attributes.synopsis !== 'undefined' ? body.data[i].attributes.synopsis : null,
              subtype: body.data[i].attributes.subtype !== 'undefined' ? body.data[i].attributes.subtype : null,
              averageRating: body.data[i].attributes.averageRating !== 'undefined' ? body.data[i].attributes.averageRating : null,
              startDate: body.data[i].attributes.startDate !== 'undefined' ? body.data[i].attributes.startDate : null,
              endDate: body.data[i].attributes.endDate !== 'undefined' ? body.data[i].attributes.endDate : null,
              status: body.data[i].attributes.status !== 'undefined' ? body.data[i].attributes.status : null,
              nbEpisode: body.data[i].attributes.averageRating !== 'undefined' ? body.data[i].attributes.averageRating : null,
              episodeCount: body.data[i].attributes.episodeCount !== 'undefined' ? body.data[i].attributes.episodeCount : null,
              episodeLength: body.data[i].attributes.episodeLength !== 'undefined' ? body.data[i].attributes.episodeLength : null,
              ytVideoID: body.data[i].attributes.youtubeVideoId !== 'undefined' ? body.data[i].attributes.youtubeVideoId : null
          };

          for (let key in fields) {
            if(!checkIfEmpty(fields[key])) {
              newAnime.key = fields[key];
            }
          }
          // // check and set attributes to object
          // if(!checkIfEmpty(body.data[i].id)) {
          //   newAnime.idApi = body.data[i].id;
          // }
          // if(!checkIfEmpty(body.data[i].links.self)) {
          //   newAnime.linkApi = body.data[i].links.self;
          // }
          // if(!checkIfEmpty(body.data[i].attributes.synopsis)) {
          //   newAnime.synopsis = body.data[i].attributes.synopsis;
          // }
          // if(!checkIfEmpty(body.data[i].attributes.subtype)) {
          //   newAnime.subtype = body.data[i].attributes.subtype;
          // }
          // if(!checkIfEmpty(body.data[i].attributes.averageRating)) {
          //   newAnime.averageRating = body.data[i].attributes.averageRating;
          // }
          // if(!checkIfEmpty(body.data[i].attributes.startDate)) {
          //   newAnime.startDate = body.data[i].attributes.startDate;
          // }
          // if(!checkIfEmpty(body.data[i].attributes.endDate)) {
          //   newAnime.endDate = body.data[i].attributes.endDate;
          // }
          // if(!checkIfEmpty(body.data[i].attributes.status)) {
          //   newAnime.status = body.data[i].attributes.status;
          // }
          if(!checkIfEmpty(body.data[i].attributes.posterImage)) {
            newAnime.posterImage = body.data[i].attributes.posterImage.original;
          }
          if(!checkIfEmpty(body.data[i].attributes.coverImage)) {
            newAnime.coverImage = body.data[i].attributes.coverImage.original;
          }
          // if(!checkIfEmpty(body.data[i].attributes.episodeCount)) {
          //   newAnime.nbEpisode = body.data[i].attributes.episodeCount;
          // }
          // if(!checkIfEmpty(body.data[i].attributes.episodeLength)) {
          //   newAnime.episodeLength = body.data[i].attributes.episodeLength;
          // }
          // if(!checkIfEmpty(body.data[i].attributes.youtubeVideoId)) {
          //   newAnime.ytVideoID = body.data[i].attributes.youtubeVideoId;
          // }
      
          await models.anime.create(newAnime);
        }
        
      }
    });

    start += length;
  }

})().catch(e => console.log(e.stack));


const checkIfEmpty = (field) => {
  if(field === undefined)
    return true;
  else if(field === null)
    return true;
  return false;
};
