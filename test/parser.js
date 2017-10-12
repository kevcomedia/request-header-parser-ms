/* eslint-env mocha */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Request header parser', () => {
  let server;

  before(() => {
    server = app.listen(8888);
  });

  after(() => server.close());

  it('should output object with proper keys', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          if (err) done(err);

          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.all.own.keys('ip', 'language', 'software');
          done();
        });
  });
});
