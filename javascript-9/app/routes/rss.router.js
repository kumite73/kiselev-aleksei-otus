const express = require('express');
const router = express.Router();

var rssController = require('../controllers/rss.controller');

function DateToString() {
  return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
}

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log(DateToString(), 'Path:', req.originalUrl);
  next();
});

router.get('/', rssController.index);

router.get('/:id', rssController.getRssById);

router.get('/documents', rssController.documents);

router.get('/documents/:id', rssController.getDocumentById);

router.post('/', rssController.postRss);

module.exports = router;
