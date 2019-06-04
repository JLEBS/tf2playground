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

module.exports = router;
