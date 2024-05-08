import { Router } from "express";
import cartManager from "../manager/cartManager.js";
import productManager from "../manager/productManager.js";
const productM = new productManager("./data/product.json");

const cartm = new cartManager("./data/cart.json")



const router = Router()


router.get("/", async (req, res) => {
    try {
        const cart = await cartm.getCart()
        res.send(cart)
    } catch (error) {
        res.status(404).json({ msg: "Error" })
    }
})
router.post("/", async (req, res) => {
    try {
        await cartm.createCart()
        res.status(200).json({ msg: "Operacion realizada con exito" })
    } catch (error) {
        res.status(404).json({msg: "Error"})
    }
})
router.post("/:cid/products/:pid", async(req, res)=>{
    const pid = req.params.pid;
    const cid = req.params.cid;
    const {quantity} = req.body
    const productid = await productM.getProductsById(pid)
    console.log(productid.id);
    const producto = await cartm.addProduct(cid,pid,quantity)
    res.send(producto)
    

})

export default router;