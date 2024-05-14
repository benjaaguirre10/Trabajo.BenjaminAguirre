import { Router } from "express";
import productManager from "../manager/productManager.js";
const productM = new productManager("./data/product.json");
import { bodyValidator } from "../middlewares/body.validator.js";
import { socketServer } from "../server.js";


const router = Router();



router.get("/", async (req, res, next) => {
    try {
        const products = await productM.getProducts();

        if (req.query.limit) {
            const limit = parseInt(req.query.limit)
            const limitProduct = products.slice(0, limit);
            res.render("product", { products: limitProduct });
        } else {
            res.render("product", { products });
        }


    } catch (error) {
        next(error)
    }
})

router.get("/:pid", async (req, res, next) => {
    try {
        const id = req.params.pid
        const product = await productM.getProductsById(id);
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }

})
router.post("/", bodyValidator, async (req, res, next) => {
    try {
        const producto = await productM.addProduct(req.body)
        res.status(200).json(producto)
    } catch (error) {
        next(error)
    }
})

router.delete("/:pid", async (req, res, next) => {
    try {
        const id = req.params.pid
        console.log(id);
        const product = await productM.getProductsById(id);
        const deleteProduct = await productM.deleteProduct(id)
        res.status(200).json({ msg: `${deleteProduct} Sucessfull delete` })
    } catch (error) {
        next(error)
    }
})

router.put("/:pid", async (req, res, next) => {
    try {
        const id = req.params.pid
        console.log(id);
        console.log(req.body);
        const updProduct = await productM.updateProduct(id, req.body)
        const newProducts = await productM.getProducts()
        res.status(200).json(newProducts)
    } catch (error) {
        next(error)
    }
})

export default router;