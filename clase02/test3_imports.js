const modo = 'calculos'
const exampleImport = async () => {
    if (modo=='calculos') {
        const {default: Calculadora} = await import ('./lib.js') //ECMASCRIPT 11 solo importo cuando la condicion es verdadera (ahorra recursos)
        let calc = new Calculadora()
        console.log(calc.sumar(2,2));
        console.log(calc.restar(3,12));
    }
}
exampleImport()