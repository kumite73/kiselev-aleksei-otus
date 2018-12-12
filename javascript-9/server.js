// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const config = require('config');

const app = express();

const logs = require('./app/libs/logs.lib');

const connectDb = () => {
  MongoClient.connect(config.db.url, config.db.options, (err, client) => {
    if (err) throw err;
    app.locals.db = client.db(config.db.name);
  });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware for all routers
app.use((req, res, next) => {
  logs.queryLog(req);
  next();
});

// routers
app.use('/rss', require('./app/routes/rss.router'));
app.use('/document', require('./app/routes/document.router'));
app.get("/", (req, res) => res.json({ message: "Welcome to our parserRss!" }));

app.listen(config.web.port, () => {
  connectDb();
  if (process.env.NODE_ENV !== 'test') {
    console.log(`parserRss running on port ${config.web.port}`);
  };
});

module.exports = app;
