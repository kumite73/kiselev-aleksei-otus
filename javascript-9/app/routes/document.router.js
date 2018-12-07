const express = require('express');
const router = express.Router();

const documentController = require('../controllers/document.controller');
const logs = require('../libs/logs.lib');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  logs.queryLog(req);
  next();
});

router.get('/', documentController.index);

router.get('/:id', documentController.getById);

module.exports = router;
