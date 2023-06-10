import express from 'express';
const app = express();
const PORT = 8080;
app.get('/bienvenida', (req,res) => {
    res.send (('Bienvenido!').fontcolor('blue')) // deprecadiiiiiiiiisimo
})
app.get ('/usuario', (req,res) => {
    const obj = {
        nombre:'Pablo',
        apellido:'Echegaray',
        edad:26,
    }
    res.send(obj)
})

app.listen(PORT, () =>{
    console.log('Servidor escuchando en el puerto:',PORT);
})