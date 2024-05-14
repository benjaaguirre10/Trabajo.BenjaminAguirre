//Hola Benjamín gracias por la entrega la cual tiene varios errores de sintaxis 
//lo cual no permite que los productos se muestren trae un array vació, 
//Pulir addproduct en cartManager


import express from "express";
import { __dirname } from './utils.js';
import handlebars from "express-handlebars";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { Server } from "socket.io"
import jsonData from './data/product.json' assert { type: "json" };



const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)

app.use(errorHandler)


app.get("/", (req, res) => {
    res.render("websocket")
})

const httpServer = app.listen(8080, () => {
    console.log("Escuchando puerto");
})
//Hola Profe. En mi caso el realtimeproducts hice el emit directamente desde el json y me funciono perfecto. 
//No se si sigue el requerimiento de la consigna pero fue lo uqe se me ocurrio =)

export const socketServer = new Server(httpServer)
socketServer.on("connection", (socket) =>{
    console.log(`Usuario conectado: ${socket.id}`);

    socket.on('disconnect', ()=>{
        console.log('Usuario desconectado');
      })
    socket.emit("getProducts", (jsonData));
})

