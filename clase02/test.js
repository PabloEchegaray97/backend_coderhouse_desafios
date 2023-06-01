//ECMASCRIPT7
const valores = [1, 2, 3, 4, 5, 8, 9]
const nuevosValores = valores.map((num, index) => { //recorre el array por item (num) y podemos guardar el index del item en 'index'
    console.log(num, index);
    return num + 1;
})
console.log(nuevosValores);

const nombres = ['Valentin', 'Carolina', 'Agustin', 'Exequiel', 'Ayelen'];
console.log(nombres.includes('Carolina')); // devuelve booleano true, es keysensitive (ojo)
if (nombres.includes('Ayelen')) {
    console.log('Ayelen llego a la fiesta :D');
} else {
    console.log('La fiesta esta aburrida :(');
}
//ECMASCRIPT8
const impuestos = {
    iva: 21,
    alquiler: 80,
    auto: 170
}

const parLlaveValor = Object.entries(impuestos); // los separa en una lista con cada entrada como una lista 
console.log(parLlaveValor);

const fields = Object.keys(impuestos);
console.log(fields);

const values = Object.values(impuestos);
console.log(values);
console.log('--------------------------------------------');

const impuestoTotal = values.reduce((acumulacion, item) => {
    console.log('->', acumulacion, item);
    return acumulacion - item; //podria ser positivo tambien 
    //return acumulacion + item 
}, 0 )//sirve para acumular, , el 0 es por donde comienza a acumular
console.log('Resultado:' , impuestoTotal);

//ECMASCRIPT9
const obj1 = {
    field11: 222,
    field22: 'Romina',
    field33: true,
    field44: 'Agustin Sivila',
    field66: 666,
    field1: 'esto se va a perder'
};
const obj2 = {
    field1: '[TUTOR] Santiago',
    fied2: [2,3,4,6,7]
};
// -- spread operator
const {field22, field33} = obj1;
console.log(field22, field33); // extraje el campo 22 del obj1 y lo guarde en una variable independiente

const obj3 = {...obj1, ...obj2}; //concatenar ambos objetos en uno nuevo
console.log('Objeto3:',obj3); //si hay dos claves iguales se usa la del ultimo objeto

// -- rest operator 
const {field11, field66, ...restObjeto} = obj3;  // saco field 66 tambien y guardo el resto en 'rest' (puede tener cualquier otro nombre)
console.log(field11);
console.log(restObjeto);

//ECMASCRIPT10
// -- trim
const saludos = "                    Hola :D"
console.log(saludos.trim()); //quita todos los espacios del principio
const messages=[]
const m1='                                               yes!';
const m2= 'no    ';
const m3='         ';

const addMessage = (msg) => {
    if (msg.trim()!='') { // no agregamos mensajes vacios
        messages.push(msg.trim())
    }
}
addMessage(m1);
addMessage(m2);
addMessage(m3);
console.log(messages);

// --flat
const nestedArray = [1,3,4, [123,2,12], 12313,4412,341, [12313,4124,5]];
const result = nestedArray.flat();
console.log(result);

