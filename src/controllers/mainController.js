// Generamos el controlador con sus métodos
const mainController = {
  index: (req, res) => {
    res.render("index");
  },
  login: (req, res) => {
    res.render("login");
  },
  product: (req, res) => {
    res.render("product");
  },
  productCart: (req, res) => {
    res.render("productCart");
  },
  register: (req, res) => {
    res.render("register");
  },
};
module.exports = mainController;
