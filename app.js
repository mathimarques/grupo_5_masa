const express = require('express');
const app = express();
const path = require('path');

const public = path.resolve(__dirname, "./public");
app.use(express.static(public));

app.listen('3000', ()=>{
    console.log('Server initialized at http://localhost:3000');
})

app.get('/', (req,res)=>{
    res.sendFile(path.resolve('./views/index.html'));
});