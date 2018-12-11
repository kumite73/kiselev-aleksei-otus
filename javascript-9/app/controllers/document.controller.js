// RSS controller
const mongoModel  = require('../models/mongo.model');
const docModel    = require('../models/documents.model');
const ret = require('../views/return.view');
// Коллекции

const document = (req) => { return req.app.locals.db.collection('documents'); }

// Параметры
const id = (req) => { return req.params.id }

// Все документы
exports.index = function (req, res) {
  mongoModel.all(document(req))
    .then(result => { ret.successJson(result, res) })
    .catch(error => { ret.errorJson(error, res) })
};

// Документ по ИД
exports.getById = function (req, res) {
  mongoModel.findById(id(req), document(req))
    .then(result => { ret.successJson(result, res) })
    .catch(error => { ret.errorJson(error, res) })
};
