// Llamar la base de datos
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

// Requerimos modulo para validar errores en formulario de login
const { validationResult } = require("express-validator");

// Requerimos modulo para encriptar password
const bcrypt = require("bcryptjs");
const session = require("express-session");

// Generamos el controlador con sus métodos
const usersController = {
  login: (req, res) => {
    res.render("./users/login");
  },
  processLogin: (req, res) => {
    let errors = validationResult(req);
    let userToLog;
    // SI NO HAY ERRORES PROCEDE CON EL LOGIN
    if (errors.isEmpty()) {
      db.User.findOne({
        where: {
          username: req.body.username,
        },
      })
        .then((user) => {
          //  VER COOKIES EN PROFILE DEL USER
          if (
            user != null &&
            bcrypt.compareSync(req.body.password, user.password)
          ) {
            userToLog = user.dataValues;
            req.session.userToLog = userToLog;

            // remember Cookie
            if (req.body.remember != undefined) {
              res.cookie("rememberAccount", userToLog.username, {
                maxAge: 1000 * 60 * 60,
              }); //1 hour
            } else {
              console.log("Account not remembered");
            }
            res.redirect("/");
          }
          // if (userToLog == undefined) {
          //   res.render("./users/login", {
          //     errors: [{ msg: "Hay errores de login" }],
          //   });
          // }
        })
        .catch(function (error) {
          console.log(error);
        });
      // SI HAY ERRORES MUESTRO LOS MENSAJES EN LA VISTA
    } else {
      res.render("./users/login", { errors: errors.mapped(), old: req.body, userLogged: req.session.userToLog });
    }
  },

  register: (req, res) => {
    res.render("./users/register");
  },
  processRegister: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      // TODO CAMBIAR LOGUEO POR EMAIL Y ELIMINAR DATE
      db.User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        address: req.body.address,
        image: req.file ? req.file.filename : "userDefault.png",
        password: bcrypt.hashSync(req.body.password, 10) /*req.body.password */,
        id_role: 2,
      })
        .then((user) => {
          return res.redirect("/");
        })
        .catch((error) => {
          res.send(error);
        });
    } else {
      res.render("./users/register", {
        errors: errors.mapped(),
        old: req.body,
      });
      console.log(errors);
    }
  },

  // LOGOUT
  logout: (req, res) => {
    // Delete info inside session about the user
    delete req.session.userToLog;
    // delete the cookie
    if (req.cookies.rememberAccount) {
      res.clearCookie("rememberAccount");
      // delete req.cookies.rememberAccount;
    }

    res.redirect("/");
  },

  // VER EL PERFIL DEL USUARIO
  profile: (req, res) => {
    db.User.findByPk(req.params.id)
      .then((user) => {
        res.render("./users/profile", { userLogged: user, });
      })
      .catch((err) => {
        res.render(err);
      });
  },

  edit: (req, res) => {
    db.User.findByPk(req.params.id)
      .then((user) => {
        res.render("./users/editUser", { userLogged: user, });
      })
      .catch((err) => {
        res.render(err);
      });
  },

  //EDITAR USUARIO
  update: (req, res) => {
    const id = req.params.id;

    const { name, username, email, address, image } = req.body;

    console.log(req.body);
    db.User.update(
      {
        name,
        username,
        email,
        address,
        image,
      },
      {
        where: { id: id },
      }
    )
      .then((user) => {
        return res.redirect("/");
      })
      .catch((err) => {
        res.send(err);
      });
  },
  admin: (req,res)=>{
    res.render('./users/adminUser', {userLogged: req.session.userToLog})
  },
  adminUserList: (req,res)=>{
    db.User.findAll()
    .then(users=>{
      res.render('./users/user-list', {userLogged: req.session.userToLog, users: users});
    })
  }
};

module.exports = usersController;
