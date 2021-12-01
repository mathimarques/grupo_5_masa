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
    let userToLog = undefined;
    db.User.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then((user) => {
        // TODO VALIDAR MOSTRAR ERRORES EN CASO DE QUE INTENTE LOGUEARSE UN USUARIO NO REGISTRADO Y VER COOKIES EN PROFILE DEL USER
        if (user == null) {
          res.render("./users/login", {
            errors: [{ msg: "Hay errores de login" }],
          })
        } else {
          userToLog = user.dataValues;
          console.log(userToLog);
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
      })
      .catch(function (error) {
        console.log(errors.mapped());
        res.render("./users/login", { errors: errors.mapped(), old: req.body });
        console.log(error);
      });
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
      password: bcrypt.hashSync(req.body.password, 10), /*req.body.password */
      id_role: 2
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
    db.User.findByPk(req.params.id).then((user) => {
      res.render("./users/editUser", { userLogged: req.session.userToLog });
    });
  },

  //EDITAR USUARIO
  editUser: (req,res)=>{
    const id = req.params.id;

    const { name, username, email, address, password, id_role } = req.body;
    
    db.User.update({
      name, 
      username, 
      email, 
      address, 
      password, 
      id_role
    },
    {
      where: {id: id}
    })
     .then(user=>{
       console.log(user)
       return res.redirect('/')
       
     })
      .catch(err=>{res.send(err)});
}
}

module.exports = usersController;
