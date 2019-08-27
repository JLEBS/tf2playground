var express = require('express');
var router = express.Router();
var app = require('../app')

router.get('/', function(req, res, next) {  
  
  app.connection.query('SELECT * FROM user_tempus', function (error, results, fields) {
    if (error) {

      res.status(500).json({
        ok: false,
        error
      })
    }

    console.log('The solution is: ', results);

    res.json({
      ok: true,
      users: results
    });
  });
});

router.get('/:user', (req, res) => {

  const userId = req.params.user
  console.log(userId);
  
  app.connection.query(`SELECT * FROM user_tempus WHERE user_id = ${userId} ORDER BY timestamp DESC`, (error, result, fields) => {
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
})

module.exports = router;