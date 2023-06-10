const http = require('http'); // ya viene por defecto en node
const server = http.createServer((req, res) => {
    console.log('Se recibio un request');
    res.end('Mi primer hola mundo desde backend !! ')
})
server.listen(8080, () => {
    console.log('El servidor esta corriendo y escuchando en el puerto 8080');
})
/*
ip local, http: http://127.0.0.1:8080/
http://localhost:8080
$npm install -g nodemon
$npm install nodemon
$npx nodemon server.js
*/
