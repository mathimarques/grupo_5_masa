const fs = require('fs');
const path = require('path');
const usersLocation = path.join(__dirname, '../data/users.json');

const users = JSON.parse(fs.readFileSync(usersLocation, 'utf-8'));

// Generamos el controlador con sus métodos
const mainController = {
  index: (req, res) => {
    res.render("index", {userLogged: req.session.userToLog});
  },
  
  productCart: (req, res) => {
    res.render("productCart", {userLogged: req.session.userToLog});
  },
};
module.exports = mainController;
