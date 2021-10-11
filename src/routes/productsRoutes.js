// Requerimos módulos
const express = require('express');
const productsController = require('../controllers/productsController');
// Requerimos router
const router = express.Router();

// Devolver todos los productos
router.get("/", productsController.listProducts);

// Crear un producto
router.get("/create", productsController.createProduct);
// router.post("/create", productController.storeProduct);

// Editar un producto
router.get("/edit/:id", productsController.editProduct);
// router.put("/edit/:id", productsController.updateProduct);

// Devolver un producto
router.get('/detail/:id', productsController.detailProduct); 

// Eliminar un producto 
router.delete('/delete/:id', productsController.destroy);

module.exports = router;
