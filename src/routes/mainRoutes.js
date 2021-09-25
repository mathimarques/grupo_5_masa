// Requerimos módulos
const express = require("express");
// Requerimos el controlador
const mainController = require("../controllers/mainController");
// Llamamos al método Router de express
const router = express.Router();
// Metodo get de la ruta index
router.get("/", mainController.index);
// Metodo get de la ruta login
router.get("/login", mainController.login);
// Metodo get de la ruta product
router.get("/product", mainController.product);
// Metodo get de la ruta productCart
router.get("/productCart", mainController.productCart);
// Metodo get de la ruta register
router.get("/register", mainController.register);
// Metodo get de la ruta create product
router.get("/createProduct", mainController.createProduct);

module.exports = router;