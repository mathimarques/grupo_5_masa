//Mathi, necesitaba declarar products de manera global para acceder desde otros métodos, por eso lo saqué
const products = [
  {
    id: 1,
    model: "Stratocaster",
    type: "Guitarra",
    price: 50000,
    brand: "Fender",
    color: "Rojo",
    description: "Guitarra Squier Stratocaster Bullet Mini",
    image: "guitarra.png"
  },
  {
    id: 2,
    model: "Ctk3500",
    type: "Piano",
    price: 20000,
    brand: "Casio",
    color: "Negro",
    description: "Teclado musical Casio Ctk3500 61 teclas Negro",
    image: "piano.png"
  },
  {
    id: 3,
    model: "Squier",
    type: "Bajo",
    price: 25000,
    brand: "Fender",
    color: "Rojo",
    description: "Bajo Electrico Fender Squier Affinity Series Jazz Bass",
    image: "bajo.png"
  },
  {
    id: 4,
    model: "Roadshow",
    type: "Batería",
    price: 302000,
    brand: "Pearl",
    color: "Negro",
    description: "Pearl Roadshow Bateria 5 Cuerpos Bombo 18 Fierros Platillos",
    image: "bateria.png"
  },
  {
    id: 5,
    model: "Mv141144",
    type: "Violin",
    price: 13000,
    brand: "Stradella",
    color: "Rojo",
    description: "Violin Stradella Mv1411 De Medida Con Estuche Semi Rigido Arco Resina Ideal Para Estudio Pino Maple",
    image: "violin.png"
  },
];

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
    res.send("Guardo el producto");
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
    console.log(products);
  },
  updateProduct: (req, res) => {
    res.send("Actualizo el producto");
  },
  // Devolver un producto
  detailProduct: (req, res) => {
    res.render("./products/detailProduct");
  },
  // (delete) Delete - Eliminar un producto
	destroy : (req, res) => {
		let id = req.params.id;
		let finalProducts = products.filter(product=> {
			return id !=  product.id
		})
		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, " "));
		res.redirect("/products");
	},
};

module.exports = productsController;
