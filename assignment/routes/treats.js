var router = require('express').Router(); // DO NOT MODIFY
var pg = require('pg'); // DO NOT MODIFY
var config = require('../db');

var pool = new pg.Pool(config); // DO NOT MODIFY

// GET /treats
// Only modify IF you are doing Eye of the Tiger
router.get('/', function (req, res) {
  console.log('req.query ->', req.query);
  var treatId = req.query.q;
  console.log('req.query.q ->', treatId);
  
  pool.connect(function (err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }
    var queryString = 'SELECT * FROM treats;';
    if (treatId !== undefined) {
      queryString = "SELECT * FROM treats WHERE (description LIKE '%" + treatId + "%') OR (name LIKE '%" + treatId + "%');";
    }
    client.query(queryString , function (err, result) {
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
router.put('/:id', function (req, res) {
  console.log('in PUT task route');
  var treatId = req.params.id;
  var description = req.body.description;
  pool.connect(function (err, client, done) {
    if (err) {
      console.log('PUT connection error ->', err);
      res.sendStatus(500);
      done();
    } else {
      var queryString = "UPDATE treats SET description=$2 WHERE id=$1";
      var values = [treatId, description];
      client.query(queryString, values, function (queryErr, resObj) {
        if (queryErr) {
          console.log('Query PUT Error ->', queryErr);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        } // end else
        done();
      }); // end query
    } // end else
  }); // end connect
}); // end PUT

// DELETE /treats/<id>
router.delete('/:id', function (req, res) {
  console.log('in DELETE task route');
  var treatId = req.params.id;
  pool.connect(function (err, client, done) {
    if (err) {
      console.log('DELETE connection error ->', err);
      res.sendStatus(500);
      done();
    } else {
      var queryString = 'DELETE FROM treats WHERE id=$1';
      var values = [treatId];
      client.query(queryString, values, function (queryErr, resObj) {
        if (queryErr) {
          console.log('Query DELETE Error ->', queryErr);
          res.sendStatus(500);
        } else {
          res.sendStatus(202);
        } // end else
      }); // end query
    } // end else
  }); // end connect
}); // end DELETE

/** ---- DO NOT MODIFY BELOW ---- **/
module.exports = router;
