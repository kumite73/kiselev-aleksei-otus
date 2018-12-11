process.env.NODE_ENV = 'test';

//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

// Коннект к серверу
describe('Server connect', () => {
  // Перед запуском ждем подключения к монго
  before((done) => {
    setTimeout(() => {
      done();
    }, 100);
  });
  // Тест для /GET
  it('it should GET / a welcome message', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
});

// Роутер RSS
describe('RSS', () => {
  // Тест для /GET
  describe('/GET rss', () => {
    it('it should GET all RSS', (done) => {
      chai.request(server)
        .get('/rss')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          // res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});

// Роутер документы
describe('Documents', () => {
  // Тест для /GET
  describe('/GET documents', () => {
    it('it should GET all Documents', (done) => {
      chai.request(server)
        .get('/document')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          // res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
