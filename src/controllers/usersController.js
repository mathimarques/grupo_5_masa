// Requerimos modulos para trabajar con archivos
// const fs = require('fs');
// const path = require('path');

// Llamar la base de datos
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

// Requerimos modulo para validar errores en formulario de login
const { validationResult } = require("express-validator");

// Declaramos variables para trabajar con el archivo de usuarios
// const usersLocation = path.join(__dirname, '../data/users.json');
// const users = JSON.parse(fs.readFileSync(usersLocation, 'utf-8'));

// Requerimos modulo para encriptar password
const bcrypt = require("bcryptjs");
const { off } = require("process");
const { name } = require("ejs");
// const User = require('../database/models/User');

// Generamos el controlador con sus métodos
const usersController = {
  login: (req, res) => {
    res.render("./users/login");
  },
  processLogin: (req, res) => {
    let errors = validationResult(req);
    let userToLog;
    if (errors.isEmpty()) {
      db.User.findOne({
        where: {
          username: req.body.username,
        },
      })
        .then((user) => {
           //  VER COOKIES EN PROFILE DEL USER
          if (user != null && bcrypt.compareSync(req.body.password, user.password)) {
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
          // MODIFICAR ACÁ EN LAS VALIDACIONES CON EXPRESS VALIDATOR
          if (userToLog == undefined) {
            console.log("Entre acá");
            res.render("./users/login", {
              errors: [{ msg: "Hay errores de login" }],
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      res.render("./users/login", { errors: errors.mapped(), old: req.body });
    }
  },

  register: (req, res) => {
    res.render("./users/register");
  },
  processRegister: (req, res) => {
    // TODO CAMBIAR LOGUEO POR EMAIL Y ELIMINAR DATE
    db.User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      address: req.body.address,
      password: bcrypt.hashSync(req.body.password, 10) /*req.body.password */,
      id_role: 2,
    });
    //console.log(req.file);
    //users.push(newUsers);
    //fs.writeFileSync(usersLocation, JSON.stringify(users, null, " "))

    res.redirect("/");
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
        res.render("./users/profile", { userLogged: user });
      })
      .catch((err) => {
        res.render(err);
      });
  },

  edit: (req, res) => {
    db.User.findByPk(req.params.id)
      .then((user) => {
        res.render("./users/editUser", { userLogged: req.session.userToLog });
      })
      .catch((err) => {
        res.render(err);
      });
  },

  //EDITAR USUARIO
  update: (req, res) => {
    const id = req.params.id;

    const { name, username, email, address } = req.body;

    console.log(req.body);
    db.User.update(
      {
        name,
        username,
        email,
        address,
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
};

module.exports = usersController;
