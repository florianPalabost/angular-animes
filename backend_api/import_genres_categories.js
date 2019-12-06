const pg = require('pg');
const dotenv = require('dotenv');
const request = require('request');
const models = require('./models');
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

;(async () => {
  // let nbLignes = 1;
  // data.meta.count -> contient le nb total d'animes to proceed faire un if dans le while pour le maj
  let nbLignes = 14748;

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
      // console.log('body:::',typeof body);
      for(var i = 0; i< Object.keys(body.data).length; i++) {
        console.log('---------Process::', body.data[i].attributes.canonicalTitle);
        // todo check if anime exist with anime title -> later
        
        let anime = await models.anime.findOne({
          where: {
            title: body.data[i].attributes.canonicalTitle
          }
        });

        if (typeof anime !== null) {
          // anime already exist
          console.log('anime already exist');
        
          //   update genres             
          if (body.data[i].relationships.genres !== null && body.data[i].relationships.genres !== "") {
            
            // do new request to the genres of the animes
            request(body.data[i].relationships.genres.links.related, async (error, response, infos) => {
              infos = JSON.parse(infos);
              for(let j = 0; j< Object.keys(infos.data).length; j++) {
                  let genre = await models.genre.findOne({
                    attributes: ['genre_id', 'name', 'description', 'createdAt', 'updatedAt'],
                    where: {
                      name: infos.data[j].attributes.name
                    }
                  });
                  console.log('genre already exist ? ');
                  if (genre !== null) {
                    console.log('genre not null --> yes');
                    // genre already exist just update anime to put the id
                    let isUpdated = await models.animes_genre.upsert( 
                      {
                          animeId: anime.id,
                          genreId: genre.genre_id
                      }
                    );
                    // let isUpdated = false;
                    if(isUpdated)
                      console.log('anime_genres updated');
                    else
                      console.log('anime_genres not updated aaaa');
                  }
                  else {
                    console.log('create new genre');
                    // genre doesnt exist we need to create it 
                    let newGenre = {
                      name: infos.data[j].attributes.name,
                    }; 
                    if(!checkIfEmpty(infos.data[j].attributes.description)) {
                      newGenre.description = infos.data[j].attributes.description;
                    }
                    await models.genre.create(newGenre);

                    let genre = await models.genre.findOne({
                      attributes: ['genre_id', 'name', 'description', 'createdAt', 'updatedAt'],
                      where: {
                        name: infos.data[j].attributes.name
                      }
                    });
                    let isUpdated = await models.animes_genre.upsert( 
                      {
                          animeId: anime.id,
                          genreId: genre.genre_id
                      }
                    );
                    if(isUpdated)
                      console.log('anime_genres updated with creation of genre');
                    else
                      console.log('anime_genres not updated with creation of genre');
                  }

              
              }
            });  

           
            
          }
          else {
            console.log('pas de genre');
          }

          // update categories
          if(body.data[i].relationships.categories.links.related) {
            request(body.data[i].relationships.categories.links.related, async (err, resp, catInfos) => {
              catInfos = JSON.parse(catInfos);
              for(let k = 0; k< Object.keys(catInfos.data).length; k++) {
                  let category = await models.category.findOne({
                    attributes: ['category_id', 'name', 'description', 'img', 'createdAt', 'updatedAt'],
                    where: {
                      name: catInfos.data[k].attributes.title
                    }
                  });
                  console.log('category already exist ? ');
                  if (category !== null) {
                    console.log('category not null --> yes');
                    // category already exist just update anime to put the id
                    let isUpdated = await models.animes_categorie.upsert( 
                      {
                          animeId: anime.id,
                          categoryId: category.category_id
                      }
                    );
                    // let isUpdated = false;
                    if(isUpdated)
                      console.log('anime_categories updated');
                    else
                      console.log('anime_categories not updated aaaa');
                  }
                  else {
                    console.log('create new category');
                    // category doesnt exist we need to create it 
                    let newCategory = {
                      name: catInfos.data[k].attributes.title,
                    }; 
                    if(!checkIfEmpty(catInfos.data[k].attributes.description)) {
                      newCategory.description = catInfos.data[k].attributes.description;
                    }
                    if(!checkIfEmpty(catInfos.data[k].attributes.image) && !checkIfEmpty(catInfos.data[k].attributes.image.original) ) {
                      newCategory.img = catInfos.data[k].attributes.image.original;
                    }
                    await models.category.create(newCategory);

                    let category = await models.category.findOne({
                      attributes: ['category_id', 'name', 'description', 'img', 'createdAt', 'updatedAt'],
                      where: {
                        name: catInfos.data[k].attributes.title
                      }
                    });
                    let isUpdated = await models.animes_categorie.upsert( 
                      {
                          animeId: anime.id,
                          categoryId: category.category_id
                      }
                    );
                    if(isUpdated)
                      console.log('anime_categories updated with creation of category');
                    else
                      console.log('anime_categories not updated with creation of category');
                  }

              }
            });
          }
          else {
            console.log('categories not defined for : ',body.data[i].attributes.canonicalTitle );
          }
         

        }
        else {
          console.log(':::::Create one anime::::::');

          let newAnime = {
            title: body.data[i].attributes.canonicalTitle,
          }; 
          // check and set attributes to object 
          if(!checkIfEmpty(body.data[i].id)) {
            newAnime.idApi = body.data[i].id;
          }
          if(!checkIfEmpty(body.data[i].links.self)) {
            newAnime.linkApi = body.data[i].links.self;
          }
          if(!checkIfEmpty(body.data[i].attributes.synopsis)) {
            newAnime.synopsis = body.data[i].attributes.synopsis;
          }
          if(!checkIfEmpty(body.data[i].attributes.subtype)) {
            newAnime.subtype = body.data[i].attributes.subtype;
          }
          if(!checkIfEmpty(body.data[i].attributes.averageRating)) {
            newAnime.averageRating = body.data[i].attributes.averageRating;
          }
          if(!checkIfEmpty(body.data[i].attributes.startDate)) {
            newAnime.startDate = body.data[i].attributes.startDate;
          }
          if(!checkIfEmpty(body.data[i].attributes.endDate)) {
            newAnime.endDate = body.data[i].attributes.endDate;
          }
          if(!checkIfEmpty(body.data[i].attributes.status)) {
            newAnime.status = body.data[i].attributes.status;
          }
          if(!checkIfEmpty(body.data[i].attributes.posterImage)) {
            newAnime.posterImage = body.data[i].attributes.posterImage.original;
          }
          if(!checkIfEmpty(body.data[i].attributes.coverImage)) {
            newAnime.coverImage = body.data[i].attributes.coverImage.original;
          }
          if(!checkIfEmpty(body.data[i].attributes.episodeCount)) {
            newAnime.nbEpisode = body.data[i].attributes.episodeCount;
          }
          if(!checkIfEmpty(body.data[i].attributes.episodeLength)) {
            newAnime.episodeLength = body.data[i].attributes.episodeLength;
          }
          if(!checkIfEmpty(body.data[i].attributes.youtubeVideoId)) {
            newAnime.ytVideoID = body.data[i].attributes.youtubeVideoId;
          }
      
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