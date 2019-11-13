const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const Pool = pg.Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PWD,
  port: process.env.POSTGRES_PORT,
});

pool.on('connect', () => {
  console.log('connected to the db');
});
module.exports = {
  async getAllAnimes (req, res) {
    console.log('access dao : retrieve all animes');
    // async/await
    try {
      pool.connect();
      const text = 'SELECT * FROM animes';
      // const res = await pool.query(text, values)
      const res = await pool.query(text);
      console.log('res',res.rows);
      return res.rows;
      // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    } catch (err) {
      console.log(err.stack);
    }
  },
  async createAnime (req, res) {
    console.log('access dao : create new anime');
    // async/await
    try {
      pool.connect();
      const values =[
        req.title,
        req.synopsis,
        req.rating,
        req.startDate,
        req.endDate,
        req.status,
        req.posterImage,
        req.coverImage,
        req.nbEpisode,
        req.episodeLength,
        req.ytVideoID
      ];
      const text = `INSERT INTO animes(
        title,
        synopsis,
        rating,
        startDate,
        endDate,
        status,
        posterImage,
        coverImage,
        nbEpisode,
        episodeLength,
        ytVideoID)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
      try {
        // const res = await pool.query(text, values)
        const res = await pool.query(text, values);
        console.log('res db : ',res);
        // when a new row/item is create it's better to use status 201 than 200 
        return res.status(201).send(res.rows);
      }
      catch(error) {
        // maybe an error about the creation of this item 
        // either the object is not well implement or either bug somewhere else
        return res.status(400).send(error);
      }  

    } catch (err) {
      // mostly an error about the pg connection
      console.log(err.stack);
    }
  }
}