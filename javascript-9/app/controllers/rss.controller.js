// RSS controller
const mongoModel    = require('../models/mongo.model');
const rssModel      = require('../models/rss.model');
const docController = require('../controllers/document.controller');
const ret           = require('../views/return.view');
const ObjectId = require('mongodb').ObjectId;

const Parser = require('rss-parser');

// Коллекции
const rss = (req) => req.app.locals.db.collection('rss');
const doc = (req) => req.app.locals.db.collection('documents');

// Параметры
const id = (req) => req.params.id;

// Все ленты
exports.index = function (req, res) {
  mongoModel.all(rss(req))
    .then(result => ret.successJson(result, res))
    .catch(error => ret.errorJson(error, res))
};

// Лента по ИД
exports.getById = function (req, res) {
  mongoModel.findById(id(req), rss(req))
    .then(result => ret.successJson(result, res))
    .catch(error => ret.errorJson(error, res))
};

// Парсинг Rss
exports.postRss = function (req, res) {
  const url = req.body.url;
  const parser = new Parser();
  let   itemParsing = [];

  parser.parseURL(url)
    .then(result => {
      // Разбиваем рсс на заголовок и данные
      itemParsing = result.items;
      delete result.items;

      return rss(req).findOne({ link: result.link })
        .then(response => {
          if (response) {
            return rss(req).updateOne({ "_id": ObjectId(response._id) }, { $set: result })
              .then(() => { return response._id });
          } else {
            return rss(req).insertOne(result)
              .then(response => {
                const { ops } = response;
                return ops[0]._id;
              });
          }
        })
    })
    .then(rss_id => {
      const saveItems = itemParsing.map(item => {
        Object.assign(item, { rss_id: rss_id });

        return doc(req).findOne({ guid: item.guid, rss_id: rss_id })
          .then(response => {
            if (response) {
              return doc(req).updateOne({ "_id": ObjectId(response._id) }, { $set: item });
            } else {
              return doc(req).insertOne(item);
            }
          });
      });
      return Promise.all(saveItems);
    })
    .then(() => ret.successJson({"Success": true}, res))
    .catch(error => ret.errorJson(error, res))
};

// Результаты их insertOne
// const { ops } = response;
// return ops[0]._id
