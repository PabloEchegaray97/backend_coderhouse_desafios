
const dividir = (dividendo, divisor) => {
    return new Promise ((resolve, reject) => {
        if (divisor==0) {
            return reject('Division entre 0 :(')
        }
        resolve (dividendo / divisor)
    })
}
// + En las funciones asincronas es mejor agregar un try catch por si hay un error, el catch atrapara ese eroor y no se rompera el flujo de ejecucion 

const asyncFunction = async () => {
    try {
        const resultado = await dividir(10,5) // no tiene sentido ejecutar .then en await, ponemos liea por linea
        const resultado2 = await dividir(100, 2)
        console.log(resultado, resultado2);
    } catch (e){
        console.log('Se ha producido un error:',e); // e va a ser el 'reject' que le pasamos mas arriba a la promesa
    }
}

asyncFunction()
