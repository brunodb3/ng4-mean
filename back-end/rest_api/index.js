/**
 *  index.js
 *    - Entry file for the RESTful API
 *  
 ******************************************************************************/

/* Importing modules */
var cors = require('cors'),
  morgan = require('morgan'),
  express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  argv = require('minimist')(process.argv.slice(2));

/* Configuring the server */
var app = express(),
  Config = require('./app/config');

/* Variables */
var port = Config.port;

/* Checking the environment */
if (argv.env === 'prod') {
  /* Production environment */
  app.set('env', 'production');
} else {
  /* Development environment */
  app.set('env', 'development');

  /* Logging the HTTP requests to console */
  app.use(morgan('dev'));
}

/* Setting the mongoose promise as global (mpromise is deprecated) */
mongoose.Promise = global.Promise;

/* Connecting to the database */
mongoose.connect(Config.db_url, { useMongoClient: true });

/* Using JSON as a parser */
app.use(bodyParser.json());

/* Enabling CORS */
app.use(cors());

/* Override with the HTTP Method header in the request */
app.use(methodOverride('X-HTTP-Method-Override'));

/* Loading the app's routes */
require('./app/routes')(app);

/* Error handler */
app.use(function(err, req, res, next) {
  var responseJson = {
    success: false,
    err_description: err,
    err_message: err.message
  };

  /* setting the response status */
  res.status(err.status || 500);

  /* checking the environment (production/development) */
  if (app.get('env') === 'production') {
    /* if the env is production, we want no stacktrace for the user */
    delete responseJson.err_description;
  }

  /* JSON response */
  res.json(responseJson);
});

/* Starting the server */
app.listen(port);
console.log('Running on port ' + port + '. Environment: ' + app.get('env'));

/* Exposing the app */
exports = module.exports = app;