// RSS model
const  ObjectId = require('mongodb').ObjectId;

exports.create = function (url, rss) {
  return rss.insertOne({ url: url })
};
