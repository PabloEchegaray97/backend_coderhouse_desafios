// Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos (basado en entregable 1).
// Aspectos a incluir:
//✓ La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.
//✓ Debe guardar objetos con el siguiente formato:
//  - id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
//  - title (nombre del producto)- description (descripción del producto)- price (precio)
//  - thumbnail (ruta de imagen)- code (código identificador)
//  - stock (número de piezas disponibles)
//✓Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).
//✓ Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo. 
//✓ Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto
//✓Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 
//✓ Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.

const fs = require('fs');
class ProductManager {
    constructor(filename) {
        this.path = `./files/${filename}`
        this.format = 'utf-8';
    }

    getNextID = async () => {
        const list = await this.getProduct();
        const nextID = (list.length > 0) ? list[list.length - 1].id + 1 : 1 //count-1 es el ultimo elemento del arreglo, tomamos su id y le sumamos 1, caso contrario si count = 0 id va a ser = a 1
        return nextID;
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
            const newProduct = { id: await this.getNextID(), title, description, price, thumbnail, code, stock}
            const productsList = await this.getProduct();

            productsList.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(productsList));
    }

    getProduct = async () => {
        try {
            const data = await fs.promises.readFile(this.path, this.format);
            const dataObj = JSON.parse(data);
            return dataObj
        } catch (error) {
            console.log('No hay productos en la lista');
            return [];
        }
    }

    getProductByID = async (id) => {
        const listOfProducts = await this.getProduct();
        const product = listOfProducts.find(element => element.id === id);
        
        if (product) {
            console.log('Se ha encontrado un producto con ID = ', id);
            return product;
        }
        return ('Error: Not found')
    }

    updateProduct = async (id, updatedProps) => {
        const listOfProducts = await this.getProduct();
        const productIndex = listOfProducts.findIndex((element) => element.id === id);

        if (productIndex !== -1) {
            const updatedProduct = { ...listOfProducts[productIndex], ...updatedProps };
            updatedProduct.id = id; // Evitar la actualización del ID
            listOfProducts[productIndex] = updatedProduct;
            await fs.promises.writeFile(this.path, JSON.stringify(listOfProducts));
            console.log(`Producto con ID ${id} actualizado.`);
        } else {
            console.log(`Producto con ID ${id} no encontrado.`);
        }
    }

    deleteProduct = async (id) => {
        const products = await this.getProduct();
        const updatedProducts = products.filter((product) => product.id !== id);
    
        if (updatedProducts.length === products.length) {
            console.log(`Producto con ID ${id} no encontrado.`);
        } else {
            await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts));
            console.log(`Producto con ID ${id} eliminado.`);
        }
    }
}
async function run () {
    const productManager = new ProductManager('products.json');

    await productManager.addProduct('jabon', 'jabon de glicerina', 450, null, "JG1", 400);
    await productManager.addProduct('crema', 'crema para manos', 500, null, "CM1", 1300);
    await productManager.addProduct('crema nivea', 'crema para piernas', 500, null, "CP2", 1250);
    console.log(await productManager.getProduct());
    console.log(await productManager.getProductByID(2));
    console.log(await productManager.getProductByID(4));
    await productManager.updateProduct(2, { title: 'Nuevo título', price: 1000, id:'123ABC' });
    console.log(await productManager.getProduct());
    await productManager.deleteProduct(1);
    await productManager.addProduct('talco', 'talco para pies', 500, null, "TP1", 650);
    console.log(await productManager.getProduct());
}
run();