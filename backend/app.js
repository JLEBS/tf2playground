var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var ensureAuthenticated = require('./middleware/authenticate-user');

// //Steam requirements
var passport = require('passport')
var session = require('express-session')
var SteamStrategy = require('passport-steam').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SteamStrategy({
  returnURL: 'http://localhost:3001/login/steam/return',
  realm: 'http://localhost:3001/',
  apiKey: '21AF60D1CB32ED4EC4C5E753B792F209'
},

function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Steam profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Steam account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mapsRouter = require('./routes/maps');
var tempusRouter = require('./routes/tempus');
var steamLogin = require('./routes/login');

// var pocketScoutRouter = require('./routes/pocket-scout-data');
// var flankScoutRouter = require('./routes/flank-scout');
// var pocketSoldierRouter = require('./routes/pocket-soldier');
// var roamerSoldierRouter = require('./routes/roamer-soldier');
// var demoRouter = require('./routes/demo');
// var medicRouter = require('./routes/medic');

var app = express();

var expressWs = require ('express-ws')(app);
app.use(cors());

var mysql      = require('mysql');
var connection = mysql.createConnection({
  connectionLimit : 1000,
  connectTimeout  : 60 * 60 * 1000,
  acquireTimeout  : 60 * 60 * 1000,
  timeout         : 60 * 60 * 1000,
  host     : 'localhost',
  port     : '8889',
  user     : 'root',
  password : 'root',
  database : 'tf2playground'
});

exports.connection = connection

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'your secret',
  name: 'name of session id',
  resave: true,
  saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/maps', mapsRouter);
app.use('/servers', mapsRouter);
app.use('/tempus-history', tempusRouter);
app.use('/login', steamLogin);

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  res.end();
});

app.ws('/echo', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
  });
  console.log('socket', req.testing);
});


//Class specific
// app.use('/pocket-scout', pocketScoutRouter);
// app.use('/flank-scout', flankScoutRouter);
// app.use('/pocket-soldier', pocketSoldierRouter);
// app.use('/roaming-soldier', roamerSoldierRouter);
// app.use('/demo', demoRouter);
// app.use('/medic', medicRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
