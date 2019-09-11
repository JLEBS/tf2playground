var express = require('express');
var router = express.Router();
var app = require('../app')

router.get('/', function(req, res, next) {  
  
  app.connection.query('SELECT * FROM user', function (error, results, fields) {
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

  app.connection.query(`SELECT * FROM user WHERE steam64id = ${userId}`, (error, result, fields) => {
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

// router.get('/:user/data', (req, res) => {

//   const userId = req.params.user
//   console.log(userId);
  
//   app.connection.query(
//     `SELECT play_count
//       FROM user_gamedata_demo, 
//       WHERE user_id = ${userId}
//     UNION ALL
//     SELECT 
//       FROM user_gamedata_pocket_soldier
//       WHERE user_id = ${userId}
//     UNION ALL
//     SELECT *
//       From user_gamedata_roamer_soldier
//       WHERE user_id = ${userId}`, (error, result, fields) => {

// //user_gamedata_demo, user_gamedata_medic, user_gamedata_pocket_scout, user_gamedata_flank_scout, user_gamedata_pocket_soldier, user_gamedata_roamer_soldier
//     if (error) {
//       ok: false,
//         res.status(500).json({
//         error
//       })
//     }

//     console.log('The solution is: ', result);
//     res.json({
//       ok: true,
//       data: result
//     });
//   })
// })

module.exports = router;