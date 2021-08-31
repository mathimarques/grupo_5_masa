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

app.get('/login', (req,res)=>{
    res.sendFile(path.resolve('./views/login.html'));
});