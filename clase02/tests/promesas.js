const dividir = (dividendo, divisor) => {
    const promesa = new Promise((resolve, reject) => {
        if (divisor == 0) reject('Division entre 0') // si falla llamamos a reject
        else resolve(dividendo / divisor) // si esta bien, se ejecuta resolve
    })
    return promesa;
}

const p1 = dividir(34, 7);
p1
    .then(resultado => ('El resultado es '+ resultado)) //si se resolvió
    .then(otroResult => {
        console.log(otroResult);
        const tt = 7;
        return tt;
    })
    .then (r => {console.log(r); throw 'Error :D'})
    .catch(error => console.error(error))//si falló //si tiro un throw entra directamente en el catch (por lo gral se pone error)
dividir (56,0)
    .then(resultado => console.log('El resultado es ', resultado))
    .catch(error => console.error(error))

// -- p1 y dividir se ejecutaron al mismo tiempo y despues se ejecuto el segundo .then de p1 por eso da resultado 0 y 7

