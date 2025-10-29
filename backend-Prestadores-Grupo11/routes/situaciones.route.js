const express = require('express');
const router = express.Router();
const {Situacion} = require('../db/models');
const {genericMiddleware, situacionMiddleware} = require('../middlewares');
const {situacionesController} = require('../controllers');

router.get(':id/Afiliado/:afiliadoId', 
    situacionesController.getAllSituacionesByAfliliadoId
);

router.get('/',
    genericMiddleware.validateRolById("centro_medico"),
    situacionesController.getAllSituaciones
)

router.patch('/:id',
    genericMiddleware.validateModelById(Situacion),
    situacionMiddleware.validarEstadoBaja, 
    situacionesController.darDeBajaSituacionById
);

router.post('/:id', 
    situacionMiddleware.validarEstadoAlta,
    situacionesController.darDeAltaSituacionById
);

module.exports = router;