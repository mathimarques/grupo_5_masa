// Requerimos models de sequelize
const db = require("../database/models");
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");

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
    db.Product.findAll({
      where: {
        description: { [Op.like]: "%" + req.query.keyword + "%" },
      },
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

  // Crear Producto
  createProduct: (req, res) => {
    let typeProm = db.Type.findAll();
    let brandProm = db.Brand.findAll();
    let colorProm = db.Color.findAll();

    Promise.all([typeProm, brandProm, colorProm])
      .then(([type, brand, color]) => {
        return res.render("./products/createProduct", {
          type,
          brand,
          color,
          userLogged: req.session.userToLog,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  },
  storeProduct: (req, res) => {
    let errors = validationResult(req);

    // Unpacking el req.body
    const { model, id_type, price, id_brand, id_color, description } = req.body;

    if (errors.isEmpty()) {
      db.Product.create({
        model,
        id_type,
        price,
        id_brand,
        id_color,
        description,
        image: req.file ? req.file.filename : "default_course_img.jpg",
      })
        .then(() => {
          return res.redirect("/products");
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      let typeProm = db.Type.findAll();
      let brandProm = db.Brand.findAll();
      let colorProm = db.Color.findAll();

      Promise.all([typeProm, brandProm, colorProm])
        .then(([type, brand, color]) => {
          return res.render("./products/createProduct", {
            type,
            brand,
            color,
            userLogged: req.session.userToLog,
            errors: errors.mapped(),
            old: req.body,
          });
        })
        .catch((err) => {
          res.send(err);
        });
    }
  },
  // Editar Producto
  editProduct: (req, res) => {
    // promesa para traer el producto a editar
    let productProm = db.Product.findByPk(req.params.id, {
      include: [
        { association: "type" },
        { association: "brand" },
        { association: "color" },
      ],
    });

    // Promesas para traer de la DB las tablas tipo, marca y color
    let typeProm = db.Type.findAll();
    let brandProm = db.Brand.findAll();
    let colorProm = db.Color.findAll();

    Promise.all([productProm, typeProm, brandProm, colorProm])
      .then(([product, type, brand, color]) => {
        console.log(productProm);

        res.render("./products/editProduct", {
          product,
          type,
          brand,
          color,
          userLogged: req.session.userToLog,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  updateProduct: (req, res) => {
    let errors = validationResult(req);

    const id = req.params.id;
    const { model, id_type, price, id_brand, id_color, description } = req.body;
  
    if (errors.isEmpty()) {
       db.Product.update(
        {
          model,
          id_type,
          price,
          id_brand,
          id_color,
          description,
          image: req.file ? req.file.filename : req.body.image,
        },
        {
          where: { id: id },
        }
      )
        .then(() => {
          return res.redirect("/products");
        })
        .catch((err) => res.send(err));
    } else {
      let productProm = db.Product.findByPk(req.params.id, {
        include: [
          { association: "type" },
          { association: "brand" },
          { association: "color" },
        ],
      });

      let typeProm = db.Type.findAll();
      let brandProm = db.Brand.findAll();
      let colorProm = db.Color.findAll();

      Promise.all([productProm, typeProm, brandProm, colorProm])
        .then(([product, type, brand, color]) => {
          res.render("./products/editProduct", {
            product,
            type,
            brand,
            color,
            userLogged: req.session.userToLog,
            errors: errors.mapped(),
            old: req.body,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
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
