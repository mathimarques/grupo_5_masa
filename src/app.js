// Requerimos módulos
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE

// Definimos el path public como recurso de archivo estatico
const public = path.resolve(__dirname, "../public");
// Middlewares
app.use(express.static(public));
app.use(express.urlencoded({extended: false})); // Para poder leer el body
app.use(express.json()); // Para poder leer el body
app.use(methodOverride('_method')); // Para poder usar los métodos PUT y DELETE

// Requerimos rutas
const mainRoutes = require("./routes/mainRoutes");
const productsRoutes = require("./routes/productsRoutes");


// Seteamos variables Ejs y carpeta views
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Inicializamos el servidor
app.listen("3000", () => {
  console.log("Server initialized at http://localhost:3000");
});

// Ruta raíz del proyecto
app.use("/", mainRoutes);
// Ruta de productos del proyecto
app.use("/products", productsRoutes);
// Ruta NotFound404
app.use((req, res, next) => {
  res.status(404).render("error404")
});
