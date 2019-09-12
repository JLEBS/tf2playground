require('dotenv').config();
var app = require('../app')
var {getUser, addUser, updateUser, getGameHours, getMatches, getEtf2lData, updateEtf2l, insertEtf2l, insertTempusRecord, getTempusPoints} = require('../lib/user');
var express = require('express'), router = express.Router(), passport = require('passport');
const jwt = require('jsonwebtoken');

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

  if (!etf2lResults) {
    return;
  }
  
  const etf2lMatches = await getMatches(etf2lResults);

  if(etf2lMatches && state === 'update'){
    await updateEtf2l(app.connection, etf2lMatches, userID);
  }
  else{
    await insertEtf2l(app.connection, etf2lMatches, userID);
  }
}

//Function to retrieve tempus data and add a new record
async function tempusFunction(steamID, userID){
  const tempusResults = await getTempusPoints(steamID);

  if (!tempusResults) {
    return;
  }

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

      //Session Token
      // const token = jwt.sign({ user: req.user }, 'secret', { expiresIn: '2h' });

      var payload = {
        user: req.user
      };

      //Assign user details to variable from Steam
      const user = req.user._json;
      
      //Fetch User from SQL Database
      const fetchUser = await getUser(app.connection, user.steamid)

      //Fetch User playtime
      user.playtime = await getGameHours(user.steamid);

      //If first time Login/registration
      if (!fetchUser.length) {

        //Create User
        await addUser(app.connection, user);

        //Fetch Added User
        const fetchNewUser = await getUser(app.connection, user.steamid);

        if (!fetchNewUser) {
          throw new Error('No player')
        }

        //Fetch ETF2L Results
        await etf2lFunction(user.steamid, fetchNewUser[0].user_id, false);

        //Fetch Tempus Results
        await tempusFunction(user.steamid, fetchNewUser[0].user_id );

        //Redirect to Players Profile
        var token = jwt.sign(payload, process.env.SESSION_SECRET, {expiresIn : 60*60*24});
        //json webtoken refresh
        res.cookie('steamIdAuth', token, { httpOnly: true, /* TODO: Set secure: true */ }); 

        return res.redirect(`http://localhost:3000/profile/${user.steamid}`)
      }

      //Update Users Details
      await updateUser(app.connection, fetchUser[0].user_id, user);

      //Update Users Etf2l Details
      await etf2lFunction(fetchUser[0].steam64Id, fetchUser[0].user_id, 'update');
      
      //Redirect to Lobby
      var token = jwt.sign(payload, process.env.SESSION_SECRET, {expiresIn : 60*60*24});
      res.cookie('steamIdAuth', token, { httpOnly: true /* TODO: Set secure: true */ }); 

      return res.redirect(`http://localhost:3000/lobby`);
    } 
    
    catch (err) {
      console.error(err)
      return res.status(400)
    }
  }
);

module.exports = router;