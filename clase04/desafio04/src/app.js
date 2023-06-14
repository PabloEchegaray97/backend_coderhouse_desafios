import { promises } from 'fs';
import express from 'express';

/*
rutas:
http://127.0.0.1:8080/?limit=3
http://127.0.0.1:8080/
http://127.0.0.1:8080/2
*/
const app = express();

app.get('/', async (req, res) => {
    try {
        const productManager = new ProductManager('products.json');
        const products = await productManager.getProduct();

        let limit = req.query.limit;
        if (limit) {
            limit = parseInt(limit);
            const productsLimited = products.slice(0, limit)
            return res.send(productsLimited);
        } else {
            return res.send(products);
        }
    } catch (error) {
        console.log('Error al obtener los productos:', error);
    }
});

app.get('/:pid', async (req, res) => {
    try {
        const productManager = new ProductManager('products.json');
        const products = await productManager.getProduct();

        const pid = parseInt(req.params.pid);
        const productFiltered = products.filter(p => p.id === pid);

        if (productFiltered.length === 0) {
            return res.send({ error: 'Product not found' });
        } else {
            return res.send(productFiltered);
        }
    } catch (error) {
        return res.status(400).send({ error: error});
    }
});

app.listen(8080, () => {
    console.log('Corriendo en el puerto 8080\nhttp://127.0.0.1:8080/');
});

class ProductManager {
    constructor(filename) {
        this.path = `./files/${filename}`
        this.format = 'utf-8';
    }

    getNextID = async () => {
        try {
            const list = await this.getProduct();
            const nextID = (list.length > 0) ? list[list.length - 1].id + 1 : 1 //count-1 es el ultimo elemento del arreglo, tomamos su id y le sumamos 1, caso contrario si count = 0 id va a ser = a 1
            return nextID;
        } catch (error) {
            console.log('Error al obtener el próximo ID:', error);
            return null;
        }
    };

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        let flag = false;
        try {
            const productsList = await this.getProduct();
            const newProduct = { id: await this.getNextID(), title, description, price, thumbnail, code, stock }
            productsList.forEach(element => {
                if (element.code === newProduct.code) {
                    flag = true
                }
            })
            if (flag == false) {
                productsList.push(newProduct);
                await promises.writeFile(this.path, JSON.stringify(productsList));
                console.log("Se ha agregado el producto: " + newProduct.title + ", ID: " + newProduct.id);
            } else {
                console.log('El codigo del producto ingresado ya existe, por favor ingresa otro ');
            }

        } catch (e) {
            console.log(e);
        }

    };

    getProduct = async () => {
        try {
            const data = await promises.readFile(this.path, this.format);
            const dataObj = JSON.parse(data);
            return dataObj
        } catch (error) {
            return [];
        }
    };

    getProductByID = async (id) => {
        try {
            const listOfProducts = await this.getProduct();
            const product = listOfProducts.find(element => element.id === id);
            if (product) {
                console.log('Se ha encontrado un producto con ID = ', id);
                return product;
            }
            return 'Error: Not found'
        } catch (error) {
            return ('(!) Producto no encontrado, ', error)
        }
    };

    updateProduct = async (id, updatedProps) => {
        try {
            const listOfProducts = await this.getProduct();
            const productIndex = listOfProducts.findIndex((element) => element.id === id);

            if (productIndex !== -1) {
                const updatedProduct = { ...listOfProducts[productIndex], ...updatedProps };
                updatedProduct.id = id; // Evitar la actualización del ID
                listOfProducts[productIndex] = updatedProduct;
                await promises.writeFile(this.path, JSON.stringify(listOfProducts));
                console.log(`Producto con ID ${id} actualizado.`);
            } else {
                console.log(`Producto con ID ${id} no encontrado.`);
            }
        } catch (error) {
            console.log('Error al actualizar el producto:', error);
        }
    };

    deleteProduct = async (id) => {
        try {
            const products = await this.getProduct();
            const updatedProducts = products.filter((product) => product.id !== id);
            if (updatedProducts.length === products.length) {
                console.log(`Producto con ID ${id} no encontrado.`);
            } else {
                await promises.writeFile(this.path, JSON.stringify(updatedProducts));
                console.log(`Producto con ID ${id} eliminado.`);
            }
        } catch (error) {
            console.log('Error al eliminar el producto:', error);
        }
    };
};
