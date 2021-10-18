const fs = require('fs');
const path = require('path');
const usersLocation = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersLocation, 'utf-8'));

// Requerimos modulo para encriptar password
const bcrypt = require('bcryptjs');

// Generamos el controlador con sus métodos
const usersController = {
  login: (req, res) => {
    res.render("./users/login");
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