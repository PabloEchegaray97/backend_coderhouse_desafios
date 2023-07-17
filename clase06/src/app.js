import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import productRouter from './routes/product.router.js';
import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js';
import ProductManager from './manager/product.manager.js';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('*', (request, response) => {
    response.status(404).render('404');
});

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

const httpServer = app.listen(8080);
const io = new Server(httpServer);

io.on('connection', socket => {
    socket.on('new-product', async data => {
        const productManager = new ProductManager();
        await productManager.create(data);
        const products = await productManager.list();
        io.emit('realtime-table', products);
    });
})