const express = require('express');
const app = express();
const path = require('path');

const public = path.resolve(__dirname, "/public");
app.use(express.static(public));

app.listen('3030', ()=>{
    console.log('Server initialized at http://localhost:3030');
})