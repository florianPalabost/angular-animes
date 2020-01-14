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
  let nbLignes = 1;
  // data.meta.count -> contient le nb total d'animes to proceed faire un if dans le while pour le maj
  // let nbLignes = 14748;

  let start = 0;
  let length = 20;
  const linkApi = 'https://kitsu.io/api/edge/anime?page%5Blimit%5D=20&page%5Boffset%5D=';
  let link;

  // first get all the animes to update all the characters
  let animes = await models.anime.findAll();
  // let anime= await models.anime.findOne({
  //   where: {
  //     title: 'Brave Beats'
  //   }
  // });
  // let animes = [];
  // animes.push(anime);
  console.log('animes length : ', animes);

  // list of all animes
  for(let i=0; i < animes.length; i++) {
    console.log(':::::::::ANIME '+i+' / '+animes.length + ' ::::::::::::::::::');
  // for(let i=0; i < 2; i++) {
    if (animes[i].linkApi !== "" && animes[i].linkApi !== null && animes[i].linkApi !== undefined) {
    
      await sleep(500);
      request(animes[i].linkApi + '/characters', async (err, resp, body) => {
        if(err) 
          console.log('err load /characters : ', err);
        if(body !== undefined) {
          body = JSON.parse(body);
          if(Object.keys(body.data).length > 0) {
            // list of all the characters 
            for(let j=0; j < Object.keys(body.data).length; j++) {
              // request  for info about the character
              if (body.data[j].relationships.character.links.related !== "" &&
               body.data[j].relationships.character.links.related !== null && 
              body.data[j].relationships.character.links.related !== undefined) {
                request(body.data[j].relationships.character.links.related, async (errC, resp, persoInfos) => {
                  if(errC)
                    console.log('err load character : ', errC);
                  persoInfos = JSON.parse(persoInfos);
                  // console.log('request perso info');
                  let perso = await models.character.findOne({
                    where: {
                      name: persoInfos.data.attributes.canonicalName
                    }
                  });
                  if (perso !== null) {
                    // perso already exist -> update
                    // let isUpdated = await models.character.upsert(perso);
                    // if(isUpdated)
                    //   console.log('animes_characters updated');
                    // else
                    //   console.log('animes_characters not updated');
                    console.log('perso already exist');

                    // TODO just add character to animes
                    let persoOtherAnime = {
                      character_id: perso.character_id,
                      name: perso.name,
                      description: perso.description,
                      role: perso.role,
                      img: perso.img,
                      other_name: perso.other_name
                    };

                    if(animes[i].id) {
                      persoOtherAnime.animeId = animes[i].id;
                      console.log(`anime id : ${animes[i].id}`);
                      console.log('perso : ', persoOtherAnime.animeId);
                      await models.character.create(persoOtherAnime);
                      console.log('perso added to another anime');
                    }
                    else {
                      throw new Error(`no anime id with perso ${persoOtherAnime.name}`);
                    }


                  }
                  else {
                    // perso dont exist -> create
                    let newPerso = {
                      name: persoInfos.data.attributes.canonicalName,
                      animeId: animes[i].id
                    };
                    if(!checkIfEmpty(persoInfos.data.attributes.description)) {
                      newPerso.description = persoInfos.data.attributes.description;
                    }
                    if(!checkIfEmpty(body.data[j].attributes.role)) {
                      newPerso.role = body.data[j].attributes.role;
                    }
                    if(!checkIfEmpty(persoInfos.data.attributes.image) &&
                    !checkIfEmpty(persoInfos.data.attributes.image.original) ) {
                      newPerso.img = persoInfos.data.attributes.image.original;
                    }
                    if(!checkIfEmpty(persoInfos.data.attributes.otherNames) &&
                     persoInfos.data.attributes.otherNames.length > 0) {
                      newPerso.other_name = persoInfos.data.attributes.otherNames.join();
                    }
    
                    await models.character.create(newPerso);
                    console.log('perso created');
    
                  }
                });
              }
              else {
                // console.log('no info character');
              }
             
              
            }
          }
          else
            console.log('pas de characters pour :',animes[i].linkApi + '/characters' );
        }
        else
          console.log('json empty for : ' + animes[i].linkApi + '/characters');
      });
    }
    
  }

})().catch(e => console.log(e.stack));


const checkIfEmpty = (field) => {
  if(field === undefined)
    return true;
  else if(field === null)
    return true;
  return false;
}; 

function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}
