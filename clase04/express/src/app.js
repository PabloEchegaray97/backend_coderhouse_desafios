import express from 'express'; // se importa de manera asincronica, tarda menos en importar 
//const express = require ('express') vieja manera de importar 
const app = express();
app.get ('/saludo', (req,res) => {
    res.send('Hola desde express')
})
app.listen(8080, () => {
    console.log('Corriendo desde el puerto 8080!');
})