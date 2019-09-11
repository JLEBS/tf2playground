var express = require('express');
var router = express.Router();
var app = require('../app')
var tokenCheck = require('../middleware/token-check');

router.get('/', tokenCheck, (req, res) => {
  console.log(req.user)

  app.connection.query(`SELECT * FROM user WHERE steam64id = ${req.user.id}`, (error, result, fields) => {
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
