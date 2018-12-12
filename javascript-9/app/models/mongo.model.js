// RSS model
const ObjectId = require('mongodb').ObjectId;

exports.all = (collection) => collection.find().toArray();

exports.findById = (id, collection) => collection.findOne(ObjectId(id))
