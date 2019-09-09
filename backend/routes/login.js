var app = require('../app')
var {getUser, addUser, updateUser, getGameHours, getMatches, getEtf2lData, updateEtf2l, insertEtf2l, insertTempusRecord, getTempusPoints} = require('../lib/user');
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

//Function to retrieve etf2l data set state to true to update
async function etf2lFunction(steamID, userID, state) {

  const etf2lResults = await getEtf2lData(steamID);

  if(etf2lResults){

    const etf2lMatches = await getMatches(etf2lResults);

    if(etf2lMatches && state === 'update'){
      await updateEtf2l(app.connection, etf2lMatches, userID);
    }
    else{
      await insertEtf2l(app.connection, etf2lMatches, userID);
    }
  }
}

//Function to retrieve tempus data and add a new record
async function tempusFunction(steamID, userID){
  const tempusResults = await getTempusPoints(steamID);
  await insertTempusRecord(app.connection, tempusResults, userID);
}

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
      const fetchUser = await getUser(app.connection, req.user._json.steamid)

      //If first time Login/registration
      if (!fetchUser.length) {

        //Create User
        await addUser(app.connection, req.user._json);

        //Fetch Added User
        const fetchNewUser = await getUser(app.connection, req.user._json.steamid);

        //Fetch ETF2L Results
        await etf2lFunction(req.user._json.steamid, fetchNewUser[0].user_id, false);

        //Fetch Tempus Results
        await tempusFunction(req.user._json.steamid, fetchNewUser[0].user_id );

        //Redirect to players profile
        return res.redirect(`http://localhost:3000/profile/${req.user._json.steamid}`)
      }
      
      await updateUser(app.connection, fetchUser[0].user_id, req.user._json);

      etf2lFunction(fetchUser[0].steam64Id, fetchUser[0].user_id, 'update');
      
      return res.redirect(`http://localhost:3000/lobby`);
    } 
    catch (err) {
      console.error(err)
      return res.status(400)
    }
  }
);

module.exports = router;