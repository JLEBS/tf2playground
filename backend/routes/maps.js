var express = require('express');
var router = express.Router();
var app = require('../app')

/* GET maps listing. */
router.get('/', function(req, res, next) {  
   
  app.connection.connect();
  
  app.connection.query('SELECT * FROM map', function (error, results, fields) {
    if (error) {
      ok: false,
        res.status(500).json({
        error
      })
    }

    console.log('The solution is: ', results);
    res.json({
      ok: true,
      maps: results
    });
  });
  
  app.connection.end();

});

module.exports = router;
