var router = require('express').Router(); // DO NOT MODIFY
var pg = require('pg'); // DO NOT MODIFY
var config = require('../db');

var pool = new pg.Pool(config); // DO NOT MODIFY

// GET /treats
// Only modify IF you are doing Eye of the Tiger
router.get('/', function (req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }

    client.query('SELECT * FROM treats;', function (err, result) {
      done();
      if (err) {
        console.log('Error querying the DB', err);
        res.sendStatus(500);
        return;
      }

      console.log('Got rows from the DB:', result.rows);
      res.send(result.rows);
    });
  });
});

/** ---- PUT YOUR CODE BELOW ---- **/

// POST /treats

// PUT /treats/<id>

// DELETE /treats/<id>

/** ---- DO NOT MODIFY BELOW ---- **/
module.exports = router;
