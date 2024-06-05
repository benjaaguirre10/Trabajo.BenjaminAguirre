import * as service from "../service/cart.service.js";

export const getCarts = async (req, res, next) => {
    try {
        const cart = await service.getCarts()
        res.status(200).json(cart)
    } catch (error) {
        next(error)
    }
}

export const getCartsById = async (req, res, next) => {
    try {
        const id = req.params.cid
        const cart = await service.getCartbyId(id);
        res.send(cart)
    } catch (error) {
        next(error)
    }
}

export const createCart = async (req, res, next) => {
    try {
        const { id } = req.query;
        console.log(id);
        await service.createCart(id)
        res.status(200).json({ msg: "Operacion realizada con exito" })
    } catch (error) {
        next(error)
    }
}

export const addProductToCart = async (req, res, next) => {
    try {
        const pid = req.params.pid;
        const cid = req.params.cid;
        const { quantity } = req.body
        console.log(pid, cid, quantity);
        const producto = await service.addProductToCart(cid, pid, quantity)
        res.send(producto)
    } catch (error) {
        next(error)
    }
}
export const updateQuantity = async (req, res, next) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const { quantity } = req.body;
        const cart = await service.updateProdQuantity(cid, pid, quantity);
        res.send(cart)
    } catch (error) {
        next(error)
    }
}
export const deleteCarts = async (req, res, next) => {
    try {
        const cid = req.params.cid;
        const deleteCart = await service.deleteCartById(cid)
        res.status(200).json({ msg: "Cart delete succesfully" });
    } catch (error) {
        next(error)
    }
}

export const deleteProductFromCart = async (req, res, next) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const cart = await service.deleteProdFromCart(cid, pid)
        res.send(cart)
    } catch (error) {
        next(error)
    }
}

export const deleteAllProducts = async (req, res, next) => {
    try {
        const cid = req.params.cid;
        const cart = await service.deleteAllProdCart(cid)
        res.send(cart)
    } catch (error) {
        next(error)
    }
}