# Animes Angular 7 - NodeJS
Animes CRUD built with Angular & NodeJS. Also test Chart.js with the genres & categories of animes.

## Tech Stack

* [Docker-compose], [Node.js], [Angular] [JavaScript][js], [Babel] — core platform and dev tools
* [Express][express], [cors] etc. — common HTTP-server features
* [PostgreSQL][pg], [Redis] — SQL, document, key/value data store; data access and migrations
* [Jest] - unit and snapshot testing


## Directory Layout

```bash
├── /backend_api/                     # NodeJS API (Animes CRUD)
├── /frontend/                   # Angular app 
├── /jikan/                # jikan api docker local (for faster import data)
├── docker-compose.yml          # Defines Docker services, networks and volumes
├── README.md                # Detail project
```

## Requirements
- docker-compose 
- docker 
- node v13 

## Install

````
docker-compose up

# Create database
docker exec -it postgres sh 
su postgres
psql
createdb animes_api

# exit postgres docker

# (tmp solution) sequelize db:migrate
docker exec -it <nodejs_container_name> sh
cd /usr/src/app 
sequelize db:migrate

````

 
