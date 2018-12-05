// RSS controller
var rssModel = require('../models/rss.model');

exports.index = function (req, res) {
  const rss = req.app.locals.db.collection('rss')

  rssModel.all(rss)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => res.status(500).json(error))
};

exports.getRssById = function (req, res) {
  const id = req.params.id;
  const rss = req.app.locals.db.collection('rss')

  rssModel.findById(id, rss)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => res.status(500).json(error))
};

exports.documents = function (req, res) {
  res.send('All documents index');
};

exports.getDocumentById = function (req, res) {
  const id = req.params.id;
  res.send(`Document id: ${id}`);
};

exports.postRss = function (req, res) {
  const url = req.body.url;
  const rss = req.app.locals.db.collection('rss')

  rssModel.create(url, rss)
    .then(result => {
      const { ops } = result;
      res.status(200).json(ops[0])
    })
    .catch(error => res.status(500).json(error))
};
