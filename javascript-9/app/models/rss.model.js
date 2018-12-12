// RSS model
const  ObjectId = require('mongodb').ObjectId;

exports.create = (url, rss) => rss.insertOne({ url: url });
