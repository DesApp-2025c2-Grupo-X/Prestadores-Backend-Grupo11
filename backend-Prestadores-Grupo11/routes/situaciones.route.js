const express = require('express');
const router = express.Router();
const {situacionesController} = require('../controllers');

router.get('/:id/Afiliado/:afiliadoId',
    situacionesController.getAllSituacionesByAfliliadoId
);

module.exports = router;