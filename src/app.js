// Requerimos módulos
const express = require("express");
const app = express();
const path = require("path");

// Requerimos rutas
const mainRoutes = require("./routes/mainRoutes");
const productsRoutes = require("./routes/productsRoutes");

// Definimos el path public como recurso de archivo estatico
const public = path.resolve(__dirname, "../public");
app.use(express.static(public));

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
