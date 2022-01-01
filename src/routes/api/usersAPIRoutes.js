const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController');

// Rutas
// Listado de usuarios
router.get('/', usersAPIController.list);
// Detalle de usuarios
router.get('/:id', usersAPIController.detail);

module.exports = router;