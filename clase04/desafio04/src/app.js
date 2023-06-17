import express from 'express';
import ProductManager from './productManager.js';
const productManager = new ProductManager('products.json');
/*
rutas:
http://127.0.0.1:8080/?limit=3
http://127.0.0.1:8080/
http://127.0.0.1:8080/2
*/
const app = express();

app.get('/', async (req, res) => {
    try {
        const products = await productManager.getProduct();
        let limit = req.query.limit;
        
        if (limit) {
            limit = parseInt(limit);
            const productsLimited = products.slice(0, limit)
            return res.send(productsLimited);
        }
        return res.send(products);

    } catch (error) {
        throw new Error('Error getting products');
    }
});

app.get('/:pid', async (req, res) => {
    try {
        const products = await productManager.getProduct();
        const pid = parseInt(req.params.pid);
        const productFiltered = products.filter(p => p.id === pid);

        if (productFiltered.length === 0) {
            throw new Error('Product not found');
        }
        return res.send(productFiltered);

    } catch (error) {
        return res.status(400).send({ error: error});
    }
});

app.listen(8080, () => {
    console.log('Corriendo en el puerto 8080\nhttp://127.0.0.1:8080/');
});

