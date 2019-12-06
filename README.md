# Animes Angular 7 - NodeJS
In progress ....

## Tech Stack TODO

* [Docker][docker], [Node.js][node], [Yarn][yarn], [JavaScript][js], [Babel][babel], [Flow][flow], [Prettier][prettier] — core platform and dev tools
* [Express][express], [Passport.js][passport], [session][session], [flash][flash], [cors][cors] etc. — common HTTP-server features
* [GraphQL.js][gqljs], [GraphQL.js Relay][gqlrelay], [DataLoader][loader], [validator][validator] — [GraphQL][gql] schema and API endpoint
* [PostgreSQL][pg], [Redis][redis], [Knex][knex], [pg][nodepg] — SQL, document, key/value data store; data access and migrations
* [Nodemailer][mailer], [Handlebars][hbs], [Juice][juice] — transactional email and email templates /w layout support
* [I18next][i18next], [I18next Middleware][i18nextmid], [I18next Backend][i18nextback] — localization and translations
* [Jest][jest] - unit and snapshot testing


## Directory Layout TODO

```bash
├── /build/                     # The compiled output (via Babel)
├── /locales/                   # Localization resources (i18n)
├── /migrations/                # Database schema migrations
├── /seeds/                     # Scripts with reference/sample data
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