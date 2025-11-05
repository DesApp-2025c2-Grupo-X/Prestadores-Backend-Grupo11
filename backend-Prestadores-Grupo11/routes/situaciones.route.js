const express = require('express');
const router = express.Router();
const {Situacion, Prestador, Afiliado, Integrante} = require('../db/models');
const {genericMiddleware, situacionMiddleware, afiliadoMiddleware} = require('../middlewares');
const {situacionesController, genericController} = require('../controllers');

//Se trae a todos a un afiliado por nro afiliado o apellido, sus situaciones y sus integrantes con sus situaciones, solo si el prestadorId esta en la situacion junto con el afiliado
router.get('/:prestadorId/Afiliado/:nroOApellido',
    genericMiddleware.existPrestadorByPrestadorId,
    afiliadoMiddleware.validateAfiliadoByApellidoONumero,
    situacionesController.getAllSituacionesByNroOApellidoAfliliado
);

//Se trae todos los afiliados con todos sus integrantes y sus situaciones (solo apto para centro medico)
router.get('/:prestadorId',
    genericMiddleware.existPrestadorByPrestadorId,
    genericMiddleware.validateRolById("centro_medico"),
    situacionesController.getAllSituaciones
);

//Se trae un afiliado con sus situaciones
router.get('/Afiliado/:id',
    genericMiddleware.existModelById(Afiliado),
    situacionesController.getSituacionesByAfiliadoId
);

//Se trae un integrante con sus situaciones
router.get('/Integrante/:id',
    genericMiddleware.existModelById(Integrante),
    situacionesController.getSituacionesByIntegranteId
);

//Se trae una situacion especifica
router.get('/Situacion/:id', 
    genericMiddleware.existModelById(Situacion),
    genericController.getModelById(Situacion)
)

//da de baja una situacion
router.patch('/:id',
    genericMiddleware.existModelById(Situacion),
    situacionMiddleware.validarEstadoBaja, 
    situacionesController.darDeBajaSituacionById
);

//da de alta una situacion
router.post('/:prestadorId',
    situacionMiddleware.validarEstadoAlta,
    situacionesController.darDeAltaSituacion
);

module.exports = router;