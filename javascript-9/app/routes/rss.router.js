const express = require('express');
const router = express.Router();

const rssController = require('../controllers/rss.controller');

router.get('/', rssController.index);

router.get('/:id', rssController.getById);

router.post('/', rssController.postRss);

module.exports = router;
