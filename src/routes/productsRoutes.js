// Requerimos módulos
const express = require('express');
const productsController = require('../controllers/productsController');
// Requerimos router
const router = express.Router();

// Devolver todos los productos
router.get("/", productsController.listProducts);

// Crear un producto
router.get("/createProduct", productsController.createProduct);
// router.post("/", productController.storeProduct);

// Editar un producto
router.get("/editProduct/:id", productsController.editProduct);
// router.put("/:id", productsController.updateProduct);

// Devolver un producto
router.get('/:id/', productsController.detailProduct); 

// Eliminar un producto 
// router.delete('/:id', productsController.destroyProduct);

module.exports = router;
