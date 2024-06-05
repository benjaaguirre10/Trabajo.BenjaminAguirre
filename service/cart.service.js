import cartDaoMongoDb from "../daos/cart.dao.js";
const cartDao = new cartDaoMongoDb()

import productsDaoMongoDB from "../daos/product.dao.js";
const productDao = new productsDaoMongoDB();



export const getCarts = async () => {
    try {
        return await cartDao.getCarts();
    } catch (error) {
        throw new Error(error)
    }
}

export const getCartbyId = async (id) => {
    try {
        return await cartDao.getCartbyId(id)
    } catch (error) {
        throw new Error(error)
    }
}
export const createCart = async () => {
    try {
        return await cartDao.createCart({})
    } catch (error) {
        throw new Error(error)
    }
}

export const addProductToCart = async (cartId, productId, quantity) => {
    try {
        const existCart = await getCartbyId(cartId);
        const existProd = await productDao.getProductsById(productId);
        if (!existCart || !existProd) return null;
        return await cartDao.addProduct(cartId, productId, quantity)
    } catch (error) {
        throw new Error(error);
    }
}
export const updateProdQuantity = async(cartId, productId, quantity) => {
    try {
        const existCart = await getCartbyId(cartId);
        const existProd = await productDao.getProductsById(productId);
        if (!existCart || !existProd) return null;
        return await cartDao.updateProdQuantity(cartId, productId, quantity);
    } catch (error) {
        throw new Error(error)
    }
}
export const deleteCartById = async (id) => {
    try {
        return await cartDao.deleteCart(id);
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteProdFromCart = async (cartId, productId) => {
    try {
        const existCart = await getCartbyId(cartId);
        console.log(existCart);
        const existProd = await productDao.getProductsById(productId);
        if (!existCart || !existProd) return null;
        return await cartDao.deleteProduct(cartId, productId);
    } catch (error) {
        throw new Error(error)
    }
}
export const deleteAllProdCart = async (cartId) => {
    try {
        const existCart = await getCartbyId(cartId);
        if (!existCart) return null;
        return await cartDao.deleteAllprodCart(cartId)
    } catch (error) {
        throw new Error(error)
    }
}