var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

	const util = require('util')
    const mysql = require('mysql');
	const pool= mysql.createPool({
		connectionLimit: 10,
		host     : 'localhost',
		port     : '8889',
		user     : 'root',
		password : 'root',
		database : 'tf2playground'
	});
    
    //connection.connect();
    
	pool.getConnection((err, connection) => {
		
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.error('Database connection was closed.')
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.')
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.')
			}
		}
		if (connection) connection.release()
		return;
	})


    pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results[0].solution);
    });
    
    connection.end();


  	res.render('index', { title: 'Express' });


});

module.exports = router;
