require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var cors = require('cors');
const util = require('util')

//Steam requirements
var ensureAuthenticated = require('./middleware/authenticate-user');
var cors = require('./middleware/cors')
var passport = require('passport')
var session = require('express-session')
var SteamStrategy = require('passport-steam').Strategy;
var {updatePlayerState, getUser} = require('./lib/user');

//WebSocked
const WebSocket = require('ws');

const ws = new WebSocket('wss://echo.websocket.org/', {
  origin: 'http://localhost:3000/'
});

const wss = new WebSocket.Server({ port: 4000 });

const getCurrentLobby = (data) => {
  console.log('Retrieving current lobby...');
  return JSON.stringify(updateLobby(data)) 
}

ws.on('open', function open() {
  console.log('Connected Websocket!');
});

wss.on('connection', function connection(ws) {
  console.log('client connected');
  
  const lobbyDetails = getCurrentLobby()
  ws.send(lobbyDetails);

  ws.on('message', function incoming(message) {
    console.log('retrieved message...')
    const lobbyDetails = getCurrentLobby(message)
    wss.clients.forEach( (ws) =>  {ws.send(lobbyDetails) })
  });

});

ws.on('close', function close() {
  console.log('Disconnected Websocket!');
});

// wss.on('message', function incoming(data) {
//  console.log(`Ping: ${Date.now() - data} ms`);
//  console.log(something);

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
  apiKey: process.env.STEAM_API_KEY
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
var profileRouter = require('./routes/profile');
var mapsRouter = require('./routes/maps');
var tempusRouter = require('./routes/tempus');
var steamLogin = require('./routes/login');

var app = express();

app.use(cors);

var mysql      = require('mysql');
var connection = mysql.createConnection({
  connectionLimit : 1000,
  connectTimeout  : 60 * 60 * 1000,
  acquireTimeout  : 60 * 60 * 1000,
  timeout         : 60 * 60 * 1000,
  host     : process.env.DB_HOST,
  port     : process.env.DB_PORT,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE
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
  name: 'steamLogin',
  resave: true,
  saveUninitialized: true,
  httpOnly: false}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/maps', mapsRouter);
app.use('/servers', mapsRouter);
app.use('/tempus-history', tempusRouter);
app.use('/profile', profileRouter);

app.use('/login', steamLogin);

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/logout', function(req, res){
  req.logout();
  req.session.destroy(function (err) {
    if(err){
      console.log(err,'THIS IS AN ERROR')
    }
    res.redirect('http://localhost:3000/'); //Inside a callback… bulletproof!
  });
  console.log('Logged out');
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

const updateLobby = (data) => {

  let defaultLobby = {
    lobbyId: 11,
    lobbyState: 0,
    maxPlayer: 12,
    classes: {
      pocketScout: {
        unassigned: 2,
        assigned: 0
      },
      flankScout: {
        unassigned: 2,
        assigned: 0
      },
      pocketSoldier: {
        unassigned: 2,
        assigned: 0
      },
      roamerSoldier: {
        unassigned: 2,
        assigned: 0
      },
      demo: {
        unassigned: 2,
        assigned: 0
      },
      medic: {
        unassigned: 2,
        assigned: 0
      },
    },
    players: [
    ]
  };
  // { details: { steamId: '76561198018959029', name: 'eepily', numGames: 23, playtime: 2828 }, classId: 'demo' },
  // { details: { steamId: '76561198028929109', name: 'planccck', numGames: 241, playtime: 9373 }, classId: 'medic' },
  // { details: { steamId: '76561198193511414', name: 'jlebs', numGames: null, playtime: 63431 }, classId: 'pocketScout' },
  // { details: { steamId: '76561198018959029', name: 'greenrab', numGames: 23, playtime: 2828 }, classId: 'medic' },
  
  if(data){
    const parsed = JSON.parse(data);

    //getUser(connection, parsed.details.steamId);
    
    defaultLobby.classes[parsed.classId].unassigned--;
    defaultLobby.classes[parsed.classId].assigned++;
    defaultLobby.players.push(parsed);
    updatePlayerState(connection, parsed.details.steamId, 2);
  }
  return defaultLobby;
}

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