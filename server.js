// =======================
// get the packages we need ============
// =======================
const express = require('express'); // express web server
const app = express();
const bodyParser = require('body-parser'); // used to parse request bodies
const morgan = require('morgan'); // http logger library
const mongoose = require('mongoose'); // mongoDB plugin
const cors = require('cors'); // cors header for requests

const config = require('./config'); // get the config file

// =======================
// configuration =========
// =======================
const port = process.env.PORT || 9090; // read port from the environment variables or define it for local development
mongoose.connect(config.database, {useMongoClient: true}); // connect to database
mongoose.Promise = global.Promise;
app.set('secret', config.secret); // secret variable for jwt tokens

// use body parser so we can get info from POST and/or URL parameters

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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
