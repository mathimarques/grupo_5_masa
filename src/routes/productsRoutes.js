// Requerimos módulos
const express = require("express");
const productsController = require("../controllers/productsController");
const authMiddleware = require("../middlewares/authMiddleware");
const { body, check } = require("express-validator");
const path = require("path");
// Requerimos router
const router = express.Router();
//Requerimos modulo para upload de archivos (Multer)
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "./public/img";
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const productImageFile =
      "product-" + Date.now() + path.extname(file.originalname);
    cb(null, productImageFile);
  },
});

//Guardamos en una variable la ejecucion de Multer
const uploadFile = multer({ storage: storage }); //podemos obviar storage como valor ya que coincide con su clave

const validateCreateProduct = [
  check("model")
    .notEmpty()
    .withMessage("Ingresar un modelo")
    .isLength({ min: 2 })
    .withMessage("El modelo debe tener más de dos caracteres"),

  check("id_type").notEmpty().withMessage("Debe escoger una categoría"),

  check("price")
    .notEmpty()
    .withMessage("Ingresar un precio")
    .isNumeric()
    .withMessage("Ingresar números"),

  check("id_brand").notEmpty().withMessage("Debe escoger una marca"),

  check("id_color").notEmpty().withMessage("Debe escoger un color"),

  check("description")
    .isLength({ min: 20 })
    .withMessage("La descripcion deberia tener un minimo de 20 caracteres"),

  check("upload_img").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", "gif"];

    if (!file) {
      throw new Error("Tienes que subir una imágen");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivos permitidas son ${acceptedExtensions.join(
            ","
          )}`
        );
      }
    }
    return true;
  }),
];

// Devolver todos los productos
router.get("/", productsController.listProducts);

// Buscar productos
router.get("/search", productsController.search);

// Crear un producto
router.get("/create", authMiddleware, productsController.createProduct);
router.post(
  "/create",
  uploadFile.single("upload_img"),
  validateCreateProduct,
  productsController.storeProduct
);

// Editar un producto
router.get("/edit/:id", authMiddleware, productsController.editProduct);
router.put(
  "/edit/:id",
  uploadFile.single("upload_img"),
  productsController.updateProduct
);

// Devolver un producto
router.get("/detail/:id", productsController.detailProduct);

// Eliminar un producto
router.delete("/delete/:id", authMiddleware, productsController.destroyProduct);

module.exports = router;
