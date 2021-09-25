// Requerimos módulos
const express = require('express');
const productsController = require('../controllers/productsController');
// Requerimos router
const router = express.Router();

// Devolver todos los productos
router.get("/", productsController.product);

// Crear un producto
router.get("/createProduct", productsController.createProduct);
// router.post("/", productController.storeProduct);

// Editar un producto
router.get("/editProduct/:id", productsController.editProduct);
// router.put("/:id", productsController.updateProduct);

// Devolver un producto 
router.get('/:id/', productsController.detail); 

// Eliminar un producto 
// router.delete('/:id', productsController.destroy);

module.exports = router;
