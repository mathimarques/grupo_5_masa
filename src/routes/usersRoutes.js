// Requerimos modulos
const express = require('express');
const usersController = require('../controllers/usersController');
const {body, check} = require('express-validator');
const guestMiddleware = require('../middlewares/guestMiddleware');
const path = require('path')
const router = express.Router();


//Multer
const multer = require('multer');
const authMiddleware = require('../middlewares/authMiddleware');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = ('./public/img');
        cb(null, folder);
    },
    filename: function (req, file, cb){
        const productImageFile = 'userPicture-' + Date.now() + path.extname(file.originalname);
        cb(null, productImageFile);
    }
});

//Guardamos en una variable la ejecucion de Multer
const uploadFile = multer({storage: storage}); //podemos obviar storage como valor ya que coincide con su clave


// Middleware para validar login
const validateLogin = [
    check('username')
        .notEmpty().withMessage('Completar nombre de usuario'),
    check('password')
        .notEmpty().withMessage('Completar el password')
];

// Rutas para login
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', validateLogin, usersController.processLogin);

// Rutas para crear usuario
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', uploadFile.single('user-pic'), usersController.processRegister);

router.get('/logout', usersController.logout);

//router.get('/profile/:id', authMiddleware, usersController.profile);

router.get('/editUser/:id', authMiddleware, usersController.profile)
router.put('/editUser/:id', authMiddleware, usersController.editUser)

module.exports = router;