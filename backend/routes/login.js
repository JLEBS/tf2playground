var app = require('../app')

var express = require('express')
  , router = express.Router()
  , passport = require('passport');

// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this application at /auth/steam/return
router.get('/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/steam/return',
  // Issue #37 - Workaround for Express router module stripping the full url, causing assertion to fail 
  // function(req, res, next) {

      // req.url = req.originalUrl;

      // console.log('usaaaa', req);
      
      // if (req.user){
        // console.log(req);

        // console.log(req.user._json);

        // const userData = req.user._json;
        // console.log(`http://localhost:3001/users/${userData.steamid}`);

        // app.connection.query(`INSER INTO user (steam64id, personname, avatar, avatarfull, personstate)
        //                       VALUES (${userData.steamid}, ${userData.personname}, ${userData.avatar}, ${userData.avatarfull} p${userData.personstate}`, (error, result, fields) =>{

        //   if (error) {
        //     res.status(500).json({
        //       ok: false,
        //       error
        //     });
        //   }

        //   res.json({
        //     ok: true,
        //     data: result
        //   });

        // });


        //res.redirect(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=21AF60D1CB32ED4EC4C5E753B792F209&steamids=${userData.steamid}`);
  
      // }
      // else{
        // console.log('ERROR WITH STEAM LOGIN VERIFICATION');
      // }
      // next();
  // }, 
  passport.authenticate('steam', { failureRedirect: '/steam/login' }),
  function(req, res) {


    //http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=21AF60D1CB32ED4EC4C5E753B792F209&steamids=76561198018959029
    //http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=21AF60D1CB32ED4EC4C5E753B792F209&steamid=76561198018959029&include_played_free_games=true


    //440
    //playtime_forever
    const userData = req.user._json;
    const gameData = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=21AF60D1CB32ED4EC4C5E753B792F209&steamid=${userData.steamid}&include_played_free_games=true`;

    // console.log('result', gameData.json);
    // app.connection.query(gameData, function(error, results, fields){
 
    //   console.log('The solution is: ', results);
  
  
    // });

    app.connection.query(`SELECT * FROM user WHERE steam64Id = '${userData.steamid}'`,function (err, rows, fields) {
      if( rows[0]){
        console.log(`UPDATING ${rows[0].personname} USER`);
        app.connection.query(`
        UPDATE user
        SET personname = '${userData.personaname}', personstate = ${userData.personastate}, avatar = '${userData.avatar}', avatarfull = '${userData.avatarfull}'
        WHERE steam64Id = '${userData.steamid}'
        `);
      }
      else{
        console.log(`INSERTING NEW USER`);
        app.connection.query(`
        INSERT INTO user (steam64Id, realname, personname, personstate, avatar, avatarfull, loccountrycode)
        VALUES (${userData.steamid}, '${userData.realname}', '${userData.personaname}', ${userData.personastate}, '${userData.avatar}', '${userData.avatarfull}', '${userData.loccountrycode}')
      `);
      }
    });
    res.redirect('/');
  });
module.exports = router;