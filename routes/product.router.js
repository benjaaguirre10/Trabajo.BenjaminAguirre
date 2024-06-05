import { Router } from "express";
import * as controllers from "../controllers/product.controller.js";


const router = Router();


router.get("/", controllers.getProducts)
router.get("/:pid", controllers.getProductsById)
router.post("/", controllers.addProduct)
router.delete("/:pid", controllers.deleteProduct)
router.put("/:pid", controllers.updateProduct)


export default router;