// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const mongo = require('./configs/db');
const web = require('./configs/web');

const app = express();


MongoClient.connect(mongo.url, mongo.options)
  .then(client => {
    const db = client.db('parserRss');

    app.locals.db = db;

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/rss', require('./app/routes/rss.router'));
    app.use('/document', require('./app/routes/document.router'));

    app.listen(web.port, () => console.info(`parserRss running on port ${web.port}`));
  }).catch(error => console.error(error));
