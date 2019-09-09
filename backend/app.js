var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

//Screen scrape
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


//Steam requirements
var ensureAuthenticated = require('./middleware/authenticate-user');
var passport = require('passport')
var session = require('express-session')
var SteamStrategy = require('passport-steam').Strategy;

//WebSocked
const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 4000 });
// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);
//   });
 
//   ws.send('something');
// });

// const ws = new WebSocket('wss://echo.websocket.org/', {
//   origin: 'http://localhost:3000/'
// });

// ws.on('open', function open() {
//   console.log('connected');
//   ws.send(Date.now());
// });

// ws.on('close', function close() {
//   console.log('disconnected');
// });

// ws.on('message', function incoming(data) {
//   console.log(`Roundtrip time: ${Date.now() - data} ms`);

//   setTimeout(function timeout() {
//     ws.send(Date.now());
//   }, 500);
// });


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

var app = express();

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


app.get('/scrape', function(req, res){

  //url = 'http://www.imdb.com/title/tt1229340/';

  url = 'http://etf2l.org/forum/user/52231/';

  request(url, function(error, response, html){
      if(!error){
          var $ = cheerio.load(html);

          var title, release, rating;
          var json = { title : "", release : "", rating : ""};

          $('.etf2l_page').filter(function(){
              var data = $(this);
              title = data.children().first().text();

              // We will repeat the same process as above.  This time we notice that the release is located within the last element.
              // Writing this code will move us to the exact location of the release year.

              release = data.children().last().children().text();

              json.title = title;

              // Once again, once we have the data extract it we'll save it to our json object

              json.release = release;

              console.log('data', data)
              console.log('json', json);
              console.log('title', title);

          })
      }
  })
})



app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

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

// var pocketScoutRouter = require('./routes/pocket-scout-data');
// var flankScoutRouter = require('./routes/flank-scout');
// var pocketSoldierRouter = require('./routes/pocket-soldier');
// var roamerSoldierRouter = require('./routes/roamer-soldier');
// var demoRouter = require('./routes/demo');
// var medicRouter = require('./routes/medic');

//Class specific
// app.use('/pocket-scout', pocketScoutRouter);
// app.use('/flank-scout', flankScoutRouter);
// app.use('/pocket-soldier', pocketSoldierRouter);
// app.use('/roaming-soldier', roamerSoldierRouter);
// app.use('/demo', demoRouter);
// app.use('/medic', medicRouter);