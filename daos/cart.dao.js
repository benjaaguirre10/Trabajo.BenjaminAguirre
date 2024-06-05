import { cartModel } from "../daos/models/cart.model.js";
export default class cartDao {
    async createCart() {
        try {
            return await cartModel.create({
                products: []
            });
        } catch (error) {
            throw new Error(error)
        }
    }
    async getCarts() {
        try {
            return await cartModel.find({})
        } catch (error) {
            throw new Error(error)
        }
    }
    async getCartbyId(id) {
        try {
            return await cartModel.findById(id).populate("products.product")
        } catch (error) {
            throw new Error(error)
        }
    }
    async addProduct(cartId, productId, quantity) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) return null;
            console.log(cart);
            const existingProdIndex = cart.products.findIndex(p => p.product.toString() === productId)
            if (existingProdIndex !== -1) {
                cart.products[existingProdIndex].quantity = quantity
            } else cart.products.push({ product: productId, quantity })
            await cart.save()
            return cart;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateProdQuantity(cartId, productId, quantity) {
        try {
            const cart = await cartModel.findById(cartId)
            console.log(cart.products);
            if(!cart) return null;
            const existingProdIndex = cart.products.findIndex(p => p.product.toString() === productId)
            if(existingProdIndex !== -1){
                cart.products[existingProdIndex].quantity = quantity
            }else return null
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(error)
        }

    }
    async deleteCart(id) {
        try {
            console.log(id);
            const dele = await cartModel.deleteOne({ _id: id })
            console.log(dele);
        } catch (error) {
            throw new Error(error)
        }
    }
    async deleteProduct(cartId, productId) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) return null;
            const existingProdIndex = cart.products.findIndex(p => p.product.toString() === productId);
            console.log(existingProdIndex);
            if (existingProdIndex !== -1) {
                cart.products.pull(cart.products[existingProdIndex])
            }
            await cart.save();
            return cart
        } catch (error) {
            throw new Error(error)
        }
    }
    async deleteAllprodCart(cartId) {
        try {
            console.log(cartId);
            const cart = await cartModel.findById(cartId)
            if (!cart) return null;;
            if (cart.products) {
                console.log("condicional esta funcionando");
                cart.products.pull(cart.products)
            }
            await cart.save()
            return cart
        } catch (error) {
            throw new Error(error)
        }
    }
}
