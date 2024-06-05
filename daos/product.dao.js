import { productModel } from "./models/product.model.js";


export default class ProductManager {
    async addProduct(product) {
        try {
            return await productModel.create(product)
        }
        catch (error) {
            throw new Error(error)
        }
    }
    async getProducts(limit= 10, page= 1, brand, sort) {
        try {
            console.log(limit, page, brand, sort);
            const filter = brand ? {"brand": brand} : {};
            const sortOrder = {}
            if (sort) sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null; 

            return await productModel.paginate(filter, {page, limit, sort: sortOrder});
        }
        catch (error) {
            throw new Error(error)
        }
    }

    async getProductsById(id) {
        try {
            return await productModel.findById(id)
        } catch (error) {
            throw new Error(error)

        }
    }

    async deleteProduct(id) {
        try {
            return await productModel.findByIdAndDelete(id)
        } catch (error) {
            throw new Error(error)
        }
    }
    async updateProduct(id, obj) {
        try {
            return await productModel.findByIdAndUpdate(id, obj, { new: true })
        } catch (error) {
            throw new Error(error)
        }
    }
}




