var request = require('supertest');
var server = require('../assignment/server');

describe('Baseline: The server', function () {
  it('responds to GET requests at /treats', function (done) {
    request(server)
      .get('/treats')
      .expect(200, done);
  });

  it('responds to POST requests at /treats', function (done) {
    request(server)
      .post('/treats')
      .type('form')
      .send({
        name: 'Twizzlers',
        description: 'Twisty fun',
        pic: 'https://www.ohnuts.com/noapp/showImage.cfm/zoom/Twizzlers%20%20Cherry%20Twists.jpg',
      })
      .expect(200, done);
  });
});

describe('Special Sauce: The server', function () {

  it('responds to PUT requests at /treats/8', function (done) {
    request(server)
      .put('/treats/8')
      .type('form')
      .send({
        name: 'Skittles',
        description: 'Taste the rainbow',
        pic: 'https://www.ohnuts.com/noapp/showImage.cfm/zoom/Twizzlers%20%20Cherry%20Twists.jpg',
      })
      .expect(200, done);
  });

  it('responds to DELETE requests at /treats/100', function (done) {
    request(server)
      .put('/treats/100')
      .expect(200, done);
  });
});
