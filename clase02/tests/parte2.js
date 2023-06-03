const originales = [1,2,3,4,5]
const functionForMap = (x) => {
    return x +1;
}
console.log(originales);
const newValues = originales.map(functionForMap);
console.log(newValues);
const newValues2 = originales.map((x) => {
    return x * 2;
})
console.log(newValues2);

// un callback propio para map

Array.prototype.myMap2 = function (callback) { // mymap2 es una funcion de segundo grado
    const newArray = [];
    for (let i = 0; i < this.length; i++) { //this es la funcion del array
        const element = this[i];
        const newElement = callback(element)
        newArray.push(newElement)
    }
    return newArray;
}

const miLista = [1, 2, 3, 4, 88];
const newLista = miLista.myMap2(x => x * 3)
console.log(newLista);

//funcion que recibe una funcion y genera mas funciones
// -- callback operaciones
const sumar = (num1, num2) => num1 + num2;
const restar = (num1, num2) => num1 - num2;
const multiplicar = (num1, num2) => num1 * num2;
const dividir = (num1, num2) => num1 / num2;

const realizarOperacion = (num1, num2, callback) => {
    console.log('Voy a realizar una operacion:',callback.name);
    const result = callback(num1, num2);
    console.log('El resultado es: ', result);
}
realizarOperacion(2,5, sumar)
realizarOperacion(2,5, restar)
realizarOperacion(2,5, multiplicar)
realizarOperacion(2,5, dividir)