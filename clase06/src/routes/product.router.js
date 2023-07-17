import { Router } from 'express';
import ProductManager from '../manager/product.manager.js';
import ErrorObject from '../error.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {
    try {
        const result = await productManager.list();
        res.status(200).send(result);
    } catch (error) {
        throw new ErrorObject('Error getting products', 404);
    }    
})

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const result = await productManager.create(data);
        res.status(201).send(result);
    } catch (error) {
        throw new ErrorObject('Error creating products', 400);
    }    
});

export default router;
