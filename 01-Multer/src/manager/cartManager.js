import fs from "fs"
import { v4 as uuidv4 } from 'uuid';

export default class cartManager {
    constructor(path) {
        this.path = path;
        this.cart = [];
    }
    async createCart() {
        try {
            const cart = {
                id: await uuidv4(),
                products: []
            }
            const cartFile = await this.getCarts()
            cartFile.push(cart);
            console.log(cartFile);
            await fs.promises.writeFile(this.path, JSON.stringify(cartFile))
        } catch (error) {
            return error
        }
    }
    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const file = await fs.promises.readFile(this.path, "utf-8");
                if (file.trim() === "") {
                    console.log("El archivo está vacío");
                    return [];
                }
                return JSON.parse(file);
            } else {
                console.log("Archivo no existente");
                return [];
            }
        } catch (error) {
            console.log("Error al leer el archivo:", error);
            return [];
        }
    }
    async getCartbyId(id) {
        try {
            const carts = await this.getCarts()
            const cart = carts.find(c => c.id === id)
            if (!cart) return null;
            return cart;
        } catch (error) {
            throw new Error(error)
        }
    }
    async addProduct(cartId, productId, quantity) {
        try {
            const cartList = await this.getCart();
            const cartIndex = cartList.findIndex(cart => cart.id === cartId);

            if (cartIndex === -1) {
                throw new Error("Cart not found");
            }

            const cart = cartList[cartIndex];

            const existingProductIndex = cart.products.findIndex(product => product.id === productId);

            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += quantity;
            } else {
                cart.products.push({ id: productId, quantity });
            }

            await fs.promises.writeFile(this.path, JSON.stringify(cartList));
            return cart;
        } catch (error) {
            return error;
        }
    }

}
