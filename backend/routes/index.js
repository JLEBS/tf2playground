var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      port     : '8889',
      user     : 'root',
      password : 'root',
      database : 'tf2playground'
    });
    
    connection.connect();
    
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results[0].solution);
    });
    
    connection.end();


  res.render('index', { title: 'Express' });


});

module.exports = router;
