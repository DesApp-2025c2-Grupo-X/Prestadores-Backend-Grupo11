const express = require('express');
const router = express.Router();
const {genericController} = require('../controllers');
const {Prestador} = require('../db/models');

router.get('/:id',
  genericController.getModelById(Prestador)
);

module.exports = router;