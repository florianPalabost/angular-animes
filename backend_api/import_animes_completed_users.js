const pg = require('pg');
const dotenv = require('dotenv');
const models = require('./models');
const axios = require('axios');
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

const URL_JIKAN = 'http://localhost:9001/public/v3/user/';
const URL_USERS_SERVICE = 'http://localhost:3003/api/users';

;(async () => {
try {
  const users = await axios.get(URL_USERS_SERVICE);
  if(users.status === 200 && users.data.length > 0) {
    _.each(users.data, async (user) => {
      await sleep(1500);
      const response = await axios.get(URL_JIKAN + user.username + '/animelist/completed');
      if(response.status === 200 && response.data.anime.length > 0) {
        _.each(response.data.anime, async (anime) => {
            await sleep(1500);
          //  check anime exist in db and take its id for anime_completed record
          if (anime.title !== '') {
            const animeDB = await models.anime.findOne({
              where: {
                title: anime.title.toString()
              }
            });

            if (animeDB !== null) {
              const isExist = await models.animes_completed.findOne({
                where: {
                  user_id: user.id.toString(),
                  anime_id: animeDB.id
                }
              });
              if (isExist === null) {
                await models.animes_completed.create({
                  user_id: user.id.toString(),
                  anime_id: parseInt(animeDB.id)
                });
              }

            }
          }
        });
      }
    });
  }

}
catch (e) {
  console.log(e.stack);
}


})().catch(e => console.log(e.stack));

function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}
