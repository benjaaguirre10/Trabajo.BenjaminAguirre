import fs from "fs"
import {uuid} from "uuidv4"
class ProductManager {
    constructor(path) {
        this.path = path;
        this.usuarios = []
    }
    async addProduct(title, description, price, thumbnail, code, stock) {
        const productFile = await this.getProducts()
        const productoRepetido = productFile.find(product => product.code === code)
        if (productoRepetido) {
            return "Codigo existente"
        }
        try {
            const producto = {
                //Utilice el paquete de uuid para reducir la cantidad de codigo =)
                id: await uuid(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            productFile.push(producto)
            await fs.promises.writeFile(this.path, JSON.stringify(productFile))
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
            } else {
                console.log("Product not found");
            }
        } catch (error) {
            console.log(error);
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

const managerProductos = new ProductManager("./file.json")

managerProductos.addProduct("S19j pro", "104 Ths/s", 3000, "img-13", 321, 1000);
managerProductos.addProduct("S19j pro", "104 Ths/s", 3000, "img-13", 323, 1000);
managerProductos.addProduct("S19j pro", "104 Ths/s", 3000, "img-13", 324, 1000);
managerProductos.updateProduct(1, { title: "S19K pro" });


export {managerProductos as default} 



