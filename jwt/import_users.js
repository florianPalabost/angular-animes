const User = require('./models').User;

const pg = require('pg');
const dotenv = require('dotenv');
const axios = require('axios');
const _ = require('underscore');

dotenv.config();
const Pool = pg.Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'jwt',
  password: process.env.POSTGRES_PWD || 'admin',
  port: process.env.POSTGRES_PORT || '5432',
});

const URL_JIKAN = 'http://localhost:9001/public/v3/club/';

;(async () => {

  try {
    // for import the users of the 100 first club (club only way to have the username to fetch)
    for(let i = 1; i < 100; i++) {
      const response = await axios.get(URL_JIKAN + i + '/members');
      if (response.data !== undefined && response.data.members.length > 0) {
        _.each(response.data.members, async (user) => {
          // check if user already in database
          const userDB = await User.findOne({
            where: {
              username: user.username
            }
          });

          if(userDB === null || userDB === undefined) {
            // user not exist --> create him
            const newUser = {
              username: user.username,
              password: user.username,
            };
            const isCreated = await User.create(newUser);
            if(!isCreated) {
              throw new Error(user.username + 'not created');
            }
          }

        });
      }
      else {
        console.log('no users for clubs ', i);
      }
    }
  }
  catch (e) {
    console.log(e);
  }

})().catch(e => console.log(e.stack));
