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
router.post('/', function (req, res) {
  console.log('In POST task route.');
  console.log('req.body ->', req.body);
  // variables from client
  var name = req.body.name;
  var description = req.body.description;
  var pic = req.body.pic;
  pool.connect(function (err, client, done) {
    if (err) {
      console.log('POST connection error ->', err);
      res.sendStatus(500);
      done();
    } else {
      var queryString = "INSERT INTO treats (name, description, pic) VALUES ($1, $2, $3)";
      var values = [name, description, pic];
      client.query(queryString, values, function (queryErr, resObj) {
        if (queryErr) {
          console.log('Query POST Error ->', queryErr);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        } // end else
        done();
      }); // end query
    } // end else
  }); // end connect
}); // end POST

// PUT /treats/<id>

// DELETE /treats/<id>

/** ---- DO NOT MODIFY BELOW ---- **/
module.exports = router;
