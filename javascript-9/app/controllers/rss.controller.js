// RSS controller
mongoModel    = require('../models/mongo.model');
rssModel      = require('../models/rss.model');
docController = require('../controllers/document.controller');
ret           = require('../views/return.view');

// Коллекции
const rss = (req) => { return req.app.locals.db.collection('rss') }

// Параметры
const id = (req) => { return req.params.id }

// Все ленты
exports.index = function (req, res) {
  mongoModel.all(rss(req))
    .then(result => { ret.successJson(result, res) })
    .catch(error => { ret.errorJson(error, res) })
};

// Лента по ИД
exports.getById = function (req, res) {
  mongoModel.findById(id(req), rss(req))
    .then(result => { ret.successJson(result, res) })
    .catch(error => { ret.errorJson(error, res)})
};

// Парсинг Rss
exports.postRss = function (req, res) {
  const url = req.body.url;

  rssModel.create(url, rss(req))
    .then(result => {
      const { ops } = result;
      res.status(200).json(ops[0])
    })
    .catch(error => res.status(500).json(error))
};
