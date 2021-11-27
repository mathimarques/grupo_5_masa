// Requerimos models de sequelize
const db = require("../database/models");
const Op = db.Sequelize.Op;

// BORRAR CUANDO ESTÉ LISTO EL CRUD CON BD
//Requiriendo modulo para leer archivos
// const fs = require('fs');
//Requiriendo modulo para trabajar con directorios
// const path = require('path');
//Declaramos la constante para ubicar el archivo de productos
// const productsLocation = path.join(__dirname, '../data/products.json');
//Declaramos la 'variable' products que abre el archivo products
//y genera un objeto a partir del mismo
// const products = JSON.parse(fs.readFileSync(productsLocation, { encoding: "utf-8" }));

// Generamos el controlador con sus métodos
const productsController = {
  // Listar todos productos
  listProducts: (req, res) => {
    db.Product.findAll({
      include: [
        { association: "type" },
        { association: "brand" },
        { association: "color" },
      ],
    })
      .then((products) => {
        res.render("./products/product", {
          products: products,
          userLogged: req.session.userToLog,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  // Buscar productos
  search: (req, res) => {
    db.Product.findAll(
      {
        where: {
          description: { [Op.like]: "%" + req.query.keyword + "%" },
        },
        include: [
          { association: "type" },
          { association: "brand" },
          { association: "color" },
        ],
      },
    )
      .then((products) => {
        res.render("./products/product", {
          products: products,
          userLogged: req.session.userToLog,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  // Crear Producto
  createProduct: (req, res) => {
    res.render("./products/createProduct", {
      userLogged: req.session.userToLog,
    });
  },
  storeProduct: (req, res) => {
    // res.send(req.body);

    //Se crea la constante newProduct que va a contener
    //la info que venga por el body
    const newProduct = {
      id: products[products.length - 1].id + 1,
      model: req.body.model,
      type: req.body.type,
      price: req.body.price,
      brand: req.body.brand,
      color: req.body.color,
      description: req.body.description,
      image: req.file ? req.file.filename : "default-image.png",
    };

    console.log(req.file);

    //agrega newProduct a la lista de productos y sobreescribe el archivo
    products.push(newProduct);
    fs.writeFileSync(productsLocation, JSON.stringify(products, null, " "));
    res.redirect("/products");
  },
  // Editar Producto
  editProduct: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: [
        { association: "type" },
        { association: "brand" },
        { association: "color" },
      ],
    })
      .then((product) => {
        res.render("./products/editProduct", {
          product: product,
          userLogged: req.session.userToLog,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  updateProduct: (req, res) => {
    const id = req.params.id;
    let productToEdit = products.find((product) => product.id == id);

    console.log(productToEdit);

    productToEdit = {
      id: productToEdit.id,
      model: req.body.model,
      type: req.body.type,
      price: req.body.price,
      brand: req.body.brand,
      color: req.body.color,
      description: req.body.description,
      image: req.file ? req.file.filename : productToEdit.image,
    };

    console.log(productToEdit);

    let newProducts = products;
    newProducts[id - 1] = productToEdit;

    fs.writeFileSync(productsLocation, JSON.stringify(newProducts, null, " "));
    res.redirect("/products");
  },
  // Devolver un producto
  detailProduct: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: [
        { association: "type" },
        { association: "brand" },
        { association: "color" },
      ],
    })
      .then((product) => {
        res.render("./products/detailProduct", {
          product: product,
          userLogged: req.session.userToLog,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  // (delete) Delete - Eliminar un producto
  destroyProduct: (req, res) => {
    db.Product.destroy({
      where: {
        id: req.params.id,
      },
      force: true,
    })
      .then(() => res.redirect("/products"))
      .catch((error) => res.send(error));
  },
};

module.exports = productsController;
