const express = require('express');
const router = express.Router();

const rssController = require('../controllers/rss.controller');
const logs = require('../libs/logs.lib');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  logs.queryLog(req);
  next();
});

router.get('/', rssController.index);

router.get('/:id', rssController.getById);

router.post('/', rssController.postRss);

module.exports = router;
