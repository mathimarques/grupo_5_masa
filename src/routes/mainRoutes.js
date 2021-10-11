// Requerimos módulos
const express = require("express");
// Requerimos controladores
const mainController = require("../controllers/mainController");
// Llamamos al método Router de express
const router = express.Router();
// Metodo get de la ruta index
router.get("/", mainController.index);
// Metodo get de la ruta login
router.get("/login", mainController.login);
// Metodo get de la ruta register
router.get("/register", mainController.register);
// Metodo get de la ruta productCart
router.get("/productCart", mainController.productCart);

module.exports = router;
