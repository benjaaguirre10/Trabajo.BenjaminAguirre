import {Router} from "express";
import productManager from "../manager/productManager.js";
const productM = new productManager("./data/product.json");
import { bodyValidator } from "../middlewares/body.validator.js";



const router = Router();



router.get("/", async (req, res) => {
    try {
        const products = await productM.getProducts();
        console.log(products);
        if (req.query.limit) {
            const limit = parseInt(req.query.limit)
            const limitProduct = products.slice(0, limit);
            res.send(limitProduct)
        } else {
            res.send(products)
        }
    } catch (error) {
        res.status(500).json({ error: "Ocurrio un problema" })
    }
})
router.get("/:pid", async (req, res) => {
    try {
        const id = req.params.pid
        const product = await productM.getProductsById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ msg: "Error" })
    }

})
router.post("/", bodyValidator ,async (req, res) => {
    
    try {
        const producto = await productM.addProduct(req.body)
        res.status(200).json(producto)
    } catch (error) {
        res.status(400).json({ msg: "Error" })
    }
})

router.delete("/:pid", async (req, res) => {
    try {
        const id = req.params.pid
        console.log(id);
        const product = await productM.getProductsById(id);
        const deleteProduct = await productM.deleteProduct(id)
        res.status(200).json({ msg: `${deleteProduct} Sucessfull delete` })
    } catch (error) {
        res.status(400).json({ msg: "Error" })
    }
})

router.put("/:pid", async (req, res) => {
    try {
        const id = req.params.pid
        console.log(id);
        console.log(req.body);
        const updProduct = await productM.updateProduct(id, req.body)
        const newProducts = await productM.getProducts()
        res.status(200).json(newProducts)
    } catch (error) {
        res.status(400).json({ msg: "Erorr" })
    }
})

export default router;