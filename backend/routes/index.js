var express = require('express');
var router = express.Router();
var pool = require('./database');

router.get('/', function(req, res, next) {

    pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results[0].solution);
    });
    

  	res.render('index', { title: 'Express' });

});

module.exports = router;
