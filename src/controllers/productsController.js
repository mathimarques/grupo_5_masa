// Generamos el controlador con sus métodos
const productsController = {
  // Listar todos productos
  product: (req, res) => {
    res.render("./products/product");
  },
  // Crear Producto
  createProduct: (req, res) => {
    res.render("./products/createProduct");
  },
  storeProduct: (req, res) => {
    res.send("Guardo el producto");
  },
  // Editar Producto
  editProduct: (req, res) => {
    res.render("./products/editProduct");
  },
  updateProduct: (req, res) => {
    res.send("Actualizo el producto");
  },
  // Devolver un producto
  detail: (req, res) => {
    res.render("./products/detailProduct");
  },
  // Eliminar un producto
  destroy: (req, res) => {
    res.send("Se va a eliminar el producto: " + req.params.id);
  },
};

module.exports = productsController;
