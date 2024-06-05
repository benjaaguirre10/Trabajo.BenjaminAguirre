import express from 'express';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { initMongoDb } from './daos/conexion.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
 // Usa el router de vistas

app.use(errorHandler);

initMongoDb();
const httpServer = app.listen(8080, () => {
    console.log("Escuchando puerto 8080");
});
