//ECMASCRIPT 11
const varTest = 0;
const varAsignable = varTest || 'Sin valor' // 0 es false, por eso imprime sin valor

console.log(varAsignable);

const varAsignable2 = varTest ?? 'Sin valor' //imprimiria sin valor si es undefined o null  
console.log(varAsignable2);

class Persona {
    #fullname //privado, solo se puede acceder si le hacemos un getter
    constructor (name, lastname) {
        this.name = name;
        this.lastname = lastname;
        this.#fullname = `${name} ${lastname}`
    }
    getFullname = () => {
        return this.#fullname;
    }
}
const nuevo_usuario = new Persona ('Nicolas', 'Ayala')
console.log(nuevo_usuario.getFullname());