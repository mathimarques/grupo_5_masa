const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsAPIController');

// Rutas
// Listado de productos
router.get('/', productsAPIController.list);
// Producto por Categorias
router.get('/byCategories', productsAPIController.byCategory);
// Detalle de productos
router.get('/:id', productsAPIController.detail);


module.exports = router;