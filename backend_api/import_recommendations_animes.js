const pg = require('pg');
const dotenv = require('dotenv');
const request = require('request');
const models = require('./models');
const databaseAnime = require('./db'); 
const axios = require('axios');
const qs = require('qs');
const _ = require('underscore');

dotenv.config();
const Pool = pg.Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'animes_api',
  password: process.env.POSTGRES_PWD,
  port: process.env.POSTGRES_PORT || '5432',
});

const URL_JIKAN = 'http://localhost:9001/public/v3/anime/';
const URL_SEARCH_JIKAN = 'http://localhost:9001/public/v3/search/anime?';

;(async () => {

  // first get all the animes
  let animes = await models.anime.findAll();
 // console.log('animes length : ', animes);

  // list of all animes
  for(let i=0; i < animes.length; i++) {
    console.log(':::::::::ANIME '+i+' / '+animes.length + ' ::::::::::::::::::');
    if (animes[i].title !== "" && animes[i].title !== null && animes[i].title !== undefined) {
      try {
        const response = await axios.get(URL_SEARCH_JIKAN + qs.stringify({ q: animes[i].title }));

        // console.log(response.data.results);
        if(response.data.results !== undefined && response.data.results.length > 0) {
          const respRecommendation = await axios.get(URL_JIKAN + response.data.results[0].mal_id + '/recommendations');
          console.log('recommendation length :', respRecommendation.data.recommendations.length);
          if(respRecommendation.data.recommendations.length > 0) {
            _.each(respRecommendation.data.recommendations, async (animeJikan) => {
              // find anime_recom title in DB
              const anime = await models.anime.findOne({
                where: {
                  title: animeJikan.title
                }
              });
              if (anime !== null) {
                await models.animes_recommendation.create({
                  anime_id: animes[i].id,
                  anime_id_recom: anime.id
                });
              }
            });
          }
        }
      }
      catch (e) {
        console.log('[request jikan search][error]::::',e);
      }

    }
    
  }

})().catch(e => console.log(e.stack));
