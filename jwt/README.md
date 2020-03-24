# JWT Node.JS
JWT microservice built for handle authentification of apps.

## Installation
````
docker compose up --build jwt 
````

### Database
* copy config.example.json to /config/config.json and fill the different fields
* check if database jwt is created in postgres container !
````
docker exec -it <jwt_docker_name> sh

# the bellow command will execute sequelize db:migrate 
npm run db
````

### import users 
dans config.json: development -> host: 127.0.0.1
pour le reste du temps : host: postgres 
