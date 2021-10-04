//Requiriendo modulo para leer archivos
const fs = require('fs');
//Requiriendo modulo para trabajar con directorios
const path = require('path');

//Declaramos la constante para ubicar el archivo de productos
const productsLocation = path.join(__dirname, '../data/products.json');
//Declaramos la 'variable' products que abre el archivo products
//y genera un objeto a partir del mismo
const products = JSON.parse(fs.readFileSync(productsLocation, 'utf-8'));

// Generamos el controlador con sus métodos
const productsController = {
  // Listar todos productos
  listProducts: (req, res) => {
    res.render("./products/product", {'products':products});
  },
  // Crear Producto
  createProduct: (req, res) => {
    res.render("./products/createProduct");
  },
  storeProduct: (req, res) => {
    // res.send(req.body);
    // console.log(req.body);
    const newProduct = {
      id: products[products.length-1].id + 1,
      model: req.body.model,
      type: req.body.type,
      price: req.body.price,
      brand: req.body.brand,
      color: req.body.color,
      description: req.body.description,
      image: 'default-image.png'
    }

    products.push(newProduct);
    fs.writeFileSync(productsLocation, JSON.stringify(products, null, " "));
    res.redirect('/products');
  },
  // Editar Producto
  editProduct: (req, res) => {
    const id = req.params.id;
    const product = products.find(product =>{
      return product.id ==id;
    })

    res.render("./products/editProduct", {
      product: product
    });
  },
  updateProduct: (req, res) => {
    res.send("Actualizo el producto");
  },
  // Devolver un producto
  detailProduct: (req, res) => {
    res.render("./products/detailProduct");
  },
  // Eliminar un producto
  destroyProduct: (req, res) => {
    res.send("Se va a eliminar el producto: " + req.params.id);
  },
};

module.exports = productsController;
