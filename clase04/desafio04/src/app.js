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
app.use(express.json());

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
        const productFiltered = products.filter(p => parseInt(p.id) === pid);

        if (productFiltered.length === 0) {
            throw new Error('Product not found');
        }
        return res.send(productFiltered);

    } catch (error) {
        return res.status(400).send({ error: error});
    }
});

app.post ('/', async (req,res) => {
    try {
        await productManager.addProduct(req.body);
        res.send('Product added successfully');

    } catch (error) {
        throw new Error('Error adding product')
    }
})

app.put ('/:pid', async (req,res) => {
    try {
        const pid = parseInt(req.params.pid);
        const updatedProps = req.body;
        await productManager.updateProduct(pid, updatedProps);
        res.send(`Product updated -  ID:${pid}.`);
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

app.delete('/:pid', async (req,res) => {
    try {
        const pid = parseInt(req.params.pid);
        await productManager.deleteProduct(pid);
        res.send(`Product deleted successfully - ID:${pid}`)
    } catch (error) {
        res.send(`Error:${error.message}`)
    }
})
app.listen(8080, () => {
    console.log('Running on port 8080\nhttp://127.0.0.1:8080/');
});

