// =======================
// get the packages we need ============
// =======================
var express = require('express'); // express web server
var app = express();
var bodyParser = require('body-parser'); // used to parse request bodies
var morgan = require('morgan'); // http logger library
var mongoose = require('mongoose'); // mongoDB plugin
var cors = require('cors'); // cors header for requests

var config = require('./config'); // get the config file

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 9090; // read port from the environment variables or define it for local development
mongoose.connect(config.database, {useMongoClient: true}); // connect to database
mongoose.Promise = global.Promise;
app.set('secret', config.secret); // secret variable for jwt tokens

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

global.base_dir = '.';
global.abs_path = function (path) {
    return base_dir + path;
};
global.include = function (file) {
    return require(abs_path('/' + file));
};

// =======================
// routes ================
// =======================

app.use(cors());

include('app/routes/index')(app);

app.listen(port);
console.log('Magic happens at http://localhost:' + port);
