const db = require("../../database/models");

const productsAPIController = {
  list: (req, res) => {
    let productsArray;
    let typesLength;

    // Busco en db todos los productos
    let productsProm = db.Product.findAll({
      include: [
        { association: "type" },
        { association: "brand" },
        { association: "color" },
      ]});
    let typesProm = db.Type.findAll();

    Promise.all([productsProm, typesProm])
    .then(([products,types]) => {
      // Genero un array con todos los productos; buena practica.
      productsArray = products.map((product) => {
        return product.dataValues;
      });

      console.log('TYPES - - - - - - ' + types);

      typesLength = types.length;


    // db.Product.findAll({
    //   include: [
    //     { association: "type" },
    //     { association: "brand" },
    //     { association: "color" },
    //   ],
    // }).then((products => {
    //   // Genero un array con todos los productos; buena practica.
    //   let productsArray = products.map((product) => {
    //     return product.dataValues;
    //   });

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
          countByCategory: typesLength,
          status: 200,
          url: "api/products",
        },
        data: productsArray,
        // Hard coded
        dbRelations: ['id_type', 'id_brand', 'id_color']
      });

    })
  },
  detail: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: [
        { association: "type" },
        { association: "brand" },
        { association: "color" },
      ]
    })
      .then((product)=>{
        let productArray = product.dataValues;
        delete productArray.id_type;
        delete productArray.id_brand;
        delete productArray.id_color;

        return res.status(200).json({
          meta: {
            status: 200,
            url: "api/products/" + req.params.id,
          },
          data: product,
          linkImg: `http//localhost:3000/img/${product.image}` 
        })
      })
  },
};

module.exports = productsAPIController;
