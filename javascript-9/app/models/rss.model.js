// RSS model
var ObjectId = require('mongodb').ObjectId;

exports.all = function (rss) {
  return rss.find().toArray();
}

exports.create = function (url, rss) {
  return rss.insertOne({ url: url })
};

exports.findById = function (id, rss) {
  return rss.findOne(ObjectId(id));
};
