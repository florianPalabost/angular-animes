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

## Install

* Frontend 
````
npm install
````

* Backend 
````
docker-compose up --build -d
npm install
````
