const express = require('express');
const router = express.Router();
const {loginController} = require('../controllers');
const {loginMiddleware} = require('../middlewares');

router.post('/', 
    loginMiddleware.validateLogin,
    loginController.accessLogin
);

module.exports = router;