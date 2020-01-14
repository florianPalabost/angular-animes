# Animes Angular 7 - NodeJS
In progress ....

## Tech Stack TODO

* [Docker compose], [Node.js], [Angular] [JavaScript][js], [Babel][babel] — core platform and dev tools
* [Express][express], [cors][cors] etc. — common HTTP-server features
* [PostgreSQL][pg], [Redis][redis] — SQL, document, key/value data store; data access and migrations
* [Jest][jest] - unit and snapshot testing


## Directory Layout TODO

```bash
├── /backend_api/                     # The compiled output (via Babel)
├── /frontend/                   # Localization resources (i18n)
├── /jikan/                # Database schema migrations
├── /src/                       # Node.js application source files
│   ├── /emails/                # Handlebar templates for sending transactional email
│   ├── /routes/                # Express routes, e.g. /login/facebook
│   ├── /schema/                # GraphQL schema type definitions
│   ├── /utils/                 # Utility functions (mapTo, mapToMany etc.)
│   ├── /app.js                 # Express.js application
│   ├── /Context.js             # Data loaders and other context-specific stuff
│   ├── /db.js                  # Database access and connection pooling (via Knex)
│   ├── /email.js               # Client utility for sending transactional email
│   ├── /errors.js              # Custom errors and error reporting
│   ├── /passport.js            # Passport.js authentication strategies
│   ├── /redis.js               # Redis client
│   ├── /server.js              # Node.js server (entry point)
│   └── /types.js               # Flow type definitions
├── /tools/                     # Build automation scripts and utilities
├── docker-compose.yml          # Defines Docker services, networks and volumes
├── docker-compose.override.yml # Overrides per developer environment (not under source control)
├── Dockerfile                  # Commands for building a Docker image for production
├── package.json                # List of project dependencies
└── postgres-initdb.sh          # Configuration script for the PostgreSQL Docker container
```