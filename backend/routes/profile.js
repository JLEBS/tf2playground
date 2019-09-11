var express = require('express');
var router = express.Router();
var app = require('../app')
var tokenCheck = require('../middleware/token-check');

router.get('/:steamid', tokenCheck, (req, res) => {

  const steamId = req.params.steamid

  app.connection.query(`SELECT * FROM user WHERE steam64id = ${steamId}`, (error, result, fields) => {
    if (error) {
      res.status(500).json({
        ok: false,
        error
      })
    }

    console.log('The solution is: ', result);
    res.json({
      ok: true,
      data: result
    });
  })
}
)
module.exports = router;
