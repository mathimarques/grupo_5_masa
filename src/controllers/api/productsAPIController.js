const db = require("../../database/models");

const productsAPIController = {
  list: (req, res) => {
    // Busco en db todos los productos
    db.Product.findAll({
      include: [
        { association: "type" },
        { association: "brand" },
        { association: "color" },
      ],
    }).then((products => {
      // Genero un array con todos los productos; buena practica.
      let productsArray = products.map((product) => {
        return product.dataValues;
      });

      // Recorro el array de productos para eliminar datos que no queremos mostrar en el endpoint
      productsArray.forEach((product) => {

        delete product.id_type;
        delete product.type;
        delete product.price;
        delete product.id_brand;
        delete product.brand;
        delete product.id_color;
        delete product.color;
        delete product.image;
        delete product.stock;
        product.detailURL = `http//localhost:3000/api/products/${product.id}`;
      });

      // Respuesta de la api
      return res.status(200).json({
        meta: {
          total: products.length,
          // countByCategory: TODO ,
          status: 200,
          url: "api/products",
        },
        data: productsArray,
        // dbRelations: TODO
      });

    }))
  },
  detail: (req, res) => {
    res.send('Detalle del producto');
  },
};

module.exports = productsAPIController;
