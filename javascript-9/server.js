// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const config = require('config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/rss', require('./app/routes/rss.router'));
app.use('/document', require('./app/routes/document.router'));

app.get("/", (req, res) => res.json({ message: "Welcome to our parserRss!" }));

app.listen(config.web.port, () => {
  MongoClient.connect(config.db.url, config.db.options, function (err, client) {
    if (err) throw err;
    app.locals.db = client.db(config.db.name);
    if (process.env.NODE_ENV !== 'test') { console.log(`parserRss running on port ${config.web.port}`); };
  });
});

module.exports = app;
