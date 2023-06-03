//Realizar una clase “ProductManager” que gestione un conjunto de productos.
// Aspectos a incluir 
// ✓ Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.
// Cada producto que gestione debe contar con las propiedades:
// - title (nombre del producto)
// - description (descripción del producto)
// - price (precio)
// - thumbnail (ruta de imagen)
// - code (código identificador)
// - stock (número de piezas disponibles)
// ✓ Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
// - Validar que no se repita el campo “code” y que todos los campos sean obligatorios
// - Al agregarlo, debe crearse con un id autoincrementable
// ✓ Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento
// ✓Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
// - En caso de no coincidir ningún id, mostrar en consola un error “Not found”

class ProductManager {
    constructor() {
        this.products = []
    }
    getNextID = () => {
        const count = this.products.length;
        const nextID = (count > 0) ? this.products[count - 1].id + 1 : 1 //count-1 es el ultimo elemento del arreglo, tomamos su id y le sumamos 1, caso contrario si count = 0 id va a ser = a 1
        return nextID;
    }
    addProduct = (title, description, price, thumbnail, code, stock) => {
        let flag = false;
        this.products.forEach(element => {
            if (element.code === code) {
                console.log('el codigo ya existe por favor ingresa otro ');
                flag = true
            }
        })
        if (flag == false) {
            const newProduct = {
                "id": this.getNextID(),
                "title": title,
                "description": description,
                "price": price,
                "thumbnail": thumbnail,
                "code": code,
                "stock": stock
            }
            this.products.push(newProduct);
            console.log(this.products);
        }
    }
}

const productManager = new ProductManager();
productManager.addProduct('jabon', 'jabon de glicerina', 450, null, "JG1", 2000);
productManager.addProduct('jabon2', 'jabon de glicerina', 450, null, "JG1", 2000);

