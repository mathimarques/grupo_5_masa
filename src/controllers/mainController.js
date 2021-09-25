// Generamos el controlador con sus métodos
const mainController = {
  index: (req, res) => {
    res.render("index");
  },
  login: (req, res) => {
    res.render("./users/login");
  },
  register: (req, res) => {
    res.render("./users/register");
  },
  productCart: (req, res) => {
    res.render("productCart");
  },
};
module.exports = mainController;
