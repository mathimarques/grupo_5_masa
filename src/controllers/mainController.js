// Generamos el controlador con sus métodos
const mainController = {
  index: (req, res) => {
    res.render("index");
  },
  login: (req, res) => {
    res.render("./users/login");
  },
  product: (req, res) => {
    res.render("./products/product");
  },
  productCart: (req, res) => {
    res.render("productCart");
  },
  register: (req, res) => {
    res.render("./users/register");
  },
  createProduct: (req, res) => {
    res.render("./admin/createProd");
  }
};
module.exports = mainController;
