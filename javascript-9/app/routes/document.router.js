const express = require('express');
const router = express.Router();

const documentController = require('../controllers/document.controller');

router.get('/', documentController.index);

router.get('/:id', documentController.getById);

module.exports = router;
