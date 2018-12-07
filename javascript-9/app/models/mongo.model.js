// RSS model
const ObjectId = require('mongodb').ObjectId;

exports.all = function (collection) {
  return collection.find().toArray();
}

exports.findById = function (id, collection) {
  return collection.findOne(ObjectId(id));
};
