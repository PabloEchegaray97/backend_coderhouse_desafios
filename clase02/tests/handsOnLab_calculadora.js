//4:17:00 
const sumar = (num1, num2) => {
    return new Promise ((resolve, reject) => {
        if (num1 === 0 || num2 === 0) reject ('Operacion innecesaria');
        else if(num1 < 0 || num2 < 0) reject ('No se aceptan numeros negativos');
        resolve(num1 + num2);
    })
}

const restar = (num1, num2) => {
    return new Promise((resolve, reject) => {
        if (num1 === 0 || num2 === 0) reject ('Operacion innecesaria');
        const result = num1 - num2;
        if (result < 0) reject ('El resultado es negativo')
        return resolve(result);
    })
}

const multiplicar = (num1, num2) => {
    return new Promise ((resolve, reject) => {
        if(num1 < 0 || num2 < 0) reject ('No se aceptan numeros negativos');
        return resolve (num1 * num2);
    })
}

const dividir = (num1, num2) => {
    return new Promise ((resolve, reject) => {
        if(num1 < 0 || num2 < 0) reject ('No se aceptan numeros negativos');
        else if (num2 === 0) {
            reject ('No se acepta un divisor = a 0');
        }
        return resolve(num1/num2)
    })
}
// const calculadora = async (num1,num2) => {

// }
try {
    const resultado1 = await sumar(2,3);
    const resultado2 = await restar(5,5);
    const resultado3 = await multiplicar(2,3);
    const resultado4 = await dividir (0, 2); // todas las promesas se ejecutan al mismo tiempo
    console.log(resultado1);
    console.log(resultado2);
    console.log(resultado3);
    console.log(resultado4);
} catch (e) {
    console.log(e);
}
// -- si ocurre un error en el try sale directamente con el error y no imprime los resultados 
// por eso utilizamos otro try catch para otro caso en particular
try {
    const res1 = await multiplicar(-2,1);
    console.log(res1);
} catch (e) {
    console.log(e);
}

// then catch 
sumar(12,35)
    .then(result => console.log("Se utilizó",sumar.name, result))
    .catch(e => console.log(e));
restar(0,-2)
    .then(result => console.log(result))
    .catch(e => console.log(e));
multiplicar(4,5)
    .then(result => console.log(result))
    .catch(e => console.log(e));
dividir(2,4)
    .then(result => console.log(result))
    .catch(e => console.log(e));

// restar se ejecuta al ultimo al parecer

// con async await 
// se resuelve despues de dividir pero antes de restar porque esta estaria dando error 
const funcCalculadora = async () => {
    try {
        console.log(await sumar(2,3));
    } catch (error) {
        console.log(error);
    }
}

funcCalculadora()