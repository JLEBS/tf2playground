var express = require('express');
var router = express.Router();
var app = require('../app')

/* GET users listing. */
router.get('/', function(req, res, next) {  
   
  app.connection.connect();
  
  app.connection.query('SELECT * FROM user', function (error, results, fields) {
    if (error) {
      ok: false,
        res.status(500).json({
        error
      })
    }

    console.log('The solution is: ', results);
    res.json({
      ok: true,
      users: results
    });
  });
  
  app.connection.end();

});

router.get('/:user', (req, res) => {

  const userId = req.params.user

  console.log(userId);
  
  app.connection.connect();
  app.connection.query(`SELECT * FROM user WHERE steam64id = ${userId}`, (error, result, fields) => {
    if (error) {
      ok: false,
        res.status(500).json({
        error
      })
    }

    console.log('The solution is: ', result);
    res.json({
      ok: true,
      data: result
    });
  })
  app.connection.end();


})

module.exports = router;