import express from "express";
import productRouter from "./routes/product.router.js"
import cartRouter from "./routes/cart.router.js"

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/product", productRouter)
app.use("/cart", cartRouter)


app.listen(8080, () => {
    console.log("Escuchando puerto");
})