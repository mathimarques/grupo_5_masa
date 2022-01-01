const productsAPIController = {
  list: (req, res) => {
      res.send('Listado de productos');
  },
  detail: (req, res) => {
    res.send('Detalle del producto');
  },
};

module.exports = productsAPIController;
