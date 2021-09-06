const express = require('express');
const app = express();
const path = require('path');

// Definimos el path public como recurso de archivo estatico
const public = path.resolve(__dirname, "./public");
app.use(express.static(public));

// Inicializamos el servidor
app.listen('3000', ()=>{
    console.log('Server initialized at http://localhost:3000');
})

// Ruta raíz del proyecto
app.get('/', (req,res)=>{
    res.sendFile(path.resolve('./views/index.html'));
});

// Ruta raíz del login
app.get('/login', (req,res)=>{
    res.sendFile(path.resolve('./views/login.html'));
});

// Ruta raíz del register

app.get('/register', (req, res) => {
    res.sendFile(path.resolve('./views/register.html'));
});

// Ruta raíz del product
app.get('/product', (req,res)=>{
    res.sendFile(path.resolve('./views/product.html'));
});

// Ruta raíz del carrito

app.get('/productCart', (req, res) => {
    res.sendFile(path.resolve('./views/productCart.html'));
});