import express from "express";
import managerProductos from "./index.js"

const app = express()


app.get("/products", async (req,res)=>{
    try {
        const products =  await managerProductos.getProducts();
        if (req.query.limit) {
            const limit = parseInt(req.query.limit)
            const limitProduct = products.slice(0,limit);
            res.send(limitProduct)
        } else {
            res.send(products)
        }
    } catch (error) {
        res.status(500).json({error:"Ocurrio un problema"})
    }
})
app.get("/products/:pid", async (req,res)=>{
    const id = req.params.pid
    const product =  await managerProductos.getProductsById(id);
    res.send(product)
})

app.listen(8080, ()=>{
    console.log("Escuchando puerto");
})