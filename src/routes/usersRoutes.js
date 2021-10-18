// Requerimos modulos
const express = require('express');
const usersController = require('../controllers/usersController');
const {body, check} = require('express-validator');
const router = express.Router();

// Middleware para validar login
const validateLogin = [
    check('username')
        .notEmpty().withMessage('Completar nombre de usuario'),
    check('password')
        .notEmpty().withMessage('Completar el password') 
];

// Rutas para login
router.get('/login', usersController.login);
router.post('/login', validateLogin, usersController.processLogin);

// Rutas para crear usuario
router.get('/register', usersController.register);
router.post('/register', usersController.processRegister);

module.exports = router;