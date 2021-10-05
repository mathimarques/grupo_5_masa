// Requerimos módulos
const express = require('express');
const productsController = require('../controllers/productsController');
const path = require('path');
// Requerimos router
const router = express.Router();
//Requerimos modulo para upload de archivos (Multer)
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = ('./public/img/uploaded_products');
        cb(null, folder);
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

//Guardamos en una variable la ejecucion de Multer
const uploadFile = multer({storage: storage}); //pdemos obviar storage como valor ya que coincide con su "clave"

// Devolver todos los productos
router.get("/", productsController.listProducts);

// Crear un producto
router.get("/create", productsController.createProduct);
router.post("/create", uploadFile.single('upload_img'), productsController.storeProduct);

// Editar un producto
router.get("/edit/:id", productsController.editProduct);
router.put("/edit/:id", productsController.updateProduct);

// Devolver un producto
router.get('/detail/:id', productsController.detailProduct); 

// Eliminar un producto 
router.delete('/delete/:id', productsController.destroyProduct);

module.exports = router;