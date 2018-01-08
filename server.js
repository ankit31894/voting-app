//code taken from https://github.com/scotch-io/easy-node-authentication/ with tweaks

// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
process.env.config = process.env.config || 'prod'

var configDB = require('./config/database.js');
var port = process.env.PORT;
configDB.connect(); // connect to our database
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser()); 
app.use(session({
  secret: 'dkfhbsdhgSDHDFighaifa',
  saveUninitialized: false,
  resave: false
}));
require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static(__dirname + '/public'));
// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
