// Requerimos modulos
const express = require("express");
const usersController = require("../controllers/usersController");
const productsController = require("../controllers/productsController");
const { body, check } = require("express-validator");
const guestMiddleware = require("../middlewares/guestMiddleware");
const path = require("path");
const router = express.Router();
// CONSULTAR A GUIDO SI SE PUEDE LLAMAR A LA DB DESDE ROUTES
const db = require("../database/models");
// Requerimos modulo para encriptar password
const bcrypt = require("bcryptjs");

//Multer
const multer = require("multer");
const authMiddleware = require("../middlewares/authMiddleware");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "./public/img";
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const productImageFile =
      "userPicture-" + Date.now() + path.extname(file.originalname);
    cb(null, productImageFile);
  },
});

//Guardamos en una variable la ejecucion de Multer
const uploadFile = multer({ storage: storage }); //podemos obviar storage como valor ya que coincide con su clave

// Middleware para validar login
const validateLogin = [
  check("username")
    .notEmpty()
    .withMessage("Completar nombre de usuario")
    .custom((value) => {
      return db.User.findOne({ where: { username: value } }).then((user) => {
        if (!user) {
          return Promise.reject("Debe ingresar un usuario válido");
        }
      });
    }),
  check("password")
    .notEmpty()
    .withMessage("Completar el password")
    .custom((value, { req }) => {
      return db.User.findOne({ where: { username: req.body.username } }).then(
        (user) => {
          if (user == null) {
            return Promise.reject("Debe ingresar una contraseña válida");
          } else if (!bcrypt.compareSync(req.body.password, user.password)) {
            return Promise.reject("Debe ingresar una contraseña válida");
          }
        }
      );
    }),
];

const validateRegister = [
  check("name")
    .notEmpty()
    .withMessage("Ingresar un nombre")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener más de dos caracteres"),

  check("username")
    .notEmpty()
    .withMessage("Ingresar un nombre de usuario")
    .custom((value) => {
      return db.User.findOne({ where: { username: value } }).then((user) => {
        if (user) {
          return Promise.reject("Nombre de usuario ya existe");
        }
      });
    })
    .isLength({ min: 6 })
    .withMessage("El nombre debe tener más de seis caracteres"),

  check("email")
    .notEmpty()
    .withMessage("Ingresar un email")
    .isEmail()
    .withMessage("Ingresar un email válido"),

  check("address")
    .notEmpty()
    .withMessage("Ingresar un domicilio")
    .isLength({ min: 4 })
    .withMessage("El domicilio debe tener más de cuatro caracteres"),

  check("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña deberia tener un minimo de 8 caracteres")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    .withMessage(
      "Debe Contener una letra mayúscula, una mínuscula, y números"
    ),

  check("repassword")
    .isLength({ min: 8 })
    .withMessage("La contraseña deberia tener un minimo de 8 caracteres")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    .withMessage(
      "Debe Contener una letra mayúscula, una mínuscula, y números"
    ),

  check("userPic").custom((value, { req }) => {
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

// Rutas para login
router.get("/login", guestMiddleware, usersController.login);
router.post("/login", validateLogin, usersController.processLogin);

// Rutas para crear usuario
router.get("/register", guestMiddleware, usersController.register);
router.post(
  "/register",
  uploadFile.single("userPic"),
  validateRegister,
  usersController.processRegister
);

router.get("/logout", usersController.logout);

router.get("/profile/:id", authMiddleware, usersController.profile);

router.get("/edit/:id", authMiddleware, usersController.edit);
router.put("/edit/:id", authMiddleware, usersController.update);

router.get("/admin", authMiddleware, usersController.admin);
router.get("/user-list", authMiddleware, usersController.adminUserList);

// admin
router.get("/inst-list", authMiddleware, productsController.instrumentList);

module.exports = router;
