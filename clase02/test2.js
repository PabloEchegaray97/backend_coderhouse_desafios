const objetos = [{
    manzanas:3,
    peras:2,
    carne:1,
    jugos:5,
    dulces:2
},
{
    manzanas:1,
    sandias:1,
    huevos:6,
    jugos:1,
    panes:4
}]
const listaObjetosClaves = objetos.map((objeto) =>Object.keys(objeto))
.flat()
.filter((valor, index, self) => self.indexOf(valor) === index)
console.log(listaObjetosClaves);

const listaObjetos = objetos.reduce((resultado, objeto) => {
    console.log('OBJETO->',objeto);
    Object.entries(objeto).forEach(([clave, cantidad]) => {
        console.log('->',clave,':',cantidad);
        resultado[clave] = (resultado[clave] || 0) + cantidad;});
        console.log(resultado);
    return resultado;
}, {});
console.log(listaObjetos);

const listaObjetosTotal = Object.values(listaObjetos).reduce((acc, item) => {
    return acc + item;
},0)

console.log(listaObjetosTotal);