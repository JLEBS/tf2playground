var express = require('express');
var router = express.Router();
var app = require('../app')

/* GET maps listing. */
router.get('/', function(req, res, next) {  

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
});

router.get('/:map', (req, res) => {

  const mapID = req.params.map;
  console.log(mapID);
  
  app.connection.query(`SELECT * FROM map WHERE map_id = ${mapID}`, (error, result, fields) => {
    if (error) {
      ok: false,
        res.status(500).json({
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
