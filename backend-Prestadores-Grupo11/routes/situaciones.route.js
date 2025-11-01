const express = require('express');
const router = express.Router();
const {Situacion, Prestador, Afiliado} = require('../db/models');
const {genericMiddleware, situacionMiddleware} = require('../middlewares');
const {situacionesController} = require('../controllers');

router.get('/:prestadorId/Afiliado/:id',
    genericMiddleware.existModelById(Afiliado),
    situacionesController.getAllSituacionesByAfliliadoId
);

router.get('/:id',
    genericMiddleware.existModelById(Prestador),
    genericMiddleware.validateRolById("centro_medico"),
    situacionesController.getAllSituaciones
)

router.patch('/:id',
    genericMiddleware.existModelById(Situacion),
    situacionMiddleware.validarEstadoBaja, 
    situacionesController.darDeBajaSituacionById
);

router.post('/:id',
    genericMiddleware.existModelById(Prestador),
    situacionMiddleware.validarEstadoAlta,
    situacionesController.darDeAltaSituacion
);

module.exports = router;