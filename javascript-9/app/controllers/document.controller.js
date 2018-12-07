// RSS controller
mongoModel  = require('../models/mongo.model');
docModel    = require('../models/documents.model');

// Коллекции
const document = (req) => { return req.app.locals.db.collection('documents') }

// Параметры
const id = (req) => { return req.params.id }

// Все документы
exports.index = function (req, res) {
  mongoModel.all(rss(req))
    .then(result => { ret.successJson(result, res) })
    .catch(error => { ret.errorJson(error, res) })
};

// Документ по ИД
exports.getById = function (req, res) {
  mongoModel.findById(id(req), rss(req))
    .then(result => { ret.successJson(result, res) })
    .catch(error => { ret.errorJson(error, res) })
};
