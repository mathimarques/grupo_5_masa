// Requerimos modulos para trabajar con archivos
const fs = require('fs');
const path = require('path');

// Requerimos modulo para validar errores en formulario de login
const { validationResult } = require('express-validator');

// Declaramos variables para trabajar con el archivo de usuarios
const usersLocation = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersLocation, 'utf-8'));


// Requerimos modulo para encriptar password
const bcrypt = require('bcryptjs');
const { off } = require('process');

// Generamos el controlador con sus métodos
const usersController = {
  login: (req, res) => {
    res.render("./users/login");
  },
  processLogin: (req,res) =>{
      let errors = validationResult(req); //variable  para checkear si el middleware en el router detectó errores
      let userToLog = undefined; //variable para luego asignar al usuario logueandose

    // Logica para checkear si no hay errores, y si el usuario y contraseña en el 
    // formulario (req.body) coinciden con algun usuario en nuestra base de datos (json por ahora)
    // En caso que exista, se asigna el usuario a userToLog, caso contrario rebota
      if(errors.isEmpty()){
          console.log('NO ERRORS');
          for(let i=0; i<users.length; i++){
              console.log(users[i]);
              if(users[i].username == req.body.username){

                  console.log('Username: ' + req.body.username + users[i].name);
                  if(bcrypt.compareSync(req.body.password, users[i].password)){
                      userToLog = users[i];
                      break;
                  }
              }
          }

          console.log(users);

          if(userToLog==undefined){
            res.render('./users/login', {errors: [
                {msg: 'Hay errores de login'}
                ]})
            }
            console.log(userToLog);
  
            res.send('username logueado: ' + userToLog.username + ' nombre de usuario: ' + userToLog.name);
      }

      else{
          console.log(errors.mapped());
          res.render('./users/login', {errors: errors.mapped(), old: req.body});
      }

      

    //   res.redirect('/');
  },
  register: (req, res) => {
    res.render("./users/register");
  },
  processRegister: (req, res) => {
    const newUsers = {
			id: users[users.length - 1].id + 1,
			name: req.body.name,
			username: req.body.username,
			date: req.body.date,
			address: req.body.address,
            password: bcrypt.hashSync(req.body.password, 10)
		}
	users.push(newUsers);
	fs.writeFileSync(usersLocation, JSON.stringify(users, null, " "))
    
    res.redirect("/");
  }
};

module.exports = usersController;