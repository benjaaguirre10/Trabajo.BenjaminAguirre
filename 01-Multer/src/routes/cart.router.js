import { Router } from "express";
import cartManager from "../manager/cartManager.js";
import productManager from "../manager/productManager.js";
const productM = new productManager("./data/product.json");
const cartM = new cartManager("./data/cart.json")



const router = Router()


router.get("/", async (req, res, next) => {
    
    try {
        const cart = await cartM.getCarts()
        res.send(cart)
    } catch (error) {
        next(error)
    }
})
router.get("/:cid", async (req, res, next) => {
    
    try {
        const id = req.params.cid
        const cart = await cartM.getCartbyId(id);
        res.send(cart)
    } catch (error) {
        next(error)
    }
})
router.post("/", async (req, res, next) => {
    try {
        await cartM.createCart()
        res.status(200).json({ msg: "Operacion realizada con exito" })
    } catch (error) {
        next(error)
    }
})
router.post("/:cid/products/:pid", async (req, res, next) => {
    try {
        const pid = req.params.pid;
        const cid = req.params.cid;
        const { quantity } = req.body
        const productid = await productM.getProductsById(pid)
        console.log(productid.id);
        const producto = await cartM.addProduct(cid, pid, quantity)
        res.send(producto)

    } catch (error) {
        next(error)
    }

})

export default router;