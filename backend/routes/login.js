var app = require('../app')
var {getUser, addUser, updateUser, getGameHours, insertTempusRecord, getTempusPoints} = require('../lib/user');
var express = require('express'), router = express.Router(), passport = require('passport');

// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this application at /auth/steam/return

router.get('/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.

router.get('/steam/return',
  // Issue #37 - Workaround for Express router module stripping the full url, causing assertion to fail 
  // function(req, res, next) {

  passport.authenticate('steam', { failureRedirect: '/steam/login' }),

  async function(req, res) {
    try {
      const existingUser = await getUser(app.connection, req.user._json.steamid)
      const gameHours = await getGameHours(req.user._json.steamid);
        
      //console.log(gameHours);

      if (!existingUser.length) {
        const result = await addUser(app.connection, req.user._json);
        const tempusResults = await getTempusPoints(req.user._json.steamid);

        if (tempusResults) {
          await insertTempusRecord(app.connection, tempusResults, result.insertId);
        }
    
        return res.redirect(`http://localhost:3000/profile/${req.user._json.steamid}`)
      }
      await updateUser(app.connection, req.user._json.steamid, req.user._json)
      
      return res.redirect(`http://localhost:3000/lobby`);
    } 
    catch (err) {
      console.error(err)
      return res.status(400)
    }
  }
);

module.exports = router;