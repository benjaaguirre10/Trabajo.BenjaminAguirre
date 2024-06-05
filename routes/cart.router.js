import { Router } from "express";
import * as controllers from "../controllers/cart.controller.js";




const router = Router()


router.get("/", controllers.getCarts)
router.get("/:cid", controllers.getCartsById)
router.post("/", controllers.createCart)
router.post("/:cid/product/:pid", controllers.addProductToCart)
router.put("/:cid/product/:pid", controllers.updateQuantity);
router.delete("/:cid/all", controllers.deleteCarts)
router.delete("/:cid/product/:pid", controllers.deleteProductFromCart);
router.delete("/:cid", controllers.deleteAllProducts);

export default router;