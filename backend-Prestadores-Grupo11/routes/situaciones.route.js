const express = require('express');
const router = express.Router();
const {situacionesController} = require('../controllers');

router.get('/:id',
    situacionesController.getAllSituacionesByPrestadorId
);

module.exports = router;