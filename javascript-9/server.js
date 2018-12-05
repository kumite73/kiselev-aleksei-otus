// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const urlMongo = 'mongodb://vm:27017'

MongoClient.connect(urlMongo, { useNewUrlParser: true, poolSize: 10 })
  .then(client => {
    const db = client.db('parserRss');

    app.locals.db = db;

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/rss', require('./app/routes/rss.router'));

    app.listen(port, () => console.info(`parserRss running on port ${port}`));
  }).catch(error => console.error(error));
