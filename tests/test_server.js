// Create table in README before starting tests
var request = require('supertest');
var server = require('../assignment/server');
var pg = require('pg');
var config = require('../assignment/db');

var pool = new pg.Pool(config);

before(function () {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      done();
      return;
    }

    client.query('DELETE FROM treats WHERE id > 2;', function (err, result) {
      done();
      if (err) {
        console.log('Error querying the DB', err);
        return;
      }
    });
  });
});

describe('Baseline: The server', function () {
    it('responds to GET requests at /treats', function (done) {
        request(server)
            .get('/treats')
                .expect(200)
                .expect(function (res) {
                  let pass = Array.isArray(res.body);

                  if (!pass) {
                    throw new Error('response body was not an array');
                  }
                })
                .end(done);
            });
    });

    it('responds to POST requests at /treats', function (done) {

        function assertContains(response) {
            let pass = response.body.some(function (treat) {
                return treat.name === 'Twizzlers' &&
                    treat.description === 'Twisty fun' &&
                    treat.pic === 'https://www.ohnuts.com/noapp/showImage.cfm/zoom/Twizzlers%20%20Cherry%20Twists.jpg';
            });

            if (!pass) {
                throw new Error('body did not contain ' +
                '{ name: "Twizzlers", ' +
                'description: "Twisty fun", ' +
                'pic: "https://www.ohnuts.com/noapp/showImage.cfm/zoom/Twizzlers%20%20Cherry%20Twists.jpg"}');
            }
        }

        request(server)
            .post('/treats')
            .type('form')
            .send({
                name: 'Twizzlers',
                description: 'Twisty fun',
                pic: 'https://www.ohnuts.com/noapp/showImage.cfm/zoom/Twizzlers%20%20Cherry%20Twists.jpg',
            })
            .expect(201, function () {
                request(server)
                    .get('/treats')
                    .expect(200)
                    .expect(assertContains)
                    .end(done);
            });
    });


describe('Special Sauce: The server', function () {

  function assertContains(response) {
      let pass = response.body.some(function (treat) {
          return treat.name === 'Skittles' &&
              treat.description === 'Taste the rainbow' &&
              treat.pic === 'https://www.ohnuts.com/noapp/showImage.cfm/zoom/Twizzlers%20%20Cherry%20Twists.jpg';
      });

      if (!pass) {
          throw new Error('body did not contain ' +
          '{ name: "Skittles", ' +
          'description: "Taste the rainbow", ' +
          'pic: "https://www.ohnuts.com/noapp/showImage.cfm/zoom/Twizzlers%20%20Cherry%20Twists.jpg" }'
        );
      }
  }

    it('responds to PUT requests at /treats/<id>', function (done) {
      getLastRecordId()
        .then(function (id) {
          request(server)
              .put('/treats/' + id)
              .type('form')
              .send({
                  name: 'Skittles',
                  description: 'Taste the rainbow',
                  pic: 'https://www.ohnuts.com/noapp/showImage.cfm/zoom/Twizzlers%20%20Cherry%20Twists.jpg',
              })
              .expect(200, function () {
                request(server)
                  .get('/treats')
                  .expect(assertContains)
                  .end(done);
              });
        });

    });

    var deletedId = null;

    function assertDeleted(response) {
        let fail = response.body.some(function (treat) {
            return treat.id === deletedId;
        });

        if (fail) {
            throw new Error('Record with id ' + deletedId + ' still exists');
        }
    }

    it('responds to DELETE requests at /treats/<id>', function (done) {
      getLastRecordId()
        .then(function (id) {
          deletedId = id;
          request(server)
              .delete('/treats/' + id)
              .expect(204, function () {
                request(server)
                  .get('/treats')
                  .expect(assertDeleted)
                  .end(done);
              });
        });

    });
});

function getLastRecordId() {
  return request(server)
    .get('/treats')
    .then(function (response) {
      var lastIndex = response.body.length - 1;
      return response.body[lastIndex].id;
    });
}
