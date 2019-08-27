var express = require('express');
var router = express.Router();
var app = require('../app')

/* GET maps listing. */
router.get('/', function(req, res, next) {  

  app.connection.query('SELECT * FROM map', function (error, results, fields) {
    if (error) {
      res.status(500).json({
        ok: false,
        error
      })
    }

    console.log('The solution is: ', results);

    res.json({
      ok: true,
      maps: results
    });
  });
});

router.get('/:map', (req, res) => {

  const mapID = req.params.map;
  console.log(mapID);
  console.log('anything');
  
  app.connection.query(`SELECT * FROM map WHERE map_id = ${mapID}`, (error, result, fields) => {
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

    res.json({
      ok: true,
      data: result
    });
  });
});

module.exports = router;