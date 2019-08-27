var express = require('express');
var router = express.Router();
var app = require('../app')

router.get('/', function(req, res, next) {  
  
  app.connection.query('SELECT * FROM user_gamedata_demo', function (error, results, fields) {
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
});

router.get('/:demo', (req, res) => {

  const userID = req.params.demo;
  console.log(userID);
  
  app.connection.query(`SELECT * FROM user_gamedata_demo WHERE user_id = ${userID}`, (error, result, fields) => {
    if (error) {
        res.status(500).json({
        ok: false,
        error
      })
    }

    if (!result){
      console.log('empty');
    }

    console.log('The solution is: ', result);
    console.log(res.json.data);
    res.json({
      ok: true,
      data: result
    });
  })
})

module.exports = router;