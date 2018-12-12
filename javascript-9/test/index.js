process.env.NODE_ENV = 'test';

// Подключаем dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

const MongoClient = require('mongodb').MongoClient;

const config = require('config');

let db = {}

const clearCollection = (db, col, done) => {
  db.collection(col).drop()
    .then(() => { done(); })
    .catch(() => { done(); })
}

MongoClient.connect(config.db.url, config.db.options, function (err, client) {
  if (err) throw err;
  db = client.db(config.db.name);
});

chai.use(chaiHttp);

// Коннект к серверу
describe('parserRSS test RESTapi', () => {
  // Перед запуском ждем подключения к монго
  before(done => setTimeout(() => { done() }, 100));
  // Очищаем documents перед каждым тестом
  beforeEach(done => clearCollection(db, 'documents', done));
  // Очищаем rss перед тестами
  beforeEach(done => clearCollection(db, 'rss', done));

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

  // Роутер RSS
  describe('RSS', () => {
    // Тест для /GET
    describe('/GET empty rss', () => {
      it('it should GET empty RSS', (done) => {
        chai.request(server)
          .get('/rss')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
      });
    });
    // Тест для /GET/:id
    describe('/GET document by ID', () => {
      it('it should GET a RSS by ID', (done) => {
        const document = { "link": "http://localhost/test" }
        db.collection('rss').insertOne(document)
          .then((response) => {
            chai.request(server)
              .get(`/rss/${response.ops[0]["_id"]}`)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('link');
                done();
              });
          });
      });
    });
  });

  // Роутер документы
  describe('Documents', () => {
    // Тест для /GET
    describe('/GET empty documents', () => {
      it('it should GET empty Documents', (done) => {
        chai.request(server)
          .get('/document')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
      });
    });

    // Тест для /GET/:id
    describe('/GET document by ID', () => {
      it('it should GET a document by ID', (done) => {
        const document = { "guid": "http://localhost/test" }
        db.collection('documents').insertOne(document)
          .then((response) => {
            chai.request(server)
              .get(`/document/${response.ops[0]["_id"]}`)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('guid');
                done();
              });
          });
      });
    });
  });
});

describe('parserRSS test POST external RSS', () => {
  // Перед запуском ждем подключения к монго
  before(done => setTimeout(() => { done() }, 100));
  // Очищаем documents перед каждым тестом
  beforeEach(done => clearCollection(db, 'documents', done));
  // Очищаем rss перед тестами
  beforeEach(done => clearCollection(db, 'rss', done));

  // Тест для /POST
  it('it should POST /rss an external RSS', (done) => {
    const document = { "url": "https://www.sports.ru/rss/all_news.xml" }
    chai.request(server)
      .post('/rss')
      .send(document)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('Success');
        done();
      });
  });
});
