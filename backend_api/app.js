var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var cors = require('cors');
var db = require('./db');

var animes = require('./routes/animes');
var characters = require('./routes/characters');
var genres = require('./routes/genres');
var categories = require('./routes/categories');

let reporter = function (type, ...rest)
{
	// remote reporter logic goes here
};

const API_VERSION = 'v1';

/* handle an uncaught exception & exit the process */
process.on('uncaughtException', function (err)
{
	console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
	console.error(err.stack);

	reporter("uncaughtException", (new Date).toUTCString(), err.message, err.stack);

	process.exit(1);
});

/* handle an unhandled promise rejection */
process.on('unhandledRejection', function (reason, promise)
{
	console.error('unhandled rejection:', reason.message || reason);

	reporter("uncaughtException", (new Date).toUTCString(), reason.message || reason);
})

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

// cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Set the routes here 
app.use('/api/' + API_VERSION + '/animes', animes);
app.use('/api/'+ API_VERSION +'/characters', characters);
app.use('/api/'+ API_VERSION +'/genres', genres);
app.use('/api/'+ API_VERSION +'/categories', categories);

module.exports = app;
