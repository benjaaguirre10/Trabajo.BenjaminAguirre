import fs from "fs"
import { v4 as uuidv4 } from 'uuid';

export default class ProductManager {
    constructor(path) {
        this.path = path;
        this.usuarios = []
    }
    async addProduct(title, description, price, thumbnail, code, stock) {
        const productFile = await this.getProducts()
        const productoRepetido = productFile.find(product => product.code === code)
        if (productoRepetido) {
            console.log(productoRepetido);
            return "Codigo existente"
        }
        try {
            const producto = {
                //Utilice el paquete de uuid para reducir la cantidad de codigo =)
                id: await uuidv4(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                status: true
            }
            productFile.push(producto)
            await fs.promises.writeFile(this.path, JSON.stringify(productFile))
            return producto
        }
        catch (error) {
            console.log(error);
        }
    }
    async getProducts() { 
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

    async getProductsById(id) {
        try {
            const file = await this.getProducts()
            const productById = file.find(product => product.id === id);
            if (productById) {
                console.log(productById);
                return productById; 
            } else {
                console.log("Product not found");
                return null;
            }
        } catch (error) {
            console.log(error);
            return null; 
        }
    }
    
    async deleteProduct(id) {
        try {
            const productsFile = await this.getProducts();
            const productsFilter = productsFile.filter(product => product.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(productsFilter))
            return "Producto Eliminado"
        } catch (error) {
            return error
        }
    }
    async updateProduct(id, obj) {
        try {
            const productsFile = await this.getProducts();
            console.log(obj);
            const productToUpdateIndex = productsFile.findIndex(product => product.id === id);
            if (productToUpdateIndex === -1) {
                return "Error"
            }
            const updatedProduct = { ...productsFile[productToUpdateIndex] };
            Object.assign(updatedProduct, obj);
            productsFile[productToUpdateIndex] = updatedProduct;
            console.log(productsFile);
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
            return "Producto actualizado exitosamente";
        } catch (error) {
            return error;
        }
    }
}




